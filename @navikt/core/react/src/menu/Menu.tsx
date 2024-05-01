import React, { useEffect, useRef, useState } from "react";
import { Floating } from "../overlays/floating/Floating";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { createContext } from "../util/create-context";
import { useCallbackRef, useId, useMergeRefs } from "../util/hooks";
import {
  MenuDescendantsProvider,
  MenuProvider,
  MenuRootProvider,
  useMenuContext,
  useMenuDescendants,
  useMenuRootContext,
} from "./Menu.context";
import type { SubMenuSide } from "./Menu.types";
import { SELECTION_KEYS, getOpenState, whenMouse } from "./Menu.utils";

/* import { useFocusGuards } from "./FocusGuards"; */
import { MenuAnchor, type MenuAnchorProps } from "./parts/Menu.Anchor";
import {
  MenuCheckboxItem,
  type MenuCheckboxItemProps,
} from "./parts/Menu.Checkbox";
import { MenuGroup, type MenuGroupProps } from "./parts/Menu.Group";
import { MenuLabel, type MenuLabelProps } from "./parts/Menu.Label";
import { MenuPortal, type MenuPortalProps } from "./parts/Menu.Portal";
import { MenuRadioItem, MenuRadioItemProps } from "./parts/Menu.Radio";
import { MenuRadioGroup, MenuRadioGroupProps } from "./parts/Menu.RadioGroup";
import { MenuSeparator, type MenuSeparatorProps } from "./parts/Menu.Separator";
import {
  MenuContent,
  MenuContentElement,
  MenuContentProps,
} from "./parts/content/Menu.Content";
import {
  MenuContentImpl,
  MenuContentImplElement,
  MenuContentImplPrivateProps,
  MenuContentImplProps,
} from "./parts/content/Menu.ContentImpl";
import { useMenuContentContext } from "./parts/content/Menu.context";
import {
  MenuItem,
  type MenuItemElement,
  type MenuItemProps,
} from "./parts/item/Menu.Item";
import {
  MenuItemImpl,
  type MenuItemImplProps,
} from "./parts/item/Menu.ItemImpl";

const SUB_OPEN_KEYS = [...SELECTION_KEYS, "ArrowRight"];
const SUB_CLOSE_KEYS = ["ArrowLeft"];

/* -------------------------------------------------------------------------------------------------
 * Menu
 * -----------------------------------------------------------------------------------------------*/

interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  modal?: boolean;
}

interface MenuComponent extends React.FC<MenuProps> {
  Anchor: typeof MenuAnchor;
  Portal: typeof MenuPortal;
  Content: typeof MenuContent;
  Group: typeof MenuGroup;
  Label: typeof MenuLabel;
  Item: typeof MenuItem;
  CheckboxItem: typeof MenuCheckboxItem;
  RadioGroup: typeof MenuRadioGroup;
  RadioItem: typeof MenuRadioItem;
  Separator: typeof MenuSeparator;
  Sub: typeof MenuSub;
  SubTrigger: typeof MenuSubTrigger;
  SubContent: typeof MenuSubContent;
}

const MenuRoot = (props: MenuProps) => {
  const { open = false, children, onOpenChange, modal = true } = props;

  const [content, setContent] = useState<MenuContentElement | null>(null);
  const isUsingKeyboardRef = useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);

  useEffect(() => {
    // Capture phase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      document.addEventListener("pointerdown", handlePointer, {
        capture: true,
        once: true,
      });
      document.addEventListener("pointermove", handlePointer, {
        capture: true,
        once: true,
      });
    };
    const handlePointer = () => (isUsingKeyboardRef.current = false);
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("pointerdown", handlePointer, {
        capture: true,
      });
      document.removeEventListener("pointermove", handlePointer, {
        capture: true,
      });
    };
  }, []);

  return (
    <Floating>
      <MenuProvider
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        <MenuRootProvider
          onClose={React.useCallback(
            () => handleOpenChange(false),
            [handleOpenChange],
          )}
          isUsingKeyboardRef={isUsingKeyboardRef}
          modal={modal}
        >
          {children}
        </MenuRootProvider>
      </MenuProvider>
    </Floating>
  );
};

const Menu = MenuRoot as MenuComponent;

/* -------------------------------------------------------------------------------------------------
 * MenuSub
 * -----------------------------------------------------------------------------------------------*/

const SUB_NAME = "MenuSub";

type MenuSubContextValue = {
  contentId: string;
  triggerId: string;
  trigger: MenuSubTriggerElement | null;
  onTriggerChange(trigger: MenuSubTriggerElement | null): void;
};

const [MenuSubProvider, useMenuSubContext] = createContext<MenuSubContextValue>(
  {
    providerName: "MenuSubProvider",
    hookName: "useMenuSubContext",
  },
);

interface MenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

const MenuSub: React.FC<MenuSubProps> = (props: MenuSubProps) => {
  const { children, open = false, onOpenChange } = props;
  const parentMenuContext = useMenuContext();

  const [trigger, setTrigger] = React.useState<MenuSubTriggerElement | null>(
    null,
  );
  const [content, setContent] = React.useState<MenuContentElement | null>(null);
  const handleOpenChange = useCallbackRef(onOpenChange);

  // Prevent the parent menu from reopening with open submenus.
  React.useEffect(() => {
    if (parentMenuContext.open === false) handleOpenChange(false);
    return () => handleOpenChange(false);
  }, [parentMenuContext.open, handleOpenChange]);

  return (
    <Floating>
      <MenuProvider
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        <MenuSubProvider
          contentId={useId()}
          triggerId={useId()}
          trigger={trigger}
          onTriggerChange={setTrigger}
        >
          {children}
        </MenuSubProvider>
      </MenuProvider>
    </Floating>
  );
};

MenuSub.displayName = SUB_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuSubTrigger
 * -----------------------------------------------------------------------------------------------*/

const SUB_TRIGGER_NAME = "MenuSubTrigger";

type MenuSubTriggerElement = MenuItemElement;
interface MenuSubTriggerProps extends MenuItemImplProps {}

const MenuSubTrigger = React.forwardRef<
  MenuSubTriggerElement,
  MenuSubTriggerProps
>((props: MenuSubTriggerProps, forwardedRef) => {
  const context = useMenuContext();
  const subContext = useMenuSubContext();
  const contentContext = useMenuContentContext();
  const openTimerRef = React.useRef<number | null>(null);
  const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;

  const composedRefs = useMergeRefs(forwardedRef, subContext.onTriggerChange);

  const clearOpenTimer = React.useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
    }
    openTimerRef.current = null;
  }, []);

  React.useEffect(() => clearOpenTimer, [clearOpenTimer]);

  React.useEffect(() => {
    const pointerGraceTimer = pointerGraceTimerRef.current;
    return () => {
      window.clearTimeout(pointerGraceTimer);
      onPointerGraceIntentChange(null);
    };
  }, [pointerGraceTimerRef, onPointerGraceIntentChange]);

  return (
    <MenuAnchor asChild>
      <MenuItemImpl
        id={subContext.triggerId}
        aria-haspopup="menu"
        aria-expanded={context.open}
        aria-controls={subContext.contentId}
        data-state={getOpenState(context.open)}
        {...props}
        ref={composedRefs}
        // This is redundant for mouse users but we cannot determine pointer type from
        // click event and we cannot use pointerup event (see git history for reasons why)
        onClick={(event) => {
          /* console.log("kdwn"); */
          props.onClick?.(event);
          if (props.disabled || event.defaultPrevented) return;
          /**
           * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
           * and we rely heavily on `onFocusOutside` for submenus to close when switching
           * between separate submenus.
           */
          event.currentTarget.focus();
          if (!context.open) context.onOpenChange(true);
        }}
        onPointerMove={composeEventHandlers(
          props.onPointerMove,
          whenMouse((event) => {
            contentContext.onItemEnter(event);
            if (event.defaultPrevented) return;
            if (!props.disabled && !context.open && !openTimerRef.current) {
              contentContext.onPointerGraceIntentChange(null);
              openTimerRef.current = window.setTimeout(() => {
                context.onOpenChange(true);
                clearOpenTimer();
              }, 100);
            }
          }),
        )}
        onPointerLeave={composeEventHandlers(
          props.onPointerLeave,
          whenMouse((event) => {
            clearOpenTimer();

            const contentRect = context.content?.getBoundingClientRect();
            if (contentRect) {
              // TODO: make sure to update this when we change positioning logic
              const side = context.content?.dataset.side as SubMenuSide;
              const rightSide = side === "right";
              const bleed = rightSide ? -5 : +5;
              const contentNearEdge = contentRect[rightSide ? "left" : "right"];
              const contentFarEdge = contentRect[rightSide ? "right" : "left"];

              contentContext.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: event.clientX + bleed, y: event.clientY },
                  { x: contentNearEdge, y: contentRect.top },
                  { x: contentFarEdge, y: contentRect.top },
                  { x: contentFarEdge, y: contentRect.bottom },
                  { x: contentNearEdge, y: contentRect.bottom },
                ],
                side,
              });

              window.clearTimeout(pointerGraceTimerRef.current);
              pointerGraceTimerRef.current = window.setTimeout(
                () => contentContext.onPointerGraceIntentChange(null),
                300,
              );
            } else {
              contentContext.onTriggerLeave(event);
              if (event.defaultPrevented) return;

              // There's 100ms where the user may leave an item before the submenu was opened.
              contentContext.onPointerGraceIntentChange(null);
            }
          }),
        )}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (props.disabled) {
            return;
          }
          if (SUB_OPEN_KEYS.includes(event.key)) {
            context.onOpenChange(true);
            // The trigger may hold focus if opened via pointer interaction
            // so we ensure content is given focus again when switching to keyboard.
            context.content?.focus();
            console.log("opening submenu", context.content);
            // prevent window from scrolling
            event.preventDefault();
          }
        })}
      />
    </MenuAnchor>
  );
});

MenuSubTrigger.displayName = SUB_TRIGGER_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuSubContent
 * -----------------------------------------------------------------------------------------------*/

const SUB_CONTENT_NAME = "MenuSubContent";

type MenuSubContentElement = MenuContentImplElement;
interface MenuSubContentProps
  extends Omit<
    MenuContentImplProps,
    | keyof MenuContentImplPrivateProps
    | "onCloseAutoFocus"
    | "onEntryFocus"
    | "side"
    | "align"
  > {}

const MenuSubContent = React.forwardRef<
  MenuSubContentElement,
  MenuSubContentProps
>((props: MenuSubContentProps, forwardedRef) => {
  const descendants = useMenuDescendants();

  const { ...subContentProps } = props;
  const context = useMenuContext();
  const rootContext = useMenuRootContext();
  const subContext = useMenuSubContext();
  const ref = React.useRef<MenuSubContentElement>(null);
  const composedRefs = useMergeRefs(forwardedRef, ref);

  return (
    <MenuDescendantsProvider value={descendants}>
      <MenuContentImpl
        id={subContext.contentId}
        aria-labelledby={subContext.triggerId}
        {...subContentProps}
        ref={composedRefs}
        align="start"
        side="right"
        disableOutsidePointerEvents={false}
        onOpenAutoFocus={(event) => {
          // when opening a submenu, focus content for keyboard users only
          if (rootContext.isUsingKeyboardRef.current) {
            ref.current?.focus();
            /* console.log(ref.current); */
            console.log("ran openautofocus");
          }
          event.preventDefault();
        }}
        // The menu might close because of focusing another menu item in the parent menu. We
        // don't want it to refocus the trigger in that case so we handle trigger focus ourselves.
        onCloseAutoFocus={(event) => event.preventDefault()}
        onFocusOutside={composeEventHandlers(props.onFocusOutside, (event) => {
          // We prevent closing when the trigger is focused to avoid triggering a re-open animation
          // on pointer interaction.
          if (event.target !== subContext.trigger) context.onOpenChange(false);
        })}
        onEscapeKeyDown={composeEventHandlers(
          props.onEscapeKeyDown,
          (event) => {
            rootContext.onClose();
            // ensure pressing escape in submenu doesn't escape full screen mode
            event.preventDefault();
          },
        )}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          // Submenu key events bubble through portals. We only care about keys in this menu.
          const isKeyDownInside = event.currentTarget.contains(
            event.target as HTMLElement,
          );
          const isCloseKey = SUB_CLOSE_KEYS.includes(event.key);
          if (isKeyDownInside && isCloseKey) {
            context.onOpenChange(false);
            // We focus manually because we prevented it in `onCloseAutoFocus`
            subContext.trigger?.focus();
            // prevent window from scrolling
            event.preventDefault();
          }
        })}
      />
    </MenuDescendantsProvider>
  );
});

MenuSubContent.displayName = SUB_CONTENT_NAME;

Menu.Anchor = MenuAnchor;
Menu.Portal = MenuPortal;
Menu.Content = MenuContent;
Menu.Group = MenuGroup;
Menu.Label = MenuLabel;
Menu.Item = MenuItem;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.Separator = MenuSeparator;
Menu.Sub = MenuSub;
Menu.SubTrigger = MenuSubTrigger;
Menu.SubContent = MenuSubContent;

export {
  Menu,
  type MenuAnchorProps,
  type MenuCheckboxItemProps,
  type MenuContentProps,
  type MenuGroupProps,
  type MenuItemProps,
  type MenuLabelProps,
  type MenuPortalProps,
  type MenuProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuSeparatorProps,
  type MenuSubContentProps,
  type MenuSubProps,
  type MenuSubTriggerProps,
};

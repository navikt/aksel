/**
 * API
 * Menu
 * MenuTrigger
 * MenuContent
 * MenuSubTrigger
 * MenuSubContent
 * MenuDivider
 * MenuGroup
 * MenuLabel
 * MenuItem
 * MenuRadioGroup
 * MenuRadioItem
 * MenuCheckbox
 */

/**
 * MenuTrigger is the trigger for the menu
 * MenuContent sets up descendants API-wrapper
 * MenuSubTrigger is the trigger for a sub-menu
 * MenuSubContent sets up nested descendants API-wrapper. cant use same descendants
 * MenuDivider is a visual divider/line
 * MenuGroup groups items together semantically with a label
 * MenuLabel is a label for a group, or menu in general
 * MenuItem is a clickable item. Can be button and link?
 * MenuRadioGroup is a group of radio buttons (fieldset)
 * MenuRadioItem is a radio button
 * MenuCheckbox is a checkbox. Checkboxes can be standalone so no fieldset needed
 */
import React, { forwardRef, useCallback, useRef } from "react";
import DismissableLayer from "../../overlay/dismiss/DismissableLayer";
import { DismissableLayerProps } from "../../overlay/dismiss/DismissableLayer.types";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useCallbackRef, useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import Floating from "../floating/Floating";
import { FloatingAnchorProps } from "../floating/parts/Anchor";
import { FloatingContentProps } from "../floating/parts/Content";
import { MenuProvider, useMenuContext } from "./Menu.context";
import { MenuContentType } from "./Menu.types";

/**
 * Menu
 */
interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange: (open: boolean) => void;
  /**
   * @default "bottom"
   */
}

interface MenuComponent extends React.FC<MenuProps> {}

export const Menu: MenuComponent = ({
  children,
  open = false,
  onOpenChange,
}: MenuProps) => {
  const handleOpenChange = useCallbackRef(onOpenChange);

  const [content, setContent] = React.useState<MenuContentType | null>(null);

  return (
    <MenuProvider
      onClose={useCallback(() => handleOpenChange(false), [handleOpenChange])}
      open={open}
      onOpenChange={handleOpenChange}
      content={content}
      onContentChange={setContent}
    >
      {children}
    </MenuProvider>
  );
};

/**
 * Trigger
 */
interface MenuTriggerProps extends FloatingAnchorProps {}

export const MenuTrigger = forwardRef<
  React.ElementRef<typeof Floating.Anchor>,
  MenuTriggerProps
>(({ children, ...rest }: MenuTriggerProps, ref) => {
  return (
    <Floating.Anchor ref={ref} {...rest}>
      {children}
    </Floating.Anchor>
  );
});

/**
 * Content
 */
interface MenuContentProps extends FloatingContentProps {
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
}

export const [
  MenuContentDescendantsProvider,
  useMenuContentDescendantsContext,
  useMenuContentDescendants,
  useMenuContentDescendant,
] = createDescendantContext<HTMLElement>();

export const MenuContent = ({ children }: MenuContentProps) => {
  const descendants = useMenuContentDescendants();

  return (
    <MenuContentDescendantsProvider value={descendants}>
      {children}
    </MenuContentDescendantsProvider>
  );
};

/* Cotent Impl */

/*  <MenuContentImpl
        {...props}
        ref={composedRefs}
        // we make sure we're not trapping once it's been closed
        // (closed !== unmounted when animating out)
        trapFocus={context.open}
        // make sure to only disable pointer events when open
        // this avoids blocking interactions while animating out
        disableOutsidePointerEvents={context.open}
        disableOutsideScroll
        // When focus is trapped, a `focusout` event may still happen.
        // We make sure we don't trigger our `onDismiss` in such case.
        onFocusOutside={composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )}
        onDismiss={() => context.onOpenChange(false)}
      /> */

/**
 * TODO:
 * - Implement rowing keyboard nav
 * - Focusgroup/lock
 */
export const MenuContentImpl = forwardRef<
  React.ElementRef<typeof Floating.Content>,
  MenuContentProps
>(({ children, style, onFocusOutside, ...rest }: MenuContentProps, ref) => {
  const context = useMenuContext();
  const _ref = useRef<HTMLDivElement>(null);

  const composedRefs = useMergeRefs(ref, _ref);

  /* https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L435 */
  return (
    <DismissableLayer
      asChild
      disableOutsidePointerEvents={context.open}
      /* TODO: Fix support for custom types */
      onFocusOutside={composeEventHandlers<any>(
        onFocusOutside,
        (event) => event.preventDefault(),
        { checkForDefaultPrevented: false },
      )}
      onDismiss={() => context.onOpenChange(false)}
    >
      <Floating.Content
        role="menu"
        aria-orientation="vertical"
        data-state={context.open ? "open" : "closed"}
        {...rest}
        ref={composedRefs}
        style={{ outline: "none", ...style }}
        /* onKeyDown={composeEventHandlers(contentProps.onKeyDown, (event) => {
        // submenu key events bubble through portals. We only care about keys in this menu.
        const target = event.target as HTMLElement;
        const isKeyDownInside =
          target.closest("[data-radix-menu-content]") === event.currentTarget;
        const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
        const isCharacterKey = event.key.length === 1;
        if (isKeyDownInside) {
          // menus should not be navigated using tab key so we prevent it
          if (event.key === "Tab") event.preventDefault();
          if (!isModifierKey && isCharacterKey)
            handleTypeaheadSearch(event.key);
        }
        // focus first/last item based on key pressed
        const content = contentRef.current;
        if (event.target !== content) return;
        if (!FIRST_LAST_KEYS.includes(event.key)) return;
        event.preventDefault();
        const items = getItems().filter((item) => !item.disabled);
        const candidateNodes = items.map((item) => item.ref.current!);
        if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
        focusFirst(candidateNodes);
      })} */
        /* onBlur={composeEventHandlers(props.onBlur, (event) => {
        // clear search buffer when leaving the menu
        if (!event.currentTarget.contains(event.target)) {
          window.clearTimeout(timerRef.current);
          searchRef.current = "";
        }
      })} */
        /* onPointerMove={composeEventHandlers(
        props.onPointerMove,
        whenMouse((event) => {
          const target = event.target as HTMLElement;
          const pointerXHasChanged = lastPointerXRef.current !== event.clientX;

          // We don't use `event.movementX` for this check because Safari will
          // always return `0` on a pointer event.
          if (event.currentTarget.contains(target) && pointerXHasChanged) {
            const newDir =
              event.clientX > lastPointerXRef.current ? "right" : "left";
            pointerDirRef.current = newDir;
            lastPointerXRef.current = event.clientX;
          }
        }),
      )} */
      >
        {children}
      </Floating.Content>
    </DismissableLayer>
  );
});

/**
 * SubTrigger
 */
interface MenuSubTriggerProps {
  children: React.ReactNode;
}

export const MenuSubTrigger = ({ children }: MenuSubTriggerProps) => {
  return <div>{children}</div>;
};

/**
 * SubContent
 */
interface MenuSubContentProps {
  children: React.ReactNode;
}

export const MenuSubContent = ({ children }: MenuSubContentProps) => {
  return <div>{children}</div>;
};

/**
 * Divider
 */
interface MenuDividerProps {
  children: React.ReactNode;
}

export const MenuDivider = ({ children }: MenuDividerProps) => {
  return <div>{children}</div>;
};

/**
 * Group
 */
interface MenuGroupProps {
  children: React.ReactNode;
}

export const MenuGroup = ({ children }: MenuGroupProps) => {
  return <div>{children}</div>;
};

/**
 * Label
 */
interface MenuLabelProps {
  children: React.ReactNode;
}

export const MenuLabel = ({ children }: MenuLabelProps) => {
  return <div>{children}</div>;
};

/**
 * Item
 */
interface MenuItemProps {
  children: React.ReactNode;
}

export const MenuItem = ({ children }: MenuItemProps) => {
  return <div>{children}</div>;
};

/**
 * RadioGroup
 */
interface MenuRadioGroupProps {
  children: React.ReactNode;
}

export const MenuRadioGroup = ({ children }: MenuRadioGroupProps) => {
  return <div>{children}</div>;
};

/**
 * Radio
 */
interface MenuRadioProps {
  children: React.ReactNode;
}

export const MenuRadio = ({ children }: MenuRadioProps) => {
  return <div>{children}</div>;
};

/**
 * Checkbox
 */
interface MenuCheckboxProps {
  children: React.ReactNode;
}

export const MenuCheckbox = ({ children }: MenuCheckboxProps) => {
  return <div>{children}</div>;
};

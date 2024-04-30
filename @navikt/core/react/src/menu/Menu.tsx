import React from "react";
import ReactDOM from "react-dom";
import DismissableLayer from "../overlay/dismiss/DismissableLayer";
import { Floating } from "../overlays/floating/Floating";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { createContext } from "../util/create-context";
import { useCallbackRef, useId, useMergeRefs } from "../util/hooks";
import {
  MenuDescendantsProvider,
  MenuProvider,
  MenuRootProvider,
  useMenuContext,
  useMenuDescendant,
  useMenuDescendants,
  useMenuDescendantsContext,
  useMenuRootContext,
} from "./Menu.context";
import type { CheckedState, GraceIntent, SubMenuSide } from "./Menu.types";
import {
  getCheckedState,
  getOpenState,
  isIndeterminate,
  isPointerInGraceArea,
  whenMouse,
} from "./Menu.utils";
import { RowingFocus, RowingFocusProps } from "./RowingFocus";

/* import { useFocusGuards } from "./FocusGuards"; */
import { FocusScope } from "./parts/FocusScope";
import { MenuAnchor, MenuAnchorProps } from "./parts/Menu.Anchor";
import { MenuGroup, MenuGroupProps } from "./parts/Menu.Group";
import { MenuPortal, MenuPortalProps } from "./parts/Menu.Portal";
import {
  SlottedDivElement,
  type SlottedDivElementRef,
  type SlottedDivProps,
} from "./parts/SlottedDivElement";

const SELECTION_KEYS = ["Enter", " "];
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
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

  const [content, setContent] = React.useState<MenuContentElement | null>(null);
  const isUsingKeyboardRef = React.useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);

  React.useEffect(() => {
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
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = "MenuContent";

type MenuContentContextValue = {
  onItemEnter(event: React.PointerEvent): void;
  onItemLeave(event: React.PointerEvent): void;
  onTriggerLeave(event: React.PointerEvent): void;
  pointerGraceTimerRef: React.MutableRefObject<number>;
  onPointerGraceIntentChange(intent: GraceIntent | null): void;
};

const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>({
    providerName: "MenuContentProvider",
    hookName: "useMenuContentContext",
  });

type MenuContentElement = MenuRootContentTypeElement;
/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
interface MenuContentProps extends MenuRootContentTypeProps {}

const MenuContent = React.forwardRef<MenuContentElement, MenuContentProps>(
  (props: MenuContentProps, forwardedRef) => {
    const { ...contentProps } = props;

    const descendants = useMenuDescendants();

    const rootContext = useMenuRootContext();

    return (
      <MenuDescendantsProvider value={descendants}>
        {rootContext.modal ? (
          <MenuRootContentModal {...contentProps} ref={forwardedRef} />
        ) : (
          <MenuRootContentNonModal {...contentProps} ref={forwardedRef} />
        )}
      </MenuDescendantsProvider>
    );
  },
);

/* ---------------------------------------------------------------------------------------------- */

type MenuRootContentTypeElement = MenuContentImplElement;
interface MenuRootContentTypeProps
  extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> {}

const MenuRootContentModal = React.forwardRef<
  MenuRootContentTypeElement,
  MenuRootContentTypeProps
>((props: MenuRootContentTypeProps, forwardedRef) => {
  const context = useMenuContext();
  const ref = React.useRef<MenuRootContentTypeElement>(null);
  const composedRefs = useMergeRefs(forwardedRef, ref);

  return (
    <MenuContentImpl
      {...props}
      ref={composedRefs}
      // make sure to only disable pointer events when open
      // this avoids blocking interactions while animating out
      disableOutsidePointerEvents={context.open}
      // When focus is trapped, a `focusout` event may still happen.
      // We make sure we don't trigger our `onDismiss` in such case.
      onFocusOutside={composeEventHandlers(
        props.onFocusOutside,
        (event) => event.preventDefault(),
        { checkForDefaultPrevented: false },
      )}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

const MenuRootContentNonModal = React.forwardRef<
  MenuRootContentTypeElement,
  MenuRootContentTypeProps
>((props: MenuRootContentTypeProps, forwardedRef) => {
  const context = useMenuContext();
  return (
    <MenuContentImpl
      {...props}
      ref={forwardedRef}
      disableOutsidePointerEvents={false}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

/* ---------------------------------------------------------------------------------------------- */

type MenuContentImplElement = React.ElementRef<typeof Floating.Content>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<
  typeof DismissableLayer
>;

type PopperContentProps = React.ComponentPropsWithoutRef<
  typeof Floating.Content
>;

type MenuContentImplPrivateProps = {
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
  onDismiss?: DismissableLayerProps["onDismiss"];
  disableOutsidePointerEvents?: DismissableLayerProps["disableOutsidePointerEvents"];
};

interface MenuContentImplProps
  extends MenuContentImplPrivateProps,
    Omit<PopperContentProps, "dir" | "onPlaced"> {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
  onEntryFocus?: RowingFocusProps["onEntryFocus"];
  onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
  onPointerDownOutside?: DismissableLayerProps["onPointerDownOutside"];
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
  onInteractOutside?: DismissableLayerProps["onInteractOutside"];
}

const MenuContentImpl = React.forwardRef<
  MenuContentImplElement,
  MenuContentImplProps
>((props: MenuContentImplProps, forwardedRef) => {
  const {
    onOpenAutoFocus,
    onCloseAutoFocus,
    disableOutsidePointerEvents,
    onEntryFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    ...contentProps
  } = props;

  const descendants = useMenuDescendantsContext();

  const context = useMenuContext();
  const rootContext = useMenuRootContext();

  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useMergeRefs(
    forwardedRef,
    contentRef,
    context.onContentChange,
  );
  const pointerGraceTimerRef = React.useRef(0);
  const pointerGraceIntentRef = React.useRef<GraceIntent | null>(null);
  const pointerDirRef = React.useRef<SubMenuSide>("right");
  const lastPointerXRef = React.useRef(0);

  // Make sure the whole tree has focus guards as our `MenuContent` may be
  // the last element in the DOM (beacuse of the `Portal`)
  /* TODO: Testing just not having guards */
  /* useFocusGuards(); */

  const isPointerMovingToSubmenu = React.useCallback(
    (event: React.PointerEvent) => {
      const isMovingTowards =
        pointerDirRef.current === pointerGraceIntentRef.current?.side;
      return (
        isMovingTowards &&
        isPointerInGraceArea(event, pointerGraceIntentRef.current?.area)
      );
    },
    [],
  );

  return (
    <MenuContentProvider
      onItemEnter={React.useCallback(
        (event) => {
          if (isPointerMovingToSubmenu(event)) event.preventDefault();
        },
        [isPointerMovingToSubmenu],
      )}
      onItemLeave={React.useCallback(
        (event) => {
          if (isPointerMovingToSubmenu(event)) return;
          contentRef.current?.focus();
        },
        [isPointerMovingToSubmenu],
      )}
      onTriggerLeave={React.useCallback(
        (event) => {
          if (isPointerMovingToSubmenu(event)) event.preventDefault();
        },
        [isPointerMovingToSubmenu],
      )}
      pointerGraceTimerRef={pointerGraceTimerRef}
      onPointerGraceIntentChange={React.useCallback((intent) => {
        pointerGraceIntentRef.current = intent;
      }, [])}
    >
      <FocusScope
        asChild
        onMountAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) => {
          // when opening, explicitly focus the content area only and leave
          // `onEntryFocus` in  control of focusing first item
          event.preventDefault();

          console.log("onMountuatoFocus", contentRef.current);
          contentRef.current?.focus({ preventScroll: true });
        })}
        onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={onDismiss}
        >
          <RowingFocus
            asChild
            descendants={descendants}
            onEntryFocus={composeEventHandlers(onEntryFocus, (event) => {
              /* console.log("called entryfocus"); */
              // only focus first item when using keyboard
              if (!rootContext.isUsingKeyboardRef.current)
                event.preventDefault();
              /* console.log("prevent entryFocus"); */
            })}
          >
            <Floating.Content
              role="menu"
              aria-orientation="vertical"
              data-state={getOpenState(context.open)}
              data-radix-menu-content=""
              dir="ltr"
              {...contentProps}
              ref={composedRefs}
              style={{ outline: "none", ...contentProps.style }}
              onKeyDown={composeEventHandlers(
                contentProps.onKeyDown,
                (event) => {
                  /* console.log("content"); */
                  // submenu key events bubble through portals. We only care about keys in this menu.
                  const target = event.target as HTMLElement;
                  const isKeyDownInside =
                    target.closest("[data-radix-menu-content]") ===
                    event.currentTarget;
                  if (isKeyDownInside) {
                    // menus should not be navigated using tab key so we prevent it
                    if (event.key === "Tab") event.preventDefault();
                  }

                  // focus first/last item based on key pressed
                  const content = contentRef.current;
                  if (event.target !== content) return;
                  if (!FIRST_LAST_KEYS.includes(event.key)) return;
                  event.preventDefault();

                  console.log(descendants.values().map((x) => x.node));
                  if (LAST_KEYS.includes(event.key)) {
                    descendants.lastEnabled()?.node?.focus();
                    return;
                  }
                  console.log("firstNode", descendants.firstEnabled()?.node);
                  descendants.firstEnabled()?.node?.focus();
                },
              )}
              onPointerMove={composeEventHandlers(
                props.onPointerMove,
                whenMouse((event) => {
                  const target = event.target as HTMLElement;
                  const pointerXHasChanged =
                    lastPointerXRef.current !== event.clientX;

                  // We don't use `event.movementX` for this check because Safari will
                  // always return `0` on a pointer event.
                  if (
                    event.currentTarget.contains(target) &&
                    pointerXHasChanged
                  ) {
                    const newDir =
                      event.clientX > lastPointerXRef.current
                        ? "right"
                        : "left";
                    pointerDirRef.current = newDir;
                    lastPointerXRef.current = event.clientX;
                  }
                }),
              )}
            />
          </RowingFocus>
        </DismissableLayer>
      </FocusScope>
    </MenuContentProvider>
  );
});

MenuContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuLabel
 * -----------------------------------------------------------------------------------------------*/

const LABEL_NAME = "MenuLabel";

type MenuLabelElement = SlottedDivElementRef;
interface MenuLabelProps extends SlottedDivProps {}

const MenuLabel = React.forwardRef<MenuLabelElement, MenuLabelProps>(
  (props: MenuLabelProps, forwardedRef) => {
    const { ...labelProps } = props;
    return <SlottedDivElement {...labelProps} ref={forwardedRef} />;
  },
);

MenuLabel.displayName = LABEL_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuItem
 * -----------------------------------------------------------------------------------------------*/

const ITEM_NAME = "MenuItem";
const ITEM_SELECT = "menu.itemSelect";

type MenuItemElement = MenuItemImplElement;
interface MenuItemProps extends Omit<MenuItemImplProps, "onSelect"> {
  onSelect?: (event: Event) => void;
}

const MenuItem = React.forwardRef<MenuItemElement, MenuItemProps>(
  (props: MenuItemProps, forwardedRef) => {
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = React.useRef<HTMLDivElement>(null);
    const rootContext = useMenuRootContext();
    const composedRefs = useMergeRefs(forwardedRef, ref);
    const isPointerDownRef = React.useRef(false);

    const handleSelect = () => {
      const menuItem = ref.current;
      if (!disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
          bubbles: true,
          cancelable: true,
        });
        menuItem.addEventListener(ITEM_SELECT, (event) => onSelect?.(event), {
          once: true,
        });
        /* dispatchDiscreteCustomEvent */
        ReactDOM.flushSync(() => menuItem.dispatchEvent(itemSelectEvent));
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      }
    };

    return (
      <MenuItemImpl
        {...itemProps}
        /* TODO: Should this be handled by consumer? */
        tabIndex={disabled ? -1 : 0}
        ref={composedRefs}
        disabled={disabled}
        onClick={composeEventHandlers(props.onClick, handleSelect)}
        onPointerDown={(event) => {
          props.onPointerDown?.(event);
          isPointerDownRef.current = true;
        }}
        onPointerUp={composeEventHandlers(props.onPointerUp, (event) => {
          // Pointer down can move to a different menu item which should activate it on pointer up.
          // We dispatch a click for selection to allow composition with click based triggers and to
          // prevent Firefox from getting stuck in text selection mode when the menu closes.
          if (!isPointerDownRef.current) event.currentTarget?.click();
        })}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          if (disabled) {
            return;
          }
          if (SELECTION_KEYS.includes(event.key)) {
            event.currentTarget.click();
            /**
             * We prevent default browser behaviour for selection keys as they should trigger
             * a selection only:
             * - prevents space from scrolling the page.
             * - if keydown causes focus to move, prevents keydown from firing on the new target.
             */
            event.preventDefault();
          }
        })}
      />
    );
  },
);

MenuItem.displayName = ITEM_NAME;

/* ---------------------------------------------------------------------------------------------- */

type MenuItemImplElement = SlottedDivElementRef;
interface MenuItemImplProps extends SlottedDivProps {
  disabled?: boolean;
}

const MenuItemImpl = React.forwardRef<MenuItemImplElement, MenuItemImplProps>(
  (props: MenuItemImplProps, forwardedRef) => {
    const { disabled = false, ...itemProps } = props;

    const { register } = useMenuDescendant({ disabled });

    const contentContext = useMenuContentContext();
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(forwardedRef, ref, register);
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <SlottedDivElement
        role="menuitem"
        data-highlighted={isFocused ? "" : undefined}
        aria-disabled={disabled || undefined}
        data-disabled={disabled ? "" : undefined}
        /* TODO: Only for testing */
        tabIndex={-1}
        {...itemProps}
        ref={composedRefs}
        /**
         * We focus items on `pointerMove` to achieve the following:
         *
         * - Mouse over an item (it focuses)
         * - Leave mouse where it is and use keyboard to focus a different item
         * - Wiggle mouse without it leaving previously focused item
         * - Previously focused item should re-focus
         *
         * If we used `mouseOver`/`mouseEnter` it would not re-focus when the mouse
         * wiggles. This is to match native menu implementation.
         */
        onPointerMove={composeEventHandlers(
          props.onPointerMove,
          whenMouse((event) => {
            if (disabled) {
              contentContext.onItemLeave(event);
            } else {
              contentContext.onItemEnter(event);
              if (!event.defaultPrevented) {
                const item = event.currentTarget;
                item.focus();
              }
            }
          }),
        )}
        onPointerLeave={composeEventHandlers(
          props.onPointerLeave,
          whenMouse((event) => contentContext.onItemLeave(event)),
        )}
        onFocus={composeEventHandlers(props.onFocus, () => {
          setIsFocused(true);
        })}
        onBlur={composeEventHandlers(props.onBlur, () => setIsFocused(false))}
      />
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * MenuCheckboxItem
 * -----------------------------------------------------------------------------------------------*/

const CHECKBOX_ITEM_NAME = "MenuCheckboxItem";

type MenuCheckboxItemElement = MenuItemElement;

interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: CheckedState;
  // `onCheckedChange` can never be called with `"indeterminate"` from the inside
  onCheckedChange?: (checked: boolean) => void;
}

const MenuCheckboxItem = React.forwardRef<
  MenuCheckboxItemElement,
  MenuCheckboxItemProps
>((props: MenuCheckboxItemProps, forwardedRef) => {
  const { checked = false, onCheckedChange, ...checkboxItemProps } = props;

  /* TODO: removed indicator warpper, fix sideeffects */
  return (
    <MenuItem
      role="menuitemcheckbox"
      aria-checked={isIndeterminate(checked) ? "mixed" : checked}
      {...checkboxItemProps}
      ref={forwardedRef}
      data-state={getCheckedState(checked)}
      onSelect={composeEventHandlers(
        checkboxItemProps.onSelect,
        () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
        { checkForDefaultPrevented: false },
      )}
    />
  );
});

MenuCheckboxItem.displayName = CHECKBOX_ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuRadioGroup
 * -----------------------------------------------------------------------------------------------*/

const RADIO_GROUP_NAME = "MenuRadioGroup";

const [RadioGroupProvider, useRadioGroupContext] =
  createContext<MenuRadioGroupProps>({
    providerName: "MenuRadioGroupProvider",
    hookName: "useRadioGroupContext",
    defaultValue: {
      value: undefined,
      onValueChange: () => {},
    },
  });

type MenuRadioGroupElement = React.ElementRef<typeof MenuGroup>;
interface MenuRadioGroupProps extends MenuGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

const MenuRadioGroup = React.forwardRef<
  MenuRadioGroupElement,
  MenuRadioGroupProps
>((props: MenuRadioGroupProps, forwardedRef) => {
  const { value, onValueChange, ...groupProps } = props;
  const handleValueChange = useCallbackRef(onValueChange);
  return (
    <RadioGroupProvider value={value} onValueChange={handleValueChange}>
      <MenuGroup {...groupProps} ref={forwardedRef} />
    </RadioGroupProvider>
  );
});

MenuRadioGroup.displayName = RADIO_GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuRadioItem
 * -----------------------------------------------------------------------------------------------*/

const RADIO_ITEM_NAME = "MenuRadioItem";

type MenuRadioItemElement = React.ElementRef<typeof MenuItem>;
interface MenuRadioItemProps extends MenuItemProps {
  value: string;
}

const MenuRadioItem = React.forwardRef<
  MenuRadioItemElement,
  MenuRadioItemProps
>((props: MenuRadioItemProps, forwardedRef) => {
  const { value, ...radioItemProps } = props;
  const context = useRadioGroupContext();
  const checked = value === context.value;

  /* TODO: removed indicator warpper, fix sideeffects */

  return (
    <MenuItem
      role="menuitemradio"
      aria-checked={checked}
      {...radioItemProps}
      ref={forwardedRef}
      data-state={getCheckedState(checked)}
      onSelect={composeEventHandlers(
        radioItemProps.onSelect,
        () => context.onValueChange?.(value),
        { checkForDefaultPrevented: false },
      )}
    />
  );
});

MenuRadioItem.displayName = RADIO_ITEM_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuSeparator
 * -----------------------------------------------------------------------------------------------*/

const SEPARATOR_NAME = "MenuSeparator";

type MenuSeparatorElement = SlottedDivElementRef;
interface MenuSeparatorProps extends SlottedDivProps {}

const MenuSeparator = React.forwardRef<
  MenuSeparatorElement,
  MenuSeparatorProps
>((props: MenuSeparatorProps, forwardedRef) => {
  const { ...separatorProps } = props;
  return (
    <SlottedDivElement
      role="separator"
      aria-orientation="horizontal"
      {...separatorProps}
      ref={forwardedRef}
    />
  );
});

MenuSeparator.displayName = SEPARATOR_NAME;

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

type MenuSubTriggerElement = MenuItemImplElement;
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

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { DismissableLayer } from "../overlay/dismiss/DismissableLayer";
import { Floating } from "../overlays/floating/Floating";
import { Portal } from "../portal";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { createContext } from "../util/create-context";
import { useCallbackRef, useId, useMergeRefs } from "../util/hooks";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { FocusScope } from "./parts/FocusScope";
import { RowingFocus, RowingFocusProps } from "./parts/RowingFocus";
import {
  SlottedDivElement,
  SlottedDivElementRef,
  SlottedDivProps,
} from "./parts/SlottedDivElement";

/**
 * Constants
 */
const SELECTION_KEYS = ["Enter", " "];
const SUB_OPEN_KEYS = [...SELECTION_KEYS, "ArrowRight"];
const SUB_CLOSE_KEYS = ["ArrowLeft"];
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

export type Point = { x: number; y: number };
export type Polygon = Point[];
export type SubMenuSide = "left" | "right";
export type GraceIntent = { area: Polygon; side: SubMenuSide };

export type CheckedState = boolean | "indeterminate";

export type MenuContentElementRef = React.ElementRef<typeof Floating.Content>;

/**
 * Menu
 */
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

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<SlottedDivElementRef>();

type MenuContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
  content: MenuContentElementRef | null;
  onContentChange(content: MenuContentElementRef | null): void;
};

const [MenuProvider, useMenuContext] = createContext<MenuContextValue>({
  providerName: "MenuProvider",
  hookName: "useMenuContext",
});

type MenuRootContextValue = {
  onClose(): void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  modal: boolean;
};

const [MenuRootProvider, useMenuRootContext] =
  createContext<MenuRootContextValue>({
    providerName: "MenuRootProvider",
    hookName: "useMenuRootContext",
  });

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

/**
 * Anchor
 */
type MenuAnchorElement = React.ElementRef<typeof Floating.Anchor>;
type MenuAnchorBaseProps = React.ComponentPropsWithoutRef<
  typeof Floating.Anchor
>;

type MenuAnchorProps = MenuAnchorBaseProps;

const MenuAnchor = forwardRef<MenuAnchorElement, MenuAnchorProps>(
  (props: MenuAnchorProps, forwardedRef) => {
    return <Floating.Anchor {...props} ref={forwardedRef} />;
  },
);

export { MenuAnchor };

/**
 * Content
 */
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

/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
type MenuContentElement = MenuContentImplElement;
interface MenuContentProps extends MenuContentImplTypeProps {}

const MenuContent = React.forwardRef<MenuContentImplElement, MenuContentProps>(
  (props: MenuContentProps, ref) => {
    const descendants = useMenuDescendants();
    const rootContext = useMenuRootContext();

    return (
      <MenuDescendantsProvider value={descendants}>
        {rootContext.modal ? (
          <MenuRootContentModal {...props} ref={ref} />
        ) : (
          <MenuRootContentNonModal {...props} ref={ref} />
        )}
      </MenuDescendantsProvider>
    );
  },
);

export { MenuContent };

/**
 * Non-modal content
 */
const MenuRootContentNonModal = React.forwardRef<
  MenuContentImplElement,
  MenuContentImplTypeProps
>((props: MenuContentImplTypeProps, ref) => {
  const context = useMenuContext();
  return (
    <MenuContentImpl
      {...props}
      ref={ref}
      disableOutsidePointerEvents={false}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

export { MenuRootContentNonModal };

/**
 * Modal content
 */
const MenuRootContentModal = forwardRef<
  MenuContentImplElement,
  MenuContentImplTypeProps
>((props: MenuContentImplTypeProps, ref) => {
  const context = useMenuContext();

  return (
    <MenuContentImpl
      {...props}
      ref={ref}
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

export { MenuRootContentModal };

/**
 * Menu content implisit
 */

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

const MenuContentImpl = forwardRef<
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

  const contentRef = useRef<HTMLDivElement>(null);
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
              // only focus first item when using keyboard
              if (!rootContext.isUsingKeyboardRef.current)
                event.preventDefault();
            })}
          >
            <Floating.Content
              role="menu"
              aria-orientation="vertical"
              data-state={getOpenState(context.open)}
              data-aksel-menu-content=""
              dir="ltr"
              {...contentProps}
              ref={composedRefs}
              style={{ outline: "none", ...contentProps.style }}
              onKeyDown={composeEventHandlers(
                contentProps.onKeyDown,
                (event) => {
                  // submenu key events bubble through portals. We only care about keys in this menu.
                  const target = event.target as HTMLElement;
                  const isKeyDownInside =
                    target.closest("[data-aksel-menu-content]") ===
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

                  if (LAST_KEYS.includes(event.key)) {
                    descendants.lastEnabled()?.node?.focus();
                    return;
                  }
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

interface MenuContentImplTypeProps
  extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> {}

export {
  MenuContentImpl,
  type MenuContentImplProps,
  type MenuContentImplElement,
  type MenuContentImplTypeProps,
  type MenuContentImplPrivateProps,
};

/**
 * Item
 */
const ITEM_SELECT_EVENT = "menu.itemSelect";

type MenuItemElement = MenuItemImplElement;

interface MenuItemProps extends Omit<MenuItemImplProps, "onSelect"> {
  onSelect?: (event: Event) => void;
}

const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(
  (
    {
      disabled = false,
      onSelect,
      onClick,
      onPointerUp,
      onPointerDown,
      onKeyDown,
      ...rest
    }: MenuItemProps,
    forwardedRef,
  ) => {
    const ref = useRef<HTMLDivElement>(null);
    const rootContext = useMenuRootContext();
    const composedRefs = useMergeRefs(forwardedRef, ref);
    const isPointerDownRef = useRef(false);

    const handleSelect = () => {
      const menuItem = ref.current;
      if (!disabled && menuItem) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT_EVENT, {
          bubbles: true,
          cancelable: true,
        });
        menuItem.addEventListener(
          ITEM_SELECT_EVENT,
          (event) => onSelect?.(event),
          {
            once: true,
          },
        );
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
        {...rest}
        /* TODO: Should this be handled by consumer? */
        tabIndex={disabled ? -1 : 0}
        ref={composedRefs}
        disabled={disabled}
        onClick={composeEventHandlers(onClick, handleSelect)}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          isPointerDownRef.current = true;
        }}
        onPointerUp={composeEventHandlers(onPointerUp, (event) => {
          // Pointer down can move to a different menu item which should activate it on pointer up.
          // We dispatch a click for selection to allow composition with click based triggers and to
          // prevent Firefox from getting stuck in text selection mode when the menu closes.
          if (!isPointerDownRef.current) event.currentTarget?.click();
        })}
        onKeyDown={composeEventHandlers(onKeyDown, (event) => {
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

export { MenuItem, type MenuItemElement };

type MenuItemImplElement = SlottedDivElementRef;

interface MenuItemImplProps extends SlottedDivProps {
  disabled?: boolean;
}

const MenuItemImpl = forwardRef<MenuItemImplElement, MenuItemImplProps>(
  (
    {
      disabled = false,
      onPointerMove,
      onPointerLeave,
      onFocus,
      onBlur,
      ...rest
    }: MenuItemImplProps,
    forwardedRef,
  ) => {
    const { register } = useMenuDescendant({ disabled });

    const contentContext = useMenuContentContext();
    const ref = useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(forwardedRef, ref, register);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <SlottedDivElement
        role="menuitem"
        data-highlighted={isFocused ? "" : undefined}
        aria-disabled={disabled || undefined}
        data-disabled={disabled ? "" : undefined}
        /* TODO: Only for testing */
        tabIndex={-1}
        {...rest}
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
          onPointerMove,
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
          onPointerLeave,
          whenMouse((event) => contentContext.onItemLeave(event)),
        )}
        onFocus={composeEventHandlers(onFocus, () => {
          setIsFocused(true);
        })}
        onBlur={composeEventHandlers(onBlur, () => setIsFocused(false))}
      />
    );
  },
);

export { MenuItemImpl, type MenuItemImplElement, type MenuItemImplProps };

/**
 * MenuGroup
 */

interface MenuGroupProps extends SlottedDivProps {}

const MenuGroup = forwardRef<SlottedDivElementRef, MenuGroupProps>(
  (props: MenuGroupProps, ref) => {
    return <SlottedDivElement role="group" {...props} ref={ref} />;
  },
);

export { MenuGroup };

/**
 * MenuLabel
 */
interface MenuLabelProps extends SlottedDivProps {}

const MenuLabel = forwardRef<SlottedDivElementRef, MenuLabelProps>(
  (props: MenuLabelProps, ref) => {
    return <SlottedDivElement {...props} ref={ref} />;
  },
);

export { MenuLabel };

/**
 * MenuPortal
 */
type PortalProps = React.ComponentPropsWithoutRef<typeof Portal>;
type MenuPortalElement = React.ElementRef<typeof Portal>;

type MenuPortalProps = PortalProps & {
  children: React.ReactElement;
};

const MenuPortal = forwardRef<MenuPortalElement, MenuPortalProps>(
  ({ children, rootElement }: MenuPortalProps, ref) => {
    const context = useMenuContext();

    if (!context.open) {
      return null;
    }

    return (
      <Portal asChild rootElement={rootElement} ref={ref}>
        {children}
      </Portal>
    );
  },
);

export { MenuPortal };

/**
 * MenuRadio
 */
const [RadioGroupProvider, useRadioGroupContext] =
  createContext<MenuRadioGroupProps>({
    providerName: "MenuRadioGroupProvider",
    hookName: "useRadioGroupContext",
    defaultValue: {
      value: undefined,
      onValueChange: () => {},
    },
  });

interface MenuRadioGroupProps extends MenuGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
}

const MenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof MenuGroup>,
  MenuRadioGroupProps
>(({ value, onValueChange, ...rest }: MenuRadioGroupProps, ref) => {
  const handleValueChange = useCallbackRef(onValueChange);
  return (
    <RadioGroupProvider value={value} onValueChange={handleValueChange}>
      <MenuGroup {...rest} ref={ref} />
    </RadioGroupProvider>
  );
});

export { MenuRadioGroup };

/**
 * MenuRadio
 */
interface MenuRadioItemProps extends MenuItemProps {
  value: string;
}

const MenuRadioItem = forwardRef<
  React.ElementRef<typeof MenuItem>,
  MenuRadioItemProps
>(({ value, onSelect, ...rest }: MenuRadioItemProps, forwardedRef) => {
  const context = useRadioGroupContext();
  const checked = value === context.value;

  /* TODO: removed indicator warpper, fix sideeffects */

  return (
    <MenuItem
      role="menuitemradio"
      aria-checked={checked}
      {...rest}
      ref={forwardedRef}
      data-state={getCheckedState(checked)}
      onSelect={composeEventHandlers(
        onSelect,
        () => context.onValueChange?.(value),
        { checkForDefaultPrevented: false },
      )}
    />
  );
});

export { MenuRadioItem };

/**
 * MenuCheckbox
 */
interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: CheckedState;
  // `onCheckedChange` can never be called with `"indeterminate"` from the inside
  onCheckedChange?: (checked: boolean) => void;
}

const MenuCheckboxItem = forwardRef<MenuItemElement, MenuCheckboxItemProps>(
  (
    {
      checked = false,
      onCheckedChange,
      onSelect,
      ...rest
    }: MenuCheckboxItemProps,
    forwardedRef,
  ) => {
    /* TODO: removed indicator warpper, fix sideeffects from not automatically toggling checkmark */
    return (
      <MenuItem
        role="menuitemcheckbox"
        aria-checked={isIndeterminate(checked) ? "mixed" : checked}
        {...rest}
        ref={forwardedRef}
        data-state={getCheckedState(checked)}
        onSelect={composeEventHandlers(
          onSelect,
          () => onCheckedChange?.(isIndeterminate(checked) ? true : !checked),
          { checkForDefaultPrevented: false },
        )}
      />
    );
  },
);

export { MenuCheckboxItem };

/**
 * MenuSeparator
 */
interface MenuSeparatorProps extends SlottedDivProps {}

const MenuSeparator = forwardRef<SlottedDivElementRef, MenuSeparatorProps>(
  (props: MenuSeparatorProps, ref) => {
    return (
      <SlottedDivElement
        role="separator"
        aria-orientation="horizontal"
        {...props}
        ref={ref}
      />
    );
  },
);

export { MenuSeparator };

/**
 * SubMenu
 */
type MenuSubContextValue = {
  contentId: string;
  triggerId: string;
  trigger: MenuItemElement | null;
  onTriggerChange(trigger: MenuItemElement | null): void;
};

export const [MenuSubProvider, useMenuSubContext] =
  createContext<MenuSubContextValue>({
    providerName: "MenuSubProvider",
    hookName: "useMenuSubContext",
  });

interface MenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MenuSub: React.FC<MenuSubProps> = ({
  children,
  onOpenChange,
  open = false,
}: MenuSubProps) => {
  const parentMenuContext = useMenuContext();

  const [trigger, setTrigger] = useState<MenuItemElement | null>(null);
  const [content, setContent] = useState<MenuContentImplElement | null>(null);
  const handleOpenChange = useCallbackRef(onOpenChange);

  // Prevent the parent menu from reopening with open submenus.
  useEffect(() => {
    if (parentMenuContext.open === false) {
      handleOpenChange(false);
    }
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

export { MenuSub };

/**
 * SubMenuTrigger
 */
interface MenuSubTriggerProps extends MenuItemImplProps {}

const MenuSubTrigger = forwardRef<MenuItemElement, MenuSubTriggerProps>(
  (props: MenuSubTriggerProps, forwardedRef) => {
    const context = useMenuContext();
    const subContext = useMenuSubContext();
    const contentContext = useMenuContentContext();
    const openTimerRef = useRef<number | null>(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;

    const composedRefs = useMergeRefs(forwardedRef, subContext.onTriggerChange);

    const clearOpenTimer = useCallback(() => {
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
                const contentNearEdge =
                  contentRect[rightSide ? "left" : "right"];
                const contentFarEdge =
                  contentRect[rightSide ? "right" : "left"];

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
              // prevent window from scrolling
              event.preventDefault();
            }
          })}
        />
      </MenuAnchor>
    );
  },
);

export { MenuSubTrigger };

/**
 * SubMenuContent
 */
interface MenuSubContentProps
  extends Omit<
    MenuContentImplProps,
    | keyof MenuContentImplPrivateProps
    | "onCloseAutoFocus"
    | "onEntryFocus"
    | "side"
    | "align"
  > {}

const MenuSubContent = forwardRef<MenuContentImplElement, MenuSubContentProps>(
  (props: MenuSubContentProps, forwardedRef) => {
    const descendants = useMenuDescendants();

    const { ...subContentProps } = props;
    const context = useMenuContext();
    const rootContext = useMenuRootContext();
    const subContext = useMenuSubContext();
    const ref = useRef<MenuContentImplElement>(null);
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
            }
            event.preventDefault();
          }}
          // The menu might close because of focusing another menu item in the parent menu. We
          // don't want it to refocus the trigger in that case so we handle trigger focus ourselves.
          onCloseAutoFocus={(event) => event.preventDefault()}
          onFocusOutside={composeEventHandlers(
            props.onFocusOutside,
            (event) => {
              // We prevent closing when the trigger is focused to avoid triggering a re-open animation
              // on pointer interaction.
              if (event.target !== subContext.trigger)
                context.onOpenChange(false);
            },
          )}
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
  },
);

export { MenuSubContent };

/**
 * Utilities
 */
function getOpenState(open: boolean) {
  return open ? "open" : "closed";
}

function isIndeterminate(checked?: CheckedState): checked is "indeterminate" {
  return checked === "indeterminate";
}

function getCheckedState(checked: CheckedState) {
  return isIndeterminate(checked)
    ? "indeterminate"
    : checked
      ? "checked"
      : "unchecked";
}

/**
 * Determine if a point is inside of a polygon.
 */
function isPointInPolygon(point: Point, polygon: Polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    // prettier-ignore
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

function isPointerInGraceArea(event: React.PointerEvent, area?: Polygon) {
  if (!area) return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}

function whenMouse<E>(
  handler: React.PointerEventHandler<E>,
): React.PointerEventHandler<E> {
  return (event) =>
    event.pointerType === "mouse" ? handler(event) : undefined;
}

/* Definitions */

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

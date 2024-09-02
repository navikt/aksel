import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { Portal } from "../../portal";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useCallbackRef, useId, useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { DismissableLayer } from "../dismissablelayer/DismissableLayer";
import { Floating } from "../floating/Floating";
import { FocusScope } from "./parts/FocusScope";
import { RovingFocus, RovingFocusProps } from "./parts/RovingFocus";
import {
  SlottedDivElement,
  SlottedDivElementRef,
  SlottedDivProps,
} from "./parts/SlottedDivElement";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */
const SELECTION_KEYS = ["Enter", " "];
const SUB_OPEN_KEYS = [...SELECTION_KEYS, "ArrowRight"];
const SUB_CLOSE_KEYS = ["ArrowLeft"];
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

type Point = { x: number; y: number };
type Polygon = Point[];
type SubMenuSide = "left" | "right";
type GraceIntent = { area: Polygon; side: SubMenuSide };
type CheckedState = boolean | "indeterminate";

/* -------------------------------------------------------------------------- */
/*                                    Menu                                    */
/* -------------------------------------------------------------------------- */
interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

interface MenuComponent extends React.FC<MenuProps> {
  Anchor: typeof MenuAnchor;
  Portal: typeof MenuPortal;
  Content: typeof MenuContent;
  Group: typeof MenuGroup;
  Item: typeof MenuItem;
  CheckboxItem: typeof MenuCheckboxItem;
  RadioGroup: typeof MenuRadioGroup;
  RadioItem: typeof MenuRadioItem;
  Divider: typeof MenuDivider;
  Sub: typeof MenuSub;
  SubTrigger: typeof MenuSubTrigger;
  SubContent: typeof MenuSubContent;
  ItemIndicator: typeof MenuItemIndicator;
}

const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<SlottedDivElementRef>();

type MenuContentElementRef = React.ElementRef<typeof Floating.Content>;

type MenuContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: MenuContentElementRef | null;
  onContentChange: (content: MenuContentElementRef | null) => void;
};

const [MenuProvider, useMenuContext] = createContext<MenuContextValue>({
  providerName: "MenuProvider",
  hookName: "useMenuContext",
});

type MenuRootContextValue = {
  onClose: () => void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  modal: boolean;
};

const [MenuRootProvider, useMenuRootContext] =
  createContext<MenuRootContextValue>({
    providerName: "MenuRootProvider",
    hookName: "useMenuRootContext",
  });

const MenuRoot = ({
  open = false,
  children,
  onOpenChange,
  modal = true,
}: MenuProps) => {
  const [content, setContent] = useState<MenuContentElement | null>(null);
  const isUsingKeyboardRef = useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);

  useEffect(() => {
    const globalDocument = globalThis.document;
    // Capturephase ensures we set the boolean before any side effects execute
    // in response to the key or pointer event as they might depend on this value.
    const handlePointer = () => {
      isUsingKeyboardRef.current = false;
    };
    const handleKeyDown = () => {
      isUsingKeyboardRef.current = true;
      globalDocument.addEventListener("pointerdown", handlePointer, {
        capture: true,
        once: true,
      });
      globalDocument.addEventListener("pointermove", handlePointer, {
        capture: true,
        once: true,
      });
    };
    globalDocument.addEventListener("keydown", handleKeyDown, {
      capture: true,
    });
    return () => {
      globalDocument.removeEventListener("keydown", handleKeyDown, {
        capture: true,
      });
      globalDocument.removeEventListener("pointerdown", handlePointer, {
        capture: true,
      });
      globalDocument.removeEventListener("pointermove", handlePointer, {
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

/* -------------------------------------------------------------------------- */
/*                                 Menu Anchor                                */
/* -------------------------------------------------------------------------- */
type MenuAnchorElement = React.ElementRef<typeof Floating.Anchor>;
type MenuAnchorProps = React.ComponentPropsWithoutRef<typeof Floating.Anchor>;

const MenuAnchor = forwardRef<MenuAnchorElement, MenuAnchorProps>(
  (props: MenuAnchorProps, forwardedRef) => {
    return <Floating.Anchor {...props} ref={forwardedRef} />;
  },
);

/* -------------------------------------------------------------------------- */
/*                                Menu Content                                */
/* -------------------------------------------------------------------------- */
type MenuContentContextValue = {
  onItemEnter: (event: React.PointerEvent) => void;
  onItemLeave: (event: React.PointerEvent) => void;
  onPointerLeaveTrigger: (event: React.PointerEvent) => void;
  pointerGraceTimerRef: React.MutableRefObject<number>;
  onPointerGraceIntentChange: (intent: GraceIntent | null) => void;
};

const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>({
    providerName: "MenuContentProvider",
    hookName: "useMenuContentContext",
  });

type MenuContentElement = MenuContentInternalElement;
interface MenuContentProps extends MenuContentInternalTypeProps {}

const MenuContent = React.forwardRef<
  MenuContentInternalElement,
  MenuContentProps
>((props: MenuContentProps, ref) => {
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
});

/* ---------------------------- Non-modal content --------------------------- */
const MenuRootContentNonModal = React.forwardRef<
  MenuContentInternalElement,
  MenuContentInternalTypeProps
>((props: MenuContentInternalTypeProps, ref) => {
  const context = useMenuContext();
  return (
    <MenuContentInternal
      {...props}
      ref={ref}
      disableOutsidePointerEvents={false}
      onDismiss={() => context.onOpenChange(false)}
    />
  );
});

/* ------------------------------ Modal content ----------------------------- */
const MenuRootContentModal = forwardRef<
  MenuContentInternalElement,
  MenuContentInternalTypeProps
>((props: MenuContentInternalTypeProps, ref) => {
  const context = useMenuContext();

  return (
    <MenuContentInternal
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

/* -------------------------- Menu content internals ------------------------- */
type MenuContentInternalElement = React.ElementRef<typeof Floating.Content>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<
  typeof DismissableLayer
>;

type MenuContentInternalPrivateProps = {
  onOpenAutoFocus?: FocusScopeProps["onMountHandler"];
  onDismiss?: DismissableLayerProps["onDismiss"];
  disableOutsidePointerEvents?: DismissableLayerProps["disableOutsidePointerEvents"];
};

interface MenuContentInternalProps
  extends MenuContentInternalPrivateProps,
    Omit<
      React.ComponentPropsWithoutRef<typeof Floating.Content>,
      "dir" | "onPlaced"
    > {
  /**
   * Event handler called when auto-focusing after close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountHandler"];
  onEntryFocus?: RovingFocusProps["onEntryFocus"];
  onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
  onPointerDownOutside?: DismissableLayerProps["onPointerDownOutside"];
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
  onInteractOutside?: DismissableLayerProps["onInteractOutside"];
}

const MenuContentInternal = forwardRef<
  MenuContentInternalElement,
  MenuContentInternalProps
>(
  (
    {
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEntryFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...rest
    }: MenuContentInternalProps,
    forwardedRef,
  ) => {
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

            /**
             * Resets focus from current active item to content area
             * This is to prevent focus from being stuck on an item when we move pointer outside the menu or onto a disabled item
             */
            contentRef.current?.focus();
          },
          [isPointerMovingToSubmenu],
        )}
        onPointerLeaveTrigger={React.useCallback(
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
          onMountHandler={composeEventHandlers(onOpenAutoFocus, (event) => {
            // when opening, explicitly focus the content area only and leave
            // `onEntryFocus` in  control of focusing first item
            event.preventDefault();
            contentRef.current?.focus({ preventScroll: true });
          })}
          onUnmountHandler={onCloseAutoFocus}
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
            <RovingFocus
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
                {...rest}
                ref={composedRefs}
                style={{ outline: "none", ...rest.style }}
                onKeyDown={composeEventHandlers(rest.onKeyDown, (event) => {
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
                })}
                onPointerMove={composeEventHandlers(
                  rest.onPointerMove,
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
            </RovingFocus>
          </DismissableLayer>
        </FocusScope>
      </MenuContentProvider>
    );
  },
);

interface MenuContentInternalTypeProps
  extends Omit<
    MenuContentInternalProps,
    keyof MenuContentInternalPrivateProps
  > {}

/* -------------------------------------------------------------------------- */
/*                                  Menu item                                 */
/* -------------------------------------------------------------------------- */
const ITEM_SELECT_EVENT = "menu.itemSelect";

type MenuItemElement = MenuItemInternalElement;

interface MenuItemProps extends Omit<MenuItemInternalProps, "onSelect"> {
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
      if (!disabled && menuItem && onSelect) {
        const itemSelectEvent = new CustomEvent(ITEM_SELECT_EVENT, {
          bubbles: true,
          cancelable: true,
        });
        menuItem.addEventListener(ITEM_SELECT_EVENT, onSelect, { once: true });

        /**
         * We flush the event synchronously to ensure that the event is dispatched before other events react to side-effect from event.
         * This is necessary to prevent the menu from potentially closing before we are able to prevent it.
         */
        ReactDOM.flushSync(() => menuItem.dispatchEvent(itemSelectEvent));
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      } else if (!disabled && menuItem) {
        rootContext.onClose();
      }
    };

    return (
      <MenuItemInternal
        {...rest}
        tabIndex={disabled ? -1 : 0}
        ref={composedRefs}
        disabled={disabled}
        onClick={composeEventHandlers(onClick, handleSelect, {
          /**
           * Nextjs prevents default on click when using Link component, so we have to force click-event
           * https://github.com/vercel/next.js/blob/77dcd4c66a35d0e8ef639bda4d05873bd3c0f52d/packages/next/src/client/link.tsx#L211
           */
          checkForDefaultPrevented: false,
        })}
        onPointerDown={composeEventHandlers(
          onPointerDown,
          () => {
            isPointerDownRef.current = true;
          },
          { checkForDefaultPrevented: false },
        )}
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
             * We prevent default browser behaviour for selection keys as they should only trigger
             * selection.
             * - Prevents space from scrolling the page.
             * - If keydown causes focus to move, prevents keydown from firing on the new target.
             */
            event.preventDefault();
          }
        })}
      />
    );
  },
);

/* --------------------------- Menu Item internals --------------------------- */
type MenuItemInternalElement = SlottedDivElementRef;

interface MenuItemInternalProps extends SlottedDivProps {
  disabled?: boolean;
}

const MenuItemInternal = forwardRef<
  MenuItemInternalElement,
  MenuItemInternalProps
>(
  (
    {
      disabled = false,
      onPointerMove,
      onPointerLeave,
      ...rest
    }: MenuItemInternalProps,
    forwardedRef,
  ) => {
    const { register } = useMenuDescendant({ disabled });

    const contentContext = useMenuContentContext();
    const ref = useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(forwardedRef, ref, register);

    return (
      <SlottedDivElement
        role="menuitem"
        aria-disabled={disabled || undefined}
        data-disabled={disabled ? "" : undefined}
        tabIndex={-1}
        {...rest}
        style={{ userSelect: "none", ...rest?.style }}
        ref={composedRefs}
        /**
         * We focus items on `pointerMove` make sure that the item is focused or re-focused
         * when the mouse wiggles. If we used `mouseOver`/`mouseEnter` it would not re-focus.
         * This is mostly to handle edgecases where the user uses mouse and keyboard together.
         */
        onPointerMove={composeEventHandlers(
          onPointerMove,
          whenMouse((event) => {
            if (disabled) {
              /**
               * In the edgecase the focus is still stuck on a previous item, we make sure to reset it
               * even when the disabled item can't be focused itself to reset it.
               */
              contentContext.onItemLeave(event);
            } else {
              contentContext.onItemEnter(event);
              if (!event.defaultPrevented) {
                event.currentTarget.focus();
              }
            }
          }),
        )}
        onPointerLeave={composeEventHandlers(
          onPointerLeave,
          whenMouse(contentContext.onItemLeave),
        )}
      />
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                  Menu Group                                 */
/* -------------------------------------------------------------------------- */
interface MenuGroupProps extends SlottedDivProps {}

const MenuGroup = forwardRef<SlottedDivElementRef, MenuGroupProps>(
  (props: MenuGroupProps, ref) => {
    return <SlottedDivElement role="group" {...props} ref={ref} />;
  },
);

/* -------------------------------------------------------------------------- */
/*                                 Menu Portal                                 */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
/*                                 Menu Radio                                 */
/* -------------------------------------------------------------------------- */
const [RadioGroupProvider, useMenuRadioGroupContext] =
  createContext<MenuRadioGroupProps>({
    providerName: "MenuRadioGroupProvider",
    hookName: "useMenuRadioGroupContext",
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

/* -------------------------------------------------------------------------- */
/*                             Menu Item Indicator                            */
/* -------------------------------------------------------------------------- */
const [MenuItemIndicatorProvider, useMenuItemIndicatorContext] = createContext<{
  state: CheckedState;
}>({
  providerName: "MenuItemIndicatorProvider",
  hookName: "useMenuItemIndicatorContext",
});

interface MenuItemIndicatorProps extends SlottedDivProps {}

const MenuItemIndicator = forwardRef<
  SlottedDivElementRef,
  MenuItemIndicatorProps
>(({ asChild, ...rest }, ref) => {
  const ctx = useMenuItemIndicatorContext();

  return (
    <SlottedDivElement
      {...rest}
      ref={ref}
      data-state={getCheckedState(ctx.state)}
      aria-hidden
      asChild={asChild}
    />
  );
});

/* -------------------------------------------------------------------------- */
/*                                 Menu Radio                                 */
/* -------------------------------------------------------------------------- */
interface MenuRadioItemProps extends MenuItemProps {
  value: string;
}

const MenuRadioItem = forwardRef<
  React.ElementRef<typeof MenuItem>,
  MenuRadioItemProps
>(({ value, onSelect, ...rest }: MenuRadioItemProps, forwardedRef) => {
  const context = useMenuRadioGroupContext();
  const checked = value === context.value;

  return (
    <MenuItemIndicatorProvider state={checked}>
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
    </MenuItemIndicatorProvider>
  );
});

/* -------------------------------------------------------------------------- */
/*                                Menu Checkbox                               */
/* -------------------------------------------------------------------------- */
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
    return (
      <MenuItemIndicatorProvider state={checked}>
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
      </MenuItemIndicatorProvider>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                               Menu Divider                               */
/* -------------------------------------------------------------------------- */
interface MenuDividerProps extends SlottedDivProps {}

const MenuDivider = forwardRef<SlottedDivElementRef, MenuDividerProps>(
  (props: MenuDividerProps, ref) => {
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

/* -------------------------------------------------------------------------- */
/*                                Menu SubMenu                                */
/* -------------------------------------------------------------------------- */
type MenuSubContextValue = {
  contentId: string;
  triggerId: string;
  trigger: MenuItemElement | null;
  onTriggerChange: (trigger: MenuItemElement | null) => void;
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
  onOpenChange?: (open: boolean) => void;
}

const MenuSub: React.FC<MenuSubProps> = ({
  children,
  onOpenChange,
  open = false,
}: MenuSubProps) => {
  const parentMenuContext = useMenuContext();

  const [trigger, setTrigger] = useState<MenuItemElement | null>(null);
  const [content, setContent] = useState<MenuContentInternalElement | null>(
    null,
  );
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

/* -------------------------------------------------------------------------- */
/*                            Menu SubMenu Trigger                            */
/* -------------------------------------------------------------------------- */
interface MenuSubTriggerProps extends MenuItemInternalProps {}

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
        <MenuItemInternal
          id={subContext.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={subContext.contentId}
          data-state={getOpenState(context.open)}
          {...props}
          ref={composedRefs}
          /**
           * onClick is added to solve edgecase where the user clicks the trigger,
           * but the focus is outside browser-window or viewport at first.
           */
          onClick={(event) => {
            props.onClick?.(event);
            if (props.disabled || event.defaultPrevented) return;

            event.currentTarget.focus();
            if (!context.open) context.onOpenChange(true);
          }}
          onPointerMove={composeEventHandlers(
            props.onPointerMove,
            whenMouse((event) => {
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
                contentContext.onPointerLeaveTrigger(event);
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

/* -------------------------------------------------------------------------- */
/*                            Menu SubMenu Content                            */
/* -------------------------------------------------------------------------- */
interface MenuSubContentProps
  extends Omit<
    MenuContentInternalProps,
    | keyof MenuContentInternalPrivateProps
    | "onCloseAutoFocus"
    | "onEntryFocus"
    | "side"
    | "align"
  > {}

const MenuSubContent = forwardRef<
  MenuContentInternalElement,
  MenuSubContentProps
>((props: MenuSubContentProps, forwardedRef) => {
  const descendants = useMenuDescendants();

  const context = useMenuContext();
  const rootContext = useMenuRootContext();
  const subContext = useMenuSubContext();
  const ref = useRef<MenuContentInternalElement>(null);
  const composedRefs = useMergeRefs(forwardedRef, ref);

  return (
    <MenuDescendantsProvider value={descendants}>
      <MenuContentInternal
        id={subContext.contentId}
        aria-labelledby={subContext.triggerId}
        {...props}
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
        onFocusOutside={composeEventHandlers(props.onFocusOutside, (event) => {
          // We prevent closing when the trigger is focused to avoid triggering a re-open animation
          // on pointer interaction.
          if (event.target !== subContext.trigger) context.onOpenChange(false);
        })}
        onEscapeKeyDown={composeEventHandlers(
          props.onEscapeKeyDown,
          (event) => {
            rootContext.onClose();
            // Ensure pressing escape in submenu doesn't escape full screen mode
            event.preventDefault();
          },
        )}
        onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
          // Submenu key events bubble through portals. We only care about keys in this menu.
          const isKeyDownInside = event.currentTarget.contains(
            event.target as HTMLElement,
          );
          let isCloseKey = SUB_CLOSE_KEYS.includes(event.key);

          /* When submenu opens to the left, we allow closing it with ArrowRight */
          if (context.content?.dataset.side === "left") {
            isCloseKey = isCloseKey || event.key === "ArrowRight";
          }

          if (isKeyDownInside && isCloseKey) {
            context.onOpenChange(false);
            // We focus manually because we prevented it in `onCloseAutoFocus`
            subContext.trigger?.focus();
            // Prevent window from scrolling
            event.preventDefault();
          }
        })}
      />
    </MenuDescendantsProvider>
  );
});

/* -------------------------------------------------------------------------- */
/*                                  Utilities                                 */
/* -------------------------------------------------------------------------- */
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

/* -------------------------------------------------------------------------- */
Menu.Anchor = MenuAnchor;
Menu.Portal = MenuPortal;
Menu.Content = MenuContent;
Menu.Group = MenuGroup;
Menu.Item = MenuItem;
Menu.CheckboxItem = MenuCheckboxItem;
Menu.RadioGroup = MenuRadioGroup;
Menu.RadioItem = MenuRadioItem;
Menu.Divider = MenuDivider;
Menu.Sub = MenuSub;
Menu.SubTrigger = MenuSubTrigger;
Menu.SubContent = MenuSubContent;
Menu.ItemIndicator = MenuItemIndicator;

export {
  Menu,
  MenuAnchor,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuItemIndicator,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuDivider,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  type MenuAnchorProps,
  type MenuCheckboxItemProps,
  type MenuContentProps,
  type MenuGroupProps,
  type MenuItemElement,
  type MenuItemIndicatorProps,
  type MenuPortalProps,
  type MenuProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuDividerProps,
  type MenuSubContentProps,
  type MenuSubProps,
  type MenuSubTriggerProps,
};

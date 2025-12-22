import React, { forwardRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Portal } from "../../portal";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createStrictContext } from "../../util/create-context";
import { FocusBoundary } from "../../util/focus-boundary/FocusBoundary";
import { useCallbackRef, useId, useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import { DismissableLayer } from "../dismissablelayer/DismissableLayer";
import { Floating } from "../floating/Floating";
import { RovingFocus, RovingFocusProps } from "./parts/RovingFocus";
import {
  SlottedDivElement,
  SlottedDivElementRef,
  SlottedDivProps,
} from "./parts/SlottedDivElement";

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

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
] = createDescendantContext<
  SlottedDivElementRef,
  {
    closeMenu: () => void;
  }
>();

type MenuContentElementRef = React.ElementRef<typeof Floating.Content>;

type MenuContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: MenuContentElementRef | null;
  onContentChange: (content: MenuContentElementRef | null) => void;
};

const [MenuProvider, useMenuContext] = createStrictContext<MenuContextValue>({
  name: "MenuContext",
});

type MenuRootContextValue = {
  onClose: () => void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  modal: boolean;
};

const [MenuRootProvider, useMenuRootContext] =
  createStrictContext<MenuRootContextValue>({
    name: "MenuRootContext",
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
type MenuContentElement = MenuContentInternalElement;
type MenuContentProps = MenuContentInternalTypeProps;

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
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusBoundary>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<
  typeof DismissableLayer
>;

type MenuContentInternalPrivateProps = {
  initialFocus?: FocusScopeProps["initialFocus"];
  onDismiss?: DismissableLayerProps["onDismiss"];
  disableOutsidePointerEvents?: DismissableLayerProps["disableOutsidePointerEvents"];
};

interface MenuContentInternalProps
  extends MenuContentInternalPrivateProps,
    Omit<
      React.ComponentPropsWithoutRef<typeof Floating.Content>,
      "dir" | "onPlaced"
    > {
  returnFocus?: FocusScopeProps["returnFocus"];
  onEntryFocus?: RovingFocusProps["onEntryFocus"];
  onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
  onPointerDownOutside?: DismissableLayerProps["onPointerDownOutside"];
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
  onInteractOutside?: DismissableLayerProps["onInteractOutside"];
  safeZone?: DismissableLayerProps["safeZone"];
}

const MenuContentInternal = forwardRef<
  MenuContentInternalElement,
  MenuContentInternalProps
>(
  (
    {
      initialFocus,
      returnFocus,
      disableOutsidePointerEvents,
      onEntryFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      safeZone,
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

    return (
      <FocusBoundary
        initialFocus={initialFocus ?? contentRef}
        returnFocus={returnFocus}
        /* Focus trapping is handled in `Floating.Content: onKeyDown */
        trapped={false}
        loop={false}
      >
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={onDismiss}
          safeZone={safeZone}
        >
          <RovingFocus
            asChild
            descendants={descendants}
            onEntryFocus={composeEventHandlers(onEntryFocus, (event) => {
              // only focus first item when using keyboard
              if (!rootContext.isUsingKeyboardRef.current) {
                event.preventDefault();
              }
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
            />
          </RovingFocus>
        </DismissableLayer>
      </FocusBoundary>
    );
  },
);

type MenuContentInternalTypeProps = Omit<
  MenuContentInternalProps,
  keyof MenuContentInternalPrivateProps
>;

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
      onKeyUp,
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

    const handleKey = (
      event: React.KeyboardEvent<HTMLDivElement>,
      key: "Enter" | " ",
    ) => {
      if (disabled || event.repeat) {
        return;
      }

      if (key === event.key) {
        event.currentTarget.click();
        /**
         * We prevent default browser behaviour for selection keys as they should only trigger
         * selection.
         * - Prevents space from scrolling the page.
         * - If keydown causes focus to move, prevents keydown from firing on the new target.
         */
        event.preventDefault();
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
        onKeyDown={composeEventHandlers(onKeyDown, (event) =>
          handleKey(event, "Enter"),
        )}
        onKeyUp={composeEventHandlers(onKeyUp, (event) =>
          handleKey(event, " "),
        )}
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
    const context = useMenuContext();
    const { register } = useMenuDescendant({
      disabled,
      closeMenu: () => {
        rest["data-submenu-trigger"] &&
          context.open &&
          context.onOpenChange(false);
      },
    });

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
              context.content?.focus();
            } else {
              event.currentTarget.focus();
            }
          }),
        )}
        onPointerLeave={composeEventHandlers(
          onPointerLeave,
          whenMouse(() => context.content?.focus()),
        )}
      />
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                  Menu Group                                 */
/* -------------------------------------------------------------------------- */
type MenuGroupProps = SlottedDivProps;

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
      <Portal rootElement={rootElement} ref={ref}>
        {children}
      </Portal>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                                 Menu Radio                                 */
/* -------------------------------------------------------------------------- */
const [RadioGroupProvider, useMenuRadioGroupContext] =
  createStrictContext<MenuRadioGroupProps>({
    name: "MenuRadioGroupContext",
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
const [MenuItemIndicatorProvider, useMenuItemIndicatorContext] =
  createStrictContext<{
    state: CheckedState;
  }>({
    name: "MenuItemIndicatorContext",
  });

type MenuItemIndicatorProps = SlottedDivProps;

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
type MenuDividerProps = SlottedDivProps;

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

const [MenuSubProvider, useMenuSubContext] =
  createStrictContext<MenuSubContextValue>({
    name: "MenuSubContext",
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

  const { values } = useMenuDescendantsContext();

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
        onOpenChange={(_open) => {
          handleOpenChange(_open);
          if (_open) {
            /* Makes sure to close all adjacent submenus if they are open */
            values().forEach((descendant) => {
              if (descendant.node !== trigger) {
                descendant.closeMenu();
              }
            });
          }
        }}
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
type MenuSubTriggerProps = MenuItemInternalProps;

const MenuSubTrigger = forwardRef<MenuItemElement, MenuSubTriggerProps>(
  (props: MenuSubTriggerProps, forwardedRef) => {
    const context = useMenuContext();
    const subContext = useMenuSubContext();

    const composedRefs = useMergeRefs(forwardedRef, subContext.onTriggerChange);

    const handleKey = (
      event: React.KeyboardEvent<HTMLDivElement>,
      keys: string[],
    ) => {
      if (props.disabled) {
        return;
      }
      if (keys.includes(event.key)) {
        context.onOpenChange(true);
        // The trigger may hold focus if opened via pointer interaction
        // so we ensure content is given focus again when switching to keyboard.
        context.content?.focus();
        // prevent window from scrolling
        event.preventDefault();
      }
    };

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
          data-submenu-trigger
          onClick={(event) => {
            if (props.disabled || event.defaultPrevented) {
              return;
            }
            props.onClick?.(event);
            /*
             * Solves edgecase where the user clicks the trigger,
             * but the focus is outside browser-window or viewport at first.
             */
            event.currentTarget.focus();
            context.onOpenChange(!context.open);
          }}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) =>
            handleKey(event, ["Enter", "ArrowRight"]),
          )}
          onKeyUp={composeEventHandlers(props.onKeyUp, (event) =>
            handleKey(event, [" "]),
          )}
        />
      </MenuAnchor>
    );
  },
);

/* -------------------------------------------------------------------------- */
/*                            Menu SubMenu Content                            */
/* -------------------------------------------------------------------------- */
type MenuSubContentProps = Omit<
  MenuContentInternalProps,
  | keyof MenuContentInternalPrivateProps
  | "onCloseAutoFocus"
  | "onEntryFocus"
  | "side"
  | "align"
>;

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
        initialFocus={() => {
          if (rootContext.isUsingKeyboardRef.current) {
            return ref.current;
          }
          return false;
        }}
        /* Since we manually focus Subtrigger, we prevent use of auto-focus */
        returnFocus={false}
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
          let isCloseKey = event.key === "ArrowLeft";

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
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemIndicator,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  type MenuAnchorProps,
  type MenuCheckboxItemProps,
  type MenuContentProps,
  type MenuDividerProps,
  type MenuGroupProps,
  type MenuItemElement,
  type MenuItemIndicatorProps,
  type MenuPortalProps,
  type MenuProps,
  type MenuRadioGroupProps,
  type MenuRadioItemProps,
  type MenuSubContentProps,
  type MenuSubProps,
  type MenuSubTriggerProps,
};

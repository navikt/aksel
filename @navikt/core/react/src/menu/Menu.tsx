import { createCollection } from "@radix-ui/react-collection";
import { createContextScope } from "@radix-ui/react-context";
import { createPopperScope } from "@radix-ui/react-popper";
import { Presence } from "@radix-ui/react-presence";
import * as RovingFocusGroup from "@radix-ui/react-roving-focus";
import { createRovingFocusGroupScope } from "@radix-ui/react-roving-focus";
import { Slot } from "@radix-ui/react-slot";
import React from "react";
import ReactDOM from "react-dom";
import DismissableLayer from "../overlay/dismiss/DismissableLayer";
import { Floating } from "../overlays/floating/Floating";
import { Portal as PortalPrimitive } from "../portal";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useCallbackRef, useId, useMergeRefs } from "../util/hooks";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { useFocusGuards } from "./FocusGuards";
import { FocusScope } from "./FocusScope";
import { RowingFocus } from "./RowingFocus";

type Direction = "ltr" | "rtl";

const SELECTION_KEYS = ["Enter", " "];
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const SUB_OPEN_KEYS: Record<Direction, string[]> = {
  ltr: [...SELECTION_KEYS, "ArrowRight"],
  rtl: [...SELECTION_KEYS, "ArrowLeft"],
};
const SUB_CLOSE_KEYS: Record<Direction, string[]> = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"],
};

/**
 * SlottedDivElement
 */

interface PrimitiveDivProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const SlottedDivElement = React.forwardRef<HTMLDivElement, PrimitiveDivProps>(
  ({ asChild, ...rest }, forwardedRef) => {
    const Comp = asChild ? Slot : "div";
    return <Comp {...rest} ref={forwardedRef} />;
  },
);

/* -------------------------------------------------------------------------------------------------
 * Menu
 * -----------------------------------------------------------------------------------------------*/

const MENU_NAME = "Menu";

type ItemData = { disabled: boolean; textValue: string };
const [Collection, useCollection, createCollectionScope] = createCollection<
  MenuItemElement,
  ItemData
>(MENU_NAME);

const [createMenuContext, createMenuScope] = createContextScope(MENU_NAME, [
  createCollectionScope,
  createPopperScope,
  createRovingFocusGroupScope,
]);

const useRovingFocusGroupScope = createRovingFocusGroupScope();

type MenuContextValue = {
  open: boolean;
  onOpenChange(open: boolean): void;
  content: MenuContentElement | null;
  onContentChange(content: MenuContentElement | null): void;
};

const [MenuProvider, useMenuContext] =
  createMenuContext<MenuContextValue>(MENU_NAME);

type MenuRootContextValue = {
  onClose(): void;
  isUsingKeyboardRef: React.RefObject<boolean>;
  modal: boolean;
};

const [MenuRootProvider, useMenuRootContext] =
  createMenuContext<MenuRootContextValue>(MENU_NAME);

interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
  modal?: boolean;
}

const Menu: React.FC<MenuProps> = (props: MenuProps) => {
  const { open = false, children, onOpenChange, modal = true } = props;

  const [content, setContent] = React.useState<MenuContentElement | null>(null);
  const isUsingKeyboardRef = React.useRef(false);
  const handleOpenChange = useCallbackRef(onOpenChange);
  const direction = "ltr";

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
          dir={direction}
          modal={modal}
        >
          {children}
        </MenuRootProvider>
      </MenuProvider>
    </Floating>
  );
};

Menu.displayName = MENU_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuAnchor
 * -----------------------------------------------------------------------------------------------*/

const ANCHOR_NAME = "MenuAnchor";

type MenuAnchorElement = React.ElementRef<typeof Floating.Anchor>;
type PopperAnchorProps = React.ComponentPropsWithoutRef<typeof Floating.Anchor>;
interface MenuAnchorProps extends PopperAnchorProps {}

const MenuAnchor = React.forwardRef<MenuAnchorElement, MenuAnchorProps>(
  (props: MenuAnchorProps, forwardedRef) => {
    const { ...anchorProps } = props;

    return <Floating.Anchor {...anchorProps} ref={forwardedRef} />;
  },
);

MenuAnchor.displayName = ANCHOR_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuPortal
 * -----------------------------------------------------------------------------------------------*/

type PortalProps = React.ComponentPropsWithoutRef<typeof PortalPrimitive>;
type MenuPortalProps = PortalProps & {
  children: React.ReactElement;
};

const MenuPortal: React.FC<MenuPortalProps> = (props: MenuPortalProps) => {
  const { children, rootElement } = props;
  const context = useMenuContext();
  return (
    <>
      {context.open && (
        <PortalPrimitive asChild rootElement={rootElement}>
          {children}
        </PortalPrimitive>
      )}
    </>
  );
};

/* -------------------------------------------------------------------------------------------------
 * MenuContent
 * -----------------------------------------------------------------------------------------------*/

const CONTENT_NAME = "MenuContent";

type MenuContentContextValue = {
  onItemEnter(event: React.PointerEvent): void;
  onItemLeave(event: React.PointerEvent): void;
  onTriggerLeave(event: React.PointerEvent): void;
  searchRef: React.RefObject<string>;
  pointerGraceTimerRef: React.MutableRefObject<number>;
  onPointerGraceIntentChange(intent: GraceIntent | null): void;
};
const [MenuContentProvider, useMenuContentContext] =
  createMenuContext<MenuContentContextValue>(CONTENT_NAME);

export const [
  MenuDescendantsProvider,
  useMenuDescendantsContext,
  useMenuDescendants,
  useMenuDescendant,
] = createDescendantContext<MenuItemElement>();

type MenuContentElement = MenuRootContentTypeElement;
/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
interface MenuContentProps extends MenuRootContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const MenuContent = React.forwardRef<MenuContentElement, MenuContentProps>(
  (props: MenuContentProps, forwardedRef) => {
    const { forceMount = false, ...contentProps } = props;

    const descendants = useMenuDescendants();

    const context = useMenuContext(CONTENT_NAME);
    const rootContext = useMenuRootContext(CONTENT_NAME);

    return (
      <MenuDescendantsProvider value={descendants}>
        <Collection.Provider>
          <Presence present={forceMount || context.open}>
            <Collection.Slot>
              {rootContext.modal ? (
                <MenuRootContentModal {...contentProps} ref={forwardedRef} />
              ) : (
                <MenuRootContentNonModal {...contentProps} ref={forwardedRef} />
              )}
            </Collection.Slot>
          </Presence>
        </Collection.Provider>
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
  const context = useMenuContext(CONTENT_NAME);
  const ref = React.useRef<MenuRootContentTypeElement>(null);
  const composedRefs = useMergeRefs(forwardedRef, ref);

  // Hide everything from ARIA except the `MenuContent`
  /* TODO: Is this needed? */
  /* React.useEffect(() => {
    const content = ref.current;
    if (content) return hideOthers(content);
  }, []); */

  return (
    <MenuContentImpl
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
  const context = useMenuContext(CONTENT_NAME);
  return (
    <MenuContentImpl
      {...props}
      ref={forwardedRef}
      trapFocus={false}
      disableOutsidePointerEvents={false}
      disableOutsideScroll={false}
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
type RovingFocusGroupProps = React.ComponentPropsWithoutRef<
  typeof RovingFocusGroup.Root
>;
type PopperContentProps = React.ComponentPropsWithoutRef<
  typeof Floating.Content
>;
type MenuContentImplPrivateProps = {
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
  onDismiss?: DismissableLayerProps["onDismiss"];
  disableOutsidePointerEvents?: DismissableLayerProps["disableOutsidePointerEvents"];

  /**
   * Whether scrolling outside the `MenuContent` should be prevented
   * (default: `false`)
   */
  disableOutsideScroll?: boolean;

  /**
   * Whether focus should be trapped within the `MenuContent`
   * (default: false)
   */
  trapFocus?: FocusScopeProps["trapped"];
};
interface MenuContentImplProps
  extends MenuContentImplPrivateProps,
    Omit<PopperContentProps, "dir" | "onPlaced"> {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];

  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: RovingFocusGroupProps["loop"];

  onEntryFocus?: RovingFocusGroupProps["onEntryFocus"];
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
    loop = false,
    trapFocus,
    onOpenAutoFocus,
    onCloseAutoFocus,
    disableOutsidePointerEvents,
    onEntryFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    disableOutsideScroll,
    ...contentProps
  } = props;

  const descendants = useMenuDescendantsContext()!;

  const context = useMenuContext(CONTENT_NAME);
  const rootContext = useMenuRootContext(CONTENT_NAME);
  const getItems = useCollection();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useMergeRefs(
    forwardedRef,
    contentRef,
    context.onContentChange,
  );
  const timerRef = React.useRef(0);
  const searchRef = React.useRef("");
  const pointerGraceTimerRef = React.useRef(0);
  const pointerGraceIntentRef = React.useRef<GraceIntent | null>(null);
  const pointerDirRef = React.useRef<Side>("right");
  const lastPointerXRef = React.useRef(0);

  /* TODO: Remoed ScrollWrapper from here, fix sideeffects */
  const ScrollLockWrapper = disableOutsideScroll
    ? React.Fragment
    : React.Fragment;
  const scrollLockWrapperProps = disableOutsideScroll
    ? { as: Slot, allowPinchZoom: true }
    : undefined;

  const handleTypeaheadSearch = (key: string) => {
    const search = searchRef.current + key;
    const items = getItems().filter((item) => !item.disabled);
    const currentItem = document.activeElement;
    const currentMatch = items.find((item) => item.ref.current === currentItem)
      ?.textValue;
    const values = items.map((item) => item.textValue);
    const nextMatch = getNextMatch(values, search, currentMatch);
    const newItem = items.find((item) => item.textValue === nextMatch)?.ref
      .current;

    // Reset `searchRef` 1 second after it was last updated
    (function updateSearch(value: string) {
      searchRef.current = value;
      window.clearTimeout(timerRef.current);
      if (value !== "")
        timerRef.current = window.setTimeout(() => updateSearch(""), 1000);
    })(search);

    if (newItem) {
      /**
       * Imperative focus during keydown is risky so we prevent React's batching updates
       * to avoid potential bugs. See: https://github.com/facebook/react/issues/20332
       */
      setTimeout(() => (newItem as HTMLElement).focus());
    }
  };

  React.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);

  // Make sure the whole tree has focus guards as our `MenuContent` may be
  // the last element in the DOM (beacuse of the `Portal`)
  useFocusGuards();

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
      searchRef={searchRef}
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
      <ScrollLockWrapper {...scrollLockWrapperProps}>
        <FocusScope
          asChild
          trapped={trapFocus}
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
                data-radix-menu-content=""
                dir={rootContext.dir}
                {...contentProps}
                ref={composedRefs}
                style={{ outline: "none", ...contentProps.style }}
                onKeyDown={composeEventHandlers(
                  contentProps.onKeyDown,
                  (event) => {
                    // submenu key events bubble through portals. We only care about keys in this menu.
                    const target = event.target as HTMLElement;
                    const isKeyDownInside =
                      target.closest("[data-radix-menu-content]") ===
                      event.currentTarget;
                    const isModifierKey =
                      event.ctrlKey || event.altKey || event.metaKey;
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
                    const candidateNodes = items.map(
                      (item) => item.ref.current!,
                    );
                    if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                    focusFirst(candidateNodes);
                  },
                )}
                onBlur={composeEventHandlers(props.onBlur, (event) => {
                  // clear search buffer when leaving the menu
                  if (!event.currentTarget.contains(event.target)) {
                    window.clearTimeout(timerRef.current);
                    searchRef.current = "";
                  }
                })}
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
      </ScrollLockWrapper>
    </MenuContentProvider>
  );
});

MenuContent.displayName = CONTENT_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuGroup
 * -----------------------------------------------------------------------------------------------*/

const GROUP_NAME = "MenuGroup";

type MenuGroupElement = React.ElementRef<typeof SlottedDivElement>;
interface MenuGroupProps extends PrimitiveDivProps {}

const MenuGroup = React.forwardRef<MenuGroupElement, MenuGroupProps>(
  (props: MenuGroupProps, forwardedRef) => {
    const { ...groupProps } = props;
    return (
      <SlottedDivElement role="group" {...groupProps} ref={forwardedRef} />
    );
  },
);

MenuGroup.displayName = GROUP_NAME;

/* -------------------------------------------------------------------------------------------------
 * MenuLabel
 * -----------------------------------------------------------------------------------------------*/

const LABEL_NAME = "MenuLabel";

type MenuLabelElement = React.ElementRef<typeof SlottedDivElement>;
interface MenuLabelProps extends PrimitiveDivProps {}

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
    const rootContext = useMenuRootContext(ITEM_NAME);
    const contentContext = useMenuContentContext(ITEM_NAME);
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
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (disabled || (isTypingAhead && event.key === " ")) return;
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

type MenuItemImplElement = React.ElementRef<typeof SlottedDivElement>;
interface MenuItemImplProps extends PrimitiveDivProps {
  disabled?: boolean;
  textValue?: string;
}

const MenuItemImpl = React.forwardRef<MenuItemImplElement, MenuItemImplProps>(
  (props: MenuItemImplProps, forwardedRef) => {
    const { disabled = false, textValue, ...itemProps } = props;

    const { register } = useMenuDescendant();

    const contentContext = useMenuContentContext(ITEM_NAME);
    const rovingFocusGroupScope = useRovingFocusGroupScope();
    const ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(forwardedRef, ref, register);
    const [isFocused, setIsFocused] = React.useState(false);

    // get the item's `.textContent` as default strategy for typeahead `textValue`
    const [textContent, setTextContent] = React.useState("");
    React.useEffect(() => {
      const menuItem = ref.current;
      if (menuItem) {
        setTextContent((menuItem.textContent ?? "").trim());
      }
    }, [itemProps.children]);

    return (
      <Collection.ItemSlot
        disabled={disabled}
        textValue={textValue ?? textContent}
      >
        <RovingFocusGroup.Item
          asChild
          {...rovingFocusGroupScope}
          focusable={!disabled}
        >
          <SlottedDivElement
            role="menuitem"
            data-highlighted={isFocused ? "" : undefined}
            aria-disabled={disabled || undefined}
            data-disabled={disabled ? "" : undefined}
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
            onFocus={composeEventHandlers(props.onFocus, () =>
              setIsFocused(true),
            )}
            onBlur={composeEventHandlers(props.onBlur, () =>
              setIsFocused(false),
            )}
          />
        </RovingFocusGroup.Item>
      </Collection.ItemSlot>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * MenuCheckboxItem
 * -----------------------------------------------------------------------------------------------*/

const CHECKBOX_ITEM_NAME = "MenuCheckboxItem";

type MenuCheckboxItemElement = MenuItemElement;

type CheckedState = boolean | "indeterminate";

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
  createMenuContext<MenuRadioGroupProps>(RADIO_GROUP_NAME, {
    value: undefined,
    onValueChange: () => {},
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
  const context = useRadioGroupContext(RADIO_ITEM_NAME);
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

type MenuSeparatorElement = React.ElementRef<typeof SlottedDivElement>;
interface MenuSeparatorProps extends PrimitiveDivProps {}

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

const [MenuSubProvider, useMenuSubContext] =
  createMenuContext<MenuSubContextValue>(SUB_NAME);

interface MenuSubProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?(open: boolean): void;
}

const MenuSub: React.FC<MenuSubProps> = (props: MenuSubProps) => {
  const { children, open = false, onOpenChange } = props;
  const parentMenuContext = useMenuContext(SUB_NAME);

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
  const context = useMenuContext(SUB_TRIGGER_NAME);
  const rootContext = useMenuRootContext(SUB_TRIGGER_NAME);
  const subContext = useMenuSubContext(SUB_TRIGGER_NAME);
  const contentContext = useMenuContentContext(SUB_TRIGGER_NAME);
  const openTimerRef = React.useRef<number | null>(null);
  const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;

  const composedRefs = useMergeRefs(forwardedRef, subContext.onTriggerChange);

  const clearOpenTimer = React.useCallback(() => {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
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
              const side = context.content?.dataset.side as Side;
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
          const isTypingAhead = contentContext.searchRef.current !== "";
          if (props.disabled || (isTypingAhead && event.key === " ")) return;
          if (SUB_OPEN_KEYS[rootContext.dir].includes(event.key)) {
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
  > {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}

const MenuSubContent = React.forwardRef<
  MenuSubContentElement,
  MenuSubContentProps
>((props: MenuSubContentProps, forwardedRef) => {
  const { forceMount = false, ...subContentProps } = props;
  const context = useMenuContext(CONTENT_NAME);
  const rootContext = useMenuRootContext(CONTENT_NAME);
  const subContext = useMenuSubContext(SUB_CONTENT_NAME);
  const ref = React.useRef<MenuSubContentElement>(null);
  const composedRefs = useMergeRefs(forwardedRef, ref);
  return (
    <Collection.Provider>
      <Presence present={forceMount || context.open}>
        <Collection.Slot>
          <MenuContentImpl
            id={subContext.contentId}
            aria-labelledby={subContext.triggerId}
            {...subContentProps}
            ref={composedRefs}
            align="start"
            side={rootContext.dir === "rtl" ? "left" : "right"}
            disableOutsidePointerEvents={false}
            disableOutsideScroll={false}
            trapFocus={false}
            onOpenAutoFocus={(event) => {
              // when opening a submenu, focus content for keyboard users only
              if (rootContext.isUsingKeyboardRef.current) ref.current?.focus();
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
              const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir].includes(
                event.key,
              );
              if (isKeyDownInside && isCloseKey) {
                context.onOpenChange(false);
                // We focus manually because we prevented it in `onCloseAutoFocus`
                subContext.trigger?.focus();
                // prevent window from scrolling
                event.preventDefault();
              }
            })}
          />
        </Collection.Slot>
      </Presence>
    </Collection.Provider>
  );
});

MenuSubContent.displayName = SUB_CONTENT_NAME;

/* -----------------------------------------------------------------------------------------------*/

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

function focusFirst(candidates: HTMLElement[]) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus();
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}

/**
 * This is the "meat" of the typeahead matching logic. It takes in all the values,
 * the search and the current match, and returns the next match (or `undefined`).
 *
 * We normalize the search because if a user has repeatedly pressed a character,
 * we want the exact same behavior as if we only had that one character
 * (ie. cycle through options starting with that character)
 *
 * We also reorder the values by wrapping the array around the current match.
 * This is so we always look forward from the current match, and picking the first
 * match will always be the correct one.
 *
 * Finally, if the normalized search is exactly one character, we exclude the
 * current match from the values because otherwise it would be the first to match always
 * and focus would never move. This is as opposed to the regular case, where we
 * don't want focus to move if the current match still matches.
 */
function getNextMatch(values: string[], search: string, currentMatch?: string) {
  const isRepeated =
    search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentMatchIndex = currentMatch ? values.indexOf(currentMatch) : -1;
  let wrappedValues = wrapArray(values, Math.max(currentMatchIndex, 0));
  const excludeCurrentMatch = normalizedSearch.length === 1;
  if (excludeCurrentMatch)
    wrappedValues = wrappedValues.filter((v) => v !== currentMatch);
  const nextMatch = wrappedValues.find((value) =>
    value.toLowerCase().startsWith(normalizedSearch.toLowerCase()),
  );
  return nextMatch !== currentMatch ? nextMatch : undefined;
}

type Point = { x: number; y: number };
type Polygon = Point[];
type Side = "left" | "right";
type GraceIntent = { area: Polygon; side: Side };

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
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

const Root = Menu;
const Anchor = MenuAnchor;
const Portal = MenuPortal;
const Content = MenuContent;
const Group = MenuGroup;
const Label = MenuLabel;
const Item = MenuItem;
const CheckboxItem = MenuCheckboxItem;
const RadioGroup = MenuRadioGroup;
const RadioItem = MenuRadioItem;
const Separator = MenuSeparator;
const Sub = MenuSub;
const SubTrigger = MenuSubTrigger;
const SubContent = MenuSubContent;

export {
  createMenuScope,
  //
  Menu,
  MenuAnchor,
  MenuPortal,
  MenuContent,
  MenuGroup,
  MenuLabel,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
  //
  Root,
  Anchor,
  Portal,
  Content,
  Group,
  Label,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  Separator,
  Sub,
  SubTrigger,
  SubContent,
};
export type {
  MenuProps,
  MenuAnchorProps,
  MenuPortalProps,
  MenuContentProps,
  MenuGroupProps,
  MenuLabelProps,
  MenuItemProps,
  MenuCheckboxItemProps,
  MenuRadioGroupProps,
  MenuRadioItemProps,
  MenuSeparatorProps,
  MenuSubProps,
  MenuSubTriggerProps,
  MenuSubContentProps,
};

/* eslint-disable jsx-a11y/no-static-element-interactions */

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
import React, { HTMLAttributes, forwardRef, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import DismissableLayer from "../../overlay/dismiss/DismissableLayer";
import { DismissableLayerProps } from "../../overlay/dismiss/DismissableLayer.types";
import { Slot } from "../../util/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useCallbackRef, useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import Floating from "../floating/Floating";
import { FloatingAnchorProps } from "../floating/parts/Anchor";
import { FloatingContentProps } from "../floating/parts/Content";
import { useFocusGuards } from "./FocusGuard";
import { FocusScope, FocusScopeProps } from "./FocusLock";
import {
  MenuContentProvider,
  MenuProvider,
  useMenuContentContext,
  useMenuContext,
} from "./Menu.context";
import {
  GraceIntent,
  MenuContentType,
  Point,
  Polygon,
  SubmenuSide,
} from "./Menu.types";

/* Utils */

const SELECTION_KEYS = ["Enter", " "];
const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

/**
 * Menu
 */
export interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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
    <Floating>
      <MenuProvider
        onClose={useCallback(() => handleOpenChange(false), [handleOpenChange])}
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        {children}
      </MenuProvider>
    </Floating>
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
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
  onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
  onPointerDownOutside?: DismissableLayerProps["onPointerDownOutside"];
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
  onInteractOutside?: DismissableLayerProps["onInteractOutside"];
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
}

export const [
  MenuContentDescendantsProvider,
  useMenuContentDescendantsContext,
  useMenuContentDescendants,
  useMenuContentDescendant,
] = createDescendantContext<HTMLElement>();

export const MenuContent = ({ children, ...rest }: MenuContentProps) => {
  const descendants = useMenuContentDescendants();

  return (
    <MenuContentDescendantsProvider value={descendants}>
      <MenuContentImpl {...rest}>{children}</MenuContentImpl>
    </MenuContentDescendantsProvider>
  );
};

/* Cotent Impl */
/**
 * TODO:
 * - Implement rowing keyboard nav
 * - Focusgroup/lock
 */
export const MenuContentImpl = forwardRef<
  React.ElementRef<typeof Floating.Content>,
  MenuContentProps
>(
  (
    {
      children,
      style,
      onFocusOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      onPointerMove,
      onKeyDown,
      ...rest
    }: MenuContentProps,
    ref,
  ) => {
    const context = useMenuContext();
    const _ref = useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(ref, _ref);

    const pointerGraceTimerRef = useRef(0);
    const pointerGraceIntentRef = useRef<GraceIntent | null>(null);
    const pointerDirRef = useRef<SubmenuSide>("right");

    const contentRef = useRef<HTMLDivElement>(null);

    const lastPointerXRef = useRef(0);

    /* const [currentItemId, setCurrentItemId] = useState<string | null>(null); */

    // Make sure the whole tree has focus guards as our `MenuContent` may be
    // the last element in the DOM (beacuse of the `Portal`)
    useFocusGuards();

    const isPointerMovingToSubmenu = useCallback(
      (event: React.PointerEvent) => {
        const isMovingTowards =
          pointerDirRef.current === pointerGraceIntentRef.current?.submenuSide;
        return (
          isMovingTowards &&
          isPointerInGraceArea(event, pointerGraceIntentRef.current?.area)
        );
      },
      [],
    );

    /* https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L435 */
    return (
      <MenuContentProvider
        onItemEnter={useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) {
              event.preventDefault();
            }
          },
          [isPointerMovingToSubmenu],
        )}
        onItemLeave={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) {
              return;
            }
            contentRef.current?.focus();
            /* setCurrentItemId(null); */
          },
          [isPointerMovingToSubmenu],
        )}
        onTriggerLeave={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) {
              event.preventDefault();
            }
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
          onMountAutoFocus={composeEventHandlers<any>(
            onOpenAutoFocus,
            (event) => {
              // when opening, explicitly focus the content area only and leave
              // `onEntryFocus` in  control of focusing first item
              event.preventDefault();
              contentRef.current?.focus({ preventScroll: true });
            },
          )}
          onUnmountAutoFocus={onCloseAutoFocus}
        >
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
              data-aksel-menu-content=""
              {...rest}
              ref={composedRefs}
              style={{ outline: "none", ...style }}
              onKeyDown={composeEventHandlers(onKeyDown, (event) => {
                // submenu key events bubble through portals. We only care about keys in this menu.
                const target = event.target as HTMLElement;

                if (
                  target.closest("[data-aksel-menu-content]") ===
                    event.currentTarget &&
                  event.key === "Tab"
                ) {
                  // menus should not be navigated using tab key so we prevent it
                  event.preventDefault();
                }
                // focus first/last item based on key pressed
                const content = contentRef.current;
                if (event.target !== content) {
                  return;
                }
                if (!FIRST_LAST_KEYS.includes(event.key)) {
                  return;
                }
                event.preventDefault();
                /* This should be handled by decendantcontext */
                /* const items = getItems().filter((item) => !item.disabled);
                const candidateNodes = items.map((item) => item.ref.current!);
                if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                focusFirst(candidateNodes); */
              })}
              onPointerMove={composeEventHandlers(
                onPointerMove,
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
            >
              {children}
            </Floating.Content>
          </DismissableLayer>
        </FocusScope>
      </MenuContentProvider>
    );
  },
);

function whenMouse<E>(
  handler: React.PointerEventHandler<E>,
): React.PointerEventHandler<E> {
  return (event) =>
    event.pointerType === "mouse" ? handler(event) : undefined;
}

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
interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MenuGroup = ({ ...rest }: MenuGroupProps) => {
  return <div role="group" {...rest} />;
};

/**
 * Label
 */
interface MenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MenuLabel = ({ ...rest }: MenuLabelProps) => {
  return <div {...rest} />;
};

/**
 * Item
 */
interface MenuItemProps extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  children: React.ReactNode;
  onSelect?: (event: Event) => void;
  disabled?: boolean;
}

const ITEM_SELECT_EVENT = "menu.itemSelect";

export const MenuItem = forwardRef(
  (
    {
      children,
      disabled = false,
      onSelect,
      onClick,
      onPointerDown,
      onPointerUp,
      onKeyDown,
      onPointerMove,
      onPointerLeave,
      onFocus,
      onBlur,
      ...rest
    }: MenuItemProps,
    ref,
  ) => {
    const { register } = useMenuContentDescendant({
      disabled,
    });

    const [isFocused, setIsFocused] = React.useState(false);

    const _ref = useRef<HTMLDivElement>(null);
    const rootContext = useMenuContext();
    const contentContext = useMenuContentContext();

    const isPointerDownRef = useRef(false);

    const composedRefs = useMergeRefs(ref, register, _ref);

    const handleSelect = () => {
      const menuItem = _ref.current;
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
        ReactDOM.flushSync(() => menuItem.dispatchEvent(itemSelectEvent));
        if (itemSelectEvent.defaultPrevented) {
          isPointerDownRef.current = false;
        } else {
          rootContext.onClose();
        }
      }
    };

    return (
      <Slot
        ref={composedRefs}
        {...rest}
        data-highlighted={isFocused ? "" : undefined}
        role="menuitem"
        aria-disabled={disabled}
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
        onFocus={composeEventHandlers(onFocus, () => setIsFocused(true))}
        onBlur={composeEventHandlers(onBlur, () => setIsFocused(false))}
      >
        {children}
      </Slot>
    );
  },
);

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

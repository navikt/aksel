import React, { HTMLAttributes, forwardRef, useRef } from "react";
import ReactDOM from "react-dom";
import { Slot } from "../../../util/Slot";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { useMenuContentDescendant } from "../Menu";
import { useMenuContentContext, useMenuContext } from "../Menu.context";
import { SELECTION_KEYS, whenMouse } from "../Menu.utils";

/**
 * Item
 */
export interface MenuItemProps
  extends Omit<HTMLAttributes<HTMLElement>, "onSelect"> {
  children: React.ReactNode;
  onSelect?: (event: Event) => void;
  disabled?: boolean;
  asChild?: boolean;
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
      asChild,
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

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
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
      </Comp>
    );
  },
);

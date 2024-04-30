import React, { forwardRef, useRef, useState } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { useMenuContentContext } from "../../Menu";
import { useMenuDescendant } from "../../Menu.context";
import { whenMouse } from "../../Menu.utils";
import {
  SlottedDivElement,
  type SlottedDivElementRef,
  type SlottedDivProps,
} from "../SlottedDivElement";

type MenuItemImplElement = SlottedDivElementRef;

interface MenuItemImplProps extends SlottedDivProps {
  disabled?: boolean;
}

const MenuItemImpl = forwardRef<MenuItemImplElement, MenuItemImplProps>(
  (props: MenuItemImplProps, forwardedRef) => {
    const { disabled = false, ...itemProps } = props;

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

export { MenuItemImpl, type MenuItemImplElement, type MenuItemImplProps };

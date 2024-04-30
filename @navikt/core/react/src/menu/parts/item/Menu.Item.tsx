import React, { forwardRef, useRef } from "react";
import ReactDOM from "react-dom";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { useMenuRootContext } from "../../Menu.context";
import { SELECTION_KEYS } from "../../Menu.utils";
import {
  MenuItemImpl,
  MenuItemImplElement,
  MenuItemImplProps,
} from "./Menu.ItemImpl";

const ITEM_SELECT = "menu.itemSelect";

type MenuItemElement = MenuItemImplElement;
interface MenuItemProps extends Omit<MenuItemImplProps, "onSelect"> {
  onSelect?: (event: Event) => void;
}

const MenuItem = forwardRef<MenuItemElement, MenuItemProps>(
  (props: MenuItemProps, forwardedRef) => {
    const { disabled = false, onSelect, ...itemProps } = props;
    const ref = useRef<HTMLDivElement>(null);
    const rootContext = useMenuRootContext();
    const composedRefs = useMergeRefs(forwardedRef, ref);
    const isPointerDownRef = useRef(false);

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

export { MenuItem, type MenuItemProps, type MenuItemElement };

import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { composeEventHandlers } from "../../../helpers";
import { rovingFocus } from "../../../helpers/roving-focus";
import { useEventCallback, useMergeRefs } from "../../../hooks";
import { Slot } from "../../slot/Slot";

const MENU_ITEM_SELECTOR = "[data-aksel-menu-item]:not([data-disabled])";

interface RovingFocusProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "tabIndex"
> {
  asChild?: boolean;
  onEntryFocus?: (event: Event) => void;
}

const ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

const RovingFocus = forwardRef<HTMLDivElement, RovingFocusProps>(
  (
    {
      children,
      asChild,
      onKeyDown,
      onEntryFocus,
      onMouseDown,
      onFocus,
      ...rest
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const _ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(ref, _ref);

    const handleEntryFocus = useEventCallback(onEntryFocus);
    const isMouseFocusRef = useRef(false);

    useEffect(() => {
      const node = _ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [handleEntryFocus]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      const container = _ref.current;
      if (!container) {
        return;
      }

      const current = (event.target as HTMLElement).closest(
        MENU_ITEM_SELECTOR,
      ) as HTMLElement;

      const keyMap: Record<string, () => void> = {
        ArrowUp: () =>
          rovingFocus(MENU_ITEM_SELECTOR, container, "prev", current, false),
        ArrowDown: () =>
          rovingFocus(MENU_ITEM_SELECTOR, container, "next", current, false),
        Home: () => rovingFocus(MENU_ITEM_SELECTOR, container, "first"),
        End: () => rovingFocus(MENU_ITEM_SELECTOR, container, "last"),
      };

      const action = keyMap[event.key];

      if (action) {
        event.preventDefault();
        action();
      }
    }, []);

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={composedRefs}
        {...rest}
        tabIndex={0}
        style={{ outline: "none", ...rest.style }}
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
        onMouseDown={composeEventHandlers(onMouseDown, () => {
          isMouseFocusRef.current = true;
        })}
        onFocus={composeEventHandlers(onFocus, (event) => {
          if (event.target === event.currentTarget) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);

            if (!entryFocusEvent.defaultPrevented) {
              const container = _ref.current;
              container && rovingFocus(MENU_ITEM_SELECTOR, container, "first");
            }
          }

          isMouseFocusRef.current = false;
        })}
      >
        {children}
      </Comp>
    );
  },
);

export { RovingFocus, type RovingFocusProps };

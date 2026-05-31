import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { composeEventHandlers, ownerDocument } from "../../../helpers";
import { useEventCallback, useMergeRefs } from "../../../hooks";
import { focusIn } from "../../../hooks/useFocusIn";
import { Slot } from "../../slot/Slot";

const MENU_ITEM_SELECTOR =
  '[role="menuitem"]:not([data-disabled]),[role="menuitemcheckbox"]:not([data-disabled]),[role="menuitemradio"]:not([data-disabled])';

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
      if (!container) return;

      const items = Array.from(
        container.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR),
      );
      const ownerDoc = ownerDocument(container);
      const current = ownerDoc.activeElement as HTMLElement | null;

      const keyMap: Record<string, () => void> = {
        ArrowUp: () => focusIn(items, "prev", current, false),
        ArrowDown: () => focusIn(items, "next", current, false),
        Home: () => focusIn(items, "first"),
        End: () => focusIn(items, "last"),
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
              if (container) {
                const items = Array.from(
                  container.querySelectorAll<HTMLElement>(MENU_ITEM_SELECTOR),
                );
                focusIn(items, "first");
              }
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

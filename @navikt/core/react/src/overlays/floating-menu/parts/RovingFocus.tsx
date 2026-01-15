import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { Slot } from "../../../slot/Slot";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { DescendantsManager } from "../../../util/hooks/descendants/descendant";
import { useEventCallback } from "../../../util/hooks/useEventCallback";
import { ownerDocument } from "../../../util/owner";

interface RovingFocusProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "tabIndex"> {
  asChild?: boolean;
  descendants: DescendantsManager<HTMLDivElement, any>;
  onEntryFocus?: (event: Event) => void;
}

const ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

const RovingFocus = forwardRef<HTMLDivElement, RovingFocusProps>(
  (
    {
      children,
      asChild,
      descendants,
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

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const loop = false;

        const ownerDoc = ownerDocument(_ref?.current);

        const idx = descendants
          .values()
          .findIndex((x) => x.node.isSameNode(ownerDoc.activeElement));

        const nextItem = () => {
          const next = descendants.nextEnabled(idx, loop);
          next?.node?.focus();
        };
        const prevItem = () => {
          const prev = descendants.prevEnabled(idx, loop);
          prev?.node?.focus();
        };
        const firstItem = () => {
          const first = descendants.firstEnabled();
          first?.node?.focus();
        };
        const lastItem = () => {
          const last = descendants.lastEnabled();
          last?.node?.focus();
        };

        const keyMap: Record<string, React.KeyboardEventHandler> = {
          ArrowUp: prevItem,
          ArrowDown: nextItem,
          Home: firstItem,
          End: lastItem,
        };

        const action = keyMap[event.key];

        if (action) {
          event.preventDefault();
          action(event);
        }
      },
      [descendants],
    );

    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={composedRefs}
        {...rest}
        tabIndex={descendants.enabledCount() === 0 ? -1 : 0}
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
              descendants.firstEnabled()?.node.focus({ preventScroll: true });
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

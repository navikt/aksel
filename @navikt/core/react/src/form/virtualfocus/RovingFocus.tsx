import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Slot } from "../../util/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useCallbackRef, useMergeRefs } from "../../util/hooks";
import { DescendantsManager } from "../../util/hooks/descendants/descendant";

export interface RovingFocusProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  descendants: DescendantsManager<HTMLDivElement, object>;
  onEntryFocus?: (event: Event) => void;
}

const ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
const EVENT_OPTIONS = { bubbles: false, cancelable: true };

export const RovingFocus = forwardRef<HTMLDivElement, RovingFocusProps>(
  (
    {
      children,
      asChild,
      descendants,
      onKeyDown,
      onEntryFocus,
      onMouseDown,
      onBlur,
      onFocus,
      ...rest
    }: RovingFocusProps,
    ref,
  ) => {
    const _ref = React.useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(ref, _ref);

    const handleEntryFocus = useCallbackRef(onEntryFocus);
    const [isTabbingBackOut, setIsTabbingBackOut] = useState(false);
    const isClickFocusRef = useRef(false);

    useEffect(() => {
      const node = _ref.current;
      if (node) {
        node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
        return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
      }
    }, [handleEntryFocus]);

    /* TODO: implement ownerdocument here */
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const loop = false;
        /**
         * Tabs.Tab is registered with its prop 'value'.
         * We can then use it to find the current focuses descendant
         */
        const idx = descendants
          .values()
          .findIndex((x) => x.node.isSameNode(document.activeElement));

        const nextTab = () => {
          const next = descendants.nextEnabled(idx, loop);
          next && next.node?.focus();
        };
        const prevTab = () => {
          const prev = descendants.prevEnabled(idx, loop);
          prev && prev.node?.focus();
        };
        const firstTab = () => {
          const first = descendants.firstEnabled();
          first && first.node?.focus();
        };
        const lastTab = () => {
          const last = descendants.lastEnabled();
          last && last.node?.focus();
        };

        const keyMap: Record<string, React.KeyboardEventHandler> = {
          ArrowUp: prevTab,
          ArrowDown: nextTab,
          Home: firstTab,
          End: lastTab,
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
        tabIndex={isTabbingBackOut || descendants.enabledCount() === 0 ? -1 : 0}
        style={{ outline: "none", ...rest.style }}
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
        onMouseDown={composeEventHandlers(onMouseDown, () => {
          isClickFocusRef.current = true;
        })}
        onFocus={composeEventHandlers(onFocus, (event) => {
          // We normally wouldn't need this check, because we already check
          // that the focus is on the current target and not bubbling to it.
          // We do this because Safari doesn't focus buttons when clicked, and
          // instead, the wrapper will get focused and not through a bubbling event.
          const isKeyboardFocus = !isClickFocusRef.current;

          if (
            event.target === event.currentTarget &&
            isKeyboardFocus &&
            !isTabbingBackOut
          ) {
            const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
            event.currentTarget.dispatchEvent(entryFocusEvent);

            if (!entryFocusEvent.defaultPrevented) {
              console.log("focusing first");
              descendants.firstEnabled()?.node.focus({ preventScroll: true });
            }
          }

          isClickFocusRef.current = false;
        })}
        onBlur={composeEventHandlers(onBlur, () => setIsTabbingBackOut(false))}
      >
        {children}
      </Comp>
    );
  },
);

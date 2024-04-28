import React, { forwardRef, useCallback } from "react";
import { composeEventHandlers } from "../../esm/util/composeEventHandlers";
import { Slot } from "../util/Slot";
import { DescendantsManager } from "../util/hooks/descendants/descendant";

interface RowingFocusProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  descendants: DescendantsManager<HTMLElement, object>;
}

export const RowingFocus = forwardRef<HTMLDivElement, RowingFocusProps>(
  ({ asChild, descendants, onKeyDown, ...rest }: RowingFocusProps, ref) => {
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
        ref={ref}
        {...rest}
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      >
        123
      </Comp>
    );
  },
);

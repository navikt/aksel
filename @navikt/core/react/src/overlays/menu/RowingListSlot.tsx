import React, { forwardRef, useCallback } from "react";
import { composeEventHandlers } from "../../../esm/util/composeEventHandlers";
import { Slot } from "../../util/Slot";
import { DescendantsManager } from "../../util/hooks/descendants/descendant";

interface RowingListSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  descendants: DescendantsManager<HTMLElement, object>;
  /**
   * @default vertical
   */
  direction?: "horizontal" | "vertical";
}

export const RowingListSlow = forwardRef<HTMLDivElement, RowingListSlotProps>(
  (
    {
      children,
      onKeyDown,
      descendants,
      direction = "vertical",
    }: RowingListSlotProps,
    ref,
  ) => {
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        const loop = false;

        const idx = descendants
          .values()
          .findIndex((x) => x.node.isSameNode(document.activeElement));

        const next = () => {
          const _next = descendants.nextEnabled(idx, loop);
          _next && _next.node?.focus();
        };
        const prev = () => {
          const _prev = descendants.prevEnabled(idx, loop);
          _prev && _prev.node?.focus();
        };
        const first = () => {
          const _first = descendants.firstEnabled();
          _first && _first.node?.focus();
        };
        const last = () => {
          const _last = descendants.lastEnabled();
          _last && _last.node?.focus();
        };

        const keyMap: Record<string, React.KeyboardEventHandler> = {
          [direction === "vertical" ? "ArrowUp" : "ArrowLeft"]: prev,
          [direction === "vertical" ? "ArrowDown" : "ArrowRight"]: next,
          Home: first,
          End: last,
        };

        const action = keyMap[event.key];

        if (action) {
          event.preventDefault();
          action(event);
        }
      },
      [descendants, direction],
    );

    return (
      <Slot
        ref={ref}
        onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
      >
        {children}
      </Slot>
    );
  },
);

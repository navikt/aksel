/* eslint-disable jsx-a11y/interactive-supports-focus */
import cl from "clsx";
import React, { forwardRef, useRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks/useMergeRefs";
import ScrollButton from "./ScrollButtons";
import { useScrollButtons } from "./useScrollButtons";
import { useTabList } from "./useTabList";

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * <Tabs.Tab /> elements
   */
  children: React.ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, onKeyDown, ...rest }, ref) => {
    const { onKeyDown: _onKeyDown } = useTabList();

    const listRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs(listRef, ref);

    const ctx = useScrollButtons(listRef);

    return (
      <div className="navds-tabs__tablist-wrapper">
        {ctx.show && (
          <ScrollButton
            dir="left"
            hidden={!ctx.start}
            onClick={ctx.scrollLeft}
          />
        )}
        <div
          ref={mergedRef}
          {...rest}
          onScroll={ctx.update}
          className={cl("navds-tabs__tablist", className)}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={composeEventHandlers(onKeyDown, _onKeyDown)}
        />
        {ctx.show && (
          <ScrollButton
            dir="right"
            hidden={!ctx.end}
            onClick={ctx.scrollRight}
          />
        )}
      </div>
    );
  },
);

export default TabList;

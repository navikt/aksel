/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { forwardRef, useRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks/useMergeRefs";
import ScrollButton from "./ScrollButtons";
import { useScrollButtons } from "./useScrollButtons";
import { useTabList } from "./useTabList";

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * <Tabs.Tab /> elements.
   */
  children: React.ReactNode;
}

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, onKeyDown, ...rest }, ref) => {
    const { cn } = useRenameCSS();
    const { onKeyDown: _onKeyDown } = useTabList();

    const listRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs(listRef, ref);

    const scrollCtx = useScrollButtons(listRef);

    return (
      <div className={cn("navds-tabs__tablist-wrapper")}>
        {scrollCtx.show && (
          <ScrollButton
            dir="left"
            hidden={!scrollCtx.start}
            onClick={scrollCtx.scrollLeft}
          />
        )}
        <div
          ref={mergedRef}
          {...rest}
          onScroll={scrollCtx.update}
          className={cn("navds-tabs__tablist", className)}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={composeEventHandlers(onKeyDown, _onKeyDown)}
        />
        {scrollCtx.show && (
          <ScrollButton
            dir="right"
            hidden={!scrollCtx.end}
            onClick={scrollCtx.scrollRight}
          />
        )}
      </div>
    );
  },
);

export default TabList;

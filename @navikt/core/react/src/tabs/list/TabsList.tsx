import React, { forwardRef, useRef } from "react";
import { cl, composeEventHandlers } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { TabsScrollButtonInternal } from "../scroll-button/TabsScrollButtonInternal";
import { useScrollButtons } from "./useScrollButtons";
import { useTabList } from "./useTabList";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * <Tabs.Tab /> elements.
   */
  children: React.ReactNode;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, onKeyDown, ...rest }, ref) => {
    const { onKeyDown: _onKeyDown } = useTabList();

    const listRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergeRefs(listRef, ref);

    const scrollCtx = useScrollButtons(listRef);

    return (
      <div className="aksel-tabs__tablist-wrapper">
        {scrollCtx.show && (
          <TabsScrollButtonInternal
            dir="left"
            hidden={!scrollCtx.start}
            onClick={scrollCtx.scrollLeft}
          />
        )}
        {/* oxlint-disable-next-line jsx-a11y/interactive-supports-focus -- Focus roves between child tabs; the tablist must not be an extra tab stop. */}
        <div
          ref={mergedRef}
          {...rest}
          onScroll={scrollCtx.update}
          className={cl("aksel-tabs__tablist", className)}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={composeEventHandlers(onKeyDown, _onKeyDown)}
        />
        {scrollCtx.show && (
          <TabsScrollButtonInternal
            dir="right"
            hidden={!scrollCtx.end}
            onClick={scrollCtx.scrollRight}
          />
        )}
      </div>
    );
  },
);

export { TabsList };
export type { TabsListProps };

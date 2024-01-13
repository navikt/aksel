import cl from "clsx";
import React, { forwardRef, useRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks/useMergeRefs";
import ScrollButtons from "./ScrollButtons";
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

    return (
      <div className="navds-tabs__tablist-wrapper">
        <ScrollButtons listRef={listRef} />
        <div
          ref={mergedRef}
          {...rest}
          tabIndex={0}
          /* onScroll={updateScrollButtonState} */
          className={cl("navds-tabs__tablist", className)}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={composeEventHandlers(onKeyDown, _onKeyDown)}
        />
      </div>
    );
  },
);

export default TabList;

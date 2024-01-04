import cl from "clsx";
import React, { forwardRef, useMemo, useRef } from "react";
import mergeRefs from "../../mergeRefs";
import ScrollButtons from "./ScrollButtons";
import { TabListProps } from "./types";
import { useTabList } from "./use-tabs";

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...rest }, ref) => {
    const ctx = useTabList(rest);
    const listRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMemo(() => mergeRefs([listRef, ref]), [ref]);

    return (
      <div className="navds-tabs__tablist-wrapper">
        <ScrollButtons listRef={listRef} />
        <div
          {...ctx}
          ref={mergedRef}
          className={cl("navds-tabs__tablist", className)}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default TabList;

import cl from "clsx";
import React, { forwardRef } from "react";
import { TabListProps } from "./types";
import { useTabList } from "./use-tabs";

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ className, children, ...rest }, ref) => {
    const ctx = useTabList(rest);
    return (
      <div className="navds-tabs__tablist-wrapper">
        <div
          {...ctx}
          ref={ref}
          className={cl("navds-tabs__tablist", className)}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default TabList;

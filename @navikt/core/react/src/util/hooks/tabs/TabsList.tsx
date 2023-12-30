import cl from "clsx";
import React, { forwardRef } from "react";
import { useTabList } from "./use-tabs";

export interface TabListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * <Tabs.Tab /> elements
   */
  children: React.ReactNode;
}

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

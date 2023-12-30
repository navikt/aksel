import cl from "clsx";
import React, { forwardRef } from "react";
import { useTabPanel } from "./use-tabs";

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab panel content
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, children, ...rest }, ref) => {
    const ctx = useTabPanel(rest);

    return (
      <div {...ctx} ref={ref} className={cl("navds-tabs__tabpanel", className)}>
        {children}
      </div>
    );
  }
);

export default TabPanel;

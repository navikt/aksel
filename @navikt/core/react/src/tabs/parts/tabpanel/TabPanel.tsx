import cl from "clsx";
import React, { forwardRef } from "react";
import { useTabPanel } from "./useTabPanel";

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
  ({ className, value, ...rest }, ref) => {
    const ctx = useTabPanel({ value });

    return (
      <div
        {...rest}
        ref={ref}
        className={cl("navds-tabs__tabpanel", className, {
          "navds-tabs__tabpanel--hidden": ctx.hidden,
        })}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={ctx.labelledbyId}
        id={ctx.id}
        hidden={ctx.hidden}
      />
    );
  },
);

export default TabPanel;

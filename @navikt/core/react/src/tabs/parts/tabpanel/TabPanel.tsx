import cl from "clsx";
import React, { forwardRef } from "react";
import { useTabPanel } from "./useTabPanel";

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab panel content.
   */
  children: React.ReactNode;
  /**
   * Value for state-handling.
   */
  value: string;
  /**
   * If true, will only render children when selected.
   * @default true
   */
  lazy?: boolean;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value, children, lazy = true, ...rest }, ref) => {
    const ctx = useTabPanel({ value });

    return (
      <div
        ref={ref}
        {...rest}
        className={cl("navds-tabs__tabpanel", className, {
          "navds-tabs__tabpanel--hidden": ctx.hidden,
        })}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={ctx.labelledbyId}
        id={ctx.id}
        hidden={ctx.hidden}
      >
        {lazy ? <>{!ctx.hidden && children}</> : children}
      </div>
    );
  },
);

export default TabPanel;

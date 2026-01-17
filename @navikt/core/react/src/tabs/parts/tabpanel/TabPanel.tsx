import React, { forwardRef } from "react";
import { cl } from "../../../util/className";
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
  /**
   * Overrides auto-generated id.
   *
   * **Warning**: TabPanel generates an id if not provided. If you need to override it,
   * make sure to also include the correct `aria-labelledby` id for the Tab that labels it.
   */
  id?: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value, children, lazy = true, id, ...rest }, ref) => {
    const ctx = useTabPanel({ value });

    return (
      <div
        ref={ref}
        {...rest}
        className={cl("aksel-tabs__tabpanel", className)}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={rest["aria-labelledby"] ?? ctx.labelledbyId}
        id={id ?? ctx.id}
        hidden={ctx.hidden}
        data-state={!ctx.hidden ? "active" : "inactive"}
      >
        {lazy && ctx.hidden ? null : children}
      </div>
    );
  },
);

export default TabPanel;

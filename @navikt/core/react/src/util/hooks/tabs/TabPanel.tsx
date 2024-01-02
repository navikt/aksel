import cl from "clsx";
import React, { forwardRef } from "react";
import { TabPanelProps } from "./types";
import { useTabPanel } from "./use-tabs";

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

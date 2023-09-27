import { TabsContent } from "@radix-ui/react-tabs";
import cl from "clsx";
import React, { forwardRef } from "react";

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
  ({ className, ...rest }, ref) => (
    <TabsContent
      {...rest}
      ref={ref}
      className={cl("navds-tabs__tabpanel", className)}
    />
  )
);

export default TabPanel;

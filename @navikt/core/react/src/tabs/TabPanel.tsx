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

export type TabPanelType = React.ForwardRefExoticComponent<
  TabPanelProps & React.RefAttributes<HTMLDivElement>
>;

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, ...rest }, ref) => (
    <TabsContent
      {...rest}
      ref={ref}
      className={cl("navds-tabs__tabpanel", className)}
    />
  )
) as TabPanelType;

export default TabPanel;

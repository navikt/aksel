import { TabsContent } from "@radix-ui/react-tabs";
import cl from "classnames";
import React, { forwardRef } from "react";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tab panel
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}

export type PanelType = React.ForwardRefExoticComponent<
  PanelProps & React.RefAttributes<HTMLDivElement>
>;

const Panel = forwardRef<HTMLDivElement, PanelProps>(
  ({ className, ...rest }, ref) => (
    <TabsContent
      tabIndex={-1}
      {...rest}
      ref={ref}
      className={cl("navds-tabs__tabpanel", className)}
    />
  )
) as PanelType;

export default Panel;

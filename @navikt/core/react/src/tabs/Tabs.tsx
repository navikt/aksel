import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import Trigger, { TriggerType } from "./tab";

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  /**
   * Tabs elements
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Controlled selected value
   */
  value?: string;
  /**
   * If not controlled, a default-value needs to be set
   */
  defaultValue?: string;
}

interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: TriggerType;
}

interface TabsContextProps {
  size: "medium" | "small";
}

export const TabsContext = createContext<TabsContextProps | null>(null);

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, children, size = "medium", ...rest }, ref) => {
    return (
      <TabsContext.Provider
        value={{
          size,
        }}
      >
        <RadixTabs.Root
          {...rest}
          ref={ref}
          className={cl("navds-tabs", className, `navds-tabs--${size}`)}
        >
          <RadixTabs.List>{children}</RadixTabs.List>
          {/* <RadixTabs.Content /> */}
        </RadixTabs.Root>
      </TabsContext.Provider>
    );
  }
) as TabsComponent;

Tabs.Trigger = Trigger;

export default Tabs;

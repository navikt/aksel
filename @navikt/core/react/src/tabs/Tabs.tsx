import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import Trigger, { TriggerType } from "./Tab";
import List, { ListType } from "./TabList";
import Panel, { PanelType } from "./TabPanel";

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
   * onChange
   */
  onChange?: (value: string) => void;
  /**
   * Controlled selected value
   */
  value?: string;
  /**
   * If not controlled, a default-value needs to be set
   */
  defaultValue?: string;
  /**
   * Automatically activates tab on fokus/navigation
   * @default false
   */
  autoSwitch?: boolean;
  /**
   * Makes icons larger for better visibility
   */
  iconOnly?: boolean;
}

interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  Trigger: TriggerType;
  List: ListType;
  Panel: PanelType;
}

interface TabsContextProps {
  size: "medium" | "small";
  iconOnly?: boolean;
}

export const TabsContext = createContext<TabsContextProps | null>(null);

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      children,
      onChange,
      size = "medium",
      autoSwitch = false,
      iconOnly = false,
      ...rest
    },
    ref
  ) => {
    return (
      <RadixTabs.Root
        {...rest}
        ref={ref}
        className={cl("navds-tabs", className, `navds-tabs--${size}`)}
        activationMode={autoSwitch ? "automatic" : "manual"}
        onValueChange={onChange}
      >
        <TabsContext.Provider
          value={{
            size,
            iconOnly,
          }}
        >
          {children}
        </TabsContext.Provider>
      </RadixTabs.Root>
    );
  }
) as TabsComponent;

Tabs.Trigger = Trigger;
Tabs.List = List;
Tabs.Panel = Panel;

export default Tabs;

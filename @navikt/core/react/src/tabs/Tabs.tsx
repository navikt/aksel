import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import Tab, { TabType } from "./Tab";
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
   * Automatically activates tab on focus/navigation
   * @default false
   */
  selectionFollowsFocus?: boolean;
}

interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  Tab: TabType;
  List: ListType;
  Panel: PanelType;
}

interface TabsContextProps {
  size: "medium" | "small";
}

export const TabsContext = createContext<TabsContextProps | null>(null);

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      children,
      onChange,
      size = "medium",
      selectionFollowsFocus = false,
      ...rest
    },
    ref
  ) => {
    return (
      <RadixTabs.Root
        {...rest}
        ref={ref}
        className={cl("navds-tabs", className, `navds-tabs--${size}`)}
        activationMode={selectionFollowsFocus ? "automatic" : "manual"}
        onValueChange={onChange}
      >
        <TabsContext.Provider
          value={{
            size,
          }}
        >
          {children}
        </TabsContext.Provider>
      </RadixTabs.Root>
    );
  }
) as TabsComponent;

Tabs.Tab = Tab;
Tabs.List = List;
Tabs.Panel = Panel;

export default Tabs;

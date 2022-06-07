import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import Tab, { TabType } from "./Tab";
import TabList, { TabListType } from "./TabList";
import TabPanel, { TabPanelType } from "./TabPanel";

export interface TabsProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "dir"> {
  children: React.ReactNode;
  /**
   * Changes padding and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * onChange callback for selected Tab
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
  /**
   * Loops back to start when navigating past last item
   * @default false
   */
  loop?: boolean;
}

interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  Tab: TabType;
  List: TabListType;
  Panel: TabPanelType;
}

interface TabsContextProps {
  size: "medium" | "small";
  loop: boolean;
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
      loop = false,
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
            loop,
          }}
        >
          {children}
        </TabsContext.Provider>
      </RadixTabs.Root>
    );
  }
) as TabsComponent;

Tabs.Tab = Tab;
Tabs.List = TabList;
Tabs.Panel = TabPanel;

export default Tabs;

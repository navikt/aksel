import cl from "clsx";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import Tab, { TabType } from "./Tab";
import TabList, { TabListType } from "./TabList";
import TabPanel, { TabPanelType } from "./TabPanel";
import { useSizeManager } from "../app-provider/hooks";

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
  /**
   * Icon position in Tab
   * @default "left"
   */
  iconPosition?: "left" | "top";
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
  iconPosition: "left" | "top";
}

export const TabsContext = createContext<TabsContextProps | null>(null);

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      children,
      onChange,
      size,
      selectionFollowsFocus = false,
      loop = false,
      iconPosition = "left",
      ...rest
    },
    ref
  ) => {
    const sizeCtx = useSizeManager<TabsProps["size"]>(size);

    return (
      <RadixTabs.Root
        {...rest}
        ref={ref}
        className={cl("navds-tabs", className, `navds-tabs--${sizeCtx}`)}
        activationMode={selectionFollowsFocus ? "automatic" : "manual"}
        onValueChange={onChange}
      >
        <TabsContext.Provider
          value={{
            size: sizeCtx,
            loop,
            iconPosition,
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

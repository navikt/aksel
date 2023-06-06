import cl from "clsx";
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

/**
 * A component that displays a set of tabs that can be used to switch between different views.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/tabs)
 * @see 🏷️ {@link TabsProps}
 *
 * @example
 * ```jsx
 * <Tabs defaultValue="logg">
 *   <Tabs.List>
 *     <Tabs.Tab value="logg" label="Logg" />
 *     <Tabs.Tab value="inbox" label="Inbox" />
 *     <Tabs.Tab value="sendt" label="Sendt" />
 *   </Tabs.List>
 *   <Tabs.Panel value="logg" className="h-24 w-full bg-gray-50 p-4">
 *     Logg-tab
 *   </Tabs.Panel>
 *   <Tabs.Panel value="inbox" className="h-24 w-full bg-gray-50 p-4">
 *     Inbox-tab
 *   </Tabs.Panel>
 *   <Tabs.Panel value="sendt" className="h-24  w-full bg-gray-50 p-4">
 *     Sendt-tab
 *   </Tabs.Panel>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      children,
      onChange,
      size = "medium",
      selectionFollowsFocus = false,
      loop = false,
      iconPosition = "left",
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

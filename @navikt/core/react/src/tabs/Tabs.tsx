import React, { forwardRef } from "react";
import { cl } from "../util/className";
import {
  TabsDescendantsProvider,
  TabsProvider,
  useTabsDescendants,
} from "./Tabs.context";
import { TabsProps } from "./Tabs.types";
import Tab from "./parts/tab/Tab";
import TabList from "./parts/tablist/TabList";
import TabPanel from "./parts/tabpanel/TabPanel";
import { useTabs } from "./useTabs";

interface TabsComponent
  extends React.ForwardRefExoticComponent<
    TabsProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link TabProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Tab: typeof Tab;
  /**
   * @see 🏷️ {@link TabListProps}
   */
  List: typeof TabList;
  /**
   * @see 🏷️ {@link TabPanelProps}
   */
  Panel: typeof TabPanel;
}

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
 *   <Tabs.Panel value="logg">
 *     Logg-tab
 *   </Tabs.Panel>
 *   <Tabs.Panel value="inbox">
 *     Inbox-tab
 *   </Tabs.Panel>
 *   <Tabs.Panel value="sendt">
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
      size = "medium",
      defaultValue = "",
      value,
      onChange,
      id,
      selectionFollowsFocus = false,
      loop = true,
      iconPosition = "left",
      fill = false,
      ...rest
    },
    ref,
  ) => {
    const descendants = useTabsDescendants();

    const tabsContext = useTabs({ defaultValue, value, onChange, id });

    /**
     * TabsProvider handles memoization of context values, so we can safely skip it here.
     */
    const context = {
      ...tabsContext,
      selectionFollowsFocus,
      loop,
      size,
      iconPosition,
      fill,
    };

    return (
      <TabsDescendantsProvider value={descendants}>
        <TabsProvider {...context}>
          <div
            ref={ref}
            {...rest}
            id={id}
            className={cl("aksel-tabs", className, `aksel-tabs--${size}`)}
          >
            {children}
          </div>
        </TabsProvider>
      </TabsDescendantsProvider>
    );
  },
) as TabsComponent;

Tabs.Tab = Tab;
Tabs.List = TabList;
Tabs.Panel = TabPanel;

export default Tabs;

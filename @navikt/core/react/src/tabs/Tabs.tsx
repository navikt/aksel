import cl from "clsx";
import React, { forwardRef, useMemo } from "react";
import {
  TabsDescendantsProvider,
  TabsProvider,
  useTabsDescendants,
} from "./context";
import TabPanel from "./parts/TabPanel";
import Tab from "./parts/tab/Tab";
import TabList from "./parts/tablist/TabList";
import { TabsProps } from "./types";
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
      size = "medium",
      defaultValue = "",
      value,
      onChange,
      id,
      selectionFollowsFocus = false,
      loop = true,
      iconPosition = "left",
      ...rest
    },
    ref,
  ) => {
    const descendants = useTabsDescendants();

    const tabsContext = useTabs({ defaultValue, value, onChange, id });

    const context = useMemo(
      () => ({
        ...tabsContext,
        selectionFollowsFocus,
        loop,
        size,
        iconPosition,
      }),
      [iconPosition, loop, selectionFollowsFocus, size, tabsContext],
    );

    return (
      <TabsDescendantsProvider value={descendants}>
        <TabsProvider value={context}>
          <div
            ref={ref}
            {...rest}
            id={id}
            className={cl("navds-tabs", className, `navds-tabs--${size}`)}
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

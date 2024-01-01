import cl from "clsx";
import React, { forwardRef, useMemo } from "react";
import Tab from "./Tab";
import TabPanel from "./TabPanel";
import TabsList from "./TabsList";
import { TabsProps } from "./types";
import {
  InternalTabsProvider,
  TabsDescendantsProvider,
  TabsProvider,
  useTabs,
} from "./use-tabs";

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
  List: typeof TabsList;
  /**
   * @see 🏷️ {@link TabPanelProps}
   */
  Panel: typeof TabPanel;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    { className, children, iconPosition = "left", size = "medium", ...rest },
    ref
  ) => {
    const { htmlProps, descendants, ...ctx } = useTabs(rest);

    const context = useMemo(() => ctx, [ctx]);

    return (
      <TabsDescendantsProvider value={descendants}>
        <TabsProvider value={context}>
          <InternalTabsProvider value={{ iconPosition, size }}>
            <div
              className={cl("navds-tabs", className, `navds-tabs--${size}`)}
              ref={ref}
              {...htmlProps}
            >
              {children}
            </div>
          </InternalTabsProvider>
        </TabsProvider>
      </TabsDescendantsProvider>
    );
  }
) as TabsComponent;

Tabs.Tab = Tab;
Tabs.List = TabsList;
Tabs.Panel = TabPanel;

export default Tabs;

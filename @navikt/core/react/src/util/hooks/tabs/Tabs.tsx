import cl from "clsx";
import React, { HTMLAttributes, forwardRef, useMemo } from "react";
import Tab from "./Tab";
import TabPanel from "./TabPanel";
import TabsList from "./TabsList";
import { TabsDescendantsProvider, TabsProvider, useTabs } from "./use-tabs";

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
  ({ className, children, size = "medium", ...rest }, ref) => {
    const { htmlProps, descendants, ...ctx } = useTabs(rest);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isFitted: _, ...rootProps } = htmlProps as any;

    const context = useMemo(() => ctx, [ctx]);

    return (
      <TabsDescendantsProvider value={descendants}>
        <TabsProvider value={context}>
          <div
            className={cl("navds-tabs", className, `navds-tabs--${size}`)}
            ref={ref}
            {...rootProps}
          >
            {children}
          </div>
        </TabsProvider>
      </TabsDescendantsProvider>
    );
  }
) as TabsComponent;

Tabs.Tab = Tab;
Tabs.List = TabsList;
Tabs.Panel = TabPanel;

export default Tabs;

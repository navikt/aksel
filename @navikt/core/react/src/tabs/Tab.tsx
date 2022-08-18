import * as RadixTabs from "@radix-ui/react-tabs";
import cl from "clsx";
import React, { forwardRef, useContext } from "react";
import { BodyShort, OverridableComponent } from "..";
import { TabsContext } from "./Tabs";

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Tab label
   */
  label?: React.ReactNode;
  /**
   * Tab Icon
   */
  icon?: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}

export type TabType = OverridableComponent<TabProps, HTMLButtonElement>;

export const Tab: TabType = forwardRef(
  (
    { className, as: Component = "button", label, icon, value, ...rest },
    ref
  ) => {
    const context = useContext(TabsContext);

    if (!label && !icon) {
      console.error("<Tabs.Tab/> needs label/icon");
      return null;
    }

    return (
      <RadixTabs.Trigger value={value} asChild>
        <Component
          ref={ref}
          className={cl(
            "navds-tabs__tab",
            `navds-tabs__tab--${context?.size ?? "medium"}`,
            `navds-tabs__tab-icon--${context?.iconPosition}`,
            className,
            {
              "navds-tabs__tab--icon-only": icon && !label,
            }
          )}
          {...rest}
        >
          <BodyShort
            as="span"
            className="navds-tabs__tab-inner"
            size={context?.size}
          >
            {icon}
            {label}
          </BodyShort>
        </Component>
      </RadixTabs.Trigger>
    );
  }
);

export default Tab;

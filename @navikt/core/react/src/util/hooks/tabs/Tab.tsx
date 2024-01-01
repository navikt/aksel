import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort } from "../../../typography";
import { OverridableComponent } from "../../OverridableComponent";
import { useInternalTabsContext, useTab } from "./use-tabs";

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

export const Tab: OverridableComponent<TabProps, HTMLButtonElement> =
  forwardRef(
    (
      { className, as: Component = "button", label, icon, ...rest },
      ref: React.ForwardedRef<HTMLButtonElement>
    ) => {
      const tabProps = useTab(rest, ref);
      const context = useInternalTabsContext();

      if (!label && !icon) {
        console.error("<Tabs.Tab/> needs label/icon");
        return null;
      }

      return (
        <Component
          {...tabProps}
          className={cl(
            "navds-tabs__tab",
            `navds-tabs__tab--${context?.size ?? "medium"}`,
            `navds-tabs__tab-icon--${context?.iconPosition}`,
            className,
            {
              "navds-tabs__tab--icon-only": icon && !label,
            }
          )}
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
      );
    }
  );

export default Tab;

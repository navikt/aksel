import * as RadixTabs from "@radix-ui/react-tabs";
import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { Label } from "..";
import { TabsContext } from "./Tabs";

export interface TabProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * Content
   */
  label?: React.ReactNode;
  /**
   * Icon
   */
  icon?: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
  /**
   * Icon position
   * @default "left"
   */
  iconPosition?: "left" | "top";
}

export type TabType = React.ForwardRefExoticComponent<
  TabProps & React.RefAttributes<HTMLButtonElement>
>;

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, label, icon, iconPosition, ...rest }, ref) => {
    const context = useContext(TabsContext);

    if (!label && !icon) {
      console.error("<Tabs.Tab/> needs label/icon");
      return null;
    }

    return (
      <RadixTabs.Trigger
        {...rest}
        ref={ref}
        className={cl(
          "navds-tabs__tab",
          `navds-tabs__tab--${context?.size ?? "medium"}`,
          `navds-tabs__tab-icon--${iconPosition}`,
          className,
          {
            "navds-tabs__tab--icon-only": icon && !label,
          }
        )}
      >
        <Label as="span" className="navds-tabs__tab-inner" size={context?.size}>
          {icon}
          {label}
        </Label>
      </RadixTabs.Trigger>
    );
  }
) as TabType;

export default Tab;

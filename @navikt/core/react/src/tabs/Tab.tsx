import * as RadixTabs from "@radix-ui/react-tabs";
import cl from "classnames";
import React, { forwardRef, useContext } from "react";
import { Label, BodyShort } from "..";
import { TabsContext } from "./Tabs";

export interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Content
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
  /**
   * Vertically stacks content in tab
   * @default false
   */
  vertical?: boolean;
}

export type TabType = React.ForwardRefExoticComponent<
  TabProps & React.RefAttributes<HTMLButtonElement>
>;

const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, children, vertical, ...rest }, ref) => {
    const context = useContext(TabsContext);

    const Typo = context?.fontWeight === "semibold" ? Label : BodyShort;

    return (
      <RadixTabs.Trigger
        {...rest}
        ref={ref}
        className={cl(
          "navds-tabs__tab",
          `navds-tabs__tab--${context?.size ?? "medium"}`,
          className,
          {
            "navds-tabs__tab--vertical": vertical,
            "navds-tabs__tab--icon-only": context?.iconOnly,
          }
        )}
      >
        <Typo as="span" className="navds-tabs__tab-inner" size={context?.size}>
          {children}
        </Typo>
      </RadixTabs.Trigger>
    );
  }
) as TabType;

export default Tab;

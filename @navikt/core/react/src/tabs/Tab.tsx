import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { Label } from "..";
import { TabsContext } from "./Tabs";
import * as RadixTabs from "@radix-ui/react-tabs";

export interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Content
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
  /**
   * Vertically stacks content in trigger
   * @default false
   */
  vertical?: boolean;
}

export type TriggerType = React.ForwardRefExoticComponent<
  TriggerProps & React.RefAttributes<HTMLButtonElement>
>;

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, vertical, ...rest }, ref) => {
    const context = useContext(TabsContext);

    return (
      <RadixTabs.Trigger
        {...rest}
        ref={ref}
        className={cl(
          "navds-tabs__trigger",
          `navds-tabs__trigger--${context?.size ?? "medium"}`,
          className,
          {
            "navds-tabs__trigger--vertical": vertical,
            "navds-tabs__trigger--icon-only": context?.iconOnly,
          }
        )}
      >
        <Label
          as="span"
          className="navds-tabs__trigger-inner"
          size={context?.size}
        >
          {children}
        </Label>
      </RadixTabs.Trigger>
    );
  }
) as TriggerType;

export default Trigger;

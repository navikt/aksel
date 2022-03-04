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
}

export type TriggerType = React.ForwardRefExoticComponent<
  TriggerProps & React.RefAttributes<HTMLButtonElement>
>;

const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, children, ...rest }, ref) => {
    const context = useContext(TabsContext);

    return (
      <RadixTabs.Trigger
        {...rest}
        ref={ref}
        className={cl("navds-tabs__trigger", className)}
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

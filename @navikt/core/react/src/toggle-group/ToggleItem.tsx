import React, { forwardRef, useContext } from "react";
import cl from "clsx";
import { BodyShort } from "../typography/BodyShort";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { ToggleGroupContext } from "./ToggleGroup";

export interface ToggleItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Content
   */
  children: React.ReactNode;
  /**
   * Value for state-handling
   */
  value: string;
}

export type ToggleItemType = React.ForwardRefExoticComponent<
  ToggleItemProps & React.RefAttributes<HTMLButtonElement>
>;

const ToggleItem = forwardRef<HTMLButtonElement, ToggleItemProps>(
  ({ className, children, ...rest }, ref) => {
    const context = useContext(ToggleGroupContext);

    return (
      <RadixToggleGroup.Item
        {...rest}
        ref={ref}
        className={cl("navds-toggle-group__button", className)}
      >
        <BodyShort
          as="span"
          className="navds-toggle-group__button-inner"
          size={context?.size}
        >
          {children}
        </BodyShort>
      </RadixToggleGroup.Item>
    );
  }
) as ToggleItemType;

export default ToggleItem;

import React, { forwardRef, useContext } from "react";
import cl from "classnames";
import { BodyShort, ToggleGroupContext } from "..";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";

export interface ToggleItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Modal.Content content
   */
  children: React.ReactNode;
  /**
   * Button value to keep track of state
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
        role="tab"
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

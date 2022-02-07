import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import ToggleItem, { ToggleItemType } from "./ToggleItem";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";

export interface ToggleGroupProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange" | "dir" | "defaultValue"
  > {
  /**
   * Toggles.Button elements
   */
  children: React.ReactNode;
  /**
   * Changes padding and font-size
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * Controlled selected value
   */
  value: string;
  /**
   * Returns elements that wants to be active
   */
  onValueChange: (value: string) => void;
}

interface ToggleGroupComponent
  extends React.ForwardRefExoticComponent<
    ToggleGroupProps & React.RefAttributes<HTMLDivElement>
  > {
  Item: ToggleItemType;
}

interface ToggleContextProps {
  size: "medium" | "small";
}

export const ToggleGroupContext = createContext<ToggleContextProps | null>(
  null
);

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, children, onValueChange, size = "medium", ...rest }, ref) => {
    const handleValueChange = (v: string) => {
      v !== "" && onValueChange(v);
    };

    return (
      <ToggleGroupContext.Provider
        value={{
          size,
        }}
      >
        <RadixToggleGroup.Root
          {...rest}
          onValueChange={handleValueChange}
          ref={ref}
          className={cl("navds-toggle", className, `navds-toggle--${size}`)}
          role="tablist"
          type="single"
        >
          {children}
        </RadixToggleGroup.Root>
      </ToggleGroupContext.Provider>
    );
  }
) as ToggleGroupComponent;

ToggleGroup.Item = ToggleItem;

export default ToggleGroup;

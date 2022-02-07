import cl from "classnames";
import React, { createContext, forwardRef, HTMLAttributes } from "react";
import ToggleItem, { ToggleItemType } from "./ToggleItem";
import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { Label, useId } from "..";

export interface ToggleGroupProps
  extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "onChange" | "dir" | "defaultValue"
  > {
  /**
   * Toggles.Item elements
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
  /**
   * Label describing ToggleGroup
   */
  label?: React.ReactNode;
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
  (
    {
      className,
      children,
      onValueChange,
      size = "medium",
      label,
      id,
      "aria-describedby": desc,
      ...rest
    },
    ref
  ) => {
    const labelId = `toggle-group-label-${useId()}`;

    const handleValueChange = (v: string) => {
      v !== "" && onValueChange(v);
    };

    return (
      <ToggleGroupContext.Provider
        value={{
          size,
        }}
      >
        <div>
          {label && (
            <Label
              size={size}
              className="navds-toggle-group__label"
              id={labelId}
            >
              {label}
            </Label>
          )}
          <RadixToggleGroup.Root
            {...rest}
            onValueChange={handleValueChange}
            ref={ref}
            className={cl(
              "navds-toggle-group",
              className,
              `navds-toggle-group--${size}`
            )}
            aria-describedby={cl({ [desc ?? ""]: !!desc, [labelId]: !!label })}
            role="tablist"
            type="single"
          >
            {children}
          </RadixToggleGroup.Root>
        </div>
      </ToggleGroupContext.Provider>
    );
  }
) as ToggleGroupComponent;

ToggleGroup.Item = ToggleItem;

export default ToggleGroup;

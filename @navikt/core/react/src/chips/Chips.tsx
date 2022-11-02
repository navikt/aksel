import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import FilterChips, { FilterChipsType } from "./Filter";
import RemovableChips, { RemovableChipsType } from "./Removable";

export interface ChipsProps extends HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface ChipsComponent
  extends React.ForwardRefExoticComponent<
    ChipsProps & React.RefAttributes<HTMLUListElement>
  > {
  Filter: FilterChipsType;
  Removable: RemovableChipsType;
}

export const Chips: ChipsComponent = forwardRef<HTMLUListElement, ChipsProps>(
  ({ className, size = "medium", children, ...rest }, ref) => {
    return (
      <ul
        {...rest}
        ref={ref}
        className={cl("navds-chips", className, `navds-chips--${size}`, {
          "navds-body-short navds-body-short--small": size === "medium",
          "navds-detail navds-detail--small": size === "small",
        })}
      >
        {React.Children.map(children, (chip, index) => {
          return <li key={index + (chip?.toString() ?? "")}>{chip}</li>;
        })}
      </ul>
    );
  }
) as ChipsComponent;

Chips.Filter = FilterChips;
Chips.Removable = RemovableChips;

export default Chips;

import React, { forwardRef, HTMLAttributes } from "react";
import cl from "clsx";
import { BodyShort, Detail } from "..";
import FilterChips, { FilterChipsType } from "./Filter";
import InputChips, { InputChipsType } from "./Input";

export interface ChipsProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Changes padding and font-sizes
   * @default "medium"
   */
  size?: "medium" | "small";
}

interface ChipsComponent
  extends React.ForwardRefExoticComponent<
    ChipsProps & React.RefAttributes<HTMLDivElement>
  > {
  Filter: FilterChipsType;
  Input: InputChipsType;
}

export const Chips: ChipsComponent = forwardRef<HTMLDivElement, ChipsProps>(
  ({ className, size = "medium", ...rest }, ref) => {
    const Component = size === "medium" ? BodyShort : Detail;

    return (
      <Component
        {...rest}
        ref={ref}
        as="div"
        size="small"
        className={cl("navds-chips", className, `navds-chips--${size}`)}
      />
    );
  }
) as ChipsComponent;

Chips.Filter = FilterChips;
Chips.Input = InputChips;

export default Chips;

import { SuccessStroke } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "..";

export interface FilterChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  /**
   *
   */
  onSelect?: () => void;
  /**
   *
   */
  selected?: boolean;
}

export const FilterChips: OverridableComponent<
  FilterChipsProps,
  HTMLButtonElement
> = forwardRef(
  (
    { className, children, selected, as: Component = "button", ...rest },
    ref
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-chips__chip navds-chips__filter", className)}
        aria-pressed={selected}
      >
        {selected && <SuccessStroke aria-hidden />}
        {children}
      </Component>
    );
  }
);

export default FilterChips;

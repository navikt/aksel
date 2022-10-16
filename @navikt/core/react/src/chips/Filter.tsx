import { SuccessStroke } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { OverridableComponent } from "..";

export interface FilterChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export const FilterChips: OverridableComponent<
  FilterChipsProps,
  HTMLButtonElement
> = forwardRef(
  ({ className, children, as: Component = "button", ...rest }, ref) => {
    const [active, setActive] = useState(false);

    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-chips__chip navds-chips__filter", className)}
        onClick={() => setActive((x) => !x)}
        aria-pressed={active}
      >
        {active && <SuccessStroke aria-hidden />}
        {children}
      </Component>
    );
  }
);

export default FilterChips;

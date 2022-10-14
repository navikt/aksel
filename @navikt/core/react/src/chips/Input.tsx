import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "..";

export interface InputChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export interface InputChipsType
  extends OverridableComponent<InputChipsProps, HTMLButtonElement> {}

export const InputChips: OverridableComponent<
  InputChipsProps,
  HTMLButtonElement
> = forwardRef(
  ({ className, children, as: Component = "button", ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-chips__chip navds-chips__input", className)}
      >
        {children}
        <Close aria-hidden />
      </Component>
    );
  }
) as InputChipsType;

export default InputChips;

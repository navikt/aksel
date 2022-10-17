import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "..";

export interface RemovableChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export interface RemovableChipsType
  extends OverridableComponent<RemovableChipsProps, HTMLButtonElement> {}

export const RemovableChips: OverridableComponent<
  RemovableChipsProps,
  HTMLButtonElement
> = forwardRef(
  ({ className, children, as: Component = "button", ...rest }, ref) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl("navds-chips__chip navds-chips__removable", className)}
      >
        {children}
        <Close aria-hidden />
      </Component>
    );
  }
) as RemovableChipsType;

export default RemovableChips;

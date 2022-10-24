import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "..";

export interface RemovableChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  variant?: "action" | "neutral";
}

export interface RemovableChipsType
  extends OverridableComponent<RemovableChipsProps, HTMLButtonElement> {}

export const RemovableChips: OverridableComponent<
  RemovableChipsProps,
  HTMLButtonElement
> = forwardRef(
  (
    {
      className,
      children,
      variant = "action",
      as: Component = "button",
      ...rest
    },
    ref
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        className={cl(
          "navds-chips__chip navds-chips__removable navds-chips--icon-right",
          className,
          `navds-chips__removable--${variant}`
        )}
      >
        <span className="navds-chips__chip-text">{children}</span>
        <span className="navds-chips__icon">
          <Close aria-hidden />
        </span>
      </Component>
    );
  }
) as RemovableChipsType;

export default RemovableChips;

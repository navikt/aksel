import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "..";

export interface RemovableChipsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  /**
   * Chip-variants
   * @default "action"
   */
  variant?: "action" | "neutral";
  /**
   * Replaces label read for screen-readers
   * @default "slett filter"
   */
  removeAriaLabel?: string;
  /**
   * Click callback
   */
  onDelete?: () => void;
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
      removeAriaLabel = "slett",
      onDelete,
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
        aria-label={`${children} ${removeAriaLabel}`}
        onClick={(e) => {
          onDelete?.();
          rest?.onClick?.(e);
        }}
      >
        <span className="navds-chips__chip-text">{children}</span>
        <span className="navds-chips__removable-icon">
          <Close aria-hidden />
        </span>
      </Component>
    );
  }
) as RemovableChipsType;

export default RemovableChips;

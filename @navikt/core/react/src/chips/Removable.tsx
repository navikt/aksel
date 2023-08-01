import { XMarkIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef } from "react";
import { OverridableComponent } from "../util/OverridableComponent";

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
  removeLabel?: string;
  /**
   * Click callback
   */
  onDelete?: () => void;
}

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
      removeLabel = "slett",
      onDelete,
      type = "button",
      ...rest
    },
    ref
  ) => {
    return (
      <Component
        {...rest}
        ref={ref}
        type={type}
        className={cl(
          "navds-chips__chip navds-chips__removable navds-chips--icon-right",
          className,
          `navds-chips__removable--${variant}`
        )}
        aria-label={`${children} ${removeLabel}`}
        onClick={(e) => {
          onDelete?.();
          rest?.onClick?.(e);
        }}
      >
        <span className="navds-chips__chip-text">{children}</span>
        <span className="navds-chips__removable-icon">
          <XMarkIcon aria-hidden />
        </span>
      </Component>
    );
  }
);

export default RemovableChips;

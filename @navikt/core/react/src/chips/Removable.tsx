import { XMarkIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, { forwardRef } from "react";

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

export const RemovableChips = forwardRef<
  HTMLButtonElement,
  RemovableChipsProps
>(
  (
    {
      className,
      children,
      variant = "action",
      removeLabel = "slett",
      onDelete,
      type = "button",
      ...rest
    },
    ref
  ) => {
    return (
      <button
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
      </button>
    );
  }
);

export default RemovableChips;

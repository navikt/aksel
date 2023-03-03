import React, { forwardRef } from "react";
import cl from "clsx";

export interface StatusBadgeProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Changes visuals of status
   * @default neutral
   */
  variant?: "warning" | "error" | "info" | "success" | "neutral";
  /**
   * @default "marker"
   */
  shape?: "marker" | "count" | "label";
  /**
   *
   */
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   *
   * @default false
   */
  pulse?: boolean;
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      className,
      children,
      variant = "neutral",
      shape = "marker",
      position,
      pulse = false,
      ...rest
    },
    ref
  ) => {
    return (
      <span
        {...rest}
        ref={ref}
        className={cl(
          "navds-statusbadge",
          className,
          `navds-statusbadge--${variant}`,
          `navds-statusbadge--${shape}`,
          {
            [`navds-statusbadge--${position}`]: !!position,
            "navds-statusbadge--pulse": pulse,
          }
        )}
        children={shape === "label" || shape === "count" ? children : null}
      />
    );
  }
);

export default StatusBadge;

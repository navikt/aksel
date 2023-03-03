import React, { forwardRef } from "react";
import cl from "clsx";

export interface StatusBadgeProps {
  children?: React.ReactNode;
  className?: string;
  /**
   * Changes visuals of status
   * @default neutral
   */
  variant?:
    | "warning"
    | "error"
    | "info"
    | "success"
    | "neutral"
    | "alt1"
    | "alt2"
    | "alt3";
  /**
   * @default "marker"
   */
  shape?: "marker" | "count";
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
        children={shape === "count" ? children : null}
      />
    );
  }
);

export default StatusBadge;

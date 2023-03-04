import React, { forwardRef } from "react";
import cl from "clsx";

export interface NotificationBadgeProps {
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

export const NotificationBadge = forwardRef<
  HTMLSpanElement,
  NotificationBadgeProps
>(
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
          "navds-notificationbadge",
          className,
          `navds-notificationbadge--${variant}`,
          `navds-notificationbadge--${shape}`,
          {
            [`navds-notificationbadge--${position}`]: !!position,
            "navds-notificationbadge--pulse": pulse,
          }
        )}
        children={shape === "count" ? children : null}
      />
    );
  }
);

export default NotificationBadge;

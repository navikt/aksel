import React, { HTMLAttributes, forwardRef } from "react";
import cl from "clsx";

export interface NotificationBadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  className?: string;
  absolute?: boolean;
  /**
   *
   * @default false
   */
  pulse?: boolean;
}

export const NotificationBadge = forwardRef<
  HTMLSpanElement,
  NotificationBadgeProps
>(({ className, children, absolute = false, pulse = false, ...rest }, ref) => {
  return (
    <sup className="navds-notificationbadge__wrapper">
      <span
        {...rest}
        ref={ref}
        className={cl("navds-notificationbadge", className, {
          "navds-notificationbadge--pulse": pulse,
          "navds-notificationbadge--count": !!children,
          "navds-notificationbadge--marker": !children,
        })}
      >
        {children}
      </span>
    </sup>
  );
});

export default NotificationBadge;

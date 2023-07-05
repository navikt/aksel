import React, { HTMLAttributes, forwardRef } from "react";
import cl from "clsx";

export interface NotificationBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  count?: Number;
  maxCount?: Number;
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
>(
  (
    {
      className,
      absolute = false,
      pulse = false,
      maxCount = 500,
      count,
      ...rest
    },
    ref
  ) => {
    const getCount = () => {
      if (!count) {
        return null;
      }
      if (count <= maxCount) {
        return `${count}`;
      }
      return `${maxCount}+`;
    };
    return (
      <sup className="navds-notificationbadge__wrapper">
        <span
          {...rest}
          ref={ref}
          className={cl("navds-notificationbadge", className, {
            "navds-notificationbadge--pulse": pulse,
            "navds-notificationbadge--count": !!count,
            "navds-notificationbadge--marker": !count,
          })}
        >
          {getCount()}
        </span>
      </sup>
    );
  }
);

export default NotificationBadge;

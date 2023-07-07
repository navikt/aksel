import React, { HTMLAttributes, forwardRef } from "react";
import cl from "clsx";
import CounterTag from "./CounterTag";

export interface NotificationTagProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  count?: Number;
  maxCount?: Number;
  className?: string;
  /**
   *
   * @default false
   */
  pulse?: boolean;
}

export const NotificationTag = forwardRef<
  HTMLSpanElement,
  NotificationTagProps
>(({ className, pulse = false, maxCount = 500, count, ...rest }, ref) => {
  return (
    <sup
      ref={ref}
      {...rest}
      className={cl("navds-notification-tag", className, {
        "navds-notification-tag--pulse": pulse,
        "navds-notification-tag--count": !!count,
        "navds-notification-tag--marker": !count,
      })}
    >
      <CounterTag count={count} shape="circle" variant="error-filled" />
    </sup>
  );
});

export default NotificationTag;

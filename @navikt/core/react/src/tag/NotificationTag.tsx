import cl from "clsx";
import React, { forwardRef } from "react";
import CounterTag, { CounterTagProps } from "./CounterTag";

export interface NotificationTagProps
  extends Omit<CounterTagProps, "children" | "variant"> {
  /**
   *  Adds a sublte pulse-animation to the tag
   * @default false
   */
  pulse?: boolean;
}

export const NotificationTag = forwardRef<
  HTMLSpanElement,
  NotificationTagProps
>(({ className, pulse = false, maxCount = 99, count, ...rest }, ref) => {
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
      <CounterTag
        count={count}
        maxCount={maxCount}
        shape="circle"
        variant="error-filled"
      />
    </sup>
  );
});

export default NotificationTag;

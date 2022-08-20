import cl from "clsx";
import React, { forwardRef } from "react";

export interface DatePickerPanelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const DatePickerPanel = forwardRef<HTMLDivElement, DatePickerPanelProps>(
  ({ children, className, open, ...rest }, ref) => (
    <div
      {...rest}
      ref={ref}
      className={cl("navds-datepicker-panel", className, {
        "navds-datepicker-panel--open": open,
      })}
    ></div>
  )
);

export default DatePickerPanel;

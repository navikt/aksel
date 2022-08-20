import cl from "clsx";
import React, { forwardRef } from "react";

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Changes padding and font-sizes
   * @default medium
   */
  size?: "medium" | "small";
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className, size = "medium", ...rest }, ref) => (
    <div {...rest} ref={ref} className={cl(className, "navds-datepicker")}>
      tmp
    </div>
  )
);

export default DatePicker;

import React, { forwardRef } from "react";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Input: DatePickerInputType;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ children }, ref) => {
    /* const [open, setOpen] = useState(true); */

    return <div>{children}</div>;
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;

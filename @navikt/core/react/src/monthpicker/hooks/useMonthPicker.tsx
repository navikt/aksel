import { MonthPickerDefaultProps } from "../MonthPicker";
import { MonthPickerInputProps } from "../MonthPickerInput";

export interface UseMonthPickerOptions
  extends Pick<MonthPickerDefaultProps, "locale" | "fromDate" | "toDate"> {
  /** Make the selection required. */
  required?: boolean;
  /**
   * Opens monthpicker on input-focus
   * @default true
   */
  openOnFocus?: boolean;
}

interface UseMonthPickerValue {
  /**
   * Use: <MonthPicker {...monthpickerProps}/>
   */
  monthpickerProps: MonthPickerDefaultProps;
  /**
   * Use: <MonthPicker.Input {...inputProps}/>
   */
  inputProps: Pick<
    MonthPickerInputProps,
    "onChange" | "onFocus" | "onBlur" | "value" | "wrapperRef"
  >;
  /**
   * Resets all states
   */
  reset: () => void;
  /**
   * Selected month callback
   */
  selectedMonth?: Date;
  /**
   * Manually set selected month if needed
   */
  setSelected: (date?: Date) => void;
}

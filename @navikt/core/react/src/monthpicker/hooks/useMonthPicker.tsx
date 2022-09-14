import { useRef, useState } from "react";
import { isValidDate } from "../../datepicker/utils";
import { getLocaleFromString } from "../../datepicker/utils/locale";
import { MonthPickerProps } from "../MonthPicker";
import { MonthPickerInputProps } from "../MonthPickerInput";
import { getDefaultSelected } from "../utils/get-initial-month";
import { isMatch } from "../utils/is-match";
import { parseDate } from "../utils/parse-date";

export interface UseMonthPickerOptions
  extends Pick<
    MonthPickerProps,
    | "locale"
    | "fromDate"
    | "toDate"
    | "defaultSelected"
    | "disabled"
    | "dropdownCaption"
  > {
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
  monthpickerProps: MonthPickerProps;
  /**
   * Use: <MonthPicker.Input {...inputProps}/>
   */
  inputProps: Pick<
    MonthPickerInputProps,
    "onChange" | "onFocus" | "onBlur" | "value" | "wrapperRef"
  >;
  /**
   * Selected month callback
   */
  selectedMonth?: Date;
  /**
   * Manually set selected month if needed
   */
  setSelected: (date?: Date) => void;
}

export const useMonthPicker = (
  opt: UseMonthPickerOptions = {}
): UseMonthPickerValue => {
  const {
    locale: _locale = "nb",
    required,
    defaultSelected,
    fromDate = new Date(),
    toDate,
    openOnFocus = true,
    disabled = [],
    dropdownCaption = false,
  } = opt;

  const initialMonth = getDefaultSelected(
    disabled,
    dropdownCaption,
    fromDate,
    defaultSelected,
    toDate
  );

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const monthpickerRef = useRef<HTMLDivElement>(null);

  // Initialize states
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [year, setYear] = useState(selectedMonth);
  const [open, setOpen] = useState(false);

  const setSelected = (date: Date | undefined) => {
    date && setSelectedMonth(date);
    date && setYear(date);
  };

  const [inputValue, setInputValue] = useState("");

  const reset = () => {
    setSelectedMonth(initialMonth);
    setYear(initialMonth);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && openOnFocus && setOpen(true);
    if (!e.target.value) {
      reset();
      return;
    }
  };

  const handleMonthClick = () => {
    console.log("Month click!");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    let month = parseDate(e.target.value, selectedMonth, locale);
    if (!isValidDate(month) || isMatch(month, disabled)) {
      return;
    }
    setSelectedMonth(month);
    setYear(month);
  };

  const inputProps = {
    onFocus: handleFocus,
    value: inputValue,
    onChange: handleChange,
  };

  const monthpickerProps = {
    year,
    defaultSelected: selectedMonth,
    locale: _locale,
    fromDate,
    toDate,
    open,
    onClose: () => setOpen(false),
    onOpenToggle: () => setOpen((x) => !x),
    ref: monthpickerRef,
    disabled,
  };

  return { setSelected, selectedMonth, inputProps, monthpickerProps };
};

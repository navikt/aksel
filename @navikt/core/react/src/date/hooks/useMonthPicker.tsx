import React, { useRef, useState } from "react";
import { DateInputProps } from "../DateInput";
import { MonthPickerProps } from "../monthpicker/MonthPicker";
import {
  formatDateForInput,
  getLocaleFromString,
  isMatch,
  isValidDate,
  parseDate,
} from "../utils";
import { useEscape } from "./useEscape";
import { useOutsideClickHandler } from "./useOutsideClickHandler";

export interface UseMonthPickerOptions
  extends Pick<
    MonthPickerProps,
    "locale" | "fromDate" | "toDate" | "disabled" | "defaultSelected"
  > {
  /**
   * Make Date-selection required
   */
  required?: boolean;
  /**
   * Callback for month-change
   */
  onMonthChange?: (date?: Date) => void;
  /**
   * Input-format
   * @default "MMMM yyyy"
   */
  inputFormat?: string;
  /**
   * validation-callback
   */
  onValidate?: (val: MonthValidationT) => void;
  /**
   * Default shown year
   */
  defaultYear?: Date;
  /**
   * Allows input of with 'yy' year format.
   * @default true
   * @Note Decision between 20th and 21st century is based on before(todays year - 80) ? 21st : 20th.
   * In 2023 this equals to 1943 - 2042
   */
  allowTwoDigitYear?: boolean;
  /**
   * Opens datepicker on input-focus
   * @default true
   */
  openOnFocus?: boolean;
}

interface UseMonthPickerValue {
  /**
   * Use: <MonthPicker {...monthpickerProps} />
   */
  monthpickerProps: MonthPickerProps;
  /**
   * Use: <MonthPicker.Input {...inputProps} />
   */
  inputProps: Pick<DateInputProps, "onChange" | "onFocus" | "value"> & {
    ref: React.RefObject<HTMLInputElement>;
  };
  /**
   * Currently selected Date
   * Up to user to validate value and extract month
   */
  selectedMonth?: Date;
  /**
   * Manually set selected month if needed
   */
  setSelected: (date?: Date) => void;
  /**
   * Resets all states
   */
  reset: () => void;
}

export type MonthValidationT = {
  isDisabled: boolean;
  isEmpty: boolean;
  isInvalid: boolean;
  isValidMonth: boolean;
  isBefore: boolean;
  isAfter: boolean;
};

const getValidationMessage = (val = {}): MonthValidationT => ({
  isDisabled: false,
  isEmpty: false,
  isInvalid: false,
  isBefore: false,
  isAfter: false,
  isValidMonth: true,
  ...val,
});

export const useMonthpicker = (
  opt: UseMonthPickerOptions = {}
): UseMonthPickerValue => {
  const {
    locale: _locale = "nb",
    defaultSelected: _defaultSelected,
    fromDate,
    toDate,
    disabled,
    required,
    onMonthChange,
    inputFormat,
    onValidate,
    defaultYear,
    allowTwoDigitYear = true,
    openOnFocus = true,
  } = opt;

  const [defaultSelected, setDefaultSelected] = useState(_defaultSelected);

  const today = new Date();
  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLInputElement>(null);
  const [monthpickerRef, setMonthpickerRef] = useState<HTMLDivElement>();

  // Initialize states
  const [year, setYear] = useState(defaultSelected ?? defaultYear ?? today);
  const [selectedMonth, setSelectedMonth] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "month", inputFormat)
    : "";

  const [inputValue, setInputValue] = useState(defaultInputValue);

  useOutsideClickHandler(open, setOpen, [
    monthpickerRef,
    inputRef.current,
    inputRef.current?.nextSibling,
  ]);

  useEscape(open, setOpen, inputRef);

  const updateMonth = (date?: Date) => {
    onMonthChange?.(date);
    setSelectedMonth(date);
  };

  const updateValidation = (val: Partial<MonthValidationT> = {}) =>
    onValidate?.(getValidationMessage(val));

  const reset = () => {
    updateMonth(defaultSelected);
    setYear(defaultSelected ?? defaultYear ?? today);
    setInputValue(defaultInputValue ?? "");
    setDefaultSelected(_defaultSelected);
  };

  const setSelected = (date: Date | undefined) => {
    updateMonth(date);
    setYear(date ?? defaultYear ?? today);
    setInputValue(
      date ? formatDateForInput(date, locale, "month", inputFormat) : ""
    );
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && openOnFocus && setOpen(true);
    let day = parseDate(
      e.target.value,
      today,
      locale,
      "month",
      allowTwoDigitYear
    );
    if (isValidDate(day)) {
      setYear(day);
      setInputValue(formatDateForInput(day, locale, "month", inputFormat));
    } else {
      setYear(defaultSelected ?? defaultYear ?? today);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    let day = parseDate(
      e.target.value,
      today,
      locale,
      "month",
      allowTwoDigitYear
    );
    isValidDate(day) &&
      setInputValue(formatDateForInput(day, locale, "month", inputFormat));
  };

  /* Only allow de-selecting if not required */
  const handleMonthClick = (month?: Date) => {
    if (month) {
      setOpen(false);
      inputRef.current && inputRef.current.focus();
      setYear(month);
    }

    if (!required && !month) {
      updateMonth(undefined);
      updateValidation({ isValidMonth: false, isEmpty: true });
      setInputValue("");
      setYear(defaultYear ?? today);
      return;
    }
    updateMonth(month);
    updateValidation();
    setInputValue(
      month ? formatDateForInput(month, locale, "month", inputFormat) : ""
    );
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const month = parseDate(
      e.target.value,
      today,
      locale,
      "month",
      allowTwoDigitYear
    );

    const isBefore =
      fromDate &&
      month &&
      (fromDate.getFullYear() > month.getFullYear() ||
        (fromDate.getFullYear() === month.getFullYear() &&
          fromDate.getMonth() > month.getMonth()));

    const isAfter =
      toDate &&
      month &&
      (toDate.getFullYear() < month.getFullYear() ||
        (toDate.getFullYear() === month.getFullYear() &&
          toDate.getMonth() < month.getMonth()));

    if (!isValidDate(month) || (disabled && isMatch(month, disabled))) {
      updateMonth(undefined);
      updateValidation({
        isInvalid: isValidDate(month),
        isDisabled: disabled && isMatch(month, disabled),
        isValidMonth: false,
        isEmpty: !e.target.value,
        isBefore: isBefore ?? false,
        isAfter: isAfter ?? false,
      });
      return;
    }

    if (
      isAfter ||
      isBefore ||
      (fromDate && toDate && !isMatch(month, [{ from: fromDate, to: toDate }]))
    ) {
      updateMonth(undefined);
      updateValidation({
        isValidMonth: false,
        isBefore: isBefore ?? false,
        isAfter: isAfter ?? false,
      });
      return;
    }
    updateMonth(month);
    updateValidation();
    setYear(month);
  };

  const monthpickerProps = {
    year,
    onYearChange: (y?: Date) => setYear(y ?? today),
    onMonthSelect: handleMonthClick,
    selected: selectedMonth,
    locale: _locale,
    fromDate,
    toDate,
    open,
    onOpenToggle: () => setOpen((x) => !x),
    disabled,
    ref: setMonthpickerRef,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    ref: inputRef,
  };

  return { monthpickerProps, inputProps, reset, selectedMonth, setSelected };
};

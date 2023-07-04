import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isWeekend from "date-fns/isWeekend";
import React, { useCallback, useRef, useState } from "react";
import { DayClickEventHandler, isMatch } from "react-day-picker";
import { DateInputProps } from "../DateInput";
import { DatePickerProps } from "../datepicker/DatePicker";
import {
  formatDateForInput,
  getLocaleFromString,
  isValidDate,
  parseDate,
} from "../utils";
import { useEscape } from "./useEscape";
import { useOutsideClickHandler } from "./useOutsideClickHandler";

export interface UseDatepickerOptions
  extends Pick<
    DatePickerProps,
    | "locale"
    | "fromDate"
    | "toDate"
    | "today"
    | "toDate"
    | "fromDate"
    | "toDate"
    | "disabled"
    | "disableWeekends"
  > {
  /**
   * The initially selected Date
   */
  defaultSelected?: Date;
  /**
   * Default shown month
   */
  defaultMonth?: Date;
  /**
   * Make selection of Date required
   */
  required?: boolean;
  /**
   * Callback for changed state
   */
  onDateChange?: (val?: Date) => void;
  /**
   * Input-format
   * @default "dd.MM.yyyy"
   */
  inputFormat?: string;
  /**
   * validation-callback
   */
  onValidate?: (val: DateValidationT) => void;
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

interface UseDatepickerValue {
  /**
   * Use: <DatePicker {...datepickerProps}/>
   */
  datepickerProps: DatePickerProps;
  /**
   * Use: <DatePicker.Input {...inputProps}/>
   */
  inputProps: Pick<
    DateInputProps,
    "onChange" | "onFocus" | "onBlur" | "value"
  > & { ref: React.RefObject<HTMLInputElement> };
  /**
   * Resets all states (callback)
   */
  reset: () => void;
  /**
   * Currently selected date
   * Up to user to validate date
   */
  selectedDay?: Date;
  /**
   * Manually override currently selected day
   */
  setSelected: (date?: Date) => void;
}

export type DateValidationT = {
  isDisabled: boolean;
  isWeekend: boolean;
  isEmpty: boolean;
  isInvalid: boolean;
  isValidDate: boolean;
  isBefore: boolean;
  isAfter: boolean;
};

const getValidationMessage = (val = {}): DateValidationT => ({
  isDisabled: false,
  isWeekend: false,
  isEmpty: false,
  isInvalid: false,
  isBefore: false,
  isAfter: false,
  isValidDate: true,
  ...val,
});

/**
 *
 * @see 🏷️ {@link UseDatepickerOptions}
 * @see 🏷️ {@link UseDatepickerValue}
 * @see 🏷️ {@link DateValidationT}
 * @example
 * const { datepickerProps, inputProps } = useDatepicker({
 *   fromDate: new Date("Aug 23 2019"),
 *   toDate: new Date("Feb 23 2024"),
 *   onDateChange: console.log,
 *   onValidate: console.log,
 * });
 */
export const useDatepicker = (
  opt: UseDatepickerOptions = {}
): UseDatepickerValue => {
  const {
    locale: _locale = "nb",
    required,
    defaultSelected: _defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
    disabled,
    disableWeekends,
    onDateChange,
    inputFormat,
    onValidate,
    defaultMonth,
    allowTwoDigitYear = true,
    openOnFocus = true,
  } = opt;

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLInputElement>(null);
  const [daypickerRef, setDaypickerRef] = useState<HTMLDivElement>();

  const [defaultSelected, setDefaultSelected] = useState(_defaultSelected);

  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? defaultMonth ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "date", inputFormat)
    : "";
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleOpen = useCallback(
    (open: boolean) => {
      setOpen(open);
      !open &&
        setMonth(selectedDay ?? defaultSelected ?? defaultMonth ?? today);
    },
    [defaultMonth, defaultSelected, selectedDay, today]
  );

  useOutsideClickHandler(open, handleOpen, [
    daypickerRef,
    inputRef.current,
    inputRef.current?.nextSibling,
  ]);

  useEscape(open, handleOpen, inputRef);

  const updateDate = (date?: Date) => {
    onDateChange?.(date);
    setSelectedDay(date);
  };

  const updateValidation = (val: Partial<DateValidationT> = {}) =>
    onValidate?.(getValidationMessage(val));

  const reset = () => {
    updateDate(defaultSelected);
    setMonth(defaultSelected ?? defaultMonth ?? today);
    setInputValue(defaultInputValue ?? "");
    setDefaultSelected(_defaultSelected);
  };

  const setSelected = (date: Date | undefined) => {
    updateDate(date);
    setMonth(date ?? defaultMonth ?? today);
    setInputValue(
      date ? formatDateForInput(date, locale, "date", inputFormat) : ""
    );
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.readOnly) {
      return;
    }
    !open && openOnFocus && handleOpen(true);
    let day = parseDate(
      e.target.value,
      today,
      locale,
      "date",
      allowTwoDigitYear
    );
    if (isValidDate(day)) {
      setInputValue(formatDateForInput(day, locale, "date", inputFormat));

      const isBefore =
        fromDate && day && differenceInCalendarDays(fromDate, day) > 0;
      const isAfter =
        toDate && day && differenceInCalendarDays(day, toDate) > 0;

      !isBefore && !isAfter && setMonth(day);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    let day = parseDate(
      e.target.value,
      today,
      locale,
      "date",
      allowTwoDigitYear
    );
    isValidDate(day) &&
      setInputValue(formatDateForInput(day, locale, "date", inputFormat));
  };

  /* Only allow de-selecting if not required */
  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    if (day && !selected) {
      handleOpen(false);
      inputRef.current && inputRef.current.focus();
    }

    if (!required && selected) {
      updateDate(undefined);
      setInputValue("");
      updateValidation({ isValidDate: false, isEmpty: true });
      return;
    }
    updateDate(day);
    updateValidation();
    setMonth(day);
    setInputValue(
      day ? formatDateForInput(day, locale, "date", inputFormat) : ""
    );
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseDate(
      e.target.value,
      today,
      locale,
      "date",
      allowTwoDigitYear
    );

    const isBefore =
      fromDate && day && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && day && differenceInCalendarDays(day, toDate) > 0;

    if (
      !isValidDate(day) ||
      (disableWeekends && isWeekend(day)) ||
      (disabled && isMatch(day, disabled))
    ) {
      updateDate(undefined);
      updateValidation({
        isInvalid: isValidDate(day),
        isWeekend: disableWeekends && isWeekend(day),
        isDisabled: disabled && isMatch(day, disabled),
        isValidDate: false,
        isEmpty: !e.target.value,
        isBefore: isBefore ?? false,
        isAfter: isAfter ?? false,
      });
      return;
    }

    if (isBefore || isAfter) {
      updateDate(undefined);
      updateValidation({
        isValidDate: false,
        isBefore: isBefore ?? false,
        isAfter: isAfter ?? false,
      });
      return;
    }
    updateDate(day);
    updateValidation();
    setMonth(defaultMonth ?? day);
  };

  const datepickerProps = {
    month,
    onMonthChange: (month) => setMonth(month),
    onDayClick: handleDayClick,
    selected: selectedDay ?? new Date("Invalid date"),
    locale: _locale,
    fromDate,
    toDate,
    today,
    open,
    onOpenToggle: () => handleOpen(!open),
    disabled,
    disableWeekends,
    bubbleEscape: true,
    ref: setDaypickerRef,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    ref: inputRef,
  };

  return { datepickerProps, inputProps, reset, selectedDay, setSelected };
};

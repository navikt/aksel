import { differenceInCalendarDays } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DayClickEventHandler } from "react-day-picker";
import { DatePickerProps } from "../datepicker/DatePicker";
import { DatePickerInputProps } from "../datepicker/DatePickerInput";
import { formatDateForInput, getLocaleFromString, isValidDate } from "../utils";
import { parseDate } from "../utils/parse-date";

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
  > {
  /** The initially selected date */
  defaultSelected?: Date;
  /** Make the selection required. */
  required?: boolean;
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
    DatePickerInputProps,
    "onChange" | "onFocus" | "onBlur" | "value" | "wrapperRef"
  >;
  /**
   * Resets all states
   */
  reset: () => void;
  /**
   * Selected Date callback
   */
  selectedDay?: Date;
  /**
   * Manually set selected day if needed
   */
  setSelected: (date?: Date) => void;
}

export const useDatepicker = (
  opt: UseDatepickerOptions = {}
): UseDatepickerValue => {
  const {
    locale: _locale = "nb",
    required,
    defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
    openOnFocus = true,
  } = opt;

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const daypickerRef = useRef<HTMLDivElement>(null);

  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "date")
    : "";
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleFocusOut = useCallback(
    (e) =>
      ![daypickerRef.current, inputRef.current].some((element) =>
        element?.contains(e.relatedTarget)
      ) && setOpen(false),
    []
  );

  useEffect(() => {
    const el = inputRef.current;
    el?.addEventListener("focusout", handleFocusOut);
    return () => el?.removeEventListener?.("focusout", handleFocusOut);
  }, [handleFocusOut]);

  const reset = () => {
    setSelectedDay(defaultSelected);
    setMonth(defaultSelected ?? today);
    setInputValue(defaultInputValue ?? "");
  };

  const setSelected = (date: Date | undefined) => {
    setSelectedDay(date);
    setMonth(date ?? today);
    setInputValue(date ? formatDateForInput(date, locale, "date") : "");
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && openOnFocus && setOpen(true);
    if (!e.target.value) {
      reset();
      return;
    }
    let day = parseDate(e.target.value, today, locale, "date");
    if (isValidDate(day)) {
      setMonth(day);
      setInputValue(formatDateForInput(day, locale, "date"));
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    let day = parseDate(e.target.value, today, locale, "date");
    isValidDate(day) && setInputValue(formatDateForInput(day, locale, "date"));
  };

  /* Only allow de-selecting if not required */
  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    if (!required && selected) {
      setSelectedDay(undefined);
      setInputValue("");
      return;
    }
    setSelectedDay(day);
    setInputValue(day ? formatDateForInput(day, locale, "date") : "");
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale, "date");

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
    setMonth(day);
  };

  const datepickerProps = {
    month,
    onMonthChange: (month) => setMonth(month),
    onDayClick: handleDayClick,
    selected: selectedDay,
    locale: _locale,
    fromDate,
    toDate,
    today,
    open,
    onClose: () => setOpen(false),
    onOpenToggle: () => setOpen((x) => !x),
    ref: daypickerRef,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    wrapperRef: inputRef,
  };

  return { datepickerProps, inputProps, reset, selectedDay, setSelected };
};

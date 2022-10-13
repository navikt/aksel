import { differenceInCalendarDays, isWeekend } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DayClickEventHandler, isMatch } from "react-day-picker";
import { DateInputProps } from "../DateInput";
import { DatePickerProps } from "../datepicker/DatePicker";
import {
  formatDateForInput,
  getLocaleFromString,
  isValidDate,
  parseDate,
} from "../utils";

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
   * Make selection of Date required
   */
  required?: boolean;
}

interface UseDatepickerValue {
  /**
   * Use: <DatePicker {...datepickerProps}/>
   */
  datepickerProps: DatePickerProps;
  /**
   * Use: <DatePicker.Input {...inputProps}/>
   */
  inputProps: Pick<DateInputProps, "onChange" | "onFocus" | "onBlur" | "value">;
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
    disabled,
    disableWeekends,
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

  const handleFocusIn = useCallback(
    (e) => {
      ![
        daypickerRef.current,
        inputRef.current,
        inputRef.current?.nextSibling,
      ].some((element) => element?.contains(e.target)) &&
        open &&
        setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("click", handleFocusIn);
    return () => {
      window?.removeEventListener?.("focusin", handleFocusIn);
      window?.removeEventListener?.("click", handleFocusIn);
    };
  }, [handleFocusIn]);

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
    !open && setOpen(true);
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
    if (day && !selected) {
      setOpen(false);
      inputRef.current && inputRef.current.focus();
    }

    if (!required && selected) {
      setSelectedDay(undefined);
      setInputValue("");
      return;
    }
    setSelectedDay(day);
    setMonth(day);
    setInputValue(day ? formatDateForInput(day, locale, "date") : "");
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale, "date");

    if (
      !isValidDate(day) ||
      (disabled &&
        ((disableWeekends && isWeekend(day)) || isMatch(day, disabled)))
    ) {
      setSelectedDay(undefined);
      return;
    }

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (isBefore || isAfter) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
    setMonth(day);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    inputRef.current && inputRef.current.focus();
  }, []);

  const escape = useCallback(
    (e) => open && e.key === "Escape" && handleClose(),
    [handleClose, open]
  );

  useEffect(() => {
    window.addEventListener("keydown", escape, false);

    return () => {
      window.removeEventListener("keydown", escape, false);
    };
  }, [escape]);

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
    onOpenToggle: () => setOpen((x) => !x),
    ref: daypickerRef,
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

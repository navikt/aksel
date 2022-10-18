import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isWeekend from "date-fns/isWeekend";
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
  /**
   * Callback for changed state
   */
  onDateChange?: (val?: Date) => void;
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
    defaultSelected: _defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
    disabled,
    disableWeekends,
    onDateChange,
  } = opt;

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const daypickerRef = useRef<HTMLDivElement>(null);

  const [defaultSelected, setDefaultSelected] = useState(_defaultSelected);

  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "date")
    : "";
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const getSelectedDate = (date?: Date) => {
    onDateChange?.(date);
    return date;
  };

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
    setSelectedDay(getSelectedDate(defaultSelected));
    setMonth(defaultSelected ?? today);
    setInputValue(defaultInputValue ?? "");
    setDefaultSelected(_defaultSelected);
  };

  const setSelected = (date: Date | undefined) => {
    setSelectedDay(getSelectedDate(date));
    setMonth(date ?? today);
    setInputValue(date ? formatDateForInput(date, locale, "date") : "");
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && setOpen(true);

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
      setSelectedDay(getSelectedDate(undefined));
      setInputValue("");
      return;
    }
    setSelectedDay(getSelectedDate(day));
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
      setSelectedDay(getSelectedDate(undefined));
      return;
    }

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (isBefore || isAfter) {
      setSelectedDay(getSelectedDate(undefined));
      return;
    }
    setSelectedDay(getSelectedDate(day));
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

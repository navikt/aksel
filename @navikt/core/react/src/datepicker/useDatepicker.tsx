import { differenceInCalendarDays, parse } from "date-fns";
import { useState } from "react";
import { DatePickerProps } from "./DatePicker";
import _format from "date-fns/format";
import { getLocaleFromString, isValidDate } from "./utils/util";
import {
  DayClickEventHandler,
  MonthChangeEventHandler,
} from "react-day-picker";

interface useDatepickerProps
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
  /** The format string for formatting the input field. See https://date-fns.org/docs/format for a list of format strings. Default to `PP`. */
  format?: string;
  /** Make the selection required. */
  required?: boolean;
}

interface useDatepickerValue {}

export const useDatepicker = (
  opt: useDatepickerProps = {}
): useDatepickerValue => {
  const {
    locale: _locale = "nb",
    required,
    format = "PP",
    defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
  } = opt;

  const locale = getLocaleFromString(_locale);

  // Shortcut to the DateFns functions
  const parseValue = (value: string) => parse(value, format, today, { locale });
  const parseFallbackValue = (value: string) =>
    parse(value, "P", today, { locale });

  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);

  const defaultInputValue = defaultSelected
    ? _format(defaultSelected, format, { locale })
    : "";
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const reset = () => {
    setSelectedDay(defaultSelected);
    setMonth(defaultSelected ?? today);
    setInputValue(defaultInputValue ?? "");
  };

  const setSelected = (date: Date | undefined) => {
    setSelectedDay(date);
    setMonth(date ?? today);
    setInputValue(date ? _format(date, format, { locale }) : "");
  };

  const handleMonthChange: MonthChangeEventHandler = (month) => setMonth(month);

  // When focusing, make sure DayPicker visualizes the month of the date in the
  // input field.
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      reset();
      return;
    }
    let day = parseValue(e.target.value);
    let isFallback = false;
    if (!isValidDate(day)) {
      day = parseFallbackValue(e.target.value);
      isFallback = true;
    }
    if (isValidDate(day)) {
      setMonth(day);
      isFallback && setInputValue(_format(day, format, { locale }));
    }
  };

  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    if (!required && selected) {
      setSelectedDay(undefined);
      setInputValue("");
      return;
    }
    setSelectedDay(day);
    setInputValue(day ? _format(day, format, { locale }) : "");
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(parseFallbackValue(e.target.value));
    setInputValue(e.target.value);
    let day = parseValue(e.target.value);

    if (!isValidDate(day)) {
      day = parseFallbackValue(e.target.value);
    }

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
    setMonth(day);
  };

  const dayPickerProps = {
    month: month,
    onMonthChange: handleMonthChange,
    onDayClick: handleDayClick,
    selected: selectedDay,
    locale,
    fromDate,
    toDate,
    today,
  };

  const inputProps = {
    onChange: handleChange,
    /* onBlur: handleBlur, */
    onFocus: handleFocus,
    value: inputValue,
  };

  return { dayPickerProps, inputProps, reset, selectedDay, setSelected };
};

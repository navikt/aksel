import { differenceInCalendarDays } from "date-fns";
import { InputHTMLAttributes, useState } from "react";
import {
  DayClickEventHandler,
  MonthChangeEventHandler,
} from "react-day-picker";
import { DatePickerProps } from "./DatePicker";
import { formatDateForInput } from "./utils/format-date";
import { parseDate } from "./utils/parse-date";
import { getLocaleFromString, isValidDate } from "./utils/util";

export interface useDatepickerProps
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
}

export interface DatepickerHookProps
  extends Pick<
      DatePickerProps,
      | "month"
      | "onMonthChange"
      | "onDayClick"
      | "selected"
      | "fromDate"
      | "locale"
      | "toDate"
      | "today"
    >,
    Pick<
      InputHTMLAttributes<HTMLInputElement>,
      "aria-haspopup" | "autoComplete"
    > {}

interface DatepickerInputHookProps {}

interface useDatepickerValue {
  dayPickerProps: DatepickerHookProps;
  inputProps: DatepickerInputHookProps;
  reset: () => void;
  selectedDay?: Date;
  setSelected: (date?: Date) => void;
}

export const useDatepicker = (
  opt: useDatepickerProps = {}
): useDatepickerValue => {
  const {
    locale: _locale = "nb",
    required,
    defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
  } = opt;

  const locale = getLocaleFromString(_locale);
  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale)
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
    setInputValue(date ? formatDateForInput(date, locale) : "");
  };

  const handleMonthChange: MonthChangeEventHandler = (month) => setMonth(month);

  // When focusing, make sure DayPicker visualizes the month of the date in the
  // input field.
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.value) {
      reset();
      return;
    }
    let day = parseDate(e.target.value, today, locale);
    if (isValidDate(day)) {
      setMonth(day);
      setInputValue(formatDateForInput(day, locale));
    }
  };

  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    if (!required && selected) {
      setSelectedDay(undefined);
      setInputValue("");
      return;
    }
    setSelectedDay(day);
    setInputValue(day ? formatDateForInput(day, locale) : "");
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale);

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(day);
    setMonth(day);
  };

  const dayPickerProps: DatepickerHookProps = {
    month: month,
    onMonthChange: handleMonthChange,
    onDayClick: handleDayClick,
    selected: selectedDay,
    locale: _locale,
    fromDate,
    toDate,
    today,
  };

  const inputProps: DatepickerInputHookProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    value: inputValue,
  };

  return { dayPickerProps, inputProps, reset, selectedDay, setSelected };
};

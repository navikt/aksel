import { differenceInCalendarDays } from "date-fns";
import { FocusEvent, useState } from "react";
import {
  DateRange,
  MonthChangeEventHandler,
  SelectRangeEventHandler,
} from "react-day-picker";
import { DatepickerHookProps, useDatepickerProps } from "./useDatepicker";
import { formatDateForInput } from "./utils/format-date";
import { parseDate } from "./utils/parse-date";
import { getLocaleFromString, isValidDate } from "./utils/util";

interface useRangeDatepickerProps
  extends Omit<useDatepickerProps, "defaultSelected"> {
  /** The initially selected date-range */
  defaultSelected?: DateRange;
}

interface DatepickerRangeHookProps extends DatepickerHookProps {
  mode: "range";
  onSelect: SelectRangeEventHandler;
}

interface DatepickerInputRangeHookProps {}

interface useRangeDatepickerValue {
  dayPickerProps: DatepickerHookProps;
  startInputProps: DatepickerInputRangeHookProps;
  endInputProps: DatepickerInputRangeHookProps;
  reset: () => void;
  selectedRange?: DateRange;
  setSelected: (date?: DateRange) => void;
}

export const useRangeDatepicker = (
  opt: useRangeDatepickerProps = {}
): useRangeDatepickerValue => {
  const {
    locale: _locale = "nb",
    defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
  } = opt;

  const locale = getLocaleFromString(_locale);

  // Initialize states
  const [month, setMonth] = useState(
    defaultSelected ? defaultSelected.from : today
  );
  const [selectedRange, setSelectedRange] = useState(defaultSelected);

  const [fromInputValue, setFromInputValue] = useState(
    defaultSelected?.from
      ? formatDateForInput(defaultSelected.from, locale)
      : ""
  );

  const [toInputValue, setToInputValue] = useState(
    defaultSelected?.to ? formatDateForInput(defaultSelected.to, locale) : ""
  );

  const reset = () => {
    setSelectedRange(defaultSelected);
    setMonth(defaultSelected ? defaultSelected.from : today);
    setFromInputValue(
      defaultSelected?.from
        ? formatDateForInput(defaultSelected.from, locale)
        : ""
    );
    setToInputValue(
      defaultSelected?.to ? formatDateForInput(defaultSelected.to, locale) : ""
    );
  };

  const setSelected = (range?: DateRange) => {
    setSelectedRange(range);
    /* setMonth(range?.from ?? today); */
    setFromInputValue(
      range?.from ? formatDateForInput(range.from, locale) : ""
    );
    setToInputValue(range?.to ? formatDateForInput(range?.to, locale) : "");
  };

  const handleMonthChange: MonthChangeEventHandler = (month) => setMonth(month);

  const handleFocus = (
    e: FocusEvent<HTMLInputElement, Element>,
    src: "start" | "end"
  ) => {
    if (!e.target.value) {
      reset();
      return;
    }
    let day = parseDate(e.target.value, today, locale);
    if (isValidDate(day)) {
      setMonth(day);
      src === "start"
        ? setFromInputValue(formatDateForInput(day, locale))
        : setToInputValue(formatDateForInput(day, locale));
    }
  };

  const handleFromFocus: React.FocusEventHandler<HTMLInputElement> = (e) =>
    handleFocus(e, "start");

  const handleToFocus: React.FocusEventHandler<HTMLInputElement> = (e) =>
    handleFocus(e, "end");

  const handleSelect: SelectRangeEventHandler = (
    range
    /* selectedDay,
    activeModifiers,
    e */
  ) => {
    setSelectedRange(range);
    range?.from
      ? setFromInputValue(formatDateForInput(range?.from, locale))
      : setFromInputValue("");
    range?.to
      ? setToInputValue(formatDateForInput(range?.to, locale))
      : setToInputValue("");
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange = (e, src: "start" | "end") => {
    src === "start"
      ? setFromInputValue(e.target.value)
      : setToInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale);

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      /* setSelectedDay(undefined); */
      return;
    }

    src === "start" && setSelectedRange((x) => ({ ...x, from: day }));
    src === "end" && setSelectedRange((x) => ({ from: x?.from, to: day }));
    setMonth(day);
  };

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e, "start");

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleChange(e, "end");

  const dayPickerProps: DatepickerRangeHookProps = {
    month: month,
    onMonthChange: handleMonthChange,
    onSelect: handleSelect,
    selected: selectedRange,
    locale: _locale,
    fromDate,
    toDate,
    today,
    mode: "range",
  };

  const startInputProps: DatepickerInputRangeHookProps = {
    onChange: handleFromChange,
    onFocus: handleFromFocus,
    value: fromInputValue,
  };

  const endInputProps: DatepickerInputRangeHookProps = {
    onChange: handleToChange,
    onFocus: handleToFocus,
    value: toInputValue,
  };

  return {
    dayPickerProps,
    startInputProps,
    endInputProps,
    reset,
    selectedRange,
    setSelected,
  };
};

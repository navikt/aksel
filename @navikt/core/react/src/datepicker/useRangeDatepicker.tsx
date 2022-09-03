import { differenceInCalendarDays } from "date-fns";
import React, { useState } from "react";
import { DateRange, MonthChangeEventHandler } from "react-day-picker";
import { DatePickerProps } from "./DatePicker";
import { useDatepickerProps } from "./useDatepicker";
import { formatDateForInput } from "./utils/format-date";
import { parseDate } from "./utils/parse-date";
import { getLocaleFromString, isValidDate } from "./utils/util";

interface useRangeDatepickerProps
  extends Omit<useDatepickerProps, "defaultSelected"> {
  /** The initially selected date-range */
  defaultSelected?: DateRange;
}

interface DatepickerInputRangeHookProps {}

interface useRangeDatepickerValue {
  dayPickerProps: DatePickerProps;
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

  const handleFocus = (e, src: "start" | "end") => {
    let day = parseDate(e.target.value, today, locale);
    if (isValidDate(day)) {
      setMonth(day);
      src === "start"
        ? setFromInputValue(formatDateForInput(day, locale))
        : setToInputValue(formatDateForInput(day, locale));
    }
  };

  const handleInputs = (day: Date, src: "start" | "end") => {
    if (src === "start") {
      const isAfter =
        toInputValue &&
        differenceInCalendarDays(day, parseDate(toInputValue, today, locale)) >
          0;

      if (isAfter) {
        setFromInputValue(
          formatDateForInput(parseDate(toInputValue, today, locale), locale)
        );
        setToInputValue(formatDateForInput(day, locale));
      } else {
        setFromInputValue(formatDateForInput(day, locale));
      }
    } else if (src === "end") {
      const isBefore =
        fromInputValue &&
        differenceInCalendarDays(
          parseDate(fromInputValue, today, locale),
          day
        ) > 0;

      if (isBefore) {
        setToInputValue(
          formatDateForInput(parseDate(fromInputValue, today, locale), locale)
        );
        setFromInputValue(formatDateForInput(day, locale));
      } else {
        setToInputValue(formatDateForInput(day, locale));
      }
    }
  };

  const handleBlur = (e, src: "start" | "end") => {
    let day = parseDate(e.target.value, today, locale);
    if (!isValidDate(day)) {
      return;
    }

    handleInputs(day, src);
  };

  const handleSelect = (range) => {
    const prevToRange =
      !selectedRange?.from && selectedRange?.to ? selectedRange?.to : range?.to;

    range?.from
      ? setFromInputValue(formatDateForInput(range?.from, locale))
      : setFromInputValue("");
    prevToRange
      ? setToInputValue(formatDateForInput(prevToRange, locale))
      : setToInputValue("");
    setSelectedRange({ from: range?.from, to: prevToRange });
  };

  /* live-update datepicker based on changes in inputfields */
  const handleChange = (e, src: "start" | "end") => {
    src === "start"
      ? setFromInputValue(e.target.value)
      : setToInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale);

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      src === "start"
        ? setSelectedRange((x) => ({ ...x, from: undefined }))
        : setSelectedRange((x) => ({ from: x?.from, to: undefined }));
      return;
    }

    if (
      src === "end" &&
      selectedRange?.from &&
      differenceInCalendarDays(selectedRange?.from, day) >= 0
    ) {
      setSelectedRange({ from: day, to: selectedRange?.from });
      setMonth(day);
      return;
    }

    if (
      src === "start" &&
      selectedRange?.to &&
      differenceInCalendarDays(day, selectedRange?.to) >= 0
    ) {
      setSelectedRange({ to: day, from: selectedRange?.to });
      setMonth(day);
      return;
    }

    src === "start" && setSelectedRange((x) => ({ ...x, from: day }));
    src === "end" && setSelectedRange((x) => ({ from: x?.from, to: day }));
    setMonth(day);
  };

  const dayPickerProps: DatePickerProps = {
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
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(e, "start"),
    onFocus: (e: React.FocusEventHandler<HTMLInputElement>) =>
      handleFocus(e, "start"),
    onBlur: (e: React.FocusEventHandler<HTMLInputElement>) =>
      handleBlur(e, "start"),
    value: fromInputValue,
  };

  const endInputProps: DatepickerInputRangeHookProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(e, "end"),
    onFocus: (e: React.FocusEventHandler<HTMLInputElement>) =>
      handleFocus(e, "end"),
    onBlur: (e: React.FocusEventHandler<HTMLInputElement>) =>
      handleBlur(e, "end"),
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

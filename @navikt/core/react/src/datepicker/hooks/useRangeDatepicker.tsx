import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerProps } from "../DatePicker";
import { DatePickerInputProps } from "../DatePickerInput";
import {
  formatDateForInput,
  getLocaleFromString,
  isValidDate,
  parseDate,
} from "../utils";
import { UseDatepickerOptions } from "./useDatepicker";

interface UseRangeDatepickerOptions
  extends Omit<UseDatepickerOptions, "defaultSelected"> {
  /** The initially selected date-range */
  defaultSelected?: DateRange;
}

interface UseRangeDatepickerValue {
  /**
   * Use: <DatePicker {...dayPickerProps}/>
   */
  dayPickerProps: DatePickerProps;
  /**
   * Use: <DatePicker.Input label="from" {...fromInputProps}/>
   */
  fromInputProps: Pick<
    DatePickerInputProps,
    "onChange" | "onFocus" | "onBlur" | "value"
  >;
  /**
   * Use: <DatePicker.Input label="to" {...toInputProps}/>
   */
  toInputProps: Pick<
    DatePickerInputProps,
    "onChange" | "onFocus" | "onBlur" | "value"
  >;
  /**
   * Resets all states
   */
  reset: () => void;
  /**
   * Selected range-callback
   */
  selectedRange?: DateRange;
  /**
   * Manually set selected range if needed
   */
  setSelected: (date?: DateRange) => void;
}

const RANGE = {
  FROM: "FROM",
  TO: "TO",
} as const;

type RangeT = typeof RANGE[keyof typeof RANGE];

export const useRangeDatepicker = (
  opt: UseRangeDatepickerOptions = {}
): UseRangeDatepickerValue => {
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
    setFromInputValue(
      range?.from ? formatDateForInput(range.from, locale) : ""
    );
    setToInputValue(range?.to ? formatDateForInput(range?.to, locale) : "");
  };

  const handleFocus = (e, src: RangeT) => {
    let day = parseDate(e.target.value, today, locale);
    if (isValidDate(day)) {
      setMonth(day);
      src === RANGE.FROM
        ? setFromInputValue(formatDateForInput(day, locale))
        : setToInputValue(formatDateForInput(day, locale));
    }
  };

  const handleInputs = (day: Date, src: RangeT) => {
    if (src === RANGE.FROM) {
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
    } else if (src === RANGE.TO) {
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

  const handleBlur = (e, src: RangeT) => {
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
  const handleChange = (e, src: RangeT) => {
    src === RANGE.FROM
      ? setFromInputValue(e.target.value)
      : setToInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale);

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (!isValidDate(day) || isBefore || isAfter) {
      src === RANGE.FROM
        ? setSelectedRange((x) => ({ ...x, from: undefined }))
        : setSelectedRange((x) => ({ from: x?.from, to: undefined }));
      return;
    }

    /* If to-value < from-value, switch places in state */
    if (
      src === RANGE.TO &&
      selectedRange?.from &&
      differenceInCalendarDays(selectedRange?.from, day) >= 0
    ) {
      setSelectedRange({ from: day, to: selectedRange?.from });
      setMonth(day);
      return;
    }

    /* If from-value > to-value  , switch places in state */
    if (
      src === RANGE.FROM &&
      selectedRange?.to &&
      differenceInCalendarDays(day, selectedRange?.to) >= 0
    ) {
      setSelectedRange({ to: day, from: selectedRange?.to });
      setMonth(day);
      return;
    }

    src === RANGE.FROM && setSelectedRange((x) => ({ ...x, from: day }));
    src === RANGE.TO && setSelectedRange((x) => ({ from: x?.from, to: day }));
    setMonth(day);
  };

  const dayPickerProps: DatePickerProps = {
    month: month,
    onMonthChange: (month) => setMonth(month),
    onSelect: handleSelect,
    selected: selectedRange,
    locale: _locale,
    fromDate,
    toDate,
    today,
    mode: "range",
  };

  const fromInputProps = {
    onChange: (e) => handleChange(e, RANGE.FROM),
    onFocus: (e) => handleFocus(e, RANGE.FROM),
    onBlur: (e) => handleBlur(e, RANGE.FROM),
    value: fromInputValue,
  };

  const toInputProps = {
    onChange: (e) => handleChange(e, RANGE.TO),
    onFocus: (e) => handleFocus(e, RANGE.TO),
    onBlur: (e) => handleBlur(e, RANGE.TO),
    value: toInputValue,
  };

  return {
    dayPickerProps,
    fromInputProps,
    toInputProps,
    reset,
    selectedRange,
    setSelected,
  };
};

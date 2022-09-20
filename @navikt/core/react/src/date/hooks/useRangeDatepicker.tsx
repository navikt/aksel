import { differenceInCalendarDays } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { DatePickerProps } from "../datepicker/DatePicker";
import { DatePickerInputProps } from "../datepicker/DatePickerInput";
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
   * Use: <DatePicker {...datepickerProps}/>
   */
  datepickerProps: DatePickerProps;
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
    openOnFocus = true,
  } = opt;

  const locale = getLocaleFromString(_locale);

  const inputRefTo = useRef<HTMLDivElement>(null);
  const inputRefFrom = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  // Initialize states
  const [month, setMonth] = useState(
    defaultSelected ? defaultSelected.from : today
  );
  const [selectedRange, setSelectedRange] = useState(defaultSelected);

  const [fromInputValue, setFromInputValue] = useState(
    defaultSelected?.from
      ? formatDateForInput(defaultSelected.from, locale, "date")
      : ""
  );

  const [toInputValue, setToInputValue] = useState(
    defaultSelected?.to
      ? formatDateForInput(defaultSelected.to, locale, "date")
      : ""
  );
  const [open, setOpen] = useState(false);

  const handleFocusOut = useCallback(
    (e) =>
      ![datePickerRef.current, inputRefTo.current, inputRefFrom.current].some(
        (element) => element?.contains(e.relatedTarget)
      ) && setOpen(false),
    []
  );

  useEffect(() => {
    const from = inputRefFrom.current;
    const to = inputRefTo.current;
    from?.addEventListener("focusout", handleFocusOut);
    to?.addEventListener("focusout", handleFocusOut);
    return () => {
      from?.removeEventListener?.("focusout", handleFocusOut);
      to?.removeEventListener?.("focusout", handleFocusOut);
    };
  }, [handleFocusOut]);

  const reset = () => {
    setSelectedRange(defaultSelected);
    setMonth(defaultSelected ? defaultSelected.from : today);
    setFromInputValue(
      defaultSelected?.from
        ? formatDateForInput(defaultSelected.from, locale, "date")
        : ""
    );
    setToInputValue(
      defaultSelected?.to
        ? formatDateForInput(defaultSelected.to, locale, "date")
        : ""
    );
  };

  const setSelected = (range?: DateRange) => {
    setSelectedRange(range);
    setFromInputValue(
      range?.from ? formatDateForInput(range.from, locale, "date") : ""
    );
    setToInputValue(
      range?.to ? formatDateForInput(range?.to, locale, "date") : ""
    );
  };

  const handleFocus = (e, src: RangeT) => {
    !open && openOnFocus && setOpen(true);
    let day = parseDate(e.target.value, today, locale, "date");
    if (isValidDate(day)) {
      setMonth(day);
      src === RANGE.FROM
        ? setFromInputValue(formatDateForInput(day, locale, "date"))
        : setToInputValue(formatDateForInput(day, locale, "date"));
    }
  };

  const handleInputs = (day: Date, src: RangeT) => {
    if (src === RANGE.FROM) {
      const isAfter =
        toInputValue &&
        differenceInCalendarDays(
          day,
          parseDate(toInputValue, today, locale, "date")
        ) > 0;

      if (isAfter) {
        setFromInputValue(
          formatDateForInput(
            parseDate(toInputValue, today, locale, "date"),
            locale,
            "date"
          )
        );
        setToInputValue(formatDateForInput(day, locale, "date"));
      } else {
        setFromInputValue(formatDateForInput(day, locale, "date"));
      }
    } else if (src === RANGE.TO) {
      const isBefore =
        fromInputValue &&
        differenceInCalendarDays(
          parseDate(fromInputValue, today, locale, "date"),
          day
        ) > 0;

      if (isBefore) {
        setToInputValue(
          formatDateForInput(
            parseDate(fromInputValue, today, locale, "date"),
            locale,
            "date"
          )
        );
        setFromInputValue(formatDateForInput(day, locale, "date"));
      } else {
        setToInputValue(formatDateForInput(day, locale, "date"));
      }
    }
  };

  const handleBlur = (e, src: RangeT) => {
    let day = parseDate(e.target.value, today, locale, "date");
    if (!isValidDate(day)) {
      return;
    }

    handleInputs(day, src);
  };

  const handleSelect = (range) => {
    const prevToRange =
      !selectedRange?.from && selectedRange?.to ? selectedRange?.to : range?.to;

    range?.from
      ? setFromInputValue(formatDateForInput(range?.from, locale, "date"))
      : setFromInputValue("");
    prevToRange
      ? setToInputValue(formatDateForInput(prevToRange, locale, "date"))
      : setToInputValue("");
    setSelectedRange({ from: range?.from, to: prevToRange });
  };

  /* live-update datepicker based on changes in inputfields */
  const handleChange = (e, src: RangeT) => {
    src === RANGE.FROM
      ? setFromInputValue(e.target.value)
      : setToInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale, "date");

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

  const datepickerProps = {
    month: month,
    onMonthChange: (month) => setMonth(month),
    onSelect: handleSelect,
    selected: selectedRange,
    locale: _locale,
    fromDate,
    toDate,
    today,
    mode: "range" as const,
    open,
    onClose: () => setOpen(false),
    onOpenToggle: () => setOpen((x) => !x),
    ref: datePickerRef,
  };

  const fromInputProps = {
    onChange: (e) => handleChange(e, RANGE.FROM),
    onFocus: (e) => handleFocus(e, RANGE.FROM),
    onBlur: (e) => handleBlur(e, RANGE.FROM),
    value: fromInputValue,
    wrapperRef: inputRefFrom,
  };

  const toInputProps = {
    onChange: (e) => handleChange(e, RANGE.TO),
    onFocus: (e) => handleFocus(e, RANGE.TO),
    onBlur: (e) => handleBlur(e, RANGE.TO),
    value: toInputValue,
    wrapperRef: inputRefTo,
  };

  return {
    datepickerProps,
    fromInputProps,
    toInputProps,
    reset,
    selectedRange,
    setSelected,
  };
};

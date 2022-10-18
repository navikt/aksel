import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isWeekend from "date-fns/isWeekend";
import { useCallback, useEffect, useRef, useState } from "react";
import { DateRange, isMatch } from "react-day-picker";
import { DateInputProps } from "../DateInput";
import { DatePickerProps } from "../datepicker/DatePicker";
import {
  formatDateForInput,
  getLocaleFromString,
  isValidDate,
  parseDate,
} from "../utils";
import { UseDatepickerOptions } from "./useDatepicker";

interface UseRangeDatepickerOptions
  extends Omit<UseDatepickerOptions, "defaultSelected" | "onDateChange"> {
  /**
   * The initially selected DateRange
   */
  defaultSelected?: DateRange;
  /**
   * Callback for changed state
   */
  onRangeChange?: (val?: DateRange) => void;
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
    DateInputProps,
    "onChange" | "onFocus" | "onBlur" | "value"
  >;
  /**
   * Use: <DatePicker.Input label="to" {...toInputProps}/>
   */
  toInputProps: Pick<
    DateInputProps,
    "onChange" | "onFocus" | "onBlur" | "value"
  >;
  /**
   * Resets all states (callback)
   */
  reset: () => void;
  /**
   * Currently selected DateRange
   * Up to user to validate values
   */
  selectedRange?: DateRange;
  /**
   * Manually override currently selected day
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
    defaultSelected: _defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
    disabled,
    disableWeekends,
    onRangeChange,
  } = opt;

  const locale = getLocaleFromString(_locale);

  const inputRefTo = useRef<HTMLDivElement>(null);
  const inputRefFrom = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const [defaultSelected, setDefaultSelected] = useState(_defaultSelected);

  // Initialize states
  const [month, setMonth] = useState(
    defaultSelected ? defaultSelected?.from : today
  );
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    defaultSelected ?? { from: undefined, to: undefined }
  );

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

  const getSelectedRange = (range?: DateRange) => {
    onRangeChange?.(range);
    return range;
  };

  const handleFocusIn = useCallback(
    (e) =>
      ![
        datePickerRef.current,
        inputRefTo.current,
        inputRefFrom.current,
        inputRefTo.current?.nextSibling,
        inputRefFrom.current?.nextSibling,
      ].some((element) => element?.contains(e.target)) &&
      open &&
      setOpen(false),
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
    setSelectedRange(
      getSelectedRange(defaultSelected ?? { from: undefined, to: undefined })
    );
    setMonth(defaultSelected ? defaultSelected?.from : today);
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
    setDefaultSelected(_defaultSelected);
  };

  const setSelected = (range?: DateRange) => {
    setSelectedRange(getSelectedRange(range));
    setFromInputValue(
      range?.from ? formatDateForInput(range.from, locale, "date") : ""
    );
    setToInputValue(
      range?.to ? formatDateForInput(range?.to, locale, "date") : ""
    );
  };

  const handleFocus = (e, src: RangeT) => {
    !open && setOpen(true);
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
    if (range?.from && range?.to) {
      setOpen(false);
    }
    const prevToRange =
      !selectedRange?.from && selectedRange?.to ? selectedRange?.to : range?.to;

    range?.from
      ? setFromInputValue(formatDateForInput(range?.from, locale, "date"))
      : setFromInputValue("");
    prevToRange
      ? setToInputValue(formatDateForInput(prevToRange, locale, "date"))
      : setToInputValue("");
    setSelectedRange(getSelectedRange({ from: range?.from, to: prevToRange }));
  };

  /* live-update datepicker based on changes in inputfields */
  const handleChange = (e, src: RangeT) => {
    src === RANGE.FROM
      ? setFromInputValue(e.target.value)
      : setToInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale, "date");

    if (
      !isValidDate(day) ||
      (disabled &&
        ((disableWeekends && isWeekend(day)) || isMatch(day, disabled)))
    ) {
      setSelectedRange((x) =>
        getSelectedRange(
          src === RANGE.FROM
            ? { ...x, from: undefined }
            : { from: x?.from, to: undefined }
        )
      );
      return;
    }

    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
    if (isBefore || isAfter) {
      src === RANGE.FROM
        ? setSelectedRange((x) => getSelectedRange({ ...x, from: undefined }))
        : setSelectedRange((x) =>
            getSelectedRange({ from: x?.from, to: undefined })
          );
      return;
    }

    /* If to-value < from-value, switch places in state */
    if (
      src === RANGE.TO &&
      selectedRange?.from &&
      differenceInCalendarDays(selectedRange?.from, day) >= 0
    ) {
      setSelectedRange(
        getSelectedRange({ from: day, to: selectedRange?.from })
      );
      setMonth(day);
      return;
    }

    /* If from-value > to-value  , switch places in state */
    if (
      src === RANGE.FROM &&
      selectedRange?.to &&
      differenceInCalendarDays(day, selectedRange?.to) >= 0
    ) {
      setSelectedRange(getSelectedRange({ to: day, from: selectedRange?.to }));
      setMonth(day);
      return;
    }

    src === RANGE.FROM &&
      setSelectedRange((x) => getSelectedRange({ ...x, from: day }));
    src === RANGE.TO &&
      setSelectedRange((x) => getSelectedRange({ from: x?.from, to: day }));
    setMonth(day);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    if (selectedRange?.from && !selectedRange?.to) {
      inputRefTo?.current?.focus();
    } else {
      inputRefFrom?.current?.focus();
    }
  }, [selectedRange]);

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
    onOpenToggle: () => setOpen((x) => !x),
    ref: datePickerRef,
  };

  const fromInputProps = {
    onChange: (e) => handleChange(e, RANGE.FROM),
    onFocus: (e) => handleFocus(e, RANGE.FROM),
    onBlur: (e) => handleBlur(e, RANGE.FROM),
    value: fromInputValue,
    ref: inputRefFrom,
  };

  const toInputProps = {
    onChange: (e) => handleChange(e, RANGE.TO),
    onFocus: (e) => handleFocus(e, RANGE.TO),
    onBlur: (e) => handleBlur(e, RANGE.TO),
    value: toInputValue,
    ref: inputRefTo,
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

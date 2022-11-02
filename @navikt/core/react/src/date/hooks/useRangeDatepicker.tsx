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
import { DateValidationT, UseDatepickerOptions } from "./useDatepicker";

export type RangeValidationT = {
  from: DateValidationT;
  to: DateValidationT & { isBeforeFrom?: boolean };
};

const getValidationMessage = (from = {}, to = {}): RangeValidationT => ({
  from: {
    isDisabled: false,
    isWeekend: false,
    isEmpty: false,
    isInvalid: false,
    isBefore: false,
    isAfter: false,
    isValidDate: true,
    ...from,
  },
  to: {
    isDisabled: false,
    isWeekend: false,
    isEmpty: false,
    isInvalid: false,
    isBefore: false,
    isAfter: false,
    isBeforeFrom: false,
    isValidDate: true,
    ...to,
  },
});

interface UseRangeDatepickerOptions
  extends Omit<
    UseDatepickerOptions,
    "defaultSelected" | "onDateChange" | "onValidate"
  > {
  /**
   * The initially selected DateRange
   */
  defaultSelected?: DateRange;
  /**
   * Callback for changed state
   */
  onRangeChange?: (val?: DateRange) => void;
  /**
   * validation-callback
   */
  onValidate?: (val: RangeValidationT) => void;
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

const fromValidation = (day: Date, opt?: UseRangeDatepickerOptions) => {
  const isBefore =
    opt?.fromDate && day && differenceInCalendarDays(opt?.fromDate, day) > 0;
  const isAfter =
    opt?.toDate && day && differenceInCalendarDays(day, opt?.toDate) > 0;

  if (
    isValidDate(day) &&
    !(opt?.disableWeekends && isWeekend(day)) &&
    !(opt?.disabled && isMatch(day, opt.disabled))
  ) {
    return {
      isValidDate: false,
      isInvalid: !isValidDate(day),
      isWeekend: opt?.disableWeekends && isWeekend(day),
      isDisabled: opt?.disabled && isMatch(day, opt.disabled),
      isBefore: isBefore,
      isAfter: isAfter,
    };
  }
  if (isBefore || isAfter) {
    return {
      isValidDate: false,
      isBefore: isBefore,
      isAfter: isAfter,
    };
  }
};

const toValidation = (
  day: Date,
  from: Date,
  opt?: UseRangeDatepickerOptions
) => {
  const isBefore =
    opt?.fromDate && day && differenceInCalendarDays(opt?.fromDate, day) > 0;
  const isAfter =
    opt?.toDate && day && differenceInCalendarDays(day, opt?.toDate) > 0;

  const isBeforeFrom =
    (from && differenceInCalendarDays(from, day) > 0) ?? false;

  if (
    isValidDate(day) &&
    !(opt?.disableWeekends && isWeekend(day)) &&
    !(opt?.disabled && isMatch(day, opt.disabled))
  ) {
    return {
      isValidDate: false,
      isInvalid: !isValidDate(day),
      isWeekend: opt?.disableWeekends && isWeekend(day),
      isDisabled: opt?.disabled && isMatch(day, opt.disabled),
      isBefore,
      isAfter,
      isBeforeFrom,
    };
  }
  if (isBefore || isAfter || isBeforeFrom) {
    return {
      isValidDate: false,
      isBefore,
      isAfter,
      isBeforeFrom,
    };
  }
};

const initialValidation = (
  range?: DateRange,
  opt?: UseRangeDatepickerOptions
): RangeValidationT => {
  if (!range || !range?.from) {
    return getValidationMessage(
      { isEmpty: true, isValidDate: false },
      { isEmpty: true, isValidDate: false }
    );
  }

  const fromVal = fromValidation(range.from, opt);
  const toVal = range.to
    ? toValidation(range.to, range.from, opt)
    : { isEmpty: true, isValidDate: false };

  return getValidationMessage({ ...fromVal }, { ...toVal });
};

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
    inputFormat,
    onValidate,
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
      ? formatDateForInput(defaultSelected.from, locale, "date", inputFormat)
      : ""
  );

  const [toInputValue, setToInputValue] = useState(
    defaultSelected?.to
      ? formatDateForInput(defaultSelected.to, locale, "date", inputFormat)
      : ""
  );

  const [validation, setValidation] = useState<RangeValidationT>(
    initialValidation(selectedRange, opt)
  );

  const [open, setOpen] = useState(false);

  const updateRange = (range?: DateRange) => {
    onRangeChange?.(range);
    setSelectedRange(range);
  };

  const updateValidation = (
    from: Partial<RangeValidationT["from"]> = {},
    to: Partial<RangeValidationT["to"]> = {}
  ) => {
    const msg = getValidationMessage(from, to);
    setValidation(msg);
    onValidate?.(msg);
  };

  const handleFocusIn = useCallback(
    (e) => {
      if (!e?.target || !e?.target?.nodeType) {
        return;
      }
      ![
        datePickerRef.current,
        inputRefTo.current,
        inputRefFrom.current,
        inputRefTo.current?.nextSibling,
        inputRefFrom.current?.nextSibling,
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
    updateRange(defaultSelected ?? { from: undefined, to: undefined });
    setMonth(defaultSelected ? defaultSelected?.from : today);
    setValidation(
      initialValidation(
        defaultSelected ?? { from: undefined, to: undefined },
        opt
      )
    );
    setFromInputValue(
      defaultSelected?.from
        ? formatDateForInput(defaultSelected.from, locale, "date", inputFormat)
        : ""
    );
    setToInputValue(
      defaultSelected?.to
        ? formatDateForInput(defaultSelected.to, locale, "date", inputFormat)
        : ""
    );
    setDefaultSelected(_defaultSelected);
  };

  const setSelected = (range?: DateRange) => {
    updateRange(range);
    setFromInputValue(
      range?.from
        ? formatDateForInput(range.from, locale, "date", inputFormat)
        : ""
    );
    setToInputValue(
      range?.to
        ? formatDateForInput(range?.to, locale, "date", inputFormat)
        : ""
    );
    setValidation(initialValidation(range, opt));
  };

  const handleFocus = (e, src: RangeT) => {
    !open && setOpen(true);
    let day = parseDate(e.target.value, today, locale, "date");
    if (isValidDate(day)) {
      setMonth(day);
      src === RANGE.FROM
        ? setFromInputValue(
            formatDateForInput(day, locale, "date", inputFormat)
          )
        : setToInputValue(formatDateForInput(day, locale, "date", inputFormat));
    }
  };

  const handleBlur = (e, src: RangeT) => {
    let day = parseDate(e.target.value, today, locale, "date");
    if (!isValidDate(day)) {
      return;
    }

    if (src === RANGE.FROM) {
      setFromInputValue(formatDateForInput(day, locale, "date", inputFormat));
    } else if (src === RANGE.TO) {
      setToInputValue(formatDateForInput(day, locale, "date", inputFormat));
    }
  };

  const validateDay = (day: any) => {
    return (
      isValidDate(day) &&
      !(disableWeekends && isWeekend(day)) &&
      !(disabled && isMatch(day, disabled))
    );
  };

  const handleSelect = (range) => {
    if (range?.from && range?.to) {
      setOpen(false);
    }
    const prevToRange =
      !selectedRange?.from && selectedRange?.to ? selectedRange?.to : range?.to;

    range?.from
      ? setFromInputValue(
          formatDateForInput(range?.from, locale, "date", inputFormat)
        )
      : setFromInputValue("");
    prevToRange
      ? setToInputValue(
          formatDateForInput(prevToRange, locale, "date", inputFormat)
        )
      : setToInputValue("");
    updateValidation(
      { isValidDate: !!range?.from, isEmpty: !range?.from },
      { isValidDate: !!range?.to, isEmpty: !prevToRange }
    );
    updateRange({ from: range?.from, to: prevToRange });
  };

  const fromChange = (
    val: string = "",
    day: Date,
    isBefore = false,
    isAfter = false
  ) => {
    setFromInputValue(val);
    if (!validateDay(day)) {
      updateRange({ ...selectedRange, from: undefined });
      updateValidation(
        {
          isEmpty: !val,
          isValidDate: false,
          isInvalid: !isValidDate(day),
          isWeekend: disableWeekends && isWeekend(day),
          isDisabled: disabled && isMatch(day, disabled),
          isBefore,
          isAfter,
        },
        validation.to
      );
      return;
    }
    if (isBefore || isAfter) {
      updateRange({ ...selectedRange, from: undefined });
      updateValidation(
        {
          isValidDate: false,
          isBefore,
          isAfter,
        },
        validation.to
      );
      return;
    }

    if (
      selectedRange?.to &&
      differenceInCalendarDays(day, selectedRange?.to) > 0
    ) {
      updateRange({ to: day, from: day });
      setToInputValue(formatDateForInput(day, locale, "date", inputFormat));
      setMonth(day);
      updateValidation();
      return;
    }

    if (toInputValue && !selectedRange?.to) {
      const toDay = parseDate(toInputValue, today, locale, "date");
      if (validateDay(toDay)) {
        updateRange({ from: day, to: toDay });
        setMonth(day);
        updateValidation();
        return;
      }
    }
    updateRange({ ...selectedRange, from: day });
    updateValidation({}, validation.to);
    setMonth(day);
  };

  const toChange = (
    val: string = "",
    day: Date,
    isBefore = false,
    isAfter = false
  ) => {
    setToInputValue(val);
    if (!validateDay(day)) {
      updateRange({ from: selectedRange?.from, to: undefined });
      updateValidation(validation.from, {
        isEmpty: !val,
        isValidDate: false,
        isInvalid: !isValidDate(day),
        isWeekend: disableWeekends && isWeekend(day),
        isDisabled: disabled && isMatch(day, disabled),
        isBefore,
        isAfter,
      });
      return;
    }

    if (isBefore || isAfter) {
      updateRange({ from: selectedRange?.from, to: undefined });
      updateValidation(validation.from, {
        isValidDate: false,
        isBefore,
        isAfter,
      });
      return;
    }

    /* If to-value < from-value */
    if (
      selectedRange?.from &&
      differenceInCalendarDays(selectedRange?.from, day) > 0
    ) {
      updateRange({ from: selectedRange?.from, to: undefined });
      updateValidation(validation.from, {
        isValidDate: false,
        isBeforeFrom: true,
      });
      return;
    }
    updateRange({ from: selectedRange?.from, to: day });
    updateValidation(validation.from, {});
    setMonth(day);
  };

  /* live-update datepicker based on changes in inputfields */
  const handleChange = (e, src: RangeT) => {
    const day = parseDate(e.target.value, today, locale, "date");
    const isBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && differenceInCalendarDays(day, toDate) > 0;

    return src === RANGE.FROM
      ? fromChange(e.target.value, day, isBefore, isAfter)
      : toChange(e.target.value, day, isBefore, isAfter);
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
    disabled,
    disableWeekends,
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

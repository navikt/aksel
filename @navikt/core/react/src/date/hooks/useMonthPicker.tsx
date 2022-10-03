import { differenceInMonths } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DateInputProps } from "../DateInput";
import { MonthPickerProps } from "../monthpicker/MonthPicker";
import { formatDateForInput, getLocaleFromString, isValidDate } from "../utils";
import { isMatch } from "../utils/is-match";
import { parseDate } from "../utils/parse-date";

export interface UseMonthPickerOptions
  extends Pick<
    MonthPickerProps,
    | "locale"
    | "fromDate"
    | "toDate"
    | "disabled"
    | "dropdownCaption"
    | "onMonthSelect"
    | "defaultSelected"
  > {
  /** Make the selection required. */
  required?: boolean;
  /**
   * Opens monthpicker on input-focus
   * @default true
   */
  openOnFocus?: boolean;
}

interface UseMonthPickerValue {
  /**
   * Use: <MonthPicker {...monthpickerProps}/>
   */
  monthpickerProps: MonthPickerProps;
  /**
   * Use: <MonthPicker.Input {...inputProps}/>
   */
  inputProps: Pick<
    DateInputProps,
    "onChange" | "onFocus" | "value" | "wrapperRef"
  >;
  /**
   * Selected month callback
   */
  selectedMonth?: Date;
  /**
   * Manually set selected month if needed
   */
  setSelected: (date?: Date) => void;
  /**
   * Resets all states
   */
  reset: () => void;
}

export const useMonthPicker = (
  opt: UseMonthPickerOptions = {}
): UseMonthPickerValue => {
  const {
    locale: _locale = "nb",
    defaultSelected,
    fromDate,
    toDate,
    openOnFocus = true,
    disabled,
  } = opt;

  const today = new Date();
  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const monthpickerRef = useRef<HTMLDivElement>(null);

  // Initialize states
  const [selectedMonth, setSelectedMonth] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "month")
    : "";

  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleFocusOut = useCallback(
    (e) =>
      ![monthpickerRef.current, inputRef.current].some((element) =>
        element?.contains(e.relatedTarget)
      ) && setOpen(false),
    []
  );

  useEffect(() => {
    const el = inputRef.current;
    el?.addEventListener("focusout", handleFocusOut);
    return () => el?.removeEventListener?.("focusout", handleFocusOut);
  }, [handleFocusOut]);

  const reset = () => {
    setSelectedMonth(defaultSelected);
    setInputValue(defaultInputValue ?? "");
  };

  const setSelected = (date: Date | undefined) => {
    setSelectedMonth(date);
    setInputValue(date ? formatDateForInput(date, locale, "month") : "");
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && openOnFocus && setOpen(true);
    if (!e.target.value) {
      reset();
      return;
    }
    let day = parseDate(e.target.value, today, locale, "month");
    if (isValidDate(day)) {
      setInputValue(formatDateForInput(day, locale, "month"));
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    let day = parseDate(e.target.value, today, locale, "month");
    isValidDate(day) && setInputValue(formatDateForInput(day, locale, "month"));
  };

  /* Only allow de-selecting if not required */
  const handleMonthClick = (month?: Date) => {
    if (/* !required &&  */ !month) {
      setSelectedMonth(undefined);
      setInputValue("");
      return;
    }
    setSelectedMonth(month);
    setInputValue(month ? formatDateForInput(month, locale, "month") : "");
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const month = parseDate(e.target.value, today, locale, "month");

    console.log(
      differenceInMonths(new Date("Oct 2 2032"), new Date("Sep 10 2032"))
    );

    /* TODO: Skal fungere for xor from/to */
    /*     const isBefore = fromDate &&  */
    if (!isValidDate(month) || (disabled && isMatch(month, disabled))) {
      setSelectedMonth(undefined);
      return;
    }
    if (
      fromDate &&
      toDate &&
      !isMatch(month, [{ from: fromDate, to: toDate }])
    ) {
      setSelectedMonth(undefined);
      return;
    }
    setSelectedMonth(month);
    console.log(month);
  };

  const monthpickerProps = {
    onMonthSelect: handleMonthClick,
    selected: selectedMonth,
    locale: _locale,
    fromDate,
    toDate,
    open,
    onClose: () => setOpen(false),
    onOpenToggle: () => setOpen((x) => !x),
    disabled,
    ref: monthpickerRef,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    wrapperRef: inputRef,
  };

  return { monthpickerProps, inputProps, reset, selectedMonth, setSelected };
};

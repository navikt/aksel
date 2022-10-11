import React, { useCallback, useEffect, useRef, useState } from "react";
import { DateInputProps } from "../DateInput";
import { MonthPickerProps } from "../monthpicker/MonthPicker";
import {
  formatDateForInput,
  getLocaleFromString,
  isMatch,
  isValidDate,
  parseDate,
} from "../utils";

export interface UseMonthPickerOptions
  extends Pick<
    MonthPickerProps,
    "locale" | "fromDate" | "toDate" | "disabled" | "defaultSelected"
  > {
  /**
   * Make Date-selection required
   */
  required?: boolean;
}

interface UseMonthPickerValue {
  /**
   * Use: <MonthPicker {...monthpickerProps} />
   */
  monthpickerProps: MonthPickerProps;
  /**
   * Use: <MonthPicker.Input {...inputProps} />
   */
  inputProps: Pick<
    DateInputProps,
    "onChange" | "onFocus" | "value" | "wrapperRef"
  >;
  /**
   * Currently selected Date
   * Up to user to validate value and extract month
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

export const useMonthpicker = (
  opt: UseMonthPickerOptions = {}
): UseMonthPickerValue => {
  const {
    locale: _locale = "nb",
    defaultSelected,
    fromDate,
    toDate,
    disabled,
    required,
  } = opt;

  const today = new Date();
  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const monthpickerRef = useRef<HTMLDivElement>(null);

  // Initialize states
  const [year, setYear] = useState(defaultSelected ?? today);
  const [selectedMonth, setSelectedMonth] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "month")
    : "";

  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleFocusIn = useCallback(
    (e) =>
      ![
        monthpickerRef.current,
        inputRef.current,
        inputRef.current?.nextSibling,
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
    setSelectedMonth(defaultSelected);
    setYear(defaultSelected ?? today);
    setInputValue(defaultInputValue ?? "");
  };

  const setSelected = (date: Date | undefined) => {
    setSelectedMonth(date);
    setYear(date ?? today);
    setInputValue(date ? formatDateForInput(date, locale, "month") : "");
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && setOpen(true);
    if (!e.target.value) {
      reset();
      return;
    }
    let day = parseDate(e.target.value, today, locale, "month");
    if (isValidDate(day)) {
      setYear(day);
      setInputValue(formatDateForInput(day, locale, "month"));
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    let day = parseDate(e.target.value, today, locale, "month");
    isValidDate(day) && setInputValue(formatDateForInput(day, locale, "month"));
  };

  /* Only allow de-selecting if not required */
  const handleMonthClick = (month?: Date) => {
    if (month) {
      setOpen(false);
      inputRef.current && inputRef.current.focus();
    }

    if (!required && !month) {
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

    if (!isValidDate(month) || (disabled && isMatch(month, disabled))) {
      setSelectedMonth(undefined);
      return;
    }

    const isBefore =
      fromDate &&
      (fromDate.getFullYear() > month.getFullYear() ||
        (fromDate.getFullYear() === month.getFullYear() &&
          fromDate.getMonth() > month.getMonth()));

    const isAfter =
      toDate &&
      (toDate.getFullYear() < month.getFullYear() ||
        (toDate.getFullYear() === month.getFullYear() &&
          toDate.getMonth() < month.getMonth()));

    if (
      isAfter ||
      isBefore ||
      (fromDate && toDate && !isMatch(month, [{ from: fromDate, to: toDate }]))
    ) {
      setSelectedMonth(undefined);
      return;
    }
    setSelectedMonth(month);
    setYear(month);
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

  const monthpickerProps = {
    year,
    onYearChange: (y?: Date) => setYear(y ?? today),
    onMonthSelect: handleMonthClick,
    selected: selectedMonth,
    locale: _locale,
    fromDate,
    toDate,
    open,
    onOpenToggle: () => setOpen((x) => !x),
    disabled,
    ref: monthpickerRef,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    ref: inputRef,
  };

  return { monthpickerProps, inputProps, reset, selectedMonth, setSelected };
};

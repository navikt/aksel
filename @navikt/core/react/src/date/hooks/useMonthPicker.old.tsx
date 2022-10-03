import { useCallback, useEffect, useRef, useState } from "react";
import { DateInputProps } from "../DateInput";
import { MonthPickerProps } from "../monthpicker/MonthPicker";
import { getLocaleFromString, isValidDate } from "../utils";
import { formatDateForInput } from "../utils/format-date";
import { getDefaultSelected } from "../utils/get-initial-month";
import { isMatch } from "../utils/is-match";
import { parseDate } from "../utils/parse-date";

export interface UseMonthPickerOptions
  extends Pick<
    MonthPickerProps,
    | "locale"
    | "fromDate"
    | "toDate"
    | "selected"
    | "disabled"
    | "dropdownCaption"
    | "onMonthSelect"
  > {
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
}

export const useMonthPicker = (
  opt: UseMonthPickerOptions
): UseMonthPickerValue => {
  const {
    locale: _locale = "nb",
    selected,
    fromDate,
    toDate,
    openOnFocus = true,
    disabled = [],
    dropdownCaption = false,
    onMonthSelect,
  } = opt;

  const initialMonth = getDefaultSelected(
    disabled,
    dropdownCaption,
    fromDate,
    selected,
    toDate
  );

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const monthpickerRef = useRef<HTMLDivElement>(null);

  // Initialize states
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [year, setYear] = useState(selectedMonth);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    initialMonth ? formatDateForInput(initialMonth, locale, "month") : ""
  );

  const setSelected = (date: Date | undefined) => {
    date && setSelectedMonth(date);
    date && setYear(date);
    setInputValue(date ? formatDateForInput(date, locale, "month") : "");
  };

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
    setSelectedMonth(initialMonth);
    setYear(initialMonth);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && openOnFocus && setOpen(true);
    if (!e.target.value) {
      reset();
      return;
    }
  };

  const handleMonthClick = (month?: Date) => {
    onMonthSelect && onMonthSelect();
    month && setSelectedMonth(month);
    month && setInputValue(formatDateForInput(month, locale, "month"));
    return { useMonthpicker: true };
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    let month = parseDate(e.target.value, selectedMonth, locale, "month");
    if (!isValidDate(month) || isMatch(month, disabled)) {
      return;
    }
    if (dropdownCaption && !isMatch(month, [{ from: fromDate, to: toDate }])) {
      return;
    }
    setSelectedMonth(month);
    setYear(month);
  };

  const inputProps = {
    onFocus: handleFocus,
    value: inputValue,
    onChange: handleChange,
    wrapperRef: inputRef,
  };

  const monthpickerProps = {
    year,
    selected: selectedMonth,
    locale: _locale,
    fromDate,
    toDate,
    handleMonthClick: handleMonthClick,
    open,
    onClose: () => setOpen(false),
    onOpenToggle: () => setOpen((x) => !x),
    ref: monthpickerRef,
    disabled,
    dropdownCaption,
    onMonthSelect: handleMonthClick,
  };

  return { setSelected, selectedMonth, inputProps, monthpickerProps };
};

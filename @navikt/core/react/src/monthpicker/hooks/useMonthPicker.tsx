import { useCallback, useEffect, useRef, useState } from "react";
import { getLocaleFromString } from "../../datepicker/utils/locale";
import { MonthPickerDefaultProps } from "../MonthPicker";
import { MonthPickerInputProps } from "../MonthPickerInput";
import { getDefaultSelected } from "../utils/get-initial-month";

export interface UseMonthPickerOptions
  extends Pick<
    MonthPickerDefaultProps,
    | "locale"
    | "fromDate"
    | "toDate"
    | "defaultSelected"
    | "disabled"
    | "dropdownCaption"
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
   * Selected month callback
   */
  selectedMonth?: Date;
  /**
   * Manually set selected month if needed
   */
  setSelected: (date?: Date) => void;
}

export const useDatepicker = (
  opt: UseMonthPickerOptions = {}
): UseMonthPickerValue => {
  const {
    locale: _locale = "nb",
    required,
    defaultSelected,
    fromDate = new Date(),
    toDate,
    openOnFocus = true,
    disabled = [],
    dropdownCaption = false,
  } = opt;

  const initialMonth = getDefaultSelected(
    disabled,
    dropdownCaption,
    fromDate,
    defaultSelected,
    toDate
  );

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLDivElement>(null);
  const monthpickerRef = useRef<HTMLDivElement>(null);

  // Initialize states
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [year, setYear] = useState(selectedMonth);
  const [open, setOpen] = useState(false);

  const setSelected = (date: Date | undefined) => {
    date && setSelectedMonth(date);
    date && setYear(date);
  };

  return { setSelected, selectedMonth };
};

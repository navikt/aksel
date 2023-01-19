import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isWeekend from "date-fns/isWeekend";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DayClickEventHandler, isMatch } from "react-day-picker";
import { DateInputProps } from "../DateInput";
import { DatePickerProps } from "../datepicker/DatePicker";
import {
  formatDateForInput,
  getLocaleFromString,
  isValidDate,
  parseDate,
} from "../utils";

export interface UseDatepickerOptions
  extends Pick<
    DatePickerProps,
    | "locale"
    | "fromDate"
    | "toDate"
    | "today"
    | "toDate"
    | "fromDate"
    | "toDate"
    | "disabled"
    | "disableWeekends"
  > {
  /**
   * The initially selected Date
   */
  defaultSelected?: Date;
  /**
   * Default shown month
   */
  defaultMonth?: Date;
  /**
   * Make selection of Date required
   */
  required?: boolean;
  /**
   * Callback for changed state
   */
  onDateChange?: (val?: Date) => void;
  /**
   * Input-format
   * @default "dd.MM.yyyy"
   */
  inputFormat?: string;
  /**
   * validation-callback
   */
  onValidate?: (val: DateValidationT) => void;
}

interface UseDatepickerValue {
  /**
   * Use: <DatePicker {...datepickerProps}/>
   */
  datepickerProps: DatePickerProps;
  /**
   * Use: <DatePicker.Input {...inputProps}/>
   */
  inputProps: Pick<
    DateInputProps,
    "onChange" | "onFocus" | "onBlur" | "value"
  > & { ref: React.RefObject<HTMLInputElement> };
  /**
   * Resets all states (callback)
   */
  reset: () => void;
  /**
   * Currently selected date
   * Up to user to validate date
   */
  selectedDay?: Date;
  /**
   * Manually override currently selected day
   */
  setSelected: (date?: Date) => void;
}

export type DateValidationT = {
  isDisabled: boolean;
  isWeekend: boolean;
  isEmpty: boolean;
  isInvalid: boolean;
  isValidDate: boolean;
  isBefore: boolean;
  isAfter: boolean;
};

const getValidationMessage = (val = {}): DateValidationT => ({
  isDisabled: false,
  isWeekend: false,
  isEmpty: false,
  isInvalid: false,
  isBefore: false,
  isAfter: false,
  isValidDate: true,
  ...val,
});

export const useDatepicker = (
  opt: UseDatepickerOptions = {}
): UseDatepickerValue => {
  const {
    locale: _locale = "nb",
    required,
    defaultSelected: _defaultSelected,
    today = new Date(),
    fromDate,
    toDate,
    disabled,
    disableWeekends,
    onDateChange,
    inputFormat,
    onValidate,
    defaultMonth,
  } = opt;

  const locale = getLocaleFromString(_locale);

  const inputRef = useRef<HTMLInputElement>(null);
  const daypickerRef = useRef<HTMLDivElement>(null);

  const [defaultSelected, setDefaultSelected] = useState(_defaultSelected);

  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? defaultMonth ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "date", inputFormat)
    : "";
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const updateDate = (date?: Date) => {
    onDateChange?.(date);
    setSelectedDay(date);
  };

  const updateValidation = (val: Partial<DateValidationT> = {}) => {
    const msg = getValidationMessage(val);
    onValidate?.(msg);
  };

  const handleFocusIn = useCallback(
    (e) => {
      /* Workaround for shadow-dom users (open) */
      const composed = e.composedPath?.()?.[0];
      if (!e?.target || !e?.target?.nodeType || !composed) {
        return;
      }

      ![
        daypickerRef.current,
        inputRef.current,
        inputRef.current?.nextSibling,
      ].some(
        (element) => element?.contains(e.target) || element?.contains(composed)
      ) &&
        open &&
        setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("pointerdown", handleFocusIn);
    return () => {
      window?.removeEventListener?.("focusin", handleFocusIn);
      window?.removeEventListener?.("pointerdown", handleFocusIn);
    };
  }, [handleFocusIn]);

  const reset = () => {
    updateDate(defaultSelected);
    setMonth(defaultSelected ?? defaultMonth ?? today);
    setInputValue(defaultInputValue ?? "");
    setDefaultSelected(_defaultSelected);
  };

  const setSelected = (date: Date | undefined) => {
    updateDate(date);
    setMonth(date ?? defaultMonth ?? today);
    setInputValue(
      date ? formatDateForInput(date, locale, "date", inputFormat) : ""
    );
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    !open && setOpen(true);
    let day = parseDate(e.target.value, today, locale, "date");
    if (isValidDate(day)) {
      setMonth(day);
      setInputValue(formatDateForInput(day, locale, "date", inputFormat));
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    let day = parseDate(e.target.value, today, locale, "date");
    isValidDate(day) &&
      setInputValue(formatDateForInput(day, locale, "date", inputFormat));
  };

  /* Only allow de-selecting if not required */
  const handleDayClick: DayClickEventHandler = (day, { selected }) => {
    if (day && !selected) {
      setOpen(false);
      inputRef.current && inputRef.current.focus();
    }

    if (!required && selected) {
      updateDate(undefined);
      setInputValue("");
      updateValidation({ isValidDate: false, isEmpty: true });
      return;
    }
    updateDate(day);
    updateValidation();
    setMonth(day);
    setInputValue(
      day ? formatDateForInput(day, locale, "date", inputFormat) : ""
    );
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseDate(e.target.value, today, locale, "date");

    const isBefore =
      fromDate && day && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && day && differenceInCalendarDays(day, toDate) > 0;

    if (
      !isValidDate(day) ||
      (disableWeekends && isWeekend(day)) ||
      (disabled && isMatch(day, disabled))
    ) {
      updateDate(undefined);
      updateValidation({
        isInvalid: isValidDate(day),
        isWeekend: disableWeekends && isWeekend(day),
        isDisabled: disabled && isMatch(day, disabled),
        isValidDate: false,
        isEmpty: !e.target.value,
        isBefore: isBefore ?? false,
        isAfter: isAfter ?? false,
      });
      return;
    }

    if (isBefore || isAfter) {
      updateDate(undefined);
      updateValidation({
        isValidDate: false,
        isBefore: isBefore ?? false,
        isAfter: isAfter ?? false,
      });
      return;
    }
    updateDate(day);
    updateValidation();
    setMonth(defaultMonth ?? day);
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

  const datepickerProps = {
    month,
    onMonthChange: (month) => setMonth(month),
    onDayClick: handleDayClick,
    selected: selectedDay ?? new Date("Invalid date"),
    locale: _locale,
    fromDate,
    toDate,
    today,
    open,
    onOpenToggle: () => setOpen((x) => !x),
    disabled,
    disableWeekends,
    ref: daypickerRef,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    ref: inputRef,
  };

  return { datepickerProps, inputProps, reset, selectedDay, setSelected };
};

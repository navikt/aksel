import { differenceInCalendarDays, isWeekend } from "date-fns";
import React, { useCallback, useState } from "react";
import { DayEventHandler, dateMatchModifiers } from "react-day-picker";
import { useDateLocale } from "../../../util/i18n/i18n.hooks";
import { DateInputProps } from "../../Date.Input";
import { getLocaleFromString } from "../../Date.locale";
import { formatDateForInput, isValidDate, parseDate } from "../../date-utils";
import { DatePickerProps } from "../DatePicker";

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
  /**
   * Allows input of with `yy` year format.
   *
   * Decision between 20th and 21st century is based on before(todays year - 80) ? 21st : 20th.
   * e.g. In 2024 this equals to 1944 - 2043.
   * @default true
   */
  allowTwoDigitYear?: boolean;
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
  > & {
    /**
     * @private
     */
    setAnchorRef: React.Dispatch<
      React.SetStateAction<HTMLButtonElement | null>
    >;
  };
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

/**
 *
 * @see 🏷️ {@link UseDatepickerOptions}
 * @see 🏷️ {@link UseDatepickerValue}
 * @see 🏷️ {@link DateValidationT}
 * @example
 * const { datepickerProps, inputProps } = useDatepicker({
 *   fromDate: new Date("Aug 23 2019"),
 *   toDate: new Date("Feb 23 2024"),
 *   onDateChange: console.log,
 *   onValidate: console.log,
 * });
 */
export const useDatepicker = (
  opt: UseDatepickerOptions = {},
): UseDatepickerValue => {
  const {
    locale: _locale,
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
    allowTwoDigitYear = true,
  } = opt;

  const [anchorRef, setAnchorRef] = useState<HTMLButtonElement | null>(null);
  const localeFromProvider = useDateLocale();
  const locale = _locale ? getLocaleFromString(_locale) : localeFromProvider;

  const [defaultSelected, setDefaultSelected] = useState(_defaultSelected);

  // Initialize states
  const [month, setMonth] = useState(defaultSelected ?? defaultMonth ?? today);
  const [selectedDay, setSelectedDay] = useState(defaultSelected);
  const [open, setOpen] = useState(false);

  const defaultInputValue = defaultSelected
    ? formatDateForInput(defaultSelected, locale, "date", inputFormat)
    : "";
  const [inputValue, setInputValue] = useState(defaultInputValue);

  const handleOpen = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      newOpen &&
        setMonth(selectedDay ?? defaultSelected ?? defaultMonth ?? today);
    },
    [defaultMonth, defaultSelected, selectedDay, today],
  );

  const updateDate = (date?: Date) => {
    onDateChange?.(date);
    setSelectedDay(date);
  };

  const updateValidation = (val: Partial<DateValidationT> = {}) =>
    onValidate?.(getValidationMessage(val));

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
      date ? formatDateForInput(date, locale, "date", inputFormat) : "",
    );
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    if (e.target.readOnly) {
      return;
    }
    const day = parseDate(
      e.target.value,
      today,
      locale,
      "date",
      allowTwoDigitYear,
    );
    if (isValidDate(day)) {
      setInputValue(formatDateForInput(day, locale, "date", inputFormat));

      const isBefore =
        fromDate && day && differenceInCalendarDays(fromDate, day) > 0;
      const isAfter =
        toDate && day && differenceInCalendarDays(day, toDate) > 0;

      !isBefore && !isAfter && setMonth(day);
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const day = parseDate(
      e.target.value,
      today,
      locale,
      "date",
      allowTwoDigitYear,
    );
    isValidDate(day) &&
      setInputValue(formatDateForInput(day, locale, "date", inputFormat));
  };

  /* Only allow de-selecting if not required */
  const handleDayClick: DayEventHandler<React.MouseEvent> = (
    day,
    { selected },
  ) => {
    if (selected && required) {
      return;
    }

    if (day && !selected) {
      handleOpen(false);
      anchorRef?.focus();
    }

    if (selected) {
      updateDate(undefined);
      setInputValue("");
      updateValidation({ isValidDate: false, isEmpty: true });
      return;
    }
    updateDate(day);
    updateValidation();
    setMonth(day);
    setInputValue(
      day ? formatDateForInput(day, locale, "date", inputFormat) : "",
    );
  };

  // When changing the input field, save its value in state and check if the
  // string is a valid date. If it is a valid day, set it as selected and update
  // the calendar’s month.
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
    const day = parseDate(
      e.target.value,
      today,
      locale,
      "date",
      allowTwoDigitYear,
    );

    const isBefore =
      fromDate && day && differenceInCalendarDays(fromDate, day) > 0;
    const isAfter = toDate && day && differenceInCalendarDays(day, toDate) > 0;

    if (
      !isValidDate(day) ||
      (disableWeekends && isWeekend(day)) ||
      (disabled && dateMatchModifiers(day, disabled))
    ) {
      updateDate(undefined);
      updateValidation({
        isInvalid: !isValidDate(day),
        isWeekend: disableWeekends && isWeekend(day),
        isDisabled: disabled && dateMatchModifiers(day, disabled),
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

  const datepickerProps = {
    month,
    onMonthChange: setMonth,
    onDayClick: handleDayClick,
    selected: selectedDay ?? new Date("Invalid date"),
    locale: _locale,
    fromDate,
    toDate,
    today,
    open,
    onClose: () => {
      handleOpen(false);
      anchorRef?.focus();
    },
    onOpenToggle: () => handleOpen(!open),
    disabled,
    disableWeekends,
  };

  const inputProps = {
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    value: inputValue,
    setAnchorRef,
  };

  return { datepickerProps, inputProps, reset, selectedDay, setSelected };
};

import { Locale, isSameYear } from "date-fns";
import React from "react";
import { createContext } from "../../util/create-context";
import { useControllableState } from "../../util/hooks";
import { clampDisplayYear } from "../datepicker/new-util/clampDisplayDate";
import { MonthPickerProps } from "./types";

type MonthPickerProviderProps = Pick<
  MonthPickerProps,
  | "dropdownCaption"
  | "disabled"
  | "selected"
  | "defaultSelected"
  | "onMonthSelect"
  | "year"
  | "onYearChange"
  | "fromDate"
  | "toDate"
> & {
  children: React.ReactNode;
  locale: Locale;
};

type MonthPickerContextProps = {
  caption: "label" | "dropdown";
  year: Date;
  onYearChange: (year: Date) => void;
  selected: MonthPickerProps["selected"];
  onMonthSelect: MonthPickerProps["onMonthSelect"];
  disabled: MonthPickerProps["disabled"];
  locale: Locale;
};

const [MonthPickerContextProvider, useMonthPickerContext] =
  createContext<MonthPickerContextProps>({
    name: "MonthPickerContext",
    errorMessage:
      "useMonthPickerContext must be used within an MonthPickerContextProvider",
  });

const MonthPickerProvider = ({
  children,
  disabled,
  year,
  fromDate,
  toDate,
  selected,
  defaultSelected,
  onMonthSelect,
  dropdownCaption,
  locale,
}: MonthPickerProviderProps) => {
  /**
   * Controlls current displayed year in MonthPicker
   */
  const [displayYear, setDisplayYear] = useControllableState({
    defaultValue:
      clampDisplayYear({
        month: year ?? selected,
        start: fromDate,
        end: toDate,
      }) ?? new Date(),
    value: year,
    /* TODO: add onChange */
  });

  /**
   * Allows both controlled and uncontrolled use of MonthPicker
   */
  const [month, setMonth] = useControllableState({
    defaultValue: defaultSelected,
    value: selected,
    /* TODO: Validate this */
    onChange: onMonthSelect,
  });

  const handleDisplayYearUpdate = (newYear: Date) => {
    if (isSameYear(newYear, displayYear)) {
      return;
    }
    setDisplayYear(newYear);
  };

  return (
    <MonthPickerContextProvider
      caption={dropdownCaption && fromDate && toDate ? "dropdown" : "label"}
      disabled={disabled}
      selected={month}
      onMonthSelect={setMonth}
      year={displayYear}
      onYearChange={handleDisplayYearUpdate}
      locale={locale}
    >
      {children}
    </MonthPickerContextProvider>
  );
};

export { MonthPickerProvider, useMonthPickerContext };

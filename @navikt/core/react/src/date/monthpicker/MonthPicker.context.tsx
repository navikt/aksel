import { Locale, isSameYear } from "date-fns";
import React from "react";
import { createStrictContext } from "../../util/create-strict-context";
import { useControllableState } from "../../util/hooks";
import { clampDisplayYear } from "../date-utils";
import { MonthPickerProps } from "./MonthPicker.types";

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
  disabled: NonNullable<MonthPickerProps["disabled"]>;
  locale: Locale;
  fromDate?: MonthPickerProps["fromDate"];
  toDate?: MonthPickerProps["toDate"];
};

const {
  Provider: MonthPickerContextProvider,
  useContext: useMonthPickerContext,
} = createStrictContext<MonthPickerContextProps>({
  name: "MonthPickerContext",
  errorMessage:
    "useMonthPickerContext must be used within an MonthPickerContextProvider",
});

const MonthPickerProvider = ({
  children,
  disabled = [],
  year,
  onYearChange,
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
        month: year ?? selected ?? defaultSelected,
        start: fromDate,
        end: toDate,
      }) ?? new Date(),
    value: year,
    onChange: onYearChange,
  });

  /**
   * Allows both controlled and uncontrolled use of MonthPicker
   */
  const [month, setMonth] = useControllableState({
    defaultValue: defaultSelected,
    value: selected,
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
      fromDate={fromDate}
      toDate={toDate}
    >
      {children}
    </MonthPickerContextProvider>
  );
};

export { MonthPickerProvider, useMonthPickerContext };

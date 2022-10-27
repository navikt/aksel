import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import React, { createContext, useContext, useState } from "react";
import { useDayPicker } from "react-day-picker";
import { getInitialYear, Matcher } from "../utils";

export type SharedMonthContextType = {
  hasDropdown: boolean;
  year: Date;
  toYear: (date: Date) => void;
  disabled: Matcher[];
  selected?: Date;
  onSelect: (v?: Date) => void;
};

export const SharedMonthContext = createContext<SharedMonthContextType>({
  hasDropdown: false,
  year: new Date(),
  toYear: () => null,
  disabled: [],
  onSelect: () => null,
});

export const useSharedMonthContext = () => useContext(SharedMonthContext);

export const SharedMonthProvider = ({
  children,
  dropdownCaption,
  disabled,
  selected,
  onSelect,
  year: _year,
  onYearChange,
}) => {
  const context = useDayPicker();

  const [year, toYear] = useState<Date>(getInitialYear(context));

  const hasDropdown = !!(dropdownCaption && context.fromDate && context.toDate);

  if (
    context.fromDate &&
    context.toDate &&
    context?.fromDate >= context?.toDate
  ) {
    console.warn("fromDate needs to be before toDate - MonthPicker");
  }

  return (
    <SharedMonthContext.Provider
      value={{
        year: _year ?? year,
        toYear: (y) => {
          toYear(y);
          onYearChange?.(y);
        },
        hasDropdown,
        disabled,
        selected,
        onSelect: (v?: Date) =>
          v
            ? onSelect(setYear(startOfMonth(v), (_year ?? year).getFullYear()))
            : onSelect(undefined),
      }}
    >
      {children}
    </SharedMonthContext.Provider>
  );
};

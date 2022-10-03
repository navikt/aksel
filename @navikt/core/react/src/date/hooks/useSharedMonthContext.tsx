import { setYear, startOfMonth } from "date-fns";
import React, { createContext, useContext, useState } from "react";
import { useDayPicker } from "react-day-picker";
import { Matcher } from "../utils";
import { getInitialMonth } from "../utils/get-initial-month";

export type SharedMonthContextType = {
  hasDropdown: boolean;
  year: Date;
  toYear: (date: Date) => void;
  disabled: Matcher[];
  selected?: Date;
  onSelect: (v: Date) => void;
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
  selected: _selected,
}) => {
  const context = useDayPicker();
  const [selected, setSelected] = useState<Date | undefined>(_selected);

  const [year, toYear] = useState<Date>(getInitialMonth(context));

  const hasDropdown = !!(dropdownCaption && context.fromDate && context.toDate);

  const handleSelect = (v: Date) => {
    setSelected(setYear(startOfMonth(v), year.getFullYear()));
  };

  return (
    <SharedMonthContext.Provider
      value={{
        year,
        toYear,
        hasDropdown,
        disabled,
        selected,
        onSelect: handleSelect,
      }}
    >
      {children}
    </SharedMonthContext.Provider>
  );
};

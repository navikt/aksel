import { isSameMonth, setMonth, setYear, startOfMonth } from "date-fns";
import React, { useState } from "react";
import { useDayPicker } from "react-day-picker";
import { BodyShort } from "../..";
import { useSharedMonthContext } from "../hooks/useSharedMonthContext";
import { isMatch } from "../utils";
import MonthButton from "./MonthButton";

const getAllMonths = () => {
  const months: Date[] = [];
  const date = startOfMonth(new Date());
  for (let month = 0; month <= 11; month++) {
    months.push(setMonth(date, month));
  }
  return months;
};

export const MonthSelector = () => {
  const [focus, setFocus] = useState<Date>();

  const { selectedMonth, yearState, disabled } = useSharedMonthContext();

  const months: Date[] = getAllMonths();

  const hasSelected = months.some((m) =>
    isSameMonth(setYear(m, Number(yearState.getFullYear())), selectedMonth)
  );

  const getRootFallback = () => {
    for (let i = 0; i < months.length; i++) {
      const m = months[i];
      if (!isMatch(setYear(m, Number(yearState.getFullYear())), disabled)) {
        return setYear(m, Number(yearState.getFullYear()));
      }
    }
  };

  const [tabRoot, setTabRoot] = useState(
    hasSelected ? selectedMonth : getRootFallback()
  );

  if (tabRoot?.getFullYear() !== yearState.getFullYear()) {
    setTabRoot(hasSelected ? selectedMonth : getRootFallback());
  }

  /* console.log(months); */

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((month: Date, y) => {
        return (
          <MonthButton
            key={month.toDateString()}
            y={y}
            month={setYear(month, Number(yearState.getFullYear()))}
            months={months}
            focus={focus}
            setFocus={setFocus}
            tabRoot={tabRoot}
            setTabRoot={setTabRoot}
          />
        );
      })}
    </BodyShort>
  );
};

export default MonthSelector;

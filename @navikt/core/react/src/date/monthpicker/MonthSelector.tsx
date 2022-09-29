import {
  compareAsc,
  isSameMonth,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import React, { useState } from "react";
import { useDayPicker } from "react-day-picker";
import { BodyShort } from "../..";
import { useSharedMonthContext } from "../hooks/useSharedMonthContext";
import { isMatch, Matcher } from "../utils";
import Month from "./Month";

interface MonthSelectorType {
  disabled: Matcher[];
}

export const MonthSelector = ({ disabled }: MonthSelectorType) => {
  const months: Date[] = [];
  const { fromDate, toDate, locale } = useDayPicker();
  const [focus, setFocus] = useState<Date>();

  const { isValidDropdownCaption, selectedMonth, yearState, setYearState } =
    useSharedMonthContext();

  if (
    isValidDropdownCaption &&
    fromDate &&
    toDate &&
    isSameYear(fromDate, toDate)
  ) {
    const date = startOfMonth(fromDate);
    for (let month = fromDate.getMonth(); month <= toDate.getMonth(); month++) {
      months.push(setMonth(date, month));
    }
  } else {
    const date = startOfMonth(new Date());
    for (let month = 0; month <= 11; month++) {
      months.push(setMonth(date, month));
    }
  }

  const hideMonth = (month: Date) => {
    if (isValidDropdownCaption && fromDate) {
      return compareAsc(month, fromDate) === -1;
    }
  };

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

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((month: Date, y) => {
        return (
          <Month
            key={month.toDateString()}
            y={y}
            locale={locale}
            month={setYear(month, Number(yearState.getFullYear()))}
            disabled={disabled}
            months={months}
            hideMonth={hideMonth}
            focus={focus}
            setFocus={setFocus}
            fromDate={fromDate}
            toDate={toDate}
            tabRoot={tabRoot}
            setTabRoot={setTabRoot}
          />
        );
      })}
    </BodyShort>
  );
};

export default MonthSelector;

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
import { isMatch, Matcher } from "../utils";
import Month from "./Month";

interface MonthSelectorType {
  onSelect: (m: Date) => void;
  selected: Date;
  dropdownCaption: boolean;
  disabled: Matcher[];
  yearState: Date;
  setYearState: Function;
}

export const MonthSelector = ({
  onSelect,
  selected,
  dropdownCaption,
  disabled,
  yearState,
  setYearState,
}: MonthSelectorType) => {
  const months: Date[] = [];
  const { fromDate, toDate, locale } = useDayPicker();
  const [focus, setFocus] = useState<Date>();

  if (dropdownCaption && fromDate && toDate && isSameYear(fromDate, toDate)) {
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
    if (dropdownCaption && fromDate) {
      return compareAsc(month, fromDate) === -1;
    }
  };

  const hasSelected = months.some((m) =>
    isSameMonth(setYear(m, Number(yearState.getFullYear())), selected)
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
    hasSelected ? selected : getRootFallback()
  );

  if (tabRoot?.getFullYear() !== yearState.getFullYear()) {
    setTabRoot(hasSelected ? selected : getRootFallback());
  }

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((month: Date, y) => {
        return (
          <Month
            key={month.toDateString()}
            y={y}
            locale={locale}
            selected={selected}
            month={setYear(month, Number(yearState.getFullYear()))}
            yearState={yearState}
            disabled={disabled}
            onSelect={onSelect}
            months={months}
            hideMonth={hideMonth}
            focus={focus}
            setFocus={setFocus}
            setYearState={setYearState}
            dropdownCaption={dropdownCaption}
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

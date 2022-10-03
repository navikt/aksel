import { isSameMonth, setMonth, setYear, startOfMonth } from "date-fns";
import React, { useState } from "react";
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
    isSameMonth(setYear(m, yearState.getFullYear()), selectedMonth)
  );

  const getRootFallback = () => {
    for (let i = 0; i < months.length; i++) {
      const m = months[i];
      if (!isMatch(setYear(m, yearState.getFullYear()), disabled)) {
        return setYear(m, yearState.getFullYear());
      }
    }
  };

  const [tabRoot, setTabRoot] = useState(
    hasSelected ? selectedMonth : getRootFallback()
  );

  if (tabRoot?.getFullYear() !== yearState.getFullYear()) {
    setTabRoot(hasSelected ? selectedMonth : getRootFallback());
  }

  const tableMonths = [
    months.slice(0, 4),
    months.slice(4, 8),
    months.slice(8, 12),
  ];

  return (
    <BodyShort as="table" className="rdp-table">
      <tbody className="rdp-tbody">
        {tableMonths.map((x, y) => (
          <tr className="rdp-row" key={y}>
            {x.map((month: Date, y) => {
              return (
                <td key={month.toDateString()} className="rdp-cell">
                  <MonthButton
                    month={setYear(month, yearState.getFullYear())}
                    months={months}
                    focus={focus}
                    setFocus={setFocus}
                    tabRoot={tabRoot}
                    setTabRoot={setTabRoot}
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </BodyShort>
  );
};

export default MonthSelector;

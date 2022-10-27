import isSameMonth from "date-fns/isSameMonth";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import React, { useState } from "react";
import { BodyShort } from "../..";
import { useSharedMonthContext } from "../hooks";
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

  const { selected, year, disabled } = useSharedMonthContext();

  const months: Date[] = getAllMonths();

  const hasSelected =
    selected &&
    months.some((m) => isSameMonth(setYear(m, year.getFullYear()), selected));

  const getRootFallback = () => {
    const today = startOfMonth(new Date());
    if (
      year?.getFullYear() === today.getFullYear() &&
      !isMatch(today, disabled)
    ) {
      return today;
    }

    for (let i = 0; i < months.length; i++) {
      const m = months[i];
      if (!isMatch(setYear(m, year.getFullYear()), disabled)) {
        return setYear(m, year.getFullYear());
      }
    }
  };

  const [tabRoot, setTabRoot] = useState(
    hasSelected ? selected : getRootFallback()
  );

  if (tabRoot?.getFullYear() !== year.getFullYear()) {
    setTabRoot(hasSelected ? selected : getRootFallback());
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
                    month={setYear(month, year.getFullYear())}
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

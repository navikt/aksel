import {
  addDays,
  addWeeks,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  getWeek,
  getWeeksInMonth,
  Locale,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import React from "react";
import { useDayPicker } from "react-day-picker";
import { WeekNumber } from "../WeekNumber";
import { Detail } from "../../../typography";
import { Show } from "../../../layout/responsive";
import { labelWeek } from "../../utils/labels";

const WeekRow = ({ displayMonth }: { displayMonth: Date }) => {
  const { locale, fixedWeeks, onWeekNumberClick } = useDayPicker();

  if (!onWeekNumberClick) {
    return null;
  }

  const weeks = getMonthWeeks(displayMonth, {
    useFixedWeeks: Boolean(fixedWeeks),
    locale,
  });

  return (
    <Show below="sm" asChild>
      <table className="rdp-table">
        <tbody className="rdp-tbody">
          <tr className="rdp-row navds-date__week-row">
            <Detail
              as="th"
              weight="semibold"
              className="rdp-cell navds-date__week-cell"
            >
              <span className="navds-date__week-wrapper">
                {labelWeek(locale?.code)}
              </span>
            </Detail>

            {weeks.map((week) => (
              <td
                key={week.weekNumber}
                className="rdp-cell navds-date__week-cell"
              >
                <div className="navds-date__week-wrapper">
                  <WeekNumber
                    number={week.weekNumber}
                    dates={week.dates}
                    headerVersion
                  />
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </Show>
  );
};

type MonthWeek = {
  /** The week number from the start of the year. */
  weekNumber: number;
  /** The dates in the week. */
  dates: Date[];
};

function getMonthWeeks(
  month: Date,
  options: {
    locale: Locale;
    useFixedWeeks?: boolean;
  }
): MonthWeek[] {
  const weeksInMonth: MonthWeek[] = daysToMonthWeeks(
    startOfMonth(month),
    endOfMonth(month),
    options
  );

  if (options?.useFixedWeeks) {
    // Add extra weeks to the month, up to 6 weeks
    const nrOfMonthWeeks = getWeeksInMonth(month, options);
    if (nrOfMonthWeeks < 6) {
      const lastWeek = weeksInMonth[weeksInMonth.length - 1];
      const lastDate = lastWeek.dates[lastWeek.dates.length - 1];
      const toDate = addWeeks(lastDate, 6 - nrOfMonthWeeks);
      const extraWeeks = daysToMonthWeeks(
        addWeeks(lastDate, 1),
        toDate,
        options
      );
      weeksInMonth.push(...extraWeeks);
    }
  }
  return weeksInMonth;
}

/** Return the weeks between two dates.  */
export function daysToMonthWeeks(
  fromDate: Date,
  toDate: Date,
  options?: {
    locale?: Locale;
  }
): MonthWeek[] {
  const toWeek = endOfWeek(toDate, options);
  const fromWeek = startOfWeek(fromDate, options);

  const nOfDays = differenceInCalendarDays(toWeek, fromWeek);
  const days: Date[] = [];

  for (let i = 0; i <= nOfDays; i++) {
    days.push(addDays(fromWeek, i));
  }

  const weeksInMonth = days.reduce((result: MonthWeek[], date) => {
    const weekNumber = getWeek(date, options);

    const existingWeek = result.find(
      (value) => value.weekNumber === weekNumber
    );
    if (existingWeek) {
      existingWeek.dates.push(date);
      return result;
    }
    result.push({
      weekNumber,
      dates: [date],
    });
    return result;
  }, []);

  return weeksInMonth;
}

export default WeekRow;

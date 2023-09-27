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

export type MonthWeek = {
  /** The week number from the start of the year. */
  weekNumber: number;
  /** The dates in the week. */
  dates: Date[];
};

export function getMonthWeeks(
  month: Date,
  options: {
    locale: Locale;
    useFixedWeeks?: boolean;
  }
): MonthWeek[] {
  const _options = {
    ...options,
    weekStartsOn: 1 as const,
  };
  const weeksInMonth: MonthWeek[] = daysToMonthWeeks(
    startOfMonth(month),
    endOfMonth(month),
    _options
  );

  if (_options?.useFixedWeeks) {
    // Add extra weeks to the month, up to 6 weeks
    const nrOfMonthWeeks = getWeeksInMonth(month, _options);
    if (nrOfMonthWeeks < 6) {
      const lastWeek = weeksInMonth[weeksInMonth.length - 1];
      const lastDate = lastWeek.dates[lastWeek.dates.length - 1];
      const toDate = addWeeks(lastDate, 6 - nrOfMonthWeeks);
      const extraWeeks = daysToMonthWeeks(
        addWeeks(lastDate, 1),
        toDate,
        _options
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
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
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

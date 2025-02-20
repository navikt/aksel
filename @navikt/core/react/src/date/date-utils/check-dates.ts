import { differenceInCalendarDays, isThisMonth, setYear } from "date-fns";

export const dateIsInCurrentMonth = (
  date: Date,
  dateToCompare: Date,
): boolean => {
  return isThisMonth(setYear(date, Number(dateToCompare.getFullYear())));
};

/** @private */
export function isValidDate(day?: Date): boolean {
  return !!(day && !Number.isNaN(day.getTime()) && day.getFullYear() > 999);
}

export function isDateOutsideRange({
  day,
  fromDate,
  toDate,
}: {
  day: Date;
  fromDate?: Date;
  toDate?: Date;
}): boolean {
  const isDateAfter = toDate && differenceInCalendarDays(day, toDate) > 0;
  const isDateBefore = fromDate && differenceInCalendarDays(fromDate, day) > 0;

  return isDateAfter || isDateBefore || false;
}

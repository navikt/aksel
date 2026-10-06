import {
  differenceInCalendarDays,
  isThisMonth,
  setYear,
  startOfDay,
} from "date-fns";

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

const NAVIGABLE_YEAR_OFFSET = 150;

/**
 * Checks if the calendar should navigate to the year of the given date.
 * Allowed years are limited by `fromDate`/`toDate` when set, otherwise ±150 years from `today`.
 * Avoids navigating to unreasonable years (e.g. 4582) when typing in the input.
 * @private
 */
export function isNavigableYear({
  day,
  today,
  fromDate,
  toDate,
}: {
  day: Date;
  today: Date;
  fromDate?: Date;
  toDate?: Date;
}): boolean {
  const year = day.getFullYear();
  const minYear = fromDate
    ? fromDate.getFullYear()
    : today.getFullYear() - NAVIGABLE_YEAR_OFFSET;
  const maxYear = toDate
    ? toDate.getFullYear()
    : today.getFullYear() + NAVIGABLE_YEAR_OFFSET;

  return year >= minYear && year <= maxYear;
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
  const isDateAfter =
    toDate && differenceInCalendarDays(day, startOfDay(toDate)) > 0;
  const isDateBefore =
    fromDate && differenceInCalendarDays(startOfDay(fromDate), day) > 0;

  return isDateAfter || isDateBefore || false;
}

import { isDate, isSameDay, differenceInCalendarDays } from "date-fns";
import {
  DateAfter,
  DateBefore,
  DateInterval,
  DateRange,
  isDateAfterType,
  isDateBeforeType,
  isDateInterval,
  isDateRange,
} from "react-day-picker";

export type Matcher =
  | ((date: Date) => boolean)
  | Date
  | Date[]
  | DateRange
  | DateBefore
  | DateAfter
  | DateInterval;

function isDateType(value: unknown): value is Date {
  return isDate(value);
}

function isArrayOfDates(value: unknown): value is Date[] {
  return Array.isArray(value) && value.every(isDate);
}

export function isMatch(day: Date, matchers: Matcher[]): boolean {
  return matchers.some((matcher: Matcher) => {
    if (isDateType(matcher)) {
      return isSameDay(day, matcher);
    }
    if (isArrayOfDates(matcher)) {
      return matcher.includes(day);
    }
    if (isDateRange(matcher)) {
      return isDateInRange(day, matcher);
    }
    if (isDateInterval(matcher)) {
      const isBefore = differenceInCalendarDays(matcher.before, day) > 0;
      const isAfter = differenceInCalendarDays(day, matcher.after) > 0;
      return isBefore && isAfter;
    }
    if (isDateAfterType(matcher)) {
      return differenceInCalendarDays(day, matcher.after) > 0;
    }
    if (isDateBeforeType(matcher)) {
      return differenceInCalendarDays(matcher.before, day) > 0;
    }
    if (typeof matcher === "function") {
      return matcher(day);
    }
    return false;
  });
}

export function isDateInRange(date: Date, range: DateRange): boolean {
  let { from, to } = range;
  if (!from) {
    return false;
  }
  if (!to && isSameDay(from, date)) {
    return true;
  }
  if (!to) {
    return false;
  }
  const isToBeforeFrom = differenceInCalendarDays(to, from) < 0;
  if (to && isToBeforeFrom) {
    [from, to] = [to, from];
  }

  return (
    differenceInCalendarDays(date, from) >= 0 &&
    differenceInCalendarDays(to, date) >= 0
  );
}

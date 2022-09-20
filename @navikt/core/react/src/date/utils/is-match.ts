import {
  isDate,
  isSameDay,
  differenceInCalendarDays,
  isSameMonth,
} from "date-fns";
import {
  DateAfter,
  DateBefore,
  DateRange,
  isDateAfterType,
  isDateBeforeType,
  isDateRange,
} from "react-day-picker";

export type Matcher =
  | ((date: Date) => boolean)
  | Date
  | Date[]
  | DateRange
  | DateBefore
  | DateAfter;

function isDateType(value: unknown): value is Date {
  return isDate(value);
}

function isArrayOfDates(value: unknown): value is Date[] {
  return Array.isArray(value) && value.every(isDate);
}

export function isMatch(day: Date, matchers: Matcher[]): boolean {
  return matchers.some((matcher: Matcher) => {
    if (isDateType(matcher)) {
      return isSameMonth(day, matcher);
    }
    if (isArrayOfDates(matcher)) {
      return matcher.some((matcherDay) => {
        return isSameMonth(matcherDay, day);
      });
    }
    if (isDateRange(matcher)) {
      return isDateInRange(day, matcher);
    }
    if (isDateAfterType(matcher)) {
      return (
        isSameMonth(day, matcher.after) ||
        differenceInCalendarDays(day, matcher.after) > 0
      );
    }
    if (isDateBeforeType(matcher)) {
      return (
        isSameMonth(day, matcher.before) ||
        differenceInCalendarDays(matcher.before, day) > 0
      );
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

  if (isSameMonth(from, date) || isSameMonth(to, date)) {
    return true;
  }

  return (
    differenceInCalendarDays(date, from) >= 0 &&
    differenceInCalendarDays(to, date) >= 0
  );
}

import { isThisMonth, setYear } from "date-fns";

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

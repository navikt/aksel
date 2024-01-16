import isThisMonth from "date-fns/isThisMonth";
import setYear from "date-fns/setYear";

export const dateIsInCurrentMonth = (
  date: Date,
  dateToCompare: Date,
): boolean => {
  return isThisMonth(setYear(date, Number(dateToCompare.getFullYear())));
};

/** @private */
export function isValidDate(day: Date): boolean {
  return day && !isNaN(day?.getTime()) && day.getFullYear() > 999;
}

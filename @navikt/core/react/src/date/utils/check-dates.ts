import { isThisMonth, setYear } from "date-fns";

export const dateIsInCurrentMonth = (
  date: Date,
  dateToCompare: Date
): boolean => {
  return isThisMonth(setYear(date, Number(dateToCompare.getFullYear())));
};

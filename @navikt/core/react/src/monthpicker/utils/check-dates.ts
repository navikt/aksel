import { isSameMonth, setYear } from "date-fns";

export const dateIsInCurrentMonth = (
  date: Date,
  dateToCompare: Date
): boolean => {
  return isSameMonth(
    setYear(date, Number(dateToCompare.getFullYear())),
    dateToCompare
  );
};

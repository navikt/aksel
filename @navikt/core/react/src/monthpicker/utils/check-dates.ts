import { isThisMonth, setYear, isSameMonth } from "date-fns";

export const dateIsInCurrentMonth = (
  date: Date,
  dateToCompare: Date
): boolean => {
  return isThisMonth(setYear(date, Number(dateToCompare.getFullYear())));
};

export const dateIsSelected = (date: Date, selectedDate: Date): boolean => {
  return isSameMonth(
    setYear(date, Number(selectedDate.getFullYear())),
    selectedDate
  );
};

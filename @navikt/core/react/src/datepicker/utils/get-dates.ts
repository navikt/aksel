import { isSameYear, setMonth, startOfMonth } from "date-fns";

export const getMonths = (start: Date, end: Date): Date[] => {
  const dropdownMonths: Date[] = [];

  if (isSameYear(start, end)) {
    // only display the months included in the range
    const date = startOfMonth(start);
    for (let month = start.getMonth(); month <= end.getMonth(); month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  } else {
    // display all the 12 months
    const date = startOfMonth(new Date());
    for (let month = 0; month <= 11; month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  }
  return dropdownMonths;
};

export const getYears = (start: Date, end: Date): Date[] => {
  return [];
};

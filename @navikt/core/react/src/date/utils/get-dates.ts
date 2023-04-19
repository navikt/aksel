import isSameYear from "date-fns/isSameYear";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";

export const getMonths = (start: Date, end: Date, current: Date): Date[] => {
  const dropdownMonths: Date[] = [];

  if (isSameYear(start, end)) {
    const date = startOfMonth(start);
    for (let month = start.getMonth(); month <= end.getMonth(); month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  } else if (isSameYear(current, end)) {
    const date = startOfMonth(new Date());
    for (let month = 0; month <= end.getMonth(); month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  } else if (isSameYear(current, start)) {
    const date = startOfMonth(start);
    for (let month = date.getMonth(); month <= 11; month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  } else {
    const date = startOfMonth(new Date());
    for (let month = 0; month <= 11; month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  }

  if (!dropdownMonths.map((d) => d.getMonth()).includes(current.getMonth())) {
    dropdownMonths.push(current);
  }
  dropdownMonths.sort((a, b) => a.getMonth() - b.getMonth());

  return dropdownMonths;
};

export const getYears = (
  start: Date,
  end: Date,
  currentYear: number
): Date[] => {
  const years: Date[] = [];
  const fromYear = start.getFullYear();
  const toYear = end.getFullYear();
  for (let year = fromYear; year <= toYear; year++) {
    years.push(setYear(startOfYear(new Date()), year));
  }

  if (fromYear > currentYear || toYear < currentYear) {
    years.push(setYear(startOfYear(new Date()), currentYear));
  }

  years.sort((a, b) => a.getFullYear() - b.getFullYear());
  return years;
};

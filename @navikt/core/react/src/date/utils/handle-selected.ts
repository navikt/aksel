import { setYear } from "date-fns";

export const updateWithoutDropdownCaption = (year: Date, val: number): Date => {
  const newYear = Number(year.getFullYear() + val);
  return setYear(year, newYear);
};

export const updateWithDropdownCaption = (year: Date, val: number): Date => {
  return setYear(new Date(), year.getFullYear() + val);
};

export const hasNextYear = (year: Date, years: Date[], val: any): boolean => {
  return years.some((x) => year.getFullYear() + val === x.getFullYear());
};

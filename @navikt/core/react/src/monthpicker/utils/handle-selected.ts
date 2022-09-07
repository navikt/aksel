import { startOfMonth, setYear } from "date-fns";

export const updateWithoutDropdownCaption = (
  yearState: Date,
  val: number
): Date => {
  const newYear = Number(yearState.getFullYear() + val);
  return setYear(yearState, newYear);
};

export const updateWithDropdownCaption = (
  yearState: Date,
  selected: Date,
  years: Date[],
  val: number
): Date => {
  return setYear(startOfMonth(selected), yearState.getFullYear() + val);
};

export const hasNextYear = (
  yearState: Date,
  years: Date[],
  val: any
): boolean => {
  return years.some((x) => yearState.getFullYear() + val === x.getFullYear());
};

import { isSameDay } from "date-fns";

/**
 type Range = {
   from?: Date;
   to?: Date;
 };
 * 
 */

export const disableDate = (
  disabledSelection: Date | Array<any>,
  date: Date
): boolean => {
  if (disabledSelection instanceof Date) {
    return isSameDay(disabledSelection, date);
  } else if (disabledSelection instanceof Array) {
    return disabledSelection.some((disabledDate) =>
      isSameDay(disabledDate, date)
    );
  }
  return false;
};

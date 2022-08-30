import { isSameDay } from "date-fns";

type Range = {
  from?: Date;
  to?: Date;
};

export const disableDate = (
  disabledSelection: Date | Array<Date | Range>,
  date: Date
): boolean => {
  if (disabledSelection instanceof Date) {
    return isSameDay(disabledSelection, date);
  }
  /**
     else if (disabledSelection instanceof Array<Date | Range>) {
       console.log('Is array')
     }
     * 
     */
  return false;
};

import { isSameDay } from "date-fns";
import { isDateRange } from "../Date.typeutils";

export const disableDate = (
  disabledSelection: Date | any[],
  date: Date,
): boolean => {
  let result: boolean = false;
  if (disabledSelection instanceof Date) {
    return isSameDay(disabledSelection, date);
  }

  if (Array.isArray(disabledSelection)) {
    for (let i = 0; i < disabledSelection.length; i++) {
      const selection = disabledSelection[i];
      if (isDateRange(selection)) {
        if (selection.from && selection.to) {
          result = date >= selection.from && date <= selection.to;
        }
      } else if (selection instanceof Date) {
        result = isSameDay(selection, date);
      }
      if (result) break;
    }
  }
  return result;
};

import { DateRange } from "react-day-picker";
import { disableDate } from "./dates-disabled";
import { isWeekend } from "date-fns";

const handleSingle = (
  disabled: Array<Date | DateRange>,
  disableWeekends: boolean
): Date | undefined => {
  return disableDate(disabled, new Date()) ||
    (disableWeekends && isWeekend(new Date()))
    ? undefined
    : new Date();
};

export const getInitialSelected = (
  mode: string,
  disabled: Array<Date | DateRange>,
  disableWeekends: boolean
): Date | Date[] | DateRange | undefined => {
  switch (mode) {
    case "single":
      return handleSingle(disabled, disableWeekends);
    default:
      return undefined;
  }
};

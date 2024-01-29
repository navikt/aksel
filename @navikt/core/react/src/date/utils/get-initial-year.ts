import { startOfYear } from "date-fns";
import { DayPickerContextValue } from "react-day-picker";

/**
 *
 */
export function getInitialYear(context: Partial<DayPickerContextValue>): Date {
  const { month, defaultMonth, toDate, fromDate } = context;

  let initialMonth = month || defaultMonth || new Date();

  const isAfter = toDate && toDate.getFullYear() < initialMonth.getFullYear();

  const isBefore =
    fromDate && fromDate.getFullYear() > initialMonth.getFullYear();

  if (isAfter) {
    initialMonth = toDate;
  }
  if (isBefore) {
    initialMonth = fromDate;
  }

  return startOfYear(initialMonth);
}

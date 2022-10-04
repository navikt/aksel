import { startOfYear } from "date-fns";
import { DayPickerContextValue } from "react-day-picker";
import { isMatch, Matcher } from "./is-match";

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

export const getDefaultSelected = (
  disabled: Matcher[],
  dropdownCaption: boolean,
  defaultSelected?: Date,
  toDate?: Date,
  fromDate?: Date
): Date => {
  let selectedMonth = defaultSelected || new Date();

  if (
    dropdownCaption &&
    fromDate &&
    !isMatch(selectedMonth, [{ from: fromDate, to: toDate }])
  ) {
    selectedMonth = fromDate;
  }
  return getNextActiveMonth(selectedMonth, disabled);
};

const getNextActiveMonth = (selectedMonth: Date, disabled: Matcher[]) => {
  if (!isMatch(selectedMonth, disabled)) {
    return selectedMonth;
  } else {
    let currentYear = selectedMonth.getFullYear();
    let currentMonth = selectedMonth.getMonth() + 1;
    while (true) {
      const nextDate = new Date(`${currentMonth + 1} 1 ${currentYear}`);
      if (!isMatch(nextDate, disabled)) {
        return nextDate;
      }
      if (currentMonth === 11) {
        currentYear += 1;
        currentMonth = 0;
      } else {
        currentMonth += 1;
      }
    }
  }
};

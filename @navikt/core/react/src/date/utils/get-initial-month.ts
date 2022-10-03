import { addMonths, differenceInCalendarMonths, startOfMonth } from "date-fns";
import { DayPickerContextValue } from "react-day-picker";
import { isMatch, Matcher } from "./is-match";

export function getInitialMonth(context: Partial<DayPickerContextValue>): Date {
  const { month, defaultMonth } = context;
  let initialMonth = month || defaultMonth || new Date();

  const { toDate, fromDate, numberOfMonths = 1 } = context;

  // Fix the initialMonth if is after the to-date
  if (toDate && differenceInCalendarMonths(toDate, initialMonth) < 0) {
    const offset = -1 * (numberOfMonths - 1);
    initialMonth = addMonths(toDate, offset);
  }
  // Fix the initialMonth if is before the from-date
  if (fromDate && differenceInCalendarMonths(initialMonth, fromDate) < 0) {
    initialMonth = fromDate;
  }
  return startOfMonth(initialMonth);
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

import { isMatch, Matcher } from "./is-match";

export const getDefaultSelected = (
  disabled: Matcher[],
  dropdownCaption: boolean,
  fromDate: Date,
  defaultSelected?: Date,
  toDate?: Date
): Date => {
  let selectedMonth = dropdownCaption
    ? defaultSelected || fromDate || new Date()
    : defaultSelected || new Date();
  if (
    dropdownCaption &&
    !isMatch(selectedMonth, [{ from: fromDate, to: toDate }])
  )
    selectedMonth = fromDate;
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

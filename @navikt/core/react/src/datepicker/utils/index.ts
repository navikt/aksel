export { formatDateForInput } from "./format-date";
export { getMonths, getYears } from "./get-dates";
export { labelMonthDropdown, labelYearDropdown, labels } from "./labels";
export { INPUT_DATE_STRING_FORMAT, parseDate } from "./parse-date";
export { getLocaleFromString } from "./locale";

/** @private */
export function isValidDate(day: Date): boolean {
  return !isNaN(day.getTime());
}

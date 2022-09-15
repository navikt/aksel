import { parse } from "date-fns";
import { isValidDate } from "../../datepicker/utils";

export const INPUT_DATE_STRING_FORMAT = "MM.yyyy";

const ALLOWED_INPUT_FORMATS = [
  "M/yyyy",
  "MM/yyyy",
  "M-yyyy",
  "MM-yyyy",
  "MM.yyyy",
  INPUT_DATE_STRING_FORMAT,
];

export const parseDate = (date: string, today: Date, locale: Locale) => {
  let parsed;
  for (const format of ALLOWED_INPUT_FORMATS) {
    parsed = parse(date, format, today, { locale });
    if (isValidDate(parsed)) {
      return parsed;
    }
  }
  return parsed;
};

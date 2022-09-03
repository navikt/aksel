import { parse } from "date-fns";
import { isValidDate } from "./valid-date";

export const INPUT_DATE_STRING_FORMAT = "dd.MM.yyyy";

const ALLOWED_INPUT_FORMATS = [
  "ddMMyy",
  "d.M.yy",
  "dd.MM.yy",
  "dd/MM/yy",
  "dd-MM-yy",
  INPUT_DATE_STRING_FORMAT,
  "ddMMyyyy",
  "dd/MM/yyyy",
  "dd-MM-yyyy",
  "d.M.yyyy",
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

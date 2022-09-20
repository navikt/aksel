import { parse } from "date-fns";
import { isValidDate } from "./valid-date";

export const INPUT_DATE_STRING_FORMAT_DATE = "dd.MM.yyyy";

export const INPUT_DATE_STRING_FORMAT_MONTH = "MM.yyyy";

const ALLOWED_INPUT_FORMATS_DATE = [
  "ddMMyy",
  "d.M.yy",
  "dd.MM.yy",
  "dd/MM/yy",
  "dd-MM-yy",
  INPUT_DATE_STRING_FORMAT_DATE,
  "ddMMyyyy",
  "dd/MM/yyyy",
  "dd-MM-yyyy",
  "d.M.yyyy",
];

const ALLOWED_INPUT_FORMATS_MONTH = [
  "M/yyyy",
  "MM/yyyy",
  "M-yyyy",
  "MM-yyyy",
  "MM.yyyy",
  INPUT_DATE_STRING_FORMAT_MONTH,
];

export const parseDate = (
  date: string,
  today: Date,
  locale: Locale,
  type: "date" | "month"
) => {
  let parsed;
  const ALLOWED_FORMATS =
    type === "date" ? ALLOWED_INPUT_FORMATS_DATE : ALLOWED_INPUT_FORMATS_MONTH;
  for (const format of ALLOWED_FORMATS) {
    parsed = parse(date, format, today, { locale });
    if (isValidDate(parsed)) {
      return parsed;
    }
  }
  return parsed;
};

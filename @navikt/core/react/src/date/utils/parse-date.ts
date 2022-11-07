import parse from "date-fns/parse";
import { isValidDate } from ".";

export const INPUT_DATE_STRING_FORMAT_DATE = "dd.MM.yyyy";

export const INPUT_DATE_STRING_FORMAT_MONTH = "MMMM yyyy";

const ALLOWED_INPUT_FORMATS_DATE = [
  INPUT_DATE_STRING_FORMAT_DATE,
  "ddMMyyyy",
  "dd/MM/yyyy",
  "dd-MM-yyyy",
];

const ALLOWED_INPUT_FORMATS_MONTH = [
  "M/yyyy",
  "MM/yyyy",
  "M-yyyy",
  "MM-yyyy",
  "MM.yyyy",
  INPUT_DATE_STRING_FORMAT_MONTH,
  ...ALLOWED_INPUT_FORMATS_DATE,
];

const isTwoDigitYear = (dateString, today, locale, formats) => {
  let parsed;
  const newFormat = formats.map((x) => x.replace("yyyy", "yy"));
  for (const format of newFormat) {
    parsed = parse(dateString, format, today, { locale });
    if (isValidDate(parsed)) {
      return true;
    }
  }
  return false;
};

export const parseDate = (
  date: string,
  today: Date,
  locale: Locale,
  type: "date" | "month"
): Date => {
  let parsed;
  const ALLOWED_FORMATS =
    type === "date" ? ALLOWED_INPUT_FORMATS_DATE : ALLOWED_INPUT_FORMATS_MONTH;
  for (const format of ALLOWED_FORMATS) {
    parsed = parse(date, format, today, { locale });
    if (
      isValidDate(parsed) &&
      !isTwoDigitYear(date, today, locale, ALLOWED_FORMATS)
    ) {
      return parsed;
    }
  }
  return new Date("Invalid date");
};

import parse from "date-fns/parse";
import isBefore from "date-fns/isBefore";
import sub from "date-fns/sub";
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

export const parseDate = (
  date: string,
  today: Date,
  locale: Locale,
  type: "date" | "month",
  allowTwoDigitYear: boolean
): Date => {
  let parsed;
  const ALLOWED_FORMATS =
    type === "date" ? ALLOWED_INPUT_FORMATS_DATE : ALLOWED_INPUT_FORMATS_MONTH;

  if (allowTwoDigitYear) {
    for (const format of ALLOWED_FORMATS) {
      parsed = parse(date, format, today, { locale });
      if (
        isValidDate(parsed) &&
        !isTwoDigitYear(date, today, locale, ALLOWED_FORMATS)
      ) {
        console.log("OK 4-digit:", new Date(parsed).getFullYear());

        return parsed;
      }
    }
    for (const format of [
      ...ALLOWED_FORMATS.map((x) => x.replace("yyyy", "yy")),
    ]) {
      parsed = parse(date, format, today, { locale });
      if (
        isValidDate(parsed) &&
        isTwoDigitYear(date, today, locale, ALLOWED_FORMATS)
      ) {
        const convertedDate = assignCenturyToDate(date, format, today, locale);

        if (isValidDate(new Date(convertedDate))) {
          console.log("OK 2-digit:", new Date(convertedDate).getFullYear());
          return new Date(convertedDate);
        } else {
          return new Date("Invalid date");
        }
      }
    }
    return new Date("Invalid date");
  } else {
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
  }
};

function isTwoDigitYear(dateString, today, locale, formats) {
  let parsed;
  const newFormat = formats.map((x) => x.replace("yyyy", "yy"));
  for (const format of newFormat) {
    parsed = parse(dateString, format, today, { locale });
    if (isValidDate(parsed)) {
      return true;
    }
  }
  return false;
}

function assignCenturyToDate(
  dateStr: string,
  format: string,
  today: Date,
  locale: Locale
) {
  const date20Century = parse(
    appendCenturyToTwoYearDigitDateString(dateStr, "19"),
    format.replace("yy", "yyyy"),
    today,
    { locale }
  );

  const date21Century = parse(
    appendCenturyToTwoYearDigitDateString(dateStr, "20"),
    format.replace("yy", "yyyy"),
    today,
    { locale }
  );

  if (isValidDate(date20Century) && isValidDate(date21Century)) {
    return isBefore(
      date20Century,
      sub(new Date(), {
        years: 80,
      })
    )
      ? date21Century
      : date20Century;
  }

  return new Date("Invalid date");
}

function appendCenturyToTwoYearDigitDateString(
  dateString: string,
  century: "19" | "20"
) {
  const twoDigitYear = dateString.slice(-2);
  return `${dateString.slice(
    0,
    dateString.length - 2
  )}${century}${twoDigitYear}`;
}

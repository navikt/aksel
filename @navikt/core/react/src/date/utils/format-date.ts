import format from "date-fns/format";
import {
  INPUT_DATE_STRING_FORMAT_DATE,
  INPUT_DATE_STRING_FORMAT_MONTH,
} from "./parse-date";

export const formatDateForInput = (
  date: Date,
  locale: Locale,
  type: "date" | "month",
  inputFormat?: string
) => {
  const INPUT_DATE_STRING_FORMAT =
    inputFormat ??
    (type === "date"
      ? INPUT_DATE_STRING_FORMAT_DATE
      : INPUT_DATE_STRING_FORMAT_MONTH);
  return format(date, INPUT_DATE_STRING_FORMAT, { locale });
};

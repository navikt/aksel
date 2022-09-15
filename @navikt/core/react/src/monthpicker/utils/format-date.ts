import { format } from "date-fns";
import { INPUT_DATE_STRING_FORMAT } from "./parse-date";

export const formatDateForInput = (date: Date, locale: Locale) => {
  console.log(format(date, INPUT_DATE_STRING_FORMAT, { locale }));
  return format(date, INPUT_DATE_STRING_FORMAT, { locale });
};

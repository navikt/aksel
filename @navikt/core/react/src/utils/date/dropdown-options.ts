import type { Locale } from "date-fns";
import { addYears } from "date-fns/addYears";
import { eachMonthOfInterval } from "date-fns/eachMonthOfInterval";
import { endOfYear } from "date-fns/endOfYear";
import { format } from "date-fns/format";
import { getMonth } from "date-fns/getMonth";
import { getYear } from "date-fns/getYear";
import { isBefore } from "date-fns/isBefore";
import { isSameYear } from "date-fns/isSameYear";
import { startOfMonth } from "date-fns/startOfMonth";
import { startOfYear } from "date-fns/startOfYear";

/** Return the months to show in the dropdown. */
export function getMonthOptions({
  displayMonth,
  navStart,
  navEnd,
  locale,
}: {
  displayMonth: Date;
  navStart: Date | undefined;
  navEnd: Date | undefined;
  locale: Locale;
}):
  | {
      value: number;
      label: string;
      disabled: boolean;
    }[]
  | undefined {
  const months = eachMonthOfInterval({
    start: startOfYear(displayMonth),
    end: endOfYear(displayMonth),
  });

  const options = months.map((month) => {
    const label = format(month, "LLLL", {
      locale,
    }).replace(".", "");
    const value = getMonth(month);
    const disabled =
      (navStart && month < startOfMonth(navStart)) ||
      (navEnd && month > startOfMonth(navEnd)) ||
      false;
    return { value, label, disabled };
  });

  return options;
}

/** Return the years to show in the dropdown. */
export function getYearOptions({
  navStart,
  navEnd,
  locale,
}: {
  navStart: Date | undefined;
  navEnd: Date | undefined;
  locale: Locale;
}):
  | {
      value: number;
      label: string;
      disabled: boolean;
    }[]
  | undefined {
  if (!navStart) return undefined;
  if (!navEnd) return undefined;

  const firstNavYear = startOfYear(navStart);
  const lastNavYear = endOfYear(navEnd);
  const years: Date[] = [];

  let year = firstNavYear;
  while (isBefore(year, lastNavYear) || isSameYear(year, lastNavYear)) {
    years.push(year);
    year = addYears(year, 1);
  }

  return years.map((_year) => {
    const label = format(_year, "yyyy", { locale });
    return {
      value: getYear(_year),
      label,
      disabled: false,
    };
  });
}

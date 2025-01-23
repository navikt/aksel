import {
  addYears,
  endOfYear,
  getYear,
  isBefore,
  isSameYear,
  startOfYear,
} from "date-fns";
import { Formatters } from "react-day-picker";

/** Return the years to show in the dropdown. */
export function getYearOptions(
  navStart: Date | undefined,
  navEnd: Date | undefined,
  formatters: Pick<Formatters, "formatYearDropdown">,
):
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
    const label = formatters.formatYearDropdown(_year);
    return {
      value: getYear(_year),
      label,
      disabled: false,
    };
  });
}

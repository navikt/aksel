import {
  eachMonthOfInterval,
  endOfYear,
  getMonth,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { Formatters } from "react-day-picker";

/** Return the months to show in the dropdown. */
export function getMonthOptions(
  displayMonth: Date,
  navStart: Date | undefined,
  navEnd: Date | undefined,
  formatters: Pick<Formatters, "formatMonthDropdown">,
):
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
    const label = formatters.formatMonthDropdown(month);
    const value = getMonth(month);
    const disabled =
      (navStart && month < startOfMonth(navStart)) ||
      (navEnd && month > startOfMonth(navEnd)) ||
      false;
    return { value, label, disabled };
  });

  return options;
}

import {
  addYears,
  endOfMonth,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";

/**
 * Generates the min and max-dates possible to show and navigate to in the calendar.
 * In the cases there is not a startMonth or endMonth, and layout is "label" no min or max dates are set.
 * @returns Return the start and end months for the calendar navigation.
 */
export function calendarRange({
  captionLayout,
  startMonth,
  endMonth,
  today,
}: {
  captionLayout?: "label" | "dropdown";
  startMonth?: Date;
  endMonth?: Date;
  today?: Date;
}) {
  const hasYearDropdown = captionLayout === "dropdown";

  const todayDate = today ?? new Date();

  if (startMonth) {
    startMonth = startOfMonth(startMonth);
  } else if (!startMonth && hasYearDropdown) {
    startMonth = startOfYear(addYears(todayDate, -100));
  }

  if (endMonth) {
    endMonth = endOfMonth(endMonth);
  } else if (!endMonth && hasYearDropdown) {
    endMonth = endOfYear(todayDate);
  }

  return [
    startMonth ? startOfDay(startMonth) : startMonth,
    endMonth ? startOfDay(endMonth) : endMonth,
  ];
}

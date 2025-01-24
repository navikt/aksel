import { isAfter, isBefore, startOfMonth } from "date-fns";

/**
 * Makes sure the month is within the min and max daterange to avoid showing disabled months
 */
const clampMonth = ({
  month,
  start,
  end,
}: {
  month?: Date;
  start?: Date;
  end?: Date;
}): Date | undefined => {
  if (!month) {
    return undefined;
  }

  let monthToShow = month;

  if (start && isBefore(monthToShow, start)) {
    monthToShow = start;
  } else if (end && isAfter(monthToShow, end)) {
    monthToShow = end;
  }

  return startOfMonth(monthToShow);
};

export { clampMonth };

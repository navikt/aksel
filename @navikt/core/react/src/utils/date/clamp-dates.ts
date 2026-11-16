import { isAfter } from "date-fns/isAfter";
import { isBefore } from "date-fns/isBefore";
import { startOfMonth } from "date-fns/startOfMonth";
import { startOfYear } from "date-fns/startOfYear";

/**
 * Makes sure the month is within the min and max daterange to avoid showing disabled months
 * @note We do not warn the user if start > end now
 */
const clampDisplayMonth = ({
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
  }

  if (end && isAfter(monthToShow, end)) {
    monthToShow = end;
  }

  return startOfMonth(monthToShow);
};

/**
 * Makes sure the month is within the min and max daterange to avoid showing disabled months
 * @note We do not warn the user if start > end now
 */
const clampDisplayYear = ({
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

  if (start && monthToShow.getFullYear() < start.getFullYear()) {
    monthToShow = start;
  }

  if (end && monthToShow.getFullYear() > end.getFullYear()) {
    monthToShow = end;
  }

  return startOfYear(monthToShow);
};

export { clampDisplayYear, clampDisplayMonth };

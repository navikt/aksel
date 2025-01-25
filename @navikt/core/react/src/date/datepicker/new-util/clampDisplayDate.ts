import { isAfter, isBefore, startOfMonth, startOfYear } from "date-fns";

/**
 * Makes sure the month is within the min and max daterange to avoid showing disabled months
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
  } else if (end && isAfter(monthToShow, end)) {
    monthToShow = end;
  }

  return startOfMonth(monthToShow);
};

/**
 * Makes sure the month is within the min and max daterange to avoid showing disabled months
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
  } else if (end && monthToShow.getFullYear() > end.getFullYear()) {
    monthToShow = end;
  }

  return startOfYear(monthToShow);
};

export { clampDisplayYear, clampDisplayMonth };

/*
  const isAfter = toDate && toDate.getFullYear() < initialMonth.getFullYear();

  const isBefore =
    fromDate && fromDate.getFullYear() > initialMonth.getFullYear();

  if (isAfter) {
    initialMonth = toDate;
  }
  if (isBefore) {
    initialMonth = fromDate;
  }

  return startOfYear(initialMonth); */

import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import isSameMonth from "date-fns/isSameMonth";

export const isMonthDisabled = (
  month: Date,
  fromDate?: Date,
  toDate?: Date
) => {
  if (fromDate && toDate) {
    return (
      (compareAsc(month, fromDate) === -1 && !isSameMonth(month, fromDate)) ||
      (compareDesc(month, toDate) === -1 && !isSameMonth(month, toDate))
    );
  } else if (fromDate) {
    return compareAsc(month, fromDate) === -1 && !isSameMonth(month, fromDate);
  } else if (toDate) {
    return compareDesc(month, toDate) === -1 && !isSameMonth(month, toDate);
  }
  return false;
};

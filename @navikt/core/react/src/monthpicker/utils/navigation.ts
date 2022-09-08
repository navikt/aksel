import { setYear } from "date-fns";
import { isMatch, Matcher } from "./is-match";

export const nextEnabled = (
  months,
  currentIndex: number,
  key: string,
  disabled: Matcher[],
  currentMonth: Date,
  setYearState: Function,
  yearState: Date
): Date => {
  let focusDate: Date = currentMonth;
  let currentYear = setYear(yearState, Number(yearState.getFullYear()));
  if (key === "ArrowRight") {
    for (let i = currentIndex + 1; i < months.length + 1; i++) {
      if (i === 12) {
        currentYear = setYear(yearState, Number(yearState.getFullYear() + 1));
        setYearState(currentYear);
        i = 0;
      }
      const month = months[i];
      if (
        !isMatch(setYear(month, Number(currentYear.getFullYear())), disabled)
      ) {
        focusDate = setYear(month, Number(currentYear.getFullYear()));
        break;
      }
    }
  }
  if (key === "ArrowLeft") {
    for (let i = currentIndex - 1; i >= -1; i--) {
      if (i === -1) {
        currentYear = setYear(yearState, Number(yearState.getFullYear() - 1));
        setYearState(currentYear);
        i = 11;
      }
      const month = months[i];
      if (
        !isMatch(setYear(month, Number(currentYear.getFullYear())), disabled)
      ) {
        focusDate = setYear(month, Number(currentYear.getFullYear()));
        break;
      }
    }
  }
  if (key === "ArrowDown") {
    if (!isMatch(months[currentIndex + 4], disabled))
      focusDate = months[currentIndex + 4];
    else if (!isMatch(months[currentIndex + 8], disabled))
      focusDate = months[currentIndex + 8];
  }
  if (key === "ArrowUp") {
    if (!isMatch(months[currentIndex - 4], disabled))
      focusDate = months[currentIndex - 4];
    else if (!isMatch(months[currentIndex - 8], disabled))
      focusDate = months[currentIndex - 8];
  }

  return focusDate;
};

import { isMatch, Matcher } from "./is-match";

export const nextEnabled = (
  months,
  currentIndex: number,
  key: string,
  disabled: Matcher[],
  currentMonth: Date
): Date => {
  let focusDate: Date = currentMonth;
  if (key === "ArrowRight") {
    for (let i = currentIndex + 1; i < months.length; i++) {
      const month = months[i];
      if (!isMatch(month, disabled)) {
        focusDate = month;
        break;
      }
    }
  }
  if (key === "ArrowLeft") {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const month = months[i];
      if (!isMatch(month, disabled)) {
        focusDate = month;
        break;
      }
    }
  }

  return focusDate;
};

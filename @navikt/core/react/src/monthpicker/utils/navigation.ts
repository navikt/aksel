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

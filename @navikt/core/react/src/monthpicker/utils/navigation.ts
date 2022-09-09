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
    if (
      !isMatch(
        setYear(months[currentIndex + 4], Number(currentYear.getFullYear())),
        disabled
      )
    )
      return months[currentIndex + 4];
    const fallbackPrev = loopBack(
      currentIndex,
      months,
      currentYear,
      disabled,
      focusDate
    );
    if (fallbackPrev) return fallbackPrev;
    const fallbackNextIndex = loopForward(
      currentIndex,
      months,
      yearState,
      setYearState,
      currentYear,
      disabled
    );
    if (
      fallbackNextIndex &&
      getRow(fallbackNextIndex) !== getRow(currentIndex + 8)
    )
      return setYear(
        months[fallbackNextIndex],
        Number(currentYear.getFullYear())
      );
    if (
      !isMatch(
        setYear(months[currentIndex + 8], Number(currentYear.getFullYear())),
        disabled
      )
    )
      return months[currentIndex + 8];
    if (fallbackNextIndex)
      return setYear(
        months[fallbackNextIndex],
        Number(currentYear.getFullYear())
      );
    return focusDate;
  }

  if (key === "ArrowUp") {
    if (!isMatch(months[currentIndex - 4], disabled))
      focusDate = months[currentIndex - 4];
    else if (!isMatch(months[currentIndex - 8], disabled))
      focusDate = months[currentIndex - 8];
  }

  return focusDate;
};

const loopBack = (
  currentIndex: number,
  months: Date[],
  currentYear: Date,
  disabled: Matcher[],
  focusDate: Date
): Date | undefined => {
  for (let i = currentIndex + 4; i >= 0; i--) {
    const month = months[i];
    if (
      !isMatch(setYear(month, Number(currentYear.getFullYear())), disabled) &&
      getRow(i) !== getRow(currentIndex)
    ) {
      return setYear(month, Number(currentYear.getFullYear()));
    }
  }
};

const loopForward = (
  currentIndex: number,
  months: Date[],
  yearState: Date,
  setYearState: Function,
  currentYear: Date,
  disabled: Matcher[]
) => {
  for (let i = currentIndex + 1; i < months.length + 1; i++) {
    const month = months[i];
    if (
      !isMatch(setYear(month, Number(currentYear.getFullYear())), disabled) &&
      getRow(i) !== getRow(currentIndex)
    ) {
      return i;
    }
  }
};

const getRow = (index: number): number => {
  if (index >= 0 && index <= 3) return 1;
  if (index >= 4 && index <= 7) return 2;
  return 3;
};

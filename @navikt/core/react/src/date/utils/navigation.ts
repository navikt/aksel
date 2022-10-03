import { setYear } from "date-fns";
import { isMatch, Matcher } from "./is-match";

export const nextEnabled = (
  months,
  key: string,
  disabled: Matcher[],
  currentMonth: Date,
  setYearState: Function,
  yearState: Date,
  dropdownCaption: boolean,
  fromDate?: Date,
  toDate?: Date
): Date => {
  const currentIndex = currentMonth.getMonth();

  if (key === "Home") {
    const nextEnabled = nextOnRow(
      currentIndex,
      months,
      yearState,
      disabled,
      "home"
    );
    if (nextEnabled) {
      return nextEnabled;
    }
  }
  if (key === "End") {
    const nextEnabled = nextOnRow(
      currentIndex,
      months,
      yearState,
      disabled,
      "end"
    );
    if (nextEnabled) return nextEnabled;
  }
  if (key === "PageUp") {
    if (
      !dropdownCaption ||
      (fromDate && yearState.getFullYear() - 1 >= fromDate?.getFullYear())
    )
      setYearState(setYear(yearState, Number(yearState.getFullYear() - 1)));
  }
  if (key === "PageDown") {
    if (
      !dropdownCaption ||
      (toDate && yearState.getFullYear() + 1 <= toDate?.getFullYear())
    )
      setYearState(setYear(yearState, Number(yearState.getFullYear() + 1)));
  }
  if (key === "ArrowRight") {
    const nextMonth = loopForward(
      currentIndex,
      months,
      yearState,
      setYearState,
      disabled,
      false,
      dropdownCaption,
      fromDate,
      toDate
    );
    if (nextMonth) return setYear(months[nextMonth.index], nextMonth.year);
  }
  if (key === "ArrowLeft") {
    const prevMonth = loopBack(
      currentIndex - 1,
      months,
      disabled,
      yearState,
      setYearState,
      false,
      dropdownCaption,
      fromDate,
      toDate
    );
    if (prevMonth) return setYear(months[prevMonth.index], prevMonth.year);
  }
  if (key === "ArrowDown") {
    if (
      months[currentIndex + 4] &&
      !isMatch(
        setYear(months[currentIndex + 4], Number(yearState.getFullYear())),
        disabled
      )
    )
      return setYear(months[currentIndex + 4], Number(yearState.getFullYear()));
    const fallbackNext = loopForward(
      currentIndex,
      months,
      yearState,
      setYearState,
      disabled,
      true,
      dropdownCaption,
      fromDate,
      toDate
    );
    if (fallbackNext && getRow(fallbackNext.index) !== getRow(currentIndex + 8))
      return setYear(months[fallbackNext.index], fallbackNext.year);
  }

  if (key === "ArrowUp") {
    if (
      months[currentIndex - 4] &&
      !isMatch(
        setYear(months[currentIndex - 4], Number(yearState.getFullYear())),
        disabled
      )
    )
      return setYear(months[currentIndex - 4], Number(yearState.getFullYear()));
    const fallbackPrev = loopBack(
      currentIndex,
      months,
      disabled,
      yearState,
      setYearState,
      true,
      dropdownCaption,
      fromDate,
      toDate
    );
    if (fallbackPrev)
      return setYear(months[fallbackPrev.index], fallbackPrev.year);
  }
  return currentMonth;
};

const loopBack = (
  currentIndex: number,
  months: Date[],
  disabled: Matcher[],
  yearState: Date,
  setYearState: Function,
  rowCheck: boolean,
  dropdownCaption: boolean,
  fromDate?: Date,
  toDate?: Date
): { index: number; year: number } | undefined => {
  let currentYear = setYear(yearState, Number(yearState.getFullYear()));
  for (let i = currentIndex; i >= -1; i--) {
    if (i === -1) {
      if (
        isOutOfRange(
          dropdownCaption,
          setYear(currentYear, Number(currentYear.getFullYear() - 1)),
          fromDate,
          toDate
        )
      )
        return;
      currentYear = setYear(currentYear, Number(currentYear.getFullYear() - 1));
      setYearState(currentYear);
      i = 11;
    }
    const month = months[i];
    const isDisabled = !isMatch(
      setYear(month, Number(currentYear.getFullYear())),
      disabled
    );
    if (rowCheck) {
      if (isDisabled && getRow(i) !== getRow(currentIndex)) {
        return { index: i, year: Number(currentYear.getFullYear()) };
      }
    } else {
      if (isDisabled) {
        return { index: i, year: Number(currentYear.getFullYear()) };
      }
    }
  }
};

const loopForward = (
  currentIndex: number,
  months: Date[],
  yearState: Date,
  setYearState: Function,
  disabled: Matcher[],
  rowCheck: boolean,
  dropdownCaption: boolean,
  fromDate?: Date,
  toDate?: Date
): { index: number; year: number } | undefined => {
  let currentYear = setYear(yearState, Number(yearState.getFullYear()));
  for (let i = currentIndex + 1; i < months.length + 1; i++) {
    if (i === 12) {
      if (
        isOutOfRange(
          dropdownCaption,
          setYear(currentYear, Number(currentYear.getFullYear() + 1)),
          fromDate,
          toDate
        )
      )
        return;
      currentYear = setYear(currentYear, Number(currentYear.getFullYear() + 1));
      setYearState(currentYear);
      i = 0;
    }
    const month = months[i];
    const isDisabled = !isMatch(
      setYear(month, Number(currentYear.getFullYear())),
      disabled
    );
    if (rowCheck) {
      if (isDisabled && getRow(i) !== getRow(currentIndex)) {
        return { index: i, year: Number(currentYear.getFullYear()) };
      }
    } else {
      if (isDisabled) {
        return { index: i, year: Number(currentYear.getFullYear()) };
      }
    }
  }
};

const getRow = (index: number): number => {
  if (index >= 0 && index <= 3) return 1;
  if (index >= 4 && index <= 7) return 2;
  return 3;
};

const isOutOfRange = (
  dropdownCaption: boolean,
  year: Date,
  fromDate?: Date,
  toDate?: Date
): boolean => {
  if (
    dropdownCaption &&
    fromDate &&
    toDate &&
    (year.getFullYear() < fromDate?.getFullYear() ||
      year.getFullYear() > toDate?.getFullYear())
  ) {
    return true;
  }

  return false;
};

const nextOnRow = (
  currentIndex: number,
  months,
  yearState: Date,
  disabled: Matcher[],
  mode: "home" | "end"
) => {
  const row = getRow(currentIndex);
  let monthsOfRow;

  switch (row) {
    case 1:
      monthsOfRow = months.slice(0, 4);
      break;
    case 2:
      monthsOfRow = months.slice(4, 8);
      break;
    case 3:
      monthsOfRow = months.slice(8, 12);
      break;
    default:
      break;
  }

  if (mode === "end") monthsOfRow = monthsOfRow.reverse();

  for (let i = 0; i < monthsOfRow.length; i++) {
    const month = monthsOfRow[i];

    if (!isMatch(setYear(month, Number(yearState.getFullYear())), disabled)) {
      return setYear(month, Number(yearState.getFullYear()));
    }
  }
};

import { setYear } from "date-fns";
import type { Matcher } from "../../utils/components/date/Date.typeutils";
import { isMatch } from "../../utils/date";

export const nextEnabled = (
  months: Date[],
  key: string,
  disabled: Matcher[],
  currentMonth: Date,
  setYearState: (date: Date) => void,
  yearState: Date,
  dropdownCaption: boolean,
  fromDate?: Date,
  toDate?: Date,
): Date => {
  const currentIndex = currentMonth.getMonth();

  if (key === "Home") {
    const nextDate = nextOnRow(
      currentIndex,
      months,
      yearState,
      disabled,
      "home",
    );
    if (nextDate) {
      return nextDate;
    }
  }
  if (key === "End") {
    const nextDate = nextOnRow(
      currentIndex,
      months,
      yearState,
      disabled,
      "end",
    );
    if (nextDate) {
      return nextDate;
    }
  }
  if (key === "PageUp") {
    if (
      !dropdownCaption ||
      (fromDate && yearState.getFullYear() - 1 >= fromDate?.getFullYear())
    ) {
      setYearState(setYear(yearState, Number(yearState.getFullYear() - 1)));
    }
  }
  if (key === "PageDown") {
    if (
      !dropdownCaption ||
      (toDate && yearState.getFullYear() + 1 <= toDate?.getFullYear())
    ) {
      setYearState(setYear(yearState, Number(yearState.getFullYear() + 1)));
    }
  }
  if (key === "ArrowRight") {
    const nextMonth = searchEnabledMonth(
      1,
      currentIndex,
      months,
      disabled,
      yearState,
      setYearState,
      false,
      fromDate,
      toDate,
    );
    if (nextMonth) {
      return setYear(months[nextMonth.index], nextMonth.year);
    }
  }
  if (key === "ArrowLeft") {
    const prevMonth = searchEnabledMonth(
      -1,
      currentIndex,
      months,
      disabled,
      yearState,
      setYearState,
      false,
      fromDate,
      toDate,
    );
    if (prevMonth) {
      return setYear(months[prevMonth.index], prevMonth.year);
    }
  }
  if (key === "ArrowDown") {
    if (
      months[currentIndex + 4] &&
      !isMatch(
        setYear(months[currentIndex + 4], yearState.getFullYear()),
        disabled,
      )
    ) {
      return setYear(months[currentIndex + 4], yearState.getFullYear());
    }

    const fallbackNext = searchEnabledMonth(
      1,
      currentIndex,
      months,
      disabled,
      yearState,
      setYearState,
      true,
      fromDate,
      toDate,
    );

    if (
      fallbackNext &&
      getRow(fallbackNext.index) !== getRow(currentIndex + 8)
    ) {
      return setYear(months[fallbackNext.index], fallbackNext.year);
    }
  }

  if (key === "ArrowUp") {
    if (
      months[currentIndex - 4] &&
      !isMatch(
        setYear(months[currentIndex - 4], Number(yearState.getFullYear())),
        disabled,
      )
    )
      return setYear(months[currentIndex - 4], Number(yearState.getFullYear()));
    const fallbackPrev = searchEnabledMonth(
      -1,
      currentIndex,
      months,
      disabled,
      yearState,
      setYearState,
      true,
      fromDate,
      toDate,
    );
    if (fallbackPrev)
      return setYear(months[fallbackPrev.index], fallbackPrev.year);
  }
  return currentMonth;
};

/**
 * Keyboard search for an enabled month never crosses fromDate/toDate years and
 * gives up after this many years when no bounds are set, so a matcher that
 * disables every remaining month cannot hang the page.
 */
const MAX_SEARCH_YEARS = 100;

const searchEnabledMonth = (
  direction: 1 | -1,
  currentIndex: number,
  months: Date[],
  disabled: Matcher[],
  yearState: Date,
  setYearState: (date: Date) => void,
  rowCheck: boolean,
  fromDate?: Date,
  toDate?: Date,
): { index: number; year: number } | undefined => {
  const startYear = yearState.getFullYear();
  if (Number.isNaN(startYear)) {
    return;
  }

  const boundYear =
    direction === 1 ? toDate?.getFullYear() : fromDate?.getFullYear();
  const horizonYear = startYear + direction * MAX_SEARCH_YEARS;
  const lastYear =
    boundYear === undefined || Number.isNaN(boundYear)
      ? horizonYear
      : direction === 1
        ? Math.min(boundYear, horizonYear)
        : Math.max(boundYear, horizonYear);

  let year = startYear;
  let i = currentIndex;
  while (true) {
    i += direction;
    if (i < 0 || i > 11) {
      if (year === lastYear || (year - lastYear) * direction > 0) {
        return;
      }
      year += direction;
      i = direction === 1 ? 0 : 11;
    }

    const isEnabled = !isMatch(setYear(months[i], year), disabled);
    if (isEnabled && (!rowCheck || getRow(i) !== getRow(currentIndex))) {
      if (year !== startYear) {
        setYearState(setYear(yearState, year));
      }
      return { index: i, year };
    }
  }
};

const getRow = (index: number): number => {
  if (index >= 0 && index <= 3) return 1;
  if (index >= 4 && index <= 7) return 2;
  return 3;
};

const nextOnRow = (
  currentIndex: number,
  months: Date[],
  yearState: Date,
  disabled: Matcher[],
  mode: "home" | "end",
) => {
  const row = getRow(currentIndex);
  let monthsOfRow: Date[] = [];

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

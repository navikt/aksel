import cl from "clsx";
import {
  compareAsc,
  compareDesc,
  format,
  isSameMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import React, { useEffect, useRef } from "react";
import { useDayPicker } from "react-day-picker";
import { useSharedMonthContext } from "../hooks/useSharedMonthContext";
import { dateIsInCurrentMonth } from "../utils/check-dates";
import { isMatch } from "../utils/is-match";
import { nextEnabled } from "../utils/navigation";

interface MonthType {
  month: Date;
  months: Date[];
  y: number;
  focus: Date | undefined;
  setFocus: Function;
  tabRoot?: Date;
  setTabRoot: Function;
}

// TODO: fikse dette
const disableMonth = (month: Date, fromDate?: Date, toDate?: Date) => {
  if (fromDate && toDate) {
    return (
      compareAsc(month, fromDate) === -1 || compareDesc(month, toDate) === -1
    );
  } else if (fromDate) {
    return compareAsc(month, fromDate) === -1;
  } else if (toDate) {
    return compareDesc(month, toDate) === -1;
  }
  return false;
};

export const MonthButton = ({
  month,
  months,
  y,
  focus,
  setFocus,
  tabRoot,
  setTabRoot,
}: MonthType) => {
  const ref = useRef<HTMLButtonElement>(null);
  const {
    isValidDropdownCaption,
    selectedMonth,
    onSelect,
    yearState,
    setYearState,
    disabled,
  } = useSharedMonthContext();
  const { fromDate, toDate, locale } = useDayPicker();
  const isSelected = isSameMonth(month, selectedMonth);

  useEffect(() => {
    if (focus) {
      isSameMonth(month, focus) && ref.current && ref.current.focus();
    }
  }, [focus, month]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() =>
        onSelect(setYear(startOfMonth(month), Number(yearState.getFullYear())))
      }
      disabled={
        isMatch(setYear(month, Number(yearState.getFullYear())), disabled) ||
        disableMonth(month, fromDate, toDate)
      }
      className={cl("navds-monthpicker__month", {
        "navds-monthpicker__month--current": dateIsInCurrentMonth(
          month,
          yearState
        ),
        "navds-monthpicker__month--selected": isSelected,
      })}
      tabIndex={
        tabRoot &&
        isSameMonth(month, setYear(tabRoot, Number(yearState.getFullYear())))
          ? 0
          : -1
      }
      onKeyDown={(e) => {
        setFocus(
          nextEnabled(
            months,
            y,
            e.key,
            disabled,
            month,
            setYearState,
            yearState,
            isValidDropdownCaption,
            fromDate,
            toDate
          )
        );
      }}
      onFocus={() => {
        setTabRoot(focus);
      }}
    >
      <span aria-hidden="true">
        {format(new Date(month), "LLL", { locale })
          .replace(".", "")
          .substring(0, 3)}
      </span>
      <span className="navds-sr-only">
        {format(new Date(month), "LLLL", { locale })}
      </span>
    </button>
  );
};

export default MonthButton;

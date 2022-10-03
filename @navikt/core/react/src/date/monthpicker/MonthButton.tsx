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
  focus: Date | undefined;
  setFocus: Function;
  tabRoot?: Date;
  setTabRoot: Function;
}

const disableMonth = (month: Date, fromDate?: Date, toDate?: Date) => {
  console.log(fromDate);
  if (fromDate && toDate) {
    console.log("here2");
    return (
      compareAsc(month, fromDate) === -1 || compareDesc(month, toDate) === -1
    );
  } else if (fromDate) {
    console.log("here3");
    return compareAsc(month, fromDate) === -1;
  } else if (toDate) {
    console.log("here4");
    return compareDesc(month, toDate) === -1;
  }
  return false;
};

export const MonthButton = ({
  month,
  months,
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

  const isDisabled =
    isMatch(setYear(month, yearState.getFullYear()), disabled) ||
    disableMonth(month, fromDate, toDate);

  console.log(isDisabled);
  return (
    <button
      ref={ref}
      type="button"
      onClick={() =>
        onSelect(setYear(startOfMonth(month), Number(yearState.getFullYear())))
      }
      disabled={isDisabled}
      className={cl("navds-date__month-button", {
        "rdp-day_today": dateIsInCurrentMonth(month, yearState),
        "rdp-day_selected": isSelected,
        "rdp-day_disabled": isDisabled,
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

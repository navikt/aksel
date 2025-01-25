import cl from "clsx";
import {
  compareAsc,
  compareDesc,
  format,
  isSameMonth,
  setYear,
} from "date-fns";
import React, { useEffect, useRef } from "react";
import { dateIsInCurrentMonth, isMatch, nextEnabled } from "../utils";
import { useMonthPickerContext } from "./MonthPickerProvider";

interface MonthType {
  month: Date;
  months: Date[];
  focus: Date | undefined;
  setFocus: (date?: Date) => void;
  tabRoot?: Date;
  setTabRoot: (date?: Date) => void;
}

const disableMonth = (month: Date, fromDate?: Date, toDate?: Date) => {
  if (fromDate && toDate) {
    return (
      (compareAsc(month, fromDate) === -1 && !isSameMonth(month, fromDate)) ||
      (compareDesc(month, toDate) === -1 && !isSameMonth(month, toDate))
    );
  }

  if (fromDate) {
    return compareAsc(month, fromDate) === -1 && !isSameMonth(month, fromDate);
  }

  if (toDate) {
    return compareDesc(month, toDate) === -1 && !isSameMonth(month, toDate);
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
    fromDate,
    toDate,
    locale,
    selected,
    disabled,
    year,
    onYearChange,
    onMonthSelect,
    caption,
  } = useMonthPickerContext();
  const isSelected = selected && isSameMonth(month, selected);

  useEffect(() => {
    if (focus) {
      isSameMonth(month, focus) && ref.current && ref.current.focus();
      setFocus();
    }
  }, [focus, month, setFocus]);

  const isDisabled =
    isMatch(setYear(month, year.getFullYear()), disabled) ||
    disableMonth(month, fromDate, toDate);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onMonthSelect?.(isSelected ? undefined : month)}
      disabled={isDisabled}
      aria-pressed={!!isSelected}
      className={cl("navds-date__month-button", {
        "rdp-day_today": dateIsInCurrentMonth(month, year),
        "rdp-day_selected": isSelected,
        "rdp-day_disabled": isDisabled,
      })}
      tabIndex={
        tabRoot && isSameMonth(month, setYear(tabRoot, year.getFullYear()))
          ? 0
          : -1
      }
      onKeyDown={(e) => {
        const next = nextEnabled(
          months,
          e.key,
          disabled,
          month,
          onYearChange,
          year,
          caption === "dropdown",
          fromDate,
          toDate,
        );
        setFocus(next);
        setTabRoot(next);
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

import cl from "clsx";
import {
  compareAsc,
  compareDesc,
  format,
  isSameMonth,
  setYear,
} from "date-fns";
import React, { useEffect, useRef } from "react";
import { useDayPicker } from "react-day-picker";
import { useSharedMonthContext } from "../hooks";
import { dateIsInCurrentMonth, isMatch, nextEnabled } from "../utils";

interface MonthType {
  month: Date;
  months: Date[];
  focus: Date | undefined;
  setFocus: Function;
  tabRoot?: Date;
  setTabRoot: Function;
}

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
  focus,
  setFocus,
  tabRoot,
  setTabRoot,
}: MonthType) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { hasDropdown, selected, onSelect, year, toYear, disabled } =
    useSharedMonthContext();

  const { fromDate, toDate, locale } = useDayPicker();
  const isSelected = selected && isSameMonth(month, selected);

  useEffect(() => {
    if (focus) {
      isSameMonth(month, focus) && ref.current && ref.current.focus();
    }
  }, [focus, month]);

  const isDisabled =
    isMatch(setYear(month, year.getFullYear()), disabled) ||
    disableMonth(month, fromDate, toDate);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(isSelected ? undefined : month)}
      disabled={isDisabled}
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
        setFocus(
          nextEnabled(
            months,
            e.key,
            disabled,
            month,
            toYear,
            year,
            hasDropdown,
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

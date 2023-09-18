import cl from "clsx";
import format from "date-fns/format";
import isSameMonth from "date-fns/isSameMonth";
import compareAsc from "date-fns/compareAsc";
import compareDesc from "date-fns/compareDesc";
import setYear from "date-fns/setYear";
import React, { useEffect, useRef } from "react";
import { useDayPicker } from "react-day-picker";
import { useSharedMonthContext } from "../context";
import { dateIsInCurrentMonth, isMatch, nextEnabled } from "../utils";

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
  } else if (fromDate) {
    return compareAsc(month, fromDate) === -1 && !isSameMonth(month, fromDate);
  } else if (toDate) {
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
  const { hasDropdown, selected, onSelect, year, toYear, disabled } =
    useSharedMonthContext();

  const { fromDate, toDate, locale } = useDayPicker();
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
        const next = nextEnabled(
          months,
          e.key,
          disabled,
          month,
          toYear,
          year,
          hasDropdown,
          fromDate,
          toDate
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

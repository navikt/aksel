import cl from "clsx";
import { format, isSameMonth, setYear, startOfMonth } from "date-fns";
import React, { useEffect, useRef } from "react";
import { useSharedMonthContext } from "../hooks/useSharedMonthContext";
import { dateIsInCurrentMonth } from "../utils/check-dates";
import { isMatch, Matcher } from "../utils/is-match";
import { nextEnabled } from "../utils/navigation";

interface MonthType {
  month: Date;
  disabled: Matcher[];
  locale: any;
  months: Date[];
  y: number;
  hideMonth: Function;
  focus: Date | undefined;
  setFocus: Function;
  fromDate?: Date;
  toDate?: Date;
  tabRoot?: Date;
  setTabRoot: Function;
}

export const Month = ({
  month,
  disabled,
  locale,
  months,
  y,
  hideMonth,
  focus,
  setFocus,
  fromDate,
  toDate,
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
  } = useSharedMonthContext();
  const isSelected = isSameMonth(month, selectedMonth);

  useEffect(() => {
    if (focus) {
      isSameMonth(month, focus) && ref.current && ref.current.focus();
    }
  }, [focus, month]);

  return (
    <button
      ref={ref}
      onClick={() =>
        onSelect(setYear(startOfMonth(month), Number(yearState.getFullYear())))
      }
      disabled={isMatch(
        setYear(month, Number(yearState.getFullYear())),
        disabled
      )}
      className={cl("navds-monthpicker__month", {
        "navds-monthpicker__month--hidden": hideMonth(month),
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

export default Month;

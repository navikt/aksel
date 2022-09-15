import cl from "clsx";
import { format, isSameMonth, setYear, startOfMonth } from "date-fns";
import React, { useRef, useEffect } from "react";
import { dateIsInCurrentMonth } from "./utils/check-dates";
import { Matcher, isMatch } from "./utils/is-match";
import { nextEnabled } from "./utils/navigation";

export const Month = ({
  selected,
  month,
  yearState,
  disabled,
  onSelect,
  locale,
  months,
  y,
  hideMonth,
  focus,
  setFocus,
  setYearState,
  dropdownCaption,
  fromDate,
  toDate,
}: {
  selected: Date;
  month: Date;
  yearState: Date;
  disabled: Matcher[];
  onSelect: Function;
  locale: any;
  months: Date[];
  currentRef: any;
  y: number;
  hideMonth: Function;
  focus: Date | undefined;
  setFocus: Function;
  setYearState: Function;
  dropdownCaption: boolean;
  fromDate?: Date;
  toDate?: Date;
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const isSelected = isSameMonth(month, selected);
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
      tabIndex={!isSelected ? -1 : 0}
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
            dropdownCaption,
            fromDate,
            toDate
          )
        );
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

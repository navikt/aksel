import cl from "clsx";
import {
  compareAsc,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import React, { forwardRef, useRef, useState } from "react";
import { RootProvider, useDayPicker } from "react-day-picker";
import { Matcher } from "./utils/is-match";
import { BodyShort } from "..";
import Month from "./Month";
import { getDefaultSelected } from "./utils/get-initial-month";
import MonthCaption from "./MonthCaption";
import { MonthPickerDefaultProps } from "./MonthPicker";
import { getLocaleFromString } from "../datepicker/utils";

interface MonthPickerStandaloneDefaultProps extends MonthPickerDefaultProps {
  /**
   * Wrapper className
   */
  className?: string;
}

export type MonthPickerStandaloneType = React.ForwardRefExoticComponent<
  MonthPickerStandaloneDefaultProps & React.RefAttributes<HTMLDivElement>
>;

const MonthSelector = ({
  onSelect,
  selected,
  dropdownCaption,
  disabled,
  yearState,
  setYearState,
}: {
  onSelect: (m: Date) => void;
  selected: Date;
  dropdownCaption: boolean;
  disabled: Matcher[];
  yearState: Date;
  setYearState: Function;
}) => {
  const months: Date[] = [];
  const { fromDate, toDate, locale } = useDayPicker();
  const monthRefs = useRef(new Array<HTMLButtonElement>());
  const [focus, setFocus] = useState<Date>();

  if (dropdownCaption && fromDate && toDate && isSameYear(fromDate, toDate)) {
    const date = startOfMonth(fromDate);
    for (let month = fromDate.getMonth(); month <= toDate.getMonth(); month++) {
      months.push(setMonth(date, month));
    }
  } else {
    const date = startOfMonth(new Date());
    for (let month = 0; month <= 11; month++) {
      months.push(setMonth(date, month));
    }
  }

  const hideMonth = (month: Date) => {
    if (dropdownCaption && fromDate) return compareAsc(month, fromDate) === -1;
  };

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((month: Date, y) => {
        const currentRef = (month: any) => monthRefs.current.push(month);
        return (
          <Month
            key={month.toDateString()}
            y={y}
            locale={locale}
            selected={selected}
            month={setYear(month, Number(yearState.getFullYear()))}
            yearState={yearState}
            disabled={disabled}
            onSelect={onSelect}
            months={months}
            currentRef={currentRef}
            hideMonth={hideMonth}
            focus={focus}
            setFocus={setFocus}
            setYearState={setYearState}
            dropdownCaption={dropdownCaption}
            fromDate={fromDate}
            toDate={toDate}
          />
        );
      })}
    </BodyShort>
  );
};

export const MonthPicker = forwardRef<
  HTMLDivElement,
  MonthPickerStandaloneDefaultProps
>(
  (
    {
      dropdownCaption = false,
      fromDate = new Date(),
      toDate,
      disabled = [],
      selected,
      className,
      locale = "nb",
    },
    ref
  ) => {
    const [selectedMonth, setSelectedMonth] = React.useState<Date>(
      getDefaultSelected(disabled, dropdownCaption, fromDate, selected, toDate)
    );
    const [yearState, setYearState] = useState<Date>(selectedMonth);

    if (dropdownCaption && (!fromDate || !toDate)) return <></>;

    const isValidDropdownCaption =
      dropdownCaption && fromDate && toDate ? true : false;

    return (
      <div
        ref={ref}
        className={cl("navds-date__standalone-wrapper", className)}
      >
        <RootProvider
          locale={getLocaleFromString(locale)}
          selected={selected}
          className="navds-monthpicker-month"
          toDate={toDate}
          fromDate={fromDate}
        >
          <div className="navds-monthpicker__wrapper">
            <MonthCaption
              selected={selectedMonth}
              onSelect={setSelectedMonth}
              dropdownCaption={dropdownCaption}
              isValidDropdownCaption={isValidDropdownCaption}
              yearState={yearState}
              setYearState={setYearState}
            />
            <MonthSelector
              dropdownCaption={dropdownCaption}
              onSelect={setSelectedMonth}
              selected={selectedMonth}
              disabled={disabled}
              yearState={yearState}
              setYearState={setYearState}
            />
          </div>
        </RootProvider>
      </div>
    );
  }
);

export default MonthPicker;

import cl from "clsx";
import {
  compareAsc,
  isSameMonth,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import React, { forwardRef, useState } from "react";
import { RootProvider, useDayPicker } from "react-day-picker";
import { isMatch, Matcher } from "../utils";
import { BodyShort } from "../..";
import Month from "./Month";
import { getDefaultSelected } from "../utils";
import MonthCaption from "./MonthCaption";
import { MonthPickerDefaultProps } from "./MonthPicker";
import { getLocaleFromString } from "../utils";

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
    if (dropdownCaption && fromDate) {
      return compareAsc(month, fromDate) === -1;
    }
  };

  const hasSelected = months.some((m) =>
    isSameMonth(setYear(m, Number(yearState.getFullYear())), selected)
  );

  const getRootFallback = () => {
    for (let i = 0; i < months.length; i++) {
      const m = months[i];
      if (!isMatch(setYear(m, Number(yearState.getFullYear())), disabled)) {
        return setYear(m, Number(yearState.getFullYear()));
      }
    }
  };

  const [tabRoot, setTabRoot] = useState(
    hasSelected ? selected : getRootFallback()
  );

  if (tabRoot?.getFullYear() !== yearState.getFullYear()) {
    setTabRoot(hasSelected ? selected : getRootFallback());
  }

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((month: Date, y) => {
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
            hideMonth={hideMonth}
            focus={focus}
            setFocus={setFocus}
            setYearState={setYearState}
            dropdownCaption={dropdownCaption}
            fromDate={fromDate}
            toDate={toDate}
            tabRoot={tabRoot}
            setTabRoot={setTabRoot}
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

    if (dropdownCaption && (!fromDate || !toDate)) {
      return null;
    }

    const isValidDropdownCaption =
      dropdownCaption && fromDate && toDate ? true : false;

    return (
      <div ref={ref} className={cl("navds-date__wrapper", className)}>
        <RootProvider
          locale={getLocaleFromString(locale)}
          selected={selected}
          className="navds-monthpicker-month"
          toDate={toDate}
          fromDate={fromDate}
        >
          <div className="navds-date navds-monthpicker__wrapper">
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

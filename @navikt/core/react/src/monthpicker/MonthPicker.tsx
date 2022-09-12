import {
  compareAsc,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import NB from "date-fns/locale/nb";
import React, { forwardRef, useState, useRef } from "react";
import { RootProvider, useDayPicker } from "react-day-picker";
import { BodyShort } from "..";
import Month from "./Month";
import MonthCaption from "./MonthCaption";
import { getDefaultSelected } from "./utils/get-initial-month";
import { Matcher } from "./utils/is-match";

export interface MonthPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  mode?: "month";
  /**
   * The earliest day to start the month navigation.
   */
  fromDate?: Date;
  /**
   * The latest day to end the month navigation.
   */
  toDate?: Date;
  /**
   * Changes monthpicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * Adds a `Select` for picking Year and Month
   * Needs `fromDate` + `toDate` to be shown!
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching days. Uses a subset of React Day Picker Matcher type.
   * {@link https://react-day-picker.js.org/api/types/Matcher | Matcher type-definition}
   */
  disabled?: Matcher[];
  /**
   * The initial selected month. Defaults to fromDate when using dropdownCaption, and todays month without dropdownCaption.
   */
  defaultSelected?: Date;
}

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

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
  (
    {
      children,
      dropdownCaption = false,
      fromDate = new Date(),
      toDate,
      disabled = [],
      defaultSelected,
    },
    ref
  ) => {
    const [selected, setSelected] = React.useState<Date>(
      getDefaultSelected(
        disabled,
        dropdownCaption,
        fromDate,
        defaultSelected,
        toDate
      )
    );
    const [yearState, setYearState] = useState<Date>(selected);

    if (dropdownCaption && (!fromDate || !toDate)) return <></>;

    const isValidDropdownCaption =
      dropdownCaption && fromDate && toDate ? true : false;

    return (
      <RootProvider
        locale={NB}
        selected={selected}
        className="navds-monthpicker-month"
        toDate={toDate}
        fromDate={fromDate}
      >
        <div className="navds-monthpicker__wrapper">
          <MonthCaption
            selected={selected}
            onSelect={setSelected}
            dropdownCaption={dropdownCaption}
            isValidDropdownCaption={isValidDropdownCaption}
            yearState={yearState}
            setYearState={setYearState}
          />
          <MonthSelector
            dropdownCaption={dropdownCaption}
            onSelect={setSelected}
            selected={selected}
            disabled={disabled}
            yearState={yearState}
            setYearState={setYearState}
          />
        </div>
      </RootProvider>
    );
  }
);

export default MonthPicker;

export const F = "";

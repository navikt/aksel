import { Left, Right } from "@navikt/ds-icons";
import cl from "clsx";
import {
  compareAsc,
  format,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import NB from "date-fns/locale/nb";
import React, { forwardRef, useState, useRef } from "react";
import { RootProvider, useDayPicker, useNavigation } from "react-day-picker";
import { BodyShort, Select } from "..";
import { dateIsInCurrentMonth, dateIsSelected } from "./utils/check-dates";
import {
  hasNextYear,
  updateWithoutYearSelector,
  updateWithYearSelector,
} from "./utils/handle-selected";

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
   * Adds a `Select` for picking Year
   * Needs `fromDate` + `toDate` to be set!
   * @default false
   */
  yearSelector?: boolean;
}

const TestCaption = ({
  selected,
  onSelect,
  isValidYearSelector,
  yearSelector,
}: {
  selected: Date;
  onSelect: (m: Date) => void;
  isValidYearSelector: boolean;
  yearSelector: boolean;
}) => {
  const { nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption },
    locale,
  } = useDayPicker();

  const [yearState, setYearState] = useState<Date>(selected);
  const years: Date[] = [];

  if (yearSelector && fromDate && toDate) {
    const fromYear = fromDate.getFullYear();
    const toYear = toDate.getFullYear();
    for (let year = fromYear; year <= toYear; year++) {
      years.push(setYear(startOfYear(new Date()), year));
    }
  }

  const handleYearChange = (e) => {
    const newMonth = setYear(startOfMonth(selected), Number(e.target.value));
    setYearState(newMonth);
    onSelect(newMonth);
  };

  const handleButtonClick = (val) => {
    let newMonth: Date;
    if (isValidYearSelector && hasNextYear(yearState, years, val)) {
      newMonth = updateWithYearSelector(yearState, selected, years, val);
      setYearState(newMonth);
      onSelect(newMonth);
    } else if (!isValidYearSelector) {
      newMonth = updateWithoutYearSelector(yearState, val);
      setYearState(newMonth);
      onSelect(newMonth);
    }
  };

  return (
    <div className="navds-monthpicker__caption">
      <button
        className="navds-monthpicker__caption-button"
        disabled={!isValidYearSelector ? false : !!previousMonth}
        onClick={() => handleButtonClick(-1)}
      >
        <Left aria-hidden />
      </button>

      {isValidYearSelector ? (
        <Select
          label="velg år"
          hideLabel
          value={selected?.getFullYear()}
          onChange={handleYearChange}
          style={{ width: "79px" }}
        >
          {years.map((year) => (
            <option key={year.getFullYear()} value={year.getFullYear()}>
              {formatYearCaption(year, { locale })}
            </option>
          ))}
        </Select>
      ) : (
        <span className="navds-monthpicker__year-label" aria-live="polite">
          {yearState.getFullYear()}
        </span>
      )}
      <button
        className="navds-monthpicker__caption-button"
        disabled={!isValidYearSelector ? false : !nextMonth}
        onClick={() => handleButtonClick(1)}
      >
        <Right aria-hidden />
      </button>
    </div>
  );
};

const MonthSelector = ({
  onSelect,
  selected,
}: {
  onSelect: (m: Date) => void;
  selected: Date;
}) => {
  const months: Date[] = [];
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption },
    locale,
  } = useDayPicker();
  const monthRefs = useRef(new Array<HTMLButtonElement>());

  if (!fromDate) return <></>;
  if (!toDate) return <></>;

  if (isSameYear(fromDate, toDate)) {
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
    return compareAsc(month, fromDate) === -1;
  };
  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((x: Date, y) => {
        const currentRef = (x: any) => monthRefs.current.push(x);
        return (
          <button
            ref={currentRef}
            key={x.toDateString()}
            data-index={y}
            onClick={() =>
              onSelect(setYear(startOfMonth(x), Number(selected.getFullYear())))
            }
            className={cl("navds-monthpicker__month", {
              "navds-monthpicker__month--hidden": hideMonth(x),
              "navds-monthpicker__month--current": dateIsInCurrentMonth(
                x,
                selected
              ),
              "navds-monthpicker__month--selected": dateIsSelected(x, selected),
            })}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                monthRefs.current[y + 4] && monthRefs.current[y + 4].focus();
              }
              if (e.key === "ArrowUp") {
                monthRefs.current[y - 4] && monthRefs.current[y - 4].focus();
              }
              if (e.key === "ArrowRight") {
                e.currentTarget.nextSibling &&
                  (e.currentTarget.nextSibling as HTMLButtonElement).focus();
              }
              if (e.key === "ArrowLeft") {
                e.currentTarget.previousSibling &&
                  (
                    e.currentTarget.previousSibling as HTMLButtonElement
                  ).focus();
              }
            }}
          >
            <span aria-hidden="true">
              {format(new Date(x), "LLL", { locale })
                .replace(".", "")
                .substring(0, 3)}
            </span>
            <span className="navds-sr-only">
              {format(new Date(x), "LLLL", { locale })}
            </span>
          </button>
        );
      })}
    </BodyShort>
  );
};

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
  (
    {
      children,
      yearSelector = false,
      fromDate = new Date(),
      toDate = new Date("Sep 27 2032"),
    },
    ref
  ) => {
    const [selected, setSelected] = React.useState<Date>(new Date());

    const isValidYearSelector =
      yearSelector && fromDate && toDate ? true : false;

    return (
      <RootProvider
        locale={NB}
        selected={selected}
        className="navds-monthpicker-month"
        toDate={toDate}
        fromDate={fromDate}
      >
        <div className="navds-monthpicker__wrapper">
          <TestCaption
            selected={selected}
            onSelect={setSelected}
            yearSelector={yearSelector}
            isValidYearSelector={isValidYearSelector}
          />
          <MonthSelector onSelect={setSelected} selected={selected} />
        </div>
      </RootProvider>
    );
  }
);

export default MonthPicker;

export const F = "";

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
  isThisMonth,
  isSameMonth,
} from "date-fns";
import NB from "date-fns/locale/nb";
import React, { forwardRef, useState } from "react";
import { RootProvider, useDayPicker, useNavigation } from "react-day-picker";
import { BodyShort, Select } from "..";

export interface MonthPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  mode?: "month";
}

const TestCaption = ({
  selected,
  onSelect,
}: {
  selected: Date;
  onSelect: (m: Date) => void;
}) => {
  const { nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption },
    locale,
  } = useDayPicker();

  const [yearState, setYearState] = useState<Date>(selected);
  if (!fromDate) return <></>;
  if (!toDate) return <></>;
  const years: Date[] = [];
  const fromYear = fromDate.getFullYear();
  const toYear = toDate.getFullYear();
  for (let year = fromYear; year <= toYear; year++) {
    years.push(setYear(startOfYear(new Date()), year));
  }

  const handleYearChange = (e) => {
    const newMonth = setYear(startOfMonth(selected), Number(e.target.value));
    setYearState(newMonth);
    onSelect(newMonth);
  };

  const handleButtonClick = (val) => {
    const newMonth = setYear(
      startOfMonth(selected),
      yearState.getFullYear() + val
    );
    setYearState(newMonth);
    onSelect(newMonth);
  };

  return (
    <div className="navds-monthpicker__caption">
      <button
        className="navds-monthpicker__caption-button"
        disabled={!previousMonth}
        onClick={() =>
          years.some((x) => yearState.getFullYear() - 1 === x.getFullYear()) &&
          handleButtonClick(-1)
        }
      >
        <Left aria-hidden />
      </button>

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

      <button
        className="navds-monthpicker__caption-button"
        disabled={!nextMonth}
        onClick={() =>
          years.some((x) => yearState.getFullYear() + 1 === x.getFullYear()) &&
          handleButtonClick(1)
        }
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
    console.log({ comp: compareAsc(month, fromDate), month });
    return compareAsc(month, fromDate) === -1;
  };
  console.log(months[0]);
  console.log(selected);

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((x: Date, y) => (
        <button
          key={x.toDateString()}
          onClick={() => onSelect(x)}
          className={cl("navds-monthpicker__month", {
            "navds-monthpicker__month--hidden": hideMonth(x),
            "navds-monthpicker__month--current": isThisMonth(x),
            "navds-monthpicker__month--selected": isSameMonth(x, selected),
          })}
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
      ))}
    </BodyShort>
  );
};

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
  ({ children, mode = "month" }, ref) => {
    const [selected, setSelected] = React.useState<Date>(new Date());

    return (
      <RootProvider
        locale={NB}
        selected={selected}
        className="navds-monthpicker-month"
        toYear={2022}
        fromMonth={new Date("Aug 23 2019")}
      >
        <div className="navds-monthpicker__wrapper">
          <TestCaption selected={selected} onSelect={setSelected} />
          <MonthSelector onSelect={setSelected} selected={selected} />
        </div>
      </RootProvider>
    );
  }
);

export default MonthPicker;

export const F = "";

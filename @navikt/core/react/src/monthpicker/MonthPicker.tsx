import { Left, Right } from "@navikt/ds-icons";
import cl from "clsx";
import {
  compareAsc,
  format,
  isSameMonth,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import NB from "date-fns/locale/nb";
import React, { forwardRef, useState, useRef, useEffect } from "react";
import { RootProvider, useDayPicker, useNavigation } from "react-day-picker";
import { BodyShort, Select } from "..";
import { dateIsInCurrentMonth, dateIsSelected } from "./utils/check-dates";
import {
  hasNextYear,
  updateWithoutDropdownCaption,
  updateWithDropdownCaption,
} from "./utils/handle-selected";
import { Matcher, isMatch } from "./utils/is-match";
import { nextEnabled } from "./utils/navigation";

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
}

const MonthCaption = ({
  selected,
  onSelect,
  isValidDropdownCaption,
  dropdownCaption,
  yearState,
  setYearState,
}: {
  selected: Date;
  onSelect: (m: Date) => void;
  isValidDropdownCaption: boolean;
  dropdownCaption: boolean;
  yearState: Date;
  setYearState: Function;
}) => {
  const { nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption },
    locale,
  } = useDayPicker();

  const years: Date[] = [];

  if (dropdownCaption && fromDate && toDate) {
    const fromYear = fromDate.getFullYear();
    const toYear = toDate.getFullYear();
    for (let year = fromYear; year <= toYear; year++) {
      years.push(setYear(startOfYear(new Date()), year));
    }
  }

  const handleYearChange = (e) => {
    const newMonth = setYear(startOfMonth(selected), Number(e.target.value));
    setYearState(newMonth);
  };

  const handleButtonClick = (val) => {
    let newMonth: Date;
    if (isValidDropdownCaption && hasNextYear(yearState, years, val)) {
      newMonth = updateWithDropdownCaption(yearState, selected, years, val);
      setYearState(newMonth);
      onSelect(newMonth);
    } else if (!isValidDropdownCaption) {
      newMonth = updateWithoutDropdownCaption(yearState, val);
      setYearState(newMonth);
      onSelect(newMonth);
    }
  };

  return (
    <div className="navds-monthpicker__caption">
      <button
        className="navds-monthpicker__caption-button"
        disabled={!isValidDropdownCaption ? false : !!previousMonth}
        onClick={() => handleButtonClick(-1)}
      >
        <Left aria-hidden />
      </button>

      {isValidDropdownCaption ? (
        <Select
          label="velg år"
          hideLabel
          value={yearState?.getFullYear()}
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
        disabled={!isValidDropdownCaption ? false : !nextMonth}
        onClick={() => handleButtonClick(1)}
      >
        <Right aria-hidden />
      </button>
    </div>
  );
};

const Month = ({
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

  useEffect(() => {
    if (focus) {
      isSameMonth(month, focus) && ref.current && ref.current.focus();
    }
  }, [focus, month]);

  return (
    <button
      ref={ref}
      onClick={() =>
        onSelect(setYear(startOfMonth(month), Number(selected.getFullYear())))
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
        "navds-monthpicker__month--selected": dateIsSelected(month, selected),
      })}
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
    { children, dropdownCaption = false, fromDate, toDate, disabled = [] },
    ref
  ) => {
    const [selected, setSelected] = React.useState<Date>(new Date());
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

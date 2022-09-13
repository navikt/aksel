import { Left, Right } from "@navikt/ds-icons";
import { setYear, startOfMonth, startOfYear } from "date-fns";
import React from "react";
import { useDayPicker, useNavigation } from "react-day-picker";
import { Select } from "..";
import {
  hasNextYear,
  updateWithoutDropdownCaption,
  updateWithDropdownCaption,
} from "./utils/handle-selected";
import { labelPrev, labelNext } from "./utils/labels";

export const MonthCaption = ({
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
        aria-label={labelPrev(locale?.code)}
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
        aria-label={labelNext(locale?.code)}
      >
        <Right aria-hidden />
      </button>
    </div>
  );
};

export default MonthCaption;

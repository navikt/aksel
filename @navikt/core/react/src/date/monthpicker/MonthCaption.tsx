import { Left, Right } from "@navikt/ds-icons";
import { isSameYear, setYear, startOfMonth, startOfYear } from "date-fns";
import React from "react";
import { useDayPicker } from "react-day-picker";
import { Button, Select } from "../..";
import { useSharedMonthContext } from "../hooks/useSharedMonthContext";
import {
  hasNextYear,
  labelNextYear,
  labelPrevYear,
  updateWithDropdownCaption,
  updateWithoutDropdownCaption,
} from "../utils";

export const MonthCaption = ({
  dropdownCaption,
}: {
  dropdownCaption: boolean;
}) => {
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption },
    locale,
  } = useDayPicker();

  const { isValidDropdownCaption, selectedMonth, yearState, setYearState } =
    useSharedMonthContext();

  const years: Date[] = [];

  if (dropdownCaption && fromDate && toDate) {
    const fromYear = fromDate.getFullYear();
    const toYear = toDate.getFullYear();
    for (let year = fromYear; year <= toYear; year++) {
      years.push(setYear(startOfYear(new Date()), year));
    }
  }

  const handleYearChange = (e) => {
    const newMonth = setYear(
      startOfMonth(selectedMonth),
      Number(e.target.value)
    );
    setYearState(newMonth);
  };

  const handleButtonClick = (val) => {
    let newMonth: Date;
    if (isValidDropdownCaption && hasNextYear(yearState, years, val)) {
      newMonth = updateWithDropdownCaption(
        yearState,
        selectedMonth,
        years,
        val
      );
      setYearState(newMonth);
    } else if (!isValidDropdownCaption) {
      newMonth = updateWithoutDropdownCaption(yearState, val);
      setYearState(newMonth);
    }
  };

  const hasFollowingYear = (value: number) => {
    return years.some((y) =>
      isSameYear(y, setYear(yearState, Number(yearState.getFullYear() + value)))
    );
  };

  return (
    <div className="navds-date__caption">
      <Button
        className="navds-date__caption-button"
        disabled={!isValidDropdownCaption ? false : !hasFollowingYear(-1)}
        onClick={() => handleButtonClick(-1)}
        aria-label={labelPrevYear(locale?.code)}
        icon={<Left aria-hidden />}
        variant="tertiary"
      />

      {isValidDropdownCaption ? (
        <Select
          label="velg år"
          hideLabel
          value={yearState?.getFullYear()}
          onChange={handleYearChange}
          className="navds-date__caption__year"
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
      <Button
        className="navds-date__caption-button"
        disabled={!isValidDropdownCaption ? false : !hasFollowingYear(1)}
        onClick={() => handleButtonClick(1)}
        aria-label={labelNextYear(locale?.code)}
        icon={<Right aria-hidden />}
        variant="tertiary"
      />
    </div>
  );
};

export default MonthCaption;

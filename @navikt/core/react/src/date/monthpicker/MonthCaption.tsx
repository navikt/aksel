import { Left, Right } from "@navikt/ds-icons";
import isSameYear from "date-fns/isSameYear";
import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";
import React from "react";
import { useDayPicker } from "react-day-picker";
import { Button, Select } from "../..";
import { useSharedMonthContext } from "../context";
import { hasNextYear, labelNextYear, labelPrevYear } from "../utils";

export const MonthCaption = () => {
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption },
    locale,
  } = useDayPicker();

  const { hasDropdown, year, toYear } = useSharedMonthContext();

  const years: Date[] = [];

  if (hasDropdown && fromDate && toDate) {
    const fromYear = fromDate.getFullYear();
    const toYear = toDate.getFullYear();
    for (let year = fromYear; year <= toYear; year++) {
      years.push(setYear(startOfYear(new Date()), year));
    }
  }

  const handleYearChange = (e) =>
    toYear(setYear(startOfMonth(new Date()), Number(e.target.value)));

  const handleButtonClick = (val: number) => {
    let newMonth: Date;
    if (hasDropdown && hasNextYear(year, years, val)) {
      newMonth = setYear(new Date(), year.getFullYear() + val);
      toYear(newMonth);
    } else if (!hasDropdown) {
      const newYear = Number(year.getFullYear() + val);
      newMonth = setYear(year, newYear);
      toYear(newMonth);
    }
  };

  const hasFollowingYear = (value: number) => {
    return years.some((y) =>
      isSameYear(y, setYear(year, Number(year.getFullYear() + value)))
    );
  };

  return (
    <div className="navds-date__caption">
      <Button
        className="navds-date__caption-button"
        disabled={!hasDropdown ? false : !hasFollowingYear(-1)}
        onClick={() => handleButtonClick(-1)}
        aria-label={labelPrevYear(locale?.code)}
        icon={<Left aria-hidden />}
        variant="tertiary"
        type="button"
      />

      {hasDropdown ? (
        <Select
          label="velg år"
          hideLabel
          value={year?.getFullYear()}
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
        <span className="navds-date__year-label" aria-live="polite">
          {year.getFullYear()}
        </span>
      )}
      <Button
        className="navds-date__caption-button"
        disabled={!hasDropdown ? false : !hasFollowingYear(1)}
        onClick={() => handleButtonClick(1)}
        aria-label={labelNextYear(locale?.code)}
        icon={<Right aria-hidden />}
        variant="tertiary"
        type="button"
      />
    </div>
  );
};

export default MonthCaption;

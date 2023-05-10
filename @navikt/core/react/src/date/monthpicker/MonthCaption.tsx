import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";
import React from "react";
import { useDayPicker } from "react-day-picker";
import { Button, Select } from "../..";
import { useSharedMonthContext } from "../context";
import { labelNextYear, labelPrevYear } from "../utils";
import { isAfter, isBefore } from "date-fns";

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

    if (!years.map((x) => x.getFullYear()).includes(year.getFullYear())) {
      years.push(setYear(startOfYear(new Date()), year.getFullYear()));
    }
    years.sort((a, b) => a.getFullYear() - b.getFullYear());
  }

  const handleYearChange = (e) =>
    toYear(setYear(startOfMonth(new Date()), Number(e.target.value)));

  const handleButtonClick = (val: number) => {
    const newYear = Number(year.getFullYear() + val);
    toYear(setYear(year, newYear));
  };

  const hasPrevYear = () => {
    return fromDate
      ? isBefore(year?.getFullYear() - 1, fromDate?.getFullYear())
      : true;
  };

  const hasNextYear = () => {
    return toDate
      ? isAfter(year?.getFullYear() + 1, toDate?.getFullYear())
      : true;
  };

  return (
    <div className="navds-date__caption">
      <Button
        className="navds-date__caption-button"
        disabled={hasPrevYear()}
        onClick={() => handleButtonClick(-1)}
        aria-label={labelPrevYear(locale?.code)}
        icon={<ArrowLeftIcon aria-hidden />}
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
        disabled={hasNextYear()}
        onClick={() => handleButtonClick(1)}
        aria-label={labelNextYear(locale?.code)}
        icon={<ArrowRightIcon aria-hidden />}
        variant="tertiary"
        type="button"
      />
    </div>
  );
};

export default MonthCaption;

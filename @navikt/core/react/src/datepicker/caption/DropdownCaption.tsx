import { Left, Right } from "@navikt/ds-icons";
import {
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { Button, Select } from "../..";

export const DropdownCaption = ({ displayMonth }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption },
    locale,
  } = useDayPicker();

  if (!fromDate || !toDate) return <></>;

  const getYears = () => {
    const years: Date[] = [];
    const fromYear = fromDate.getFullYear();
    const toYear = toDate.getFullYear();
    for (let year = fromYear; year <= toYear; year++) {
      years.push(setYear(startOfYear(new Date()), year));
    }
    return years;
  };

  const getMonths = () => {
    const dropdownMonths: Date[] = [];

    if (isSameYear(fromDate, toDate)) {
      // only display the months included in the range
      const date = startOfMonth(fromDate);
      for (
        let month = fromDate.getMonth();
        month <= toDate.getMonth();
        month++
      ) {
        dropdownMonths.push(setMonth(date, month));
      }
    } else {
      // display all the 12 months
      const date = startOfMonth(new Date()); // Any date should be OK, as we just need the year
      for (let month = 0; month <= 11; month++) {
        dropdownMonths.push(setMonth(date, month));
      }
    }
    return dropdownMonths;
  };

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setYear(startOfMonth(displayMonth), Number(e.target.value)));

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setMonth(startOfMonth(displayMonth), Number(e.target.value)));

  console.log(displayMonth);
  console.log(new Date(2019, 0, 1));

  return (
    <div className="navds-datepicker__caption">
      <Button
        variant={"tertiary"}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        icon={<Left aria-hidden />}
        className="navds-datepicker__caption-button"
      />

      <Select
        label="velg månede"
        hideLabel
        className="navds-datepicker__caption__month"
        value={displayMonth.getMonth()}
        onChange={handleMonthChange}
      >
        {getMonths().map((m) => (
          <option key={m.getMonth()} value={m.getMonth()}>
            {formatMonthCaption(m, { locale })}
          </option>
        ))}
      </Select>
      <Select
        label="velg år"
        hideLabel
        value={displayMonth.getFullYear()}
        onChange={handleYearChange}
      >
        {getYears().map((year) => (
          <option key={year.getFullYear()} value={year.getFullYear()}>
            {formatYearCaption(year, { locale })}
          </option>
        ))}
      </Select>

      <Button
        icon={<Right aria-hidden />}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        variant={"tertiary"}
        className="navds-datepicker__caption-button"
      />
    </div>
  );
};

export default DropdownCaption;

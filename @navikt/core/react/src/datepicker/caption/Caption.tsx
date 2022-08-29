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

export const DatePickerCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption },
    locale,
  } = useDayPicker();

  if (!fromDate) return <></>;
  if (!toDate) return <></>;

  const years: Date[] = [];
  const fromYear = fromDate.getFullYear();
  const toYear = toDate.getFullYear();
  for (let year = fromYear; year <= toYear; year++) {
    years.push(setYear(startOfYear(new Date()), year));
  }

  const dropdownMonths: Date[] = [];

  if (isSameYear(fromDate, toDate)) {
    // only display the months included in the range
    const date = startOfMonth(fromDate);
    for (let month = fromDate.getMonth(); month <= toDate.getMonth(); month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  } else {
    // display all the 12 months
    const date = startOfMonth(new Date()); // Any date should be OK, as we just need the year
    for (let month = 0; month <= 11; month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  }

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
      >
        {dropdownMonths.map((m) => (
          <option key={m.getMonth()} value={m.getMonth()}>
            {formatMonthCaption(m, { locale })}
          </option>
        ))}
      </Select>
      <Select label="velg år" hideLabel>
        {years.map((year) => (
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

export default DatePickerCaption;

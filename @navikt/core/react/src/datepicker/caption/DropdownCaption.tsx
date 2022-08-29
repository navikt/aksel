import { Left, Right } from "@navikt/ds-icons";
import { setMonth, setYear, startOfMonth } from "date-fns";
import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { Button, Select } from "../..";
import { getMonths, getYears } from "../utils/get-dates";

export const DropdownCaption = ({ displayMonth }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption },
    locale,
  } = useDayPicker();

  if (!fromDate || !toDate) return <></>;

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setYear(startOfMonth(displayMonth), Number(e.target.value)));

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setMonth(startOfMonth(displayMonth), Number(e.target.value)));

  const years = getYears(fromDate, toDate);
  const months = getMonths(fromDate, toDate, displayMonth);

  return (
    <div className="navds-datepicker__caption">
      <Button
        variant={"tertiary"}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        icon={<Left title="velg forrige månede" />}
        className="navds-datepicker__caption-button"
      />

      <Select
        label="velg månede"
        hideLabel
        className="navds-datepicker__caption__month"
        value={displayMonth.getMonth()}
        onChange={handleMonthChange}
      >
        {months.map((m) => (
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
        {years.map((year) => (
          <option key={year.getFullYear()} value={year.getFullYear()}>
            {formatYearCaption(year, { locale })}
          </option>
        ))}
      </Select>

      <Button
        icon={<Right title="velg neste månede" />}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        variant={"tertiary"}
        className="navds-datepicker__caption-button"
      />
    </div>
  );
};

export default DropdownCaption;

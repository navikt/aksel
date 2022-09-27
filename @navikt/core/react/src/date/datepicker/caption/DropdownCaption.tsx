import { Left, Right } from "@navikt/ds-icons";
import { setMonth, setYear, startOfMonth } from "date-fns";
import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { Button, Select } from "../../..";
import { getMonths, getYears } from "../../utils/get-dates";
import { labelMonthDropdown, labelYearDropdown } from "../../utils/labels";

export const DropdownCaption = ({ displayMonth, id }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption, formatCaption },
    labels: { labelPrevious, labelNext },
    locale,
  } = useDayPicker();

  if (!fromDate || !toDate) return <></>;

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setYear(startOfMonth(displayMonth), Number(e.target.value)));

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setMonth(startOfMonth(displayMonth), Number(e.target.value)));

  const years = getYears(fromDate, toDate);
  const months = getMonths(fromDate, toDate, displayMonth);

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });
  const yearDropdownLabel = labelYearDropdown(locale);
  const MonthDropdownLabel = labelMonthDropdown(locale);

  return (
    <div className="navds-date__caption-dropdown">
      <span
        aria-live="polite"
        aria-atomic="true"
        id={id}
        className="navds-sr-only"
      >
        {formatCaption(displayMonth, { locale })}
      </span>
      <Button
        aria-label={previousLabel}
        variant="tertiary"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        icon={<Left title="velg forrige månede" />}
        className="navds-date__caption-button"
      />

      <div className="navds-date__caption__month-wrapper">
        <Select
          label={MonthDropdownLabel}
          hideLabel
          className="navds-date__caption__month"
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
          label={yearDropdownLabel}
          hideLabel
          value={displayMonth.getFullYear()}
          onChange={handleYearChange}
          className="navds-date__caption__year"
        >
          {years.map((year) => (
            <option key={year.getFullYear()} value={year.getFullYear()}>
              {formatYearCaption(year, { locale })}
            </option>
          ))}
        </Select>
      </div>

      <Button
        aria-label={nextLabel}
        icon={<Right title="velg neste månede" />}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        variant="tertiary"
        className="navds-date__caption-button"
      />
    </div>
  );
};

export default DropdownCaption;

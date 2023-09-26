import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import startOfMonth from "date-fns/startOfMonth";
import React from "react";
import { CaptionProps, useDayPicker, useNavigation } from "react-day-picker";
import { Button, Select } from "../../..";
import { getMonths, getYears } from "../../utils/get-dates";
import { labelMonthDropdown, labelYearDropdown } from "../../utils/labels";
import { max, min } from "date-fns";
import WeekRow from "./WeekRow";

/**
 * https://github.com/gpbl/react-day-picker/tree/main/src/components/CaptionDropdowns
 */
export const DropdownCaption = ({ displayMonth, id }: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption, formatCaption },
    labels: { labelPrevious, labelNext },
    locale,
  } = useDayPicker();

  if (!fromDate || !toDate) {
    console.warn("Using dropdownCaption required fromDate and toDate");
    return null;
  }

  const handleYearChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newMonth = setYear(
      startOfMonth(displayMonth),
      Number(e.target.value)
    );
    goToMonth(startOfMonth(min([max([newMonth, fromDate]), toDate])));
  };

  const handleMonthChange: React.ChangeEventHandler<HTMLSelectElement> = (e) =>
    goToMonth(setMonth(startOfMonth(displayMonth), Number(e.target.value)));

  const years = getYears(fromDate, toDate, displayMonth.getFullYear());
  const months = getMonths(fromDate, toDate, displayMonth);

  const previousLabel = labelPrevious(previousMonth, { locale });
  const nextLabel = labelNext(nextMonth, { locale });
  const yearDropdownLabel = labelYearDropdown(locale);
  const MonthDropdownLabel = labelMonthDropdown(locale);

  return (
    <>
      <div className="navds-date__caption">
        <span
          aria-live="polite"
          aria-atomic="true"
          id={id}
          className="navds-sr-only"
        >
          {formatCaption(displayMonth, { locale })}
        </span>
        <Button
          variant="tertiary"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title={previousLabel} />}
          className="navds-date__caption-button"
          type="button"
        />

        <div className="navds-date__caption">
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
          icon={<ArrowRightIcon title={nextLabel} />}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          variant="tertiary"
          className="navds-date__caption-button"
          type="button"
        />
      </div>
      <WeekRow displayMonth={displayMonth} />
    </>
  );
};

export default DropdownCaption;

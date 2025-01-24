import {
  Locale,
  getMonth,
  getYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import React, { ChangeEvent, useCallback } from "react";
import { CalendarMonth, useDayPicker } from "react-day-picker";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../../button";
import { Select } from "../../../form/select";
import { BodyShort } from "../../../typography";
import { omit } from "../../../util";
import { useDateTranslationContext } from "../../context";
import { getMonthOptions } from "../new-util/getMonthOptions";
import { getNavMonths } from "../new-util/getNavMonths";
import { getYearOptions } from "../new-util/getYearOptions";

const Months = ({
  children,
  calendarMonth,
  locale,
  ...rest
}: {
  calendarMonth: CalendarMonth;
  displayIndex: number;
  locale: Locale;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { dayPickerProps, goToMonth, formatters, previousMonth, nextMonth } =
    useDayPicker();

  const { captionLayout } = dayPickerProps;

  const translate = useDateTranslationContext().translate;

  const handleMonthChange = useCallback(
    (date: Date, e: ChangeEvent<HTMLSelectElement>) => {
      const selectedMonth = Number(e.target.value);
      const newMonth = setMonth(startOfMonth(date), selectedMonth);
      goToMonth(newMonth);
    },
    [goToMonth],
  );

  const handleYearChange = useCallback(
    (date: Date, e: ChangeEvent<HTMLSelectElement>) => {
      const selectedYear = Number(e.target.value);
      const newMonth = setYear(startOfMonth(date), selectedYear);
      goToMonth(newMonth);
    },
    [goToMonth],
  );

  const [navStart, navEnd] = getNavMonths(dayPickerProps);

  const months = getMonthOptions(
    calendarMonth.date,
    navStart,
    navEnd,
    formatters,
  );

  const dropdownYears = getYearOptions(navStart, navEnd, formatters);

  const Selects = () => (
    <div className="navds-date__caption">
      <Select
        label={translate("month")}
        hideLabel
        className="navds-date__caption__month"
        onChange={(event) => handleMonthChange(calendarMonth.date, event)}
        value={getMonth(calendarMonth.date)}
      >
        {months?.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </Select>

      <Select
        label={translate("year")}
        hideLabel
        className="navds-date__caption__year"
        onChange={(event) => handleYearChange(calendarMonth.date, event)}
        value={getYear(calendarMonth.date)}
      >
        {dropdownYears?.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </Select>
    </div>
  );

  const Label = () => (
    <BodyShort
      weight="semibold"
      as="span"
      aria-live="polite"
      role="status"
      className="navds-date__caption-label"
    >
      {formatters.formatCaption(calendarMonth.date, { locale })}
    </BodyShort>
  );

  return (
    <div {...omit(rest, ["displayIndex"])}>
      <div className="navds-date__caption">
        {captionLayout?.startsWith("dropdown") && (
          <span aria-live="polite" aria-atomic="true" className="navds-sr-only">
            {formatters.formatCaption(calendarMonth.date)}
          </span>
        )}
        <Button
          variant="tertiary-neutral"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title={translate("goToPreviousMonth")} />}
          className="navds-date__caption-button"
          type="button"
        />
        {captionLayout?.startsWith("dropdown") ? <Selects /> : <Label />}

        <Button
          variant="tertiary-neutral"
          icon={<ArrowRightIcon title={translate("goToNextMonth")} />}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className="navds-date__caption-button"
          type="button"
        />
      </div>
      {children}
    </div>
  );
};

export { Months };

import {
  Locale,
  format,
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
import { useRenameCSS } from "../../../theme/Theme";
import { BodyShort } from "../../../typography";
import { omit } from "../../../util";
import { useDateTranslationContext } from "../../Date.locale";
import {
  calendarRange,
  getMonthOptions,
  getYearOptions,
} from "../../date-utils";
import { MultipleMode } from "../DatePicker.types";
import { DatePickerWeekRow } from "./DatePicker.WeekRow";

const DatePickerMonths = ({
  children,
  calendarMonth,
  locale,
  onWeekNumberClick,
  ...rest
}: {
  calendarMonth: CalendarMonth;
  displayIndex: number;
  locale: Locale;
  onWeekNumberClick: MultipleMode["onWeekNumberClick"];
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { dayPickerProps, goToMonth, previousMonth, nextMonth } =
    useDayPicker();

  const { captionLayout } = dayPickerProps;

  const { cn } = useRenameCSS();
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

  const [navStart, navEnd] = calendarRange({
    captionLayout: captionLayout === "dropdown" ? "dropdown" : "label",
    startMonth: dayPickerProps.startMonth,
    endMonth: dayPickerProps.endMonth,
    today: dayPickerProps.today,
  });

  const months = getMonthOptions(calendarMonth.date, navStart, navEnd, locale);
  const dropdownYears = getYearOptions(navStart, navEnd, locale);

  return (
    <div {...omit(rest, ["displayIndex"])}>
      <div className={cn("navds-date__caption")}>
        {captionLayout?.startsWith("dropdown") && (
          <span
            aria-live="polite"
            aria-atomic="true"
            className={cn("navds-sr-only")}
          >
            {format(calendarMonth.date, "LLLL y", { locale })}
          </span>
        )}
        <Button
          variant="tertiary-neutral"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          icon={<ArrowLeftIcon title={translate("goToPreviousMonth")} />}
          className={cn("navds-date__caption-button")}
          type="button"
        />
        {captionLayout?.startsWith("dropdown") ? (
          <div className={cn("navds-date__caption")}>
            <Select
              label={translate("month")}
              hideLabel
              className={cn("navds-date__caption__month")}
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
              className={cn("navds-date__caption__year")}
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
        ) : (
          <BodyShort
            weight="semibold"
            as="span"
            aria-live="polite"
            role="status"
            className={cn("navds-date__caption-label")}
          >
            {format(calendarMonth.date, "LLLL y", { locale })}
          </BodyShort>
        )}

        <Button
          variant="tertiary-neutral"
          icon={<ArrowRightIcon title={translate("goToNextMonth")} />}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className={cn("navds-date__caption-button")}
          type="button"
        />
      </div>
      <DatePickerWeekRow
        weeks={calendarMonth.weeks}
        onWeekNumberClick={onWeekNumberClick}
      />
      {children}
    </div>
  );
};

export { DatePickerMonths };

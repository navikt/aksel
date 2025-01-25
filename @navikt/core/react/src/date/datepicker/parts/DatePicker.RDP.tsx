import cl from "clsx";
import { isAfter, isBefore, isWeekend } from "date-fns";
import React from "react";
import { ClassNames, DayPicker, dateMatchModifiers } from "react-day-picker";
import { Show } from "../../../layout/responsive";
import { omit } from "../../../util";
import { useDateLocale } from "../../../util/i18n/i18n.hooks";
import { getLocaleFromString } from "../../Date.locale";
import { clampDisplayMonth } from "../../date-utils";
import {
  ConditionalModeProps,
  DatePickerDefaultProps,
} from "../Datepicker.types";
import { DatePickerDayButton } from "./DatePicker.DayButton";
import { DatePickerMonths } from "./DatePicker.Months";
import { DatePickerWeekNumber } from "./DatePicker.WeekNumber";

const LegacyClassNames: Partial<ClassNames> = {
  button_next: "button",
  day: "rdp-cell",
  day_button: "rdp-day rdp-button",
  /* We set this directly on DayButton */
  disabled: "",
  hidden: "rdp-day_hidden",
  outside: "rdp-day_outside",
  selected: "rdp-day_selected",
  weekday: "rdp-head_cell",
  weekdays: "rdp-head_row",
  week: "rdp-row",
  weeks: "rdp-tbody",
  month_grid: "rdp-table",
  week_number: "rdp-weeknumber",
};

type ReactDayPickerProps = DatePickerDefaultProps &
  ConditionalModeProps & {
    /**
     * If datepicker should be fixed to 6 weeks, regardless of actual weeks in month
     * @default true
     */
    fixedWeeks?: boolean;
    /**
     * Update selected date
     */
    handleSelect: (newSelected: any) => void;
  };

const ReactDayPicker = ({
  className,
  dropdownCaption,
  disabled = [],
  disableWeekends = false,
  showWeekNumber = false,
  selected,
  fixedWeeks = false,
  onWeekNumberClick,
  fromDate,
  toDate,
  month,
  mode: _mode,
  handleSelect,
  locale: _locale,
  ...rest
}: ReactDayPickerProps) => {
  const langProviderLocale = useDateLocale();
  const locale = _locale ? getLocaleFromString(_locale) : langProviderLocale;

  const mode = _mode ?? ("single" as any);

  return (
    <DayPicker
      captionLayout={dropdownCaption ? "dropdown" : "label"}
      hideNavigation
      locale={locale}
      mode={mode as any}
      onSelect={handleSelect}
      selected={selected}
      classNames={LegacyClassNames}
      components={{
        MonthCaption: () => <></>,
        DayButton: (props) => (
          <DatePickerDayButton {...props} locale={locale} />
        ),
        Month: (props) => (
          <DatePickerMonths
            {...props}
            locale={locale}
            onWeekNumberClick={
              mode === "multiple" ? onWeekNumberClick : undefined
            }
          />
        ),
        Day: (props) => (
          <td {...omit(props, ["day", "modifiers"])} className="rdp-cell" />
        ),
        WeekNumber: (props) => (
          <DatePickerWeekNumber
            {...props}
            showOnDesktop
            onWeekNumberClick={
              mode === "multiple" ? onWeekNumberClick : undefined
            }
          />
        ),
        /* On smaller screens we hide it to accomedate our custom week-selector */
        WeekNumberHeader: (props) => (
          <Show above="sm" asChild>
            <th {...props} />
          </Show>
        ),
      }}
      className={cl("navds-date", className)}
      disabled={(day) => {
        const isOutside =
          (toDate && isAfter(day, toDate)) ||
          (fromDate && isBefore(day, fromDate)) ||
          false;

        return (
          (disableWeekends && isWeekend(day)) ||
          dateMatchModifiers(day, disabled) ||
          isOutside
        );
      }}
      weekStartsOn={1}
      modifiers={{
        weekend: (day) => disableWeekends && isWeekend(day),
      }}
      modifiersClassNames={{
        weekend: "rdp-day__weekend",
      }}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={false}
      showWeekNumber={showWeekNumber}
      fixedWeeks={fixedWeeks}
      showOutsideDays
      startMonth={fromDate}
      endMonth={toDate}
      month={clampDisplayMonth({ month, start: fromDate, end: toDate })}
      {...omit(rest, ["onSelect", "role", "id", "defaultSelected"])}
    />
  );
};

export { ReactDayPicker };

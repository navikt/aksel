import cl from "clsx";
import { isAfter, isBefore, isWeekend } from "date-fns";
import React from "react";
import { ClassNames, DayPicker, dateMatchModifiers } from "react-day-picker";
import { Show } from "../../layout/responsive";
import { omit } from "../../util";
import { useDateLocale } from "../../util/i18n/i18n.hooks";
import { getLocaleFromString } from "../utils";
import { clampMonth } from "./new-util/clampMonth";
import { Months } from "./parts/Months";
import { DayButton } from "./parts/NewDayButton";
import WeekNumber from "./parts/WeekNumber";
import { ConditionalModeProps, DatePickerDefaultProps } from "./types";

/*
button	button_previous, button_next
button_reset	button_previous, button_next
caption	month_caption
caption_between	Removed
caption_dropdowns	dropdowns
caption_end	Removed
caption_start	Removed
day_disabled	disabled
day_hidden	hidden
day_outside	outside
head	Removed
head_cell	weekday
head_row	weekdays
multiple_months	Removed. Use data-multiple-months data attribute.
nav_button	button_previous, button_next
nav_button_next	button_next
nav_button_previous	button_previous
nav_icon	chevron, button_next, button_previous
row	week
tbody	weeks
table	month_grid
tfoot	footer
vhidden	Removed

cell	day – ⚠️ The previous day element is now day_button.

weeknumber	week_number
with_weeknumber	Removed. Use data-week-numbers data attribute. */

/* rdp-button_reset rdp-button rdp-day rdp-day_disabled */
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
        DayButton: (props) => <DayButton {...props} locale={locale} />,
        Month: (props) => <Months {...props} locale={locale} />,
        Day: (props) => (
          <td {...omit(props, ["day", "modifiers"])} className="rdp-cell" />
        ),
        WeekNumber: (props) => (
          <WeekNumber
            {...props}
            onWeekNumberClick={
              mode === "multiple" ? onWeekNumberClick : undefined
            }
          />
        ),
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
      month={clampMonth({ month, start: fromDate, end: toDate })}
      {...omit(rest, ["onSelect", "role", "id", "defaultSelected"])}
    />
  );
};

export { ReactDayPicker };

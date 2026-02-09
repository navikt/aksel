import { isBefore, isSameDay, isWeekend } from "date-fns";
import React, { useCallback } from "react";
import { ClassNames, DayPicker, dateMatchModifiers } from "react-day-picker";
import { Show } from "../../../primitives/responsive";
import { omit } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useDateLocale } from "../../../utils/i18n/i18n.hooks";
import { getLocaleFromString } from "../../Date.locale";
import { DateRange, isDateRange } from "../../Date.typeutils";
import { clampDisplayMonth, isDateOutsideRange } from "../../date-utils";
import {
  ConditionalModeProps,
  DatePickerDefaultProps,
} from "../DatePicker.types";
import { DatePickerDayButton } from "./DatePicker.DayButton";
import { DatePickerMonths } from "./DatePicker.Months";
import { DatePickerWeekNumber } from "./DatePicker.WeekNumber";

/**
 * To support backwards compatibility with the old datepicker,
 * we need to provide a partial implementation of the classnames
 */
const LegacyClassNames: Partial<ClassNames> = {
  root: "rdp",
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
      onSelect={(newSelection, newDate: Date) => {
        /**
         * In the case where we have:
         * - Mode: "range"
         * - selected: { from: undefined, to: Date } or
         * - selected: { from: Date, to: undefined }
         *
         *
         * RDP returns undefined for newSelection. We need to manually handle these cases.
         */
        if (mode !== "range" || newSelection || !isDateRange(selected)) {
          handleSelect(newSelection);
          return;
        }

        if (!selected.to) {
          /**
           * If defaultSelected.from is defined, but not "to", and user selects the same date as "from",
           * we interpret this as user wanting to select a single date range (from === to).
           */
          if (selected.from && isSameDay(selected.from, newDate)) {
            handleSelect({ from: newDate, to: newDate });
            return;
          }
          handleSelect({ from: newDate, to: undefined });
          return;
        }

        let range: DateRange | undefined;

        if (isSameDay(selected.to, newDate)) {
          range = undefined;
        } else if (isBefore(newDate, selected.to)) {
          range = { from: newDate, to: selected.to };
        } else {
          range = { from: selected.to, to: newDate };
        }

        handleSelect(range);
      }}
      selected={selected}
      classNames={LegacyClassNames}
      components={{
        MonthCaption: () => <></>,
        DayButton: useCallback(
          (props) => <DatePickerDayButton {...props} locale={locale} />,
          [locale],
        ),
        Month: useCallback(
          (props) => (
            <DatePickerMonths
              {...props}
              locale={locale}
              onWeekNumberClick={
                mode === "multiple" ? onWeekNumberClick : undefined
              }
            />
          ),
          [locale, mode, onWeekNumberClick],
        ),
        Day: useCallback(
          (props) => (
            <td
              {...omit(props, ["day", "modifiers"])}
              className="rdp-cell"
              role={undefined}
            />
          ),
          [],
        ),
        WeekNumber: useCallback(
          (props) => (
            <DatePickerWeekNumber
              {...props}
              showOnDesktop
              onWeekNumberClick={
                mode === "multiple" ? onWeekNumberClick : undefined
              }
            />
          ),
          [mode, onWeekNumberClick],
        ),
        /* On smaller screens we hide it to accomedate our custom week-selector */
        WeekNumberHeader: useCallback(
          (props) => (
            <Show above="sm" asChild>
              <th {...props} />
            </Show>
          ),
          [],
        ),
        Weekdays: useCallback(
          (props) => (
            <thead {...props} className="rdp-head" aria-hidden>
              <tr className="rdp-head_row">{props.children}</tr>
            </thead>
          ),
          [],
        ),
      }}
      className={cl("aksel-date", className)}
      disabled={(day) => {
        return (
          (disableWeekends && isWeekend(day)) ||
          dateMatchModifiers(day, disabled) ||
          isDateOutsideRange({ day, fromDate, toDate })
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

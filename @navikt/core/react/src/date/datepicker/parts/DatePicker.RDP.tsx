import { isWeekend } from "date-fns";
import React, { useCallback, useState } from "react";
import { ClassNames, DayPicker, dateMatchModifiers } from "react-day-picker";
import { Show } from "../../../primitives/responsive";
import { omit } from "../../../utils-external";
import { cl } from "../../../utils/helpers";
import { useDateLocale } from "../../../utils/i18n/i18n.hooks";
import { useDateInputContext } from "../../Date.Input";
import { getLocaleFromString } from "../../Date.locale";
import { isDateRange } from "../../Date.typeutils";
import { clampDisplayMonth, isDateOutsideRange } from "../../date-utils";
import { pickRangeSelection } from "../../date-utils/pick-range-selection";
import type {
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
    /**
     * Id for the label of the popup, used for aria-labelledby
     */
    popupLabelId?: string;
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
  popupLabelId,
  ...rest
}: ReactDayPickerProps) => {
  const langProviderLocale = useDateLocale();
  const locale = _locale ? getLocaleFromString(_locale) : langProviderLocale;
  const mode = _mode ?? ("single" as any);
  const [dayHovering, setDayHovering] = useState<Date>();
  const context = useDateInputContext(false);

  return (
    <DayPicker
      captionLayout={dropdownCaption ? "dropdown" : "label"}
      hideNavigation
      locale={locale}
      mode={mode as any}
      onSelect={(newSelection, newDate: Date) => {
        if (mode !== "range" || !isDateRange(selected)) {
          handleSelect(newSelection);
          return;
        }

        const range = pickRangeSelection({
          caller: context?.caller,
          currentSelection: selected,
          newDate,
          newSelection,
        });

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
              popupLabelId={popupLabelId}
            />
          ),
          [locale, mode, onWeekNumberClick, popupLabelId],
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
            <thead className="rdp-head" aria-hidden>
              <tr {...props} />
            </thead>
          ),
          [],
        ),
      }}
      className={cl("aksel-date", className)}
      disabled={(day) =>
        (disableWeekends && isWeekend(day)) ||
        dateMatchModifiers(day, disabled) ||
        isDateOutsideRange({ day, fromDate, toDate })
      }
      weekStartsOn={1}
      modifiers={{
        weekend: (day) => disableWeekends && isWeekend(day),
        hoverRange: (day: Date) => {
          if (
            !isDateRange(selected) ||
            !selected.from ||
            (selected.from && selected.to) ||
            !dayHovering
          ) {
            return false;
          }

          const dayTime = day.getTime();
          const fromTime = selected.from.getTime();
          const hoverTime = dayHovering.getTime();

          // Hovering after the start date
          if (hoverTime > fromTime) {
            return dayTime > fromTime && dayTime < hoverTime;
          }
          // Hovering before the start date
          return dayTime < fromTime && dayTime > hoverTime;
        },
      }}
      onDayMouseEnter={setDayHovering}
      onDayMouseLeave={() => setDayHovering(undefined)}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={false}
      showWeekNumber={showWeekNumber}
      fixedWeeks={fixedWeeks}
      showOutsideDays
      startMonth={fromDate}
      endMonth={toDate}
      month={clampDisplayMonth({ month, start: fromDate, end: toDate })}
      /* We handle this logic manually in `onSelect` */
      resetOnSelect
      {...omit(rest, ["onSelect", "role", "id", "defaultSelected"])}
    />
  );
};

export { ReactDayPicker };

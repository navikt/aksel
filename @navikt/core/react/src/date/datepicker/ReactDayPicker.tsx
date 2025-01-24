import cl from "clsx";
import { isWeekend } from "date-fns";
import React from "react";
import { DayPicker, dateMatchModifiers } from "react-day-picker";
import { omit } from "../../util";
import { useDateLocale } from "../../util/i18n/i18n.hooks";
import { getLocaleFromString } from "../utils";
import { clampMonth } from "./new-util/clampMonth";
import { Months } from "./parts/Months";
import { DayButton } from "./parts/NewDayButton";
import { ConditionalModeProps, DatePickerDefaultProps } from "./types";

type ReactDayPickerProps = DatePickerDefaultProps &
  ConditionalModeProps & {
    /**
     * If datepicker should be fixed to 6 weeks, regardless of actual weeks in month
     * @default true
     */
    fixedWeeks?: boolean;
    /**
     *
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
      classNames={{
        vhidden: "navds-sr-only",
      }}
      components={{
        MonthCaption: () => <></>,
        DayButton: (props) => <DayButton {...props} locale={locale} />,
        Month: Months,
      }}
      className={cl("navds-date", className)}
      disabled={(day) => {
        return (
          (disableWeekends && isWeekend(day)) ||
          dateMatchModifiers(day, disabled)
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
      onWeekNumberClick={mode === "multiple" ? onWeekNumberClick : undefined}
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

import cl from "clsx";
import { isWeekend } from "date-fns";
import React, { forwardRef } from "react";
import { DateRange, DayPicker, dateMatchModifiers } from "react-day-picker";
import { omit } from "../../util";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import { DateTranslationContextProvider } from "../context";
import { getLocaleFromString, getTranslations } from "../utils";
import { clampMonth } from "./new-util/clampMonth";
import { Months } from "./parts/Months";
import { DayButton } from "./parts/NewDayButton";
import {
  DatePickerDefaultProps,
  MultipleMode,
  RangeMode,
  SingleMode,
} from "./types";

interface DatePickerStandaloneDefaultProps
  extends Omit<
    DatePickerDefaultProps,
    "open" | "onClose" | "onOpenToggle" | "wrapperClassName" | "strategy"
  > {
  /**
   * Datepicker classname
   */
  className?: string;
  /**
   * If datepicker should be fixed to 6 weeks, regardless of actual weeks in month
   * @default true
   */
  fixedWeeks?: boolean;
}

type StandaloneConditionalModeProps = SingleMode | MultipleMode | RangeMode;

export type DatePickerStandaloneProps = DatePickerStandaloneDefaultProps &
  StandaloneConditionalModeProps;

export type DatePickerStandaloneType = React.ForwardRefExoticComponent<
  DatePickerStandaloneProps & React.RefAttributes<HTMLDivElement>
>;

export const DatePickerStandalone: DatePickerStandaloneType = forwardRef<
  HTMLDivElement,
  DatePickerStandaloneProps
>(
  (
    {
      className,
      locale,
      translations,
      dropdownCaption,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      selected,
      defaultSelected,
      onSelect,
      fixedWeeks = false,
      onWeekNumberClick,
      fromDate,
      toDate,
      month,
      ...rest
    },
    ref,
  ) => {
    const translate = useI18n(
      "DatePicker",
      translations,
      getTranslations(locale),
    );
    const langProviderLocale = useDateLocale();
    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const mode = rest.mode ?? ("single" as any);

    /**
     * @param newSelected Date | Date[] | DateRange | undefined
     */
    const handleSelect = (newSelected) => {
      setSelectedDates(newSelected);
      onSelect?.(newSelected);
    };

    const _locale = locale ? getLocaleFromString(locale) : langProviderLocale;

    return (
      <div
        ref={ref}
        className={cl("navds-date__standalone-wrapper", className)}
      >
        <DateTranslationContextProvider translate={translate}>
          <DayPicker
            captionLayout={dropdownCaption ? "dropdown" : "label"}
            hideNavigation
            locale={_locale}
            mode={mode}
            onSelect={handleSelect}
            selected={selected ?? selectedDates}
            classNames={{
              vhidden: "navds-sr-only",
            }}
            components={{
              MonthCaption: () => <></>,
              DayButton: (props) => <DayButton {...props} locale={_locale} />,
              Month: Months,
            }}
            className="navds-date"
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
            showWeekNumber={showWeekNumber}
            onWeekNumberClick={
              mode === "multiple" ? onWeekNumberClick : undefined
            }
            fixedWeeks={fixedWeeks}
            showOutsideDays
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={false}
            startMonth={fromDate}
            endMonth={toDate}
            month={clampMonth({ month, start: fromDate, end: toDate })}
            {...omit(rest, ["children", "id", "role"])}
          />
        </DateTranslationContextProvider>
      </div>
    );
  },
);

export default DatePickerStandalone;

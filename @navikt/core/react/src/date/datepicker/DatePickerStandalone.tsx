import cl from "clsx";
import { format, isWeekend } from "date-fns";
import React, { forwardRef } from "react";
import {
  CalendarDay,
  DateRange,
  DayPicker,
  Modifiers,
  isMatch,
} from "react-day-picker";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Select } from "../../form/select";
import { omit } from "../../util";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import { DateTranslationContextProvider } from "../context";
import { getLocaleFromString, getTranslations } from "../utils";
import Caption from "./parts/Caption";
import DropdownCaption from "./parts/DropdownCaption";
import { HeadRow } from "./parts/HeadRow";
import Row from "./parts/Row";
import TableHead from "./parts/TableHead";
import WeekNumber from "./parts/WeekNumber";
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
            captionLayout="dropdown"
            locale={_locale}
            mode={mode}
            onSelect={handleSelect}
            selected={selected ?? selectedDates}
            classNames={{
              vhidden: "navds-sr-only",
              months: "navds-date__months",
              month: "navds-date__month",
              dropdowns: "navds-date-dropdowns",
              nav: "navds-date__nav",
              weekday: "navds-date__weekday",
              months_dropdown: "navds-date__month-dropdown",
              years_dropdown: "navds-date__years-dropdown",
              day_button: "navds-date__day-button",
            }}
            components={{
              MonthsDropdown: ({
                options,
                value,
                onChange,
                className: _className,
              }) => (
                <Select
                  label={translate("month")}
                  hideLabel
                  className={_className}
                  value={value}
                  onChange={onChange}
                >
                  {options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              ),
              YearsDropdown: ({
                options,
                value,
                onChange,
                className: _className,
              }) => (
                <Select
                  label={translate("year")}
                  hideLabel
                  className={_className}
                  value={value}
                  onChange={onChange}
                >
                  {options?.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.label}
                    </option>
                  ))}
                </Select>
              ),
              DropdownNav: ({ children, className: _className }) => {
                return <div className={_className}>{children}</div>;
              },
              /* MonthCaption: ({ calendarMonth, displayIndex, children }) => {
                return <div>test</div>;
              }, */

              DayButton: ({ day, modifiers, ..._rest }) => {
                if (modifiers.hidden) {
                  return <></>;
                }
                const dateTime = format(day.date, "cccc d", {
                  locale: _locale,
                });

                return (
                  <button
                    {..._rest}
                    aria-hidden={day.outside}
                    aria-pressed={modifiers.selected}
                    aria-label={dateTime}
                    data-pressed={modifiers.selected}
                  >
                    123
                  </button>
                );
              },

              Nav: ({
                nextMonth,
                onNextClick,
                previousMonth,
                onPreviousClick,
                className: _className,
              }) => {
                return (
                  <div className={_className}>
                    <Button
                      variant="tertiary-neutral"
                      disabled={!previousMonth}
                      onClick={onPreviousClick}
                      icon={
                        <ArrowLeftIcon title={translate("goToPreviousMonth")} />
                      }
                      className="navds-date__caption-button"
                      type="button"
                    />
                    <Button
                      variant="tertiary-neutral"
                      disabled={!nextMonth}
                      onClick={onNextClick}
                      icon={
                        <ArrowRightIcon title={translate("goToNextMonth")} />
                      }
                      className="navds-date__caption-button"
                      type="button"
                    />
                  </div>
                );
              },

              /* Caption: dropdownCaption ? DropdownCaption : Caption,
              Head: TableHead,
              HeadRow,
              WeekNumber,
              Row, */
            }}
            className="navds-date"
            disabled={(day) => {
              return (
                (disableWeekends && isWeekend(day)) || isMatch(day, disabled)
              );
            }}
            weekStartsOn={1}
            initialFocus={false}
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
            {...omit(rest, ["children", "id"])}
          />
        </DateTranslationContextProvider>
      </div>
    );
  },
);

export default DatePickerStandalone;

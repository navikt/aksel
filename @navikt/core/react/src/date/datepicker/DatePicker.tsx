import cl from "clsx";
import { isAfter, isBefore, isWeekend, startOfMonth } from "date-fns";
import React, { forwardRef, useState } from "react";
import { DateRange, DayPicker, dateMatchModifiers } from "react-day-picker";
import { omit } from "../../util";
import { useId } from "../../util/hooks";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import { DateInputContext, DateTranslationContextProvider } from "../context";
import { DatePickerInput } from "../parts/DateInput";
import { DateWrapper } from "../parts/DateWrapper";
import { getLocaleFromString, getTranslations } from "../utils";
import DatePickerStandalone from "./DatePickerStandalone";
import { ConditionalModeProps, DatePickerDefaultProps } from "./types";

export type DatePickerProps = DatePickerDefaultProps & ConditionalModeProps;

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  /**
   * @example
   * ```jsx
   * <DatePicker.Standalone
   *   dropdownCaption
   *   fromDate={new Date("2022-10-01")}
   *   toDate={new Date("2026-10-01")}
   * />
   * ```
   */
  Standalone: typeof DatePickerStandalone;
  /**
   * Custom TextField for DatePicker
   * @see 🏷️ {@link DateInputProps}
   */
  Input: typeof DatePickerInput;
}

/**
 * A component that allows users to select a date from a calendar.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/datepicker)
 * @see 🏷️ {@link DatePickerProps}
 *
 * @example
 * ```jsx
 *  const { inputProps, datepickerProps } = useMonthpicker({
 *    onMonthChange: console.log,
 *  });
 *
 *  return (
 *     <DatePicker {...datepickerProps} dropdownCaption>
 *       <DatePicker.Input
 *         {...inputProps}
 *         label="Velg dato"
 *       />
 *     </DatePicker>
 *  );
 * ```
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      children,
      locale,
      translations,
      dropdownCaption,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      selected,
      id,
      defaultSelected,
      className,
      wrapperClassName,
      open: _open,
      onClose,
      onOpenToggle,
      strategy,
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
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    /* We use state here to insure that anchor is defined if open is true on initial render */
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(setWrapperRef, ref);

    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const mode = rest.mode ?? ("single" as any);

    /**
     * @param newSelected Date | Date[] | DateRange | undefined
     */
    const handleSelect = (newSelected) => {
      setSelectedDates(newSelected);

      if (rest.mode === "single") {
        newSelected && (onClose?.() ?? setOpen(false));
      } else if (rest.mode === "range") {
        newSelected?.from && newSelected?.to && (onClose?.() ?? setOpen(false));
      }
      rest?.onSelect?.(newSelected);
    };

    const _locale = locale ? getLocaleFromString(locale) : langProviderLocale;

    /**
     * Normalize the starting month so that its between the fromDate and toDate
     */
    const normalizeMonth = (_month?: Date) => {
      if (!_month) {
        return undefined;
      }

      let _today = _month;

      if (fromDate && isBefore(_today, fromDate)) {
        _today = fromDate;
      } else if (toDate && isAfter(_today, toDate)) {
        _today = toDate;
      }

      return startOfMonth(_today);
    };

    const DatePickerComponent = (
      <DayPicker
        captionLayout={dropdownCaption ? "dropdown" : "label"}
        /* hideNavigation */
        locale={_locale}
        mode={mode}
        onSelect={handleSelect}
        selected={selected ?? selectedDates}
        /* components={{
          MonthCaption: () => <></>,
          DayButton: (props) => <DayButton {...props} locale={_locale} />,
          Month: Months,
        }} */
        className={cl("navds-date", className)}
        classNames={{
          vhidden: "navds-sr-only",
        }}
        disabled={(day) => {
          return (
            (disableWeekends && isWeekend(day)) ||
            dateMatchModifiers(day, disabled)
          );
        }}
        weekStartsOn={1}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={false}
        startMonth={fromDate}
        endMonth={toDate}
        modifiers={{
          weekend: (day) => disableWeekends && isWeekend(day),
        }}
        modifiersClassNames={{
          weekend: "rdp-day__weekend",
        }}
        showWeekNumber={showWeekNumber}
        onWeekNumberClick={mode === "multiple" ? onWeekNumberClick : undefined}
        fixedWeeks
        showOutsideDays
        month={normalizeMonth(month)}
        {...omit(rest, ["onSelect", "role"])}
      />
    );

    return (
      <DateTranslationContextProvider translate={translate}>
        <DateInputContext.Provider
          value={{
            open: _open ?? open,
            onOpen: () => {
              setOpen((x) => !x);
              onOpenToggle?.();
            },
            ariaId,
            defined: true,
          }}
        >
          <div
            ref={mergedRef}
            className={cl("navds-date__wrapper", wrapperClassName)}
          >
            {children}
            <DateWrapper
              open={_open ?? open}
              anchor={wrapperRef}
              onClose={() => onClose?.() ?? setOpen(false)}
              locale={locale}
              translate={translate}
              variant={mode}
              popoverProps={{
                id: ariaId,
                strategy,
              }}
            >
              {DatePickerComponent}
            </DateWrapper>
          </div>
        </DateInputContext.Provider>
      </DateTranslationContextProvider>
    );
  },
) as DatePickerComponent;

DatePicker.Standalone = DatePickerStandalone;
DatePicker.Input = DatePickerInput;

export default DatePicker;

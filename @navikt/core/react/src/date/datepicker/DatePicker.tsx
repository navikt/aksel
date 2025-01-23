import cl from "clsx";
import { isWeekend } from "date-fns";
import React, { forwardRef, useState } from "react";
import { DateRange, DayPicker, isMatch } from "react-day-picker";
import { omit } from "../../util";
import { useId } from "../../util/hooks";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import { DateInputContext, DateTranslationContextProvider } from "../context";
import { DatePickerInput } from "../parts/DateInput";
import { DateWrapper } from "../parts/DateWrapper";
import { getLocaleFromString, getTranslations } from "../utils";
import DatePickerStandalone from "./DatePickerStandalone";
import Caption from "./parts/Caption";
import DropdownCaption from "./parts/DropdownCaption";
import { HeadRow } from "./parts/HeadRow";
import Row from "./parts/Row";
import TableHead from "./parts/TableHead";
import WeekNumber from "./parts/WeekNumber";
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

    const DatePickerComponent = (
      <DayPicker
        captionLayout="dropdown"
        hideNavigation
        locale={locale ? getLocaleFromString(locale) : langProviderLocale}
        mode={mode}
        onSelect={handleSelect}
        startMonth={fromDate}
        endMonth={toDate}
        /* selected={selected ?? selectedDates} */
        // components={{
        //   MonthCaption:
        //     DropdownCaption /*  dropdownCaption ? DropdownCaption : Caption, */,
        //   /* Head: TableHead, */
        //   /* HeadRow, */
        //   /* WeekNumber: (props) => (
        //     <WeekNumber
        //       week={props.week}
        //       onWeekNumberClick={onWeekNumberClick}
        //     />
        //   ), */
        //   /* Row, */
        // }}
        className={cl("navds-date", className)}
        classNames={{
          vhidden: "navds-sr-only",
        }}
        disabled={(day) => {
          return (disableWeekends && isWeekend(day)) || isMatch(day, disabled);
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
        onWeekNumberClick={mode === "multiple" ? onWeekNumberClick : undefined}
        fixedWeeks
        showOutsideDays
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

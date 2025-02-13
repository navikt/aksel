import React, { forwardRef, useState } from "react";
import { DayPickerProvider } from "react-day-picker";
import { useRenameCSS } from "../../theme/Theme";
import { useId } from "../../util/hooks";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import {
  DateInputContext,
  DateTranslationContextProvider,
  SharedMonthProvider,
} from "../context";
import { MonthPickerInput } from "../parts/DateInput";
import { DateWrapper } from "../parts/DateWrapper";
import { getLocaleFromString, getTranslations } from "../utils";
import MonthCaption from "./MonthCaption";
import MonthPickerStandalone from "./MonthPickerStandalone";
import MonthSelector from "./MonthSelector";
import { MonthPickerProps } from "./types";

interface MonthPickerComponent
  extends React.ForwardRefExoticComponent<MonthPickerProps> {
  /**
   * @example
   * ```jsx
   * <MonthPicker.Standalone
   *   dropdownCaption
   *   fromDate={new Date("1 Oct 2022")}
   *   toDate={new Date("1 Oct 2026")}
   * />
   * ```
   */
  Standalone: typeof MonthPickerStandalone;
  /**
   * Custom TextField for MonthPicker
   * @see 🏷️ {@link DateInputProps}
   */
  Input: typeof MonthPickerInput;
}

/**
 * A component that displays a month picker.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/monthpicker)
 * @see 🏷️ {@link MonthPickerProps}
 *
 * @example
 * ```jsx
 *  const { inputProps, monthpickerProps } = useMonthpicker({
 *    onMonthChange: console.log,
 *  });
 *
 *  return (
 *     <MonthPicker {...monthpickerProps} dropdownCaption>
 *       <MonthPicker.Input
 *         {...inputProps}
 *         label="Velg måned"
 *       />
 *     </MonthPicker>
 *  );
 * ```
 */
export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
  (
    {
      children,
      dropdownCaption = false,
      fromDate,
      toDate,
      disabled = [],
      selected,
      open: _open,
      id,
      onClose,
      onOpenToggle,
      locale,
      translations,
      onMonthSelect,
      className,
      wrapperClassName,
      defaultSelected,
      year,
      onYearChange,
      strategy = "absolute",
    },
    ref,
  ) => {
    const translate = useI18n(
      "DatePicker",
      translations,
      getTranslations(locale),
    );
    const { cn } = useRenameCSS();
    const langProviderLocale = useDateLocale();
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    /* We use state here to insure that anchor is defined if open is true on initial render */
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(setWrapperRef, ref);

    const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(
      defaultSelected,
    );

    const handleSelect = (month?: Date) => {
      !onMonthSelect && setSelectedMonth(month);
      onMonthSelect?.(month);
      month && (onClose?.() ?? setOpen(false));
    };

    if (dropdownCaption && (!fromDate || !toDate)) {
      console.warn("Using dropdownCaption required fromDate and toDate");
      return null;
    }

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
            className={cn("navds-date__wrapper", wrapperClassName)}
          >
            {children}
            <DateWrapper
              open={_open ?? open}
              anchor={wrapperRef}
              onClose={() => onClose?.() ?? setOpen(false)}
              locale={locale}
              translate={translate}
              variant="month"
              popoverProps={{
                id: ariaId,
                strategy,
              }}
            >
              <DayPickerProvider
                initialProps={{
                  locale: locale
                    ? getLocaleFromString(locale)
                    : langProviderLocale,
                  selected: selected ?? selectedMonth,
                  toDate,
                  fromDate,
                  month: selected ?? selectedMonth,
                }}
              >
                <div className={cn("rdp-month", className)}>
                  <SharedMonthProvider
                    dropdownCaption={dropdownCaption}
                    disabled={disabled}
                    selected={selected ?? selectedMonth}
                    onSelect={handleSelect}
                    year={year}
                    onYearChange={onYearChange}
                  >
                    <MonthCaption />
                    <MonthSelector />
                  </SharedMonthProvider>
                </div>
              </DayPickerProvider>
            </DateWrapper>
          </div>
        </DateInputContext.Provider>
      </DateTranslationContextProvider>
    );
  },
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

export default MonthPicker;

import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { useControllableState, useId } from "../../util/hooks";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import { DateInputContext, DateTranslationContextProvider } from "../context";
import { MonthPickerInput } from "../parts/DateInput";
import { DateWrapper } from "../parts/DateWrapper";
import { getLocaleFromString, getTranslations } from "../utils";
import MonthCaption from "./MonthCaption";
import { MonthPickerProvider } from "./MonthPickerProvider";
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
    const langProviderLocale = useDateLocale();
    const ariaId = useId(id);

    const [open, setOpen] = useControllableState({
      defaultValue: false,
      value: _open,
      onChange: () => {
        onOpenToggle?.();
      },
    });

    /* We use state here to insure that anchor is defined if open is true on initial render */
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(setWrapperRef, ref);

    const handleSelect = (month?: Date) => {
      onMonthSelect?.(month);

      if (month) {
        onClose?.();
        setOpen(false);
      }
    };

    if (dropdownCaption && (!fromDate || !toDate)) {
      console.warn("Using dropdownCaption required fromDate and toDate");
      return null;
    }

    return (
      <DateTranslationContextProvider translate={translate}>
        <DateInputContext.Provider
          value={{
            open,
            onOpen: () => setOpen((x) => !x),
            ariaId,
            defined: true,
          }}
        >
          <MonthPickerProvider
            dropdownCaption={dropdownCaption}
            defaultSelected={defaultSelected}
            selected={selected}
            disabled={disabled}
            fromDate={fromDate}
            toDate={toDate}
            year={year}
            onYearChange={onYearChange}
            onMonthSelect={handleSelect}
            locale={locale ? getLocaleFromString(locale) : langProviderLocale}
          >
            <div
              ref={mergedRef}
              className={cl("navds-date__wrapper", wrapperClassName)}
            >
              {children}
              <DateWrapper
                open={open}
                anchor={wrapperRef}
                onClose={() => {
                  onClose?.();
                  setOpen(false);
                }}
                locale={locale}
                translate={translate}
                variant="month"
                popoverProps={{
                  id: ariaId,
                  strategy,
                }}
              >
                <div className={cl("rdp-month", className)}>
                  <MonthCaption />
                  <MonthSelector />
                </div>
              </DateWrapper>
            </div>
          </MonthPickerProvider>
        </DateInputContext.Provider>
      </DateTranslationContextProvider>
    );
  },
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

export default MonthPicker;

import React, { forwardRef, useState } from "react";
import { useId } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { useControllableState, useMergeRefs } from "../../utils/hooks";
import { useDateLocale, useI18n } from "../../utils/i18n/i18n.hooks";
import { DateDialog } from "../Date.Dialog";
import {
  DateInputContextProvider,
  DateInputProps,
  MonthPickerInput,
} from "../Date.Input";
import {
  DateTranslationContextProvider,
  getLocaleFromString,
  getTranslations,
} from "../Date.locale";
import { MonthPickerProvider } from "./MonthPicker.context";
import { MonthPickerProps } from "./MonthPicker.types";
import { MonthPickerCaption } from "./parts/MonthPicker.Caption";
import {
  MonthPickerStandalone,
  MonthPickerStandaloneProps,
} from "./parts/MonthPicker.Standalone";
import { MonthPickerTable } from "./parts/MonthPicker.Table";

interface MonthPickerComponent extends React.ForwardRefExoticComponent<MonthPickerProps> {
  /**
   * @see 🏷️ {@link MonthPickerStandaloneProps}
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
        <DateInputContextProvider
          open={open}
          onOpen={() => setOpen((x) => !x)}
          ariaId={ariaId}
          defined={true}
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
              className={cl("aksel-date__wrapper", wrapperClassName)}
            >
              {children}
              <DateDialog
                open={open}
                anchor={wrapperRef}
                onClose={() => {
                  onClose?.();
                  open && setOpen(false);
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
                  <MonthPickerCaption />
                  <MonthPickerTable />
                </div>
              </DateDialog>
            </div>
          </MonthPickerProvider>
        </DateInputContextProvider>
      </DateTranslationContextProvider>
    );
  },
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

export default MonthPicker;
export { MonthPickerStandalone, MonthPickerInput };
export type { MonthPickerProps, MonthPickerStandaloneProps, DateInputProps };

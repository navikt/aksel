import React, { forwardRef, useState } from "react";
import { useId } from "../../utils-external";
import { DateDialog } from "../../utils/date/Date.Dialog";
import {
  DateInputContextProvider,
  type DateInputProps,
  MonthPickerInput,
} from "../../utils/date/Date.Input";
import {
  DateTranslationContextProvider,
  getLocaleFromString,
  getTranslations,
} from "../../utils/date/Date.locale";
import { cl } from "../../utils/helpers";
import { consoleWarning } from "../../utils/helpers/consoleWarning";
import { useControllableState, useMergeRefs } from "../../utils/hooks";
import { useDateLocale, useI18n } from "../../utils/i18n/i18n.hooks";
import type { MonthPickerProps } from "../MonthPicker.types";
import { MonthPickerCaption } from "../caption/MonthPickerCaptionInternal";
import {
  MonthPickerStandalone,
  type MonthPickerStandaloneProps,
} from "../standalone/MonthPickerStandalone";
import { MonthPickerTable } from "../table/MonthPickerTableInternal";
import { MonthPickerProvider } from "./MonthPicker.context";

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
const MonthPickerRoot = forwardRef<HTMLDivElement, MonthPickerProps>(
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
    const popupLabelId = useId();

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
      consoleWarning(
        "MonthPicker: Using dropdownCaption requires `fromDate` and `toDate` props to be defined.",
      );
      return null;
    }

    return (
      <DateTranslationContextProvider translate={translate}>
        <DateInputContextProvider
          open={open}
          onOpen={() => setOpen((x) => !x)}
          ariaId={ariaId}
          defined={true}
          caller={null}
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
                popupLabelId={popupLabelId}
              >
                <div className={cl("rdp-month", className)}>
                  <MonthPickerCaption popupLabelId={popupLabelId} />
                  <MonthPickerTable />
                </div>
              </DateDialog>
            </div>
          </MonthPickerProvider>
        </DateInputContextProvider>
      </DateTranslationContextProvider>
    );
  },
);

const MonthPicker = Object.assign(MonthPickerRoot, {
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
  Standalone: MonthPickerStandalone,
  /**
   * @see 🏷️ {@link DateInputProps}
   */
  Input: MonthPickerInput,
});

export { MonthPicker };
export { MonthPickerStandalone, MonthPickerInput };
export type { MonthPickerProps, MonthPickerStandaloneProps, DateInputProps };

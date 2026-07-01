import React, { forwardRef } from "react";
import { cl } from "../../../utils/helpers";
import { consoleWarning } from "../../../utils/helpers/consoleWarning";
import { useDateLocale, useI18n } from "../../../utils/i18n/i18n.hooks";
import {
  DateTranslationContextProvider,
  getLocaleFromString,
  getTranslations,
} from "../../Date.locale";
import { MonthPickerProvider } from "../MonthPicker.context";
import type { MonthPickerProps } from "../MonthPicker.types";
import { MonthPickerCaption } from "./MonthPicker.Caption";
import { MonthPickerTable } from "./MonthPicker.Table";

export interface MonthPickerStandaloneProps extends Omit<
  MonthPickerProps,
  "open" | "onClose" | "onOpenToggle" | "wrapperClassName" | "strategy"
> {
  /**
   * MonthPicker class name
   */
  className?: string;
}

export type MonthPickerStandaloneType = React.ForwardRefExoticComponent<
  MonthPickerStandaloneProps & React.RefAttributes<HTMLDivElement>
>;

export const MonthPickerStandalone = forwardRef<
  HTMLDivElement,
  MonthPickerStandaloneProps
>(
  (
    {
      dropdownCaption = false,
      fromDate,
      toDate,
      disabled = [],
      selected,
      className,
      locale,
      translations,
      onMonthSelect,
      defaultSelected,
      year,
      onYearChange,
    },
    ref,
  ) => {
    const translate = useI18n(
      "DatePicker",
      translations,
      getTranslations(locale),
    );
    const langProviderLocale = useDateLocale();

    if (dropdownCaption && (!fromDate || !toDate)) {
      consoleWarning(
        "MonthPicker.Standalone: Using dropdownCaption requires `fromDate` and `toDate` props to be defined.",
      );
      return null;
    }

    return (
      <div ref={ref} className={cl("aksel-date__wrapper", className)}>
        <DateTranslationContextProvider translate={translate}>
          <MonthPickerProvider
            dropdownCaption={dropdownCaption}
            defaultSelected={defaultSelected}
            selected={selected}
            disabled={disabled}
            fromDate={fromDate}
            toDate={toDate}
            year={year}
            onYearChange={onYearChange}
            onMonthSelect={onMonthSelect}
            locale={locale ? getLocaleFromString(locale) : langProviderLocale}
          >
            <div className="aksel-date rdp-month">
              <MonthPickerCaption />
              <MonthPickerTable />
            </div>
          </MonthPickerProvider>
        </DateTranslationContextProvider>
      </div>
    );
  },
);

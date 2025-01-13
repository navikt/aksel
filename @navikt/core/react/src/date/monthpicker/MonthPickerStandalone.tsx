import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { DayPickerProvider } from "react-day-picker";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import {
  DateTranslationContextProvider,
  SharedMonthProvider,
} from "../context";
import { getLocaleFromString, getTranslations } from "../utils";
import MonthCaption from "./MonthCaption";
import MonthSelector from "./MonthSelector";
import { MonthPickerProps } from "./types";

export interface MonthPickerStandaloneProps
  extends Omit<
    MonthPickerProps,
    "open" | "onClose" | "onOpenToggle" | "wrapperClassName" | "strategy"
  > {
  /**
   * Monthpicker classname
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
    const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(
      defaultSelected,
    );

    const handleSelect = (month?: Date) => {
      setSelectedMonth(month);
      onMonthSelect?.(month);
    };

    if (dropdownCaption && (!fromDate || !toDate)) {
      console.warn("Using dropdownCaption required fromDate and toDate");
      return null;
    }

    return (
      <div ref={ref} className={cl("navds-date__wrapper", className)}>
        <DateTranslationContextProvider translate={translate}>
          <DayPickerProvider
            initialProps={{
              locale: locale ? getLocaleFromString(locale) : langProviderLocale,
              selected: selected ?? selectedMonth,
              toDate,
              fromDate,
              month: selected ?? selectedMonth,
            }}
          >
            <div className="navds-date rdp-month">
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
        </DateTranslationContextProvider>
      </div>
    );
  },
);

export default MonthPickerStandalone;

import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { RootProvider } from "react-day-picker";
import { SharedMonthProvider } from "../context";
import { getLocaleFromString } from "../utils";
import MonthCaption from "./MonthCaption";
import { MonthPickerProps } from "./MonthPicker";
import MonthSelector from "./MonthSelector";

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
      locale = "nb",
      onMonthSelect,
      defaultSelected,
      year,
      onYearChange,
    },
    ref
  ) => {
    const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(
      defaultSelected
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
        <RootProvider
          locale={getLocaleFromString(locale)}
          selected={selected ?? selectedMonth}
          toDate={toDate}
          fromDate={fromDate}
          month={selected ?? selectedMonth}
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
        </RootProvider>
      </div>
    );
  }
);

export default MonthPickerStandalone;

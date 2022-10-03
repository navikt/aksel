import cl from "clsx";
import React, { forwardRef } from "react";
import { RootProvider } from "react-day-picker";
import { SharedMonthProvider } from "../hooks/useSharedMonthContext";
import { getLocaleFromString } from "../utils";
import MonthCaption from "./MonthCaption";
import { MonthPickerDefaultProps } from "./MonthPicker";
import MonthSelector from "./MonthSelector";

interface MonthPickerStandaloneDefaultProps extends MonthPickerDefaultProps {
  /**
   * Wrapper className
   */
  className?: string;
}

export type MonthPickerStandaloneType = React.ForwardRefExoticComponent<
  MonthPickerStandaloneDefaultProps & React.RefAttributes<HTMLDivElement>
>;

export const MonthPicker = forwardRef<
  HTMLDivElement,
  MonthPickerStandaloneDefaultProps
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
    },
    ref
  ) => {
    if (dropdownCaption && (!fromDate || !toDate)) {
      console.warn("Using dropdownCaption required fromDate and toDate");
      return null;
    }

    return (
      <div ref={ref} className={cl("navds-date__wrapper", className)}>
        <RootProvider
          locale={getLocaleFromString(locale)}
          selected={selected}
          toDate={toDate}
          fromDate={fromDate}
        >
          <div className="navds-date rdp-month">
            <SharedMonthProvider
              dropdownCaption={dropdownCaption}
              disabled={disabled}
              selected={selected}
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

export default MonthPicker;

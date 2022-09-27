import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { RootProvider } from "react-day-picker";
import { getDefaultSelected, getLocaleFromString } from "../utils";
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
      fromDate = new Date(),
      toDate,
      disabled = [],
      selected,
      className,
      locale = "nb",
    },
    ref
  ) => {
    const [selectedMonth, setSelectedMonth] = React.useState<Date>(
      getDefaultSelected(disabled, dropdownCaption, fromDate, selected, toDate)
    );
    const [yearState, setYearState] = useState<Date>(selectedMonth);

    if (dropdownCaption && (!fromDate || !toDate)) {
      return null;
    }

    const isValidDropdownCaption =
      dropdownCaption && fromDate && toDate ? true : false;

    return (
      <div ref={ref} className={cl("navds-date__wrapper", className)}>
        <RootProvider
          locale={getLocaleFromString(locale)}
          selected={selected}
          className="navds-monthpicker-month"
          toDate={toDate}
          fromDate={fromDate}
        >
          <div className="navds-date navds-monthpicker__wrapper">
            <MonthCaption
              selected={selectedMonth}
              onSelect={setSelectedMonth}
              dropdownCaption={dropdownCaption}
              isValidDropdownCaption={isValidDropdownCaption}
              yearState={yearState}
              setYearState={setYearState}
            />
            <MonthSelector
              dropdownCaption={dropdownCaption}
              onSelect={setSelectedMonth}
              selected={selectedMonth}
              disabled={disabled}
              yearState={yearState}
              setYearState={setYearState}
            />
          </div>
        </RootProvider>
      </div>
    );
  }
);

export default MonthPicker;

import cl from "clsx";
import isWeekend from "date-fns/isWeekend";
import React, { forwardRef } from "react";
import {
  DateRange,
  DayPicker,
  isMatch,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";
import { omit } from "../..";
import { getLocaleFromString, labels } from "../utils";
import { Caption, DropdownCaption } from "./caption";
import { ConditionalModeProps, DatePickerDefaultProps } from "./DatePicker";
import { Head } from "./Head";

interface DatePickerStandaloneDefaultProps
  extends Omit<
    DatePickerDefaultProps,
    "open" | "onClose" | "onOpenToggle" | "wrapperClassName"
  > {
  /**
   * Datepicker classname
   */
  className?: string;
}

export type DatePickerStandaloneProps = DatePickerStandaloneDefaultProps &
  ConditionalModeProps;

export type DatePickerStandaloneType = React.ForwardRefExoticComponent<
  DatePickerStandaloneProps & React.RefAttributes<HTMLDivElement>
>;

export const DatePickerStandalone: DatePickerStandaloneType = forwardRef<
  HTMLDivElement,
  DatePickerStandaloneProps
>(
  (
    {
      children,
      className,
      locale = "nb",
      dropdownCaption,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      selected,
      id,
      defaultSelected,
      onSelect,
      ...rest
    },
    ref
  ) => {
    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const handleSingleSelect: SelectSingleEventHandler = (selectedDay) => {
      setSelectedDates(selectedDay);
      onSelect && (onSelect as (val?: Date) => void)(selectedDay);
    };

    const handleMultipleSelect: SelectMultipleEventHandler = (selectedDays) => {
      setSelectedDates(selectedDays);
      onSelect && (onSelect as (val?: Date[]) => void)(selectedDays);
    };

    const handleRangeSelect: SelectRangeEventHandler = (selectedDays) => {
      setSelectedDates(selectedDays);
      onSelect && (onSelect as (val?: DateRange) => void)(selectedDays);
    };

    const overrideProps = {
      mode: rest.mode ?? ("single" as any),
      onSelect:
        rest?.mode === "single"
          ? handleSingleSelect
          : rest?.mode === "multiple"
          ? handleMultipleSelect
          : handleRangeSelect,
    };

    return (
      <div
        ref={ref}
        className={cl("navds-date__standalone-wrapper", className)}
      >
        <DayPicker
          locale={getLocaleFromString(locale)}
          {...overrideProps}
          selected={selected ?? selectedDates}
          components={{
            Caption: dropdownCaption ? DropdownCaption : Caption,
            Head: Head,
          }}
          className="navds-date"
          classNames={{ vhidden: "navds-sr-only" }}
          disabled={(day) => {
            return (
              (disableWeekends && isWeekend(day)) || isMatch(day, disabled)
            );
          }}
          weekStartsOn={1}
          initialFocus={false}
          labels={labels as any}
          modifiers={{
            weekend: (day) => disableWeekends && isWeekend(day),
          }}
          modifiersClassNames={{
            weekend: "rdp-day__weekend",
          }}
          showWeekNumber={showWeekNumber}
          fixedWeeks
          showOutsideDays
          {...omit(rest, ["onSelect"])}
        />
      </div>
    );
  }
);

export default DatePickerStandalone;

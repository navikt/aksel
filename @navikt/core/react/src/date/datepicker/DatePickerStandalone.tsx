import cl from "clsx";
import isWeekend from "date-fns/isWeekend";
import React, { forwardRef } from "react";
import { DateRange, DayPicker, isMatch } from "react-day-picker";
import { omit } from "../..";
import { getLocaleFromString, labels } from "../utils";
import {
  DatePickerDefaultProps,
  MultipleMode,
  RangeMode,
  SingleMode,
} from "./DatePicker";
import TableHead from "./parts/TableHead";
import WeekNumber from "./parts/WeekNumber";
import Caption from "./parts/Caption";
import DropdownCaption from "./parts/DropdownCaption";
import Row from "./parts/Row";
import { HeadRow } from "./parts/HeadRow";
import DayButton from "./parts/DayButton";

interface DatePickerStandaloneDefaultProps
  extends Omit<
    DatePickerDefaultProps,
    "open" | "onClose" | "onOpenToggle" | "wrapperClassName" | "strategy"
  > {
  /**
   * Datepicker classname
   */
  className?: string;
  /**
   * If datepicker should be fixed to 6 weeks, regardless of actual weeks in month
   * @default true
   */
  fixedWeeks?: boolean;
}

type StandaloneConditionalModeProps = SingleMode | MultipleMode | RangeMode;

export type DatePickerStandaloneProps = DatePickerStandaloneDefaultProps &
  StandaloneConditionalModeProps;

export type DatePickerStandaloneType = React.ForwardRefExoticComponent<
  DatePickerStandaloneProps & React.RefAttributes<HTMLDivElement>
>;

export const DatePickerStandalone: DatePickerStandaloneType = forwardRef<
  HTMLDivElement,
  DatePickerStandaloneProps
>(
  (
    {
      className,
      locale = "nb",
      dropdownCaption,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      selected,
      defaultSelected,
      onSelect,
      fixedWeeks = false,
      onWeekNumberClick,
      ...rest
    },
    ref
  ) => {
    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const mode = rest.mode ?? ("single" as any);

    /**
     * @param selected Date | Date[] | DateRange | undefined
     */
    const handleSelect = (selected) => {
      setSelectedDates(selected);
      onSelect?.(selected);
    };

    return (
      <div
        ref={ref}
        className={cl("navds-date__standalone-wrapper", className)}
      >
        <DayPicker
          locale={getLocaleFromString(locale)}
          mode={mode}
          onSelect={handleSelect}
          selected={selected ?? selectedDates}
          components={{
            Caption: dropdownCaption ? DropdownCaption : Caption,
            Head: TableHead,
            HeadRow,
            WeekNumber,
            Row,
            Day: DayButton,
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
          onWeekNumberClick={
            mode === "multiple" ? onWeekNumberClick : undefined
          }
          fixedWeeks={fixedWeeks}
          showOutsideDays
          {...omit(rest, ["children", "id"])}
        />
      </div>
    );
  }
);

export default DatePickerStandalone;

import cl from "clsx";
import { isWeekend } from "date-fns";
import React, { forwardRef, useRef, useState } from "react";
import {
  DateRange,
  DayPicker,
  DayPickerBase,
  isMatch,
  Matcher,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";
import { omit, Popover, useId } from "../..";
import { DateInputType, DatePickerInput } from "../DateInput";
import { DateContext } from "../hooks";
import { getLocaleFromString, labels } from "../utils";
import { Caption, DropdownCaption } from "./caption";
import DatePickerStandalone, {
  DatePickerStandaloneType,
} from "./DatePickerStandalone";
import { DayButton } from "./DayButton";

export type ConditionalModeProps =
  | {
      mode?: "single";
      onSelect?: (val?: Date) => void;
      selected?: Date;
      defaultSelected?: Date;
    }
  | {
      mode?: "multiple";
      onSelect?: (val?: Date[]) => void;
      selected?: Date[];
      defaultSelected?: Date[];
      min?: number;
      max?: number;
    }
  | {
      mode?: "range";
      onSelect?: (val?: DateRange) => void;
      selected?: DateRange;
      defaultSelected?: DateRange;
      min?: number;
      max?: number;
    };

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerDefaultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    Pick<DayPickerBase, "month" | "onMonthChange" | "today" | "onDayClick"> {
  /**
   * Element datepicker anchors to. Use <DatePicker.Input /> for built-in toggle, or make your own with the open/onClose props
   */
  children?: React.ReactNode;
  /**
   * Classname for datepicker in popover
   */
  className?: string;
  /**
   * Classname for wrapper
   */
  wrapperClassName?: string;
  /**
   * Changes datepicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * The earliest day to start navigation.
   */
  fromDate?: Date;
  /**
   * The latests day to end navigation.
   */
  toDate?: Date;
  /**
   * Display dropdown for choosing the month and the year. Needs `fromDate` + `toDate` to work.
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching days.
   * https://react-day-picker.js.org/api/types/Matcher
   */
  disabled?: Matcher[];
  /**
   * Disable saturday and sunday.
   * @default false
   */
  disableWeekends?: boolean;
  /**
   * Shows week numbers in left-column. Use with caution, takes up valuable screenspace for small screens.
   * @default false
   */
  showWeekNumber?: boolean;
  /**
   * Open state for user-controlled state. Component controlled by default
   */
  open?: boolean;
  /**
   * onClose callback for user-controlled state
   */
  onClose?: () => void;
  /**
   * onOpenToggle callback for user-controlled state. Only called if `<DatePicker.Input />` is used
   */
  onOpenToggle?: () => void;
}

export type DatePickerProps = DatePickerDefaultProps & ConditionalModeProps;

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Standalone: DatePickerStandaloneType;
  Input: DateInputType;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      children,
      locale = "nb",
      dropdownCaption,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      selected,
      id,
      defaultSelected,
      className,
      wrapperClassName,
      open: _open,
      onClose,
      onOpenToggle,
      ...rest
    },
    ref
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const handleSingleSelect: SelectSingleEventHandler = (selectedDay) => {
      setSelectedDates(selectedDay);
      selectedDay && (onClose?.() ?? setOpen(false));
      rest?.onSelect && (rest?.onSelect as (val?: Date) => void)(selectedDay);
    };

    const handleMultipleSelect: SelectMultipleEventHandler = (selectedDays) => {
      setSelectedDates(selectedDays);
      rest?.onSelect &&
        (rest?.onSelect as (val?: Date[]) => void)(selectedDays);
    };

    const handleRangeSelect: SelectRangeEventHandler = (selectedDays) => {
      setSelectedDates(selectedDays);
      selectedDays?.from && selectedDays?.to && (onClose?.() ?? setOpen(false));
      rest?.onSelect &&
        (rest?.onSelect as (val?: DateRange) => void)(selectedDays);
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
      <DateContext.Provider
        value={{
          open: _open ?? open,
          onOpen: () => {
            setOpen((x) => !x);
            onOpenToggle?.();
          },
          ariaId,
        }}
      >
        <div
          ref={wrapperRef}
          className={cl("navds-date__wrapper", wrapperClassName)}
        >
          {children}
          {(_open ?? open) && (
            <Popover
              arrow={false}
              anchorEl={wrapperRef.current}
              open={_open ?? open}
              onClose={() => {
                onClose?.() ?? setOpen(false);
              }}
              placement="bottom-start"
              id={ariaId}
              role="dialog"
              ref={ref}
            >
              <DayPicker
                locale={getLocaleFromString(locale)}
                {...overrideProps}
                selected={selected ?? selectedDates}
                components={{
                  Caption: dropdownCaption ? DropdownCaption : Caption,
                  Day: DayButton,
                }}
                className={cl("navds-date", className)}
                classNames={{
                  vhidden: "navds-sr-only",
                }}
                disabled={(day) => {
                  return (
                    (disableWeekends && isWeekend(day)) ||
                    isMatch(day, disabled)
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
                {...omit(rest, ["onSelect"])}
              />
            </Popover>
          )}
        </div>
      </DateContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Standalone = DatePickerStandalone;
DatePicker.Input = DatePickerInput;

export default DatePicker;

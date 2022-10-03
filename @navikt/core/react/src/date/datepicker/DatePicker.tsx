import { FloatingPortal } from "@floating-ui/react-dom-interactions";
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
import { Popover, useId } from "../..";
import { omit } from "../../util";
import { DateInputType, DatePickerInput } from "../DateInput";
import { DateContext } from "../hooks/useDateInputContext";
import { getLocaleFromString, labels } from "../utils";
import { Caption, DropdownCaption } from "./caption";
import DatePickerStandalone, {
  DatePickerStandaloneType,
} from "./DatePickerStandalone";

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

// TODO: Hva skjer hvis et helt år/månede er disabled og man har dropdown?

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerDefaultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    Pick<DayPickerBase, "month" | "onMonthChange" | "today" | "onDayClick"> {
  /**
   * Element datepicker anchors to. Use <DatePicker.Input /> for built-in toggle,
   * or make your own with the open/onClose props
   */
  children?: React.ReactNode;
  /**
   * Changes datepicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * The earliest Date available for the user to pick from
   */
  fromDate?: Date;
  /**
   * The latest Date available for the user to pick from
   */
  toDate?: Date;
  /**
   * Adds a `Select` for picking Year and Month
   * Needs `fromDate` + `toDate` to be shown!
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching days.
   * {@link https://react-day-picker.js.org/api/types/Matcher | Matcher type-definition}
   */
  disabled?: Matcher[];
  /**
   * Disable saturday and sunday.
   * @default false
   */
  disableWeekends?: boolean;
  /**
   * Shows week numbers in left-column
   * Use with caution, takes up valuable screenspace in small screens!
   * @default false
   */
  showWeekNumber?: boolean;
  /**
   * Open state for user-controlled state
   * @remark Controlled by component by default
   */
  open?: boolean;
  /**
   * onClose callback for user-controlled state
   */
  onClose?: () => void;
  /**
   * onOpenToggle callback for user-controlled-state
   * @remark only called if `<DatePicker.Input />` is used
   */
  onOpenToggle?: () => void;
  /**
   * Classname
   */
  className?: string;
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
      mode = "single",
      selected,
      id,
      defaultSelected,
      className,
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
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const handleSingleSelect: SelectSingleEventHandler = (selectedDay) => {
      setSelectedDates(selectedDay);
      selectedDay && (onClose?.() ?? setOpen(false));
      selectedDay && buttonRef && buttonRef?.current?.focus();
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
      selectedDays?.from &&
        selectedDays?.to &&
        buttonRef &&
        buttonRef?.current?.focus();
      rest?.onSelect &&
        (rest?.onSelect as (val?: DateRange) => void)(selectedDays);
    };

    const overrideProps = {
      onSelect:
        mode === "single"
          ? handleSingleSelect
          : mode === "multiple"
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
          buttonRef,
          ariaId,
        }}
      >
        <div ref={wrapperRef} className={cl("navds-date__wrapper", className)}>
          {children}
          <FloatingPortal>
            {(_open ?? open) && (
              <Popover
                arrow={false}
                anchorEl={wrapperRef.current}
                open={_open ?? open}
                onClose={() => onClose?.() ?? setOpen(false)}
                placement="bottom-start"
                id={ariaId}
                aria-roledescription={
                  locale === "en" ? "datepicker" : "datovelger"
                }
                role="dialog"
                ref={ref}
              >
                <DayPicker
                  locale={getLocaleFromString(locale)}
                  mode={mode}
                  {...overrideProps}
                  selected={selected ?? selectedDates}
                  components={{
                    Caption: dropdownCaption ? DropdownCaption : Caption,
                  }}
                  className="navds-date"
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
          </FloatingPortal>
        </div>
      </DateContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Standalone = DatePickerStandalone;
DatePicker.Input = DatePickerInput;

export default DatePicker;

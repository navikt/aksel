import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { isWeekend } from "date-fns";
import React, {
  createContext,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DateRange,
  DayPicker,
  DayPickerBase,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";
import { mergeRefs, Popover, useId } from "..";
import { omit } from "../util";
import Caption from "./caption/Caption";
import DropdownCaption from "./caption/DropdownCaption";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";
import { disableDate } from "./utils/dates-disabled";
import { labels } from "./utils/labels";
import { getLocaleFromString } from "./utils/util";

type ConditionalModeProps =
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
    }
  | {
      mode?: "range";
      onSelect?: (val?: DateRange) => void;
      selected?: DateRange;
      defaultSelected?: DateRange;
    };

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerDefaultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    Pick<DayPickerBase, "month" | "onMonthChange" | "today" | "onDayClick"> {
  /**
   * Wraps datepicker anchor around children if usePopover: true
   */
  children?: React.ReactNode;
  /**
   * Changes datepicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * The earliest day to start the month navigation.
   */
  fromDate?: Date;
  /**
   * The latest day to end the month navigation.
   */
  toDate?: Date;
  /**
   * @default false
   */
  yearSelector?: boolean;
  /**
   * Apply the disabled modifier to the matching days.
   */
  disabled?: Array<Date | DateRange>;
  /**
   * Sets focus on selected date or todays date if not selected.
   * @warning If selected/todays date is disabled, this will focus first visible day.
   * @default true
   */
  focusOnOpen?: boolean;
  /**
   * Disable saturday and sunday.
   * @default false
   */
  disableWeekends?: boolean;
  /**
   * Shows week numbers on left-column
   * @default false
   */
  showWeekNumber?: boolean;
  /**
   *
   */
  popoverOptions?: {
    /**
     * @default true
     */
    usePopover: boolean;
  };
}

export type DatePickerProps = DatePickerDefaultProps & ConditionalModeProps;

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Input: DatePickerInputType;
}

interface DatePickerContextProps {
  open: boolean;
  onOpen: () => void;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null> | null;
  ariaId?: string;
}

export const DatePickerContext = createContext<DatePickerContextProps>({
  open: false,
  onOpen: () => null,
  buttonRef: null,
  ariaId: undefined,
});

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      children,
      locale = "nb",
      yearSelector,
      focusOnOpen = true,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      mode = "single",
      selected,
      id,
      popoverOptions,
      defaultSelected,
      ...rest
    },
    ref
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const handleSingleSelect: SelectSingleEventHandler = (selectedDay) => {
      setSelectedDates(selectedDay);
      selectedDay && setOpen(false);
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
      selectedDays?.from && selectedDays?.to && setOpen(false);
      selectedDays?.from &&
        selectedDays?.to &&
        buttonRef &&
        buttonRef?.current?.focus();
      rest?.onSelect &&
        (rest?.onSelect as (val?: DateRange) => void)(selectedDays);
    };

    const usePopover = !(
      typeof popoverOptions?.usePopover === "boolean" &&
      popoverOptions?.usePopover === false
    );

    const overrideProps = {
      onSelect:
        mode === "single"
          ? handleSingleSelect
          : mode === "multiple"
          ? handleMultipleSelect
          : handleRangeSelect,
    };

    return (
      <DatePickerContext.Provider
        value={{ open, onOpen: () => setOpen((x) => !x), buttonRef, ariaId }}
      >
        {!usePopover ? (
          <div ref={mergedRef} className="navds-date__wrapper">
            <DayPicker
              locale={getLocaleFromString(locale)}
              mode={mode}
              {...overrideProps}
              selected={selected ?? selectedDates}
              components={{
                Caption: yearSelector ? DropdownCaption : Caption,
              }}
              className="navds-date__calendar"
              toYear={2022}
              fromDate={new Date("Aug 23 2019")}
              classNames={{ vhidden: "navds-sr-only" }}
              disabled={(day) => {
                return (
                  (disableWeekends && isWeekend(day)) ||
                  disableDate(disabled, day)
                );
              }}
              weekStartsOn={1}
              initialFocus={usePopover ? focusOnOpen : false}
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
          </div>
        ) : (
          <div ref={mergedRef} className="navds-date__wrapper">
            {children}
            <FloatingPortal>
              {open && (
                <Popover
                  arrow={false}
                  anchorEl={wrapperRef.current}
                  open={open}
                  onClose={() => setOpen(false)}
                  placement="bottom-start"
                  id={ariaId}
                  aria-roledescription={
                    locale === "en" ? "datepicker" : "datovelger"
                  }
                  role="dialog"
                >
                  <DayPicker
                    locale={getLocaleFromString(locale)}
                    mode={mode}
                    {...overrideProps}
                    selected={selected ?? selectedDates}
                    components={{
                      Caption: yearSelector ? DropdownCaption : Caption,
                    }}
                    className="navds-date__calendar"
                    toYear={2022}
                    fromDate={new Date("Aug 23 2019")}
                    classNames={{ vhidden: "navds-sr-only" }}
                    disabled={(day) => {
                      return (
                        (disableWeekends && isWeekend(day)) ||
                        disableDate(disabled, day)
                      );
                    }}
                    weekStartsOn={1}
                    initialFocus={usePopover ? focusOnOpen : false}
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
        )}
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;

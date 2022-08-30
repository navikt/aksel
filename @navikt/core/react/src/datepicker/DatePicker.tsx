import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { isWeekend } from "date-fns";
import React, {
  createContext,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker, DateRange, DayPickerBase } from "react-day-picker";
import { mergeRefs, Popover } from "..";
import Caption from "./caption/Caption";
import DropdownCaption from "./caption/DropdownCaption";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";
import { getLocaleFromString } from "./utils/util";
import { labels } from "./utils/labels";
import { disableDate } from "./utils/dates-disabled";
import {
  getNorwegianHolidays,
  isNorwegianPublicHoliday,
} from "./utils/holidays";

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<
      DayPickerBase,
      "month" | "onMonthChange" | "today" | "selected" | "onDayClick"
    > {
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
   * The today’s date. Default is the current date. This Date will get the
   * `today` modifier to style the day.
   */
  today?: Date;
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
   * Three selection modes to display days as selected.
   * @default "single"
   */
  mode?: "single" | "multiple" | "range";
  /**
   * Shows week numbers on left-column
   * @default false
   */
  showWeekNumber?: boolean;
  /**
   * Disable saturday and sunday.
   * @default false
   */
  disablePublicHolidays?: boolean;
}

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Input: DatePickerInputType;
}

interface DatePickerContextProps {
  open: boolean;
  onOpen: () => void;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null> | null;
}

export const DatePickerContext = createContext<DatePickerContextProps>({
  open: false,
  onOpen: () => null,
  buttonRef: null,
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
      disablePublicHolidays = false,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const initialDate =
      disableDate(disabled, new Date()) ||
      (disableWeekends && isWeekend(new Date()))
        ? undefined
        : new Date();

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

    const [selected, setSelected] = React.useState<Date | undefined>(
      initialDate
    );

    /* TMP for dev */
    useEffect(() => {
      setOpen(true);
    }, []);

    /* TMP for dev */
    /* const disabledDays = [
        new Date("Aug 28 2022"),
        new Date("Aug 30 2022"),
        new Date("Aug 31 2022"),
      { from: new Date("Sept 05 2022"), to: new Date("Sept 09 2022") },
    ]; */

    const handleSelect = (selectedDate?: Date) => {
      setSelected(selectedDate);
      selectedDate && setOpen(false);
      buttonRef && buttonRef?.current?.focus();
    };

    return (
      <DatePickerContext.Provider
        value={{ open, onOpen: () => setOpen((x) => !x), buttonRef }}
      >
        <div ref={mergedRef} className="navds-date__wrapper">
          {children}
        </div>
        <FloatingPortal>
          {open && (
            <Popover
              arrow={false}
              anchorEl={wrapperRef.current}
              open={open}
              onClose={() => setOpen(false)}
              placement="bottom-start"
            >
              <DayPicker
                locale={getLocaleFromString(locale)}
                mode={mode}
                selected={selected}
                onSelect={handleSelect}
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
                initialFocus={focusOnOpen}
                labels={labels as any}
                modifiers={{
                  weekend: (day) => disableWeekends && isWeekend(day),
                  publicHoliday: (day) =>
                    disablePublicHolidays && !!isNorwegianPublicHoliday(day),
                }}
                modifiersClassNames={{
                  weekend: "rdp-day__weekend",
                  publicHoliday: "rdp-day__holiday",
                }}
                showWeekNumber={showWeekNumber}
                {...rest}
              />
            </Popover>
          )}
        </FloatingPortal>
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;

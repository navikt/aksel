import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { isWeekend } from "date-fns";
import React, {
  createContext,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import { DateRange, DayPicker, DayPickerBase } from "react-day-picker";
import { mergeRefs, Popover } from "..";
import Caption from "./caption/Caption";
import DropdownCaption from "./caption/DropdownCaption";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";
import { disableDate } from "./utils/dates-disabled";
import { labels } from "./utils/labels";
import { getLocaleFromString } from "./utils/util";

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
   * Pre selected dates.
   */
  selected?: Date | Date[] | DateRange;
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
      selected,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(/* getInitialSelected(mode, selected) */);

    const handleSelect = (selectedDate?: Date) => {
      // TMP until multiple and range is implemented
      if (mode === "single") {
        setSelectedDates(selectedDate);
        selectedDate && setOpen(false);
        buttonRef && buttonRef?.current?.focus();
      }
    };

    return (
      <DatePickerContext.Provider
        value={{ open, onOpen: () => setOpen((x) => !x), buttonRef }}
      >
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
              >
                <DayPicker
                  locale={getLocaleFromString(locale)}
                  mode={mode}
                  selected={selectedDates}
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
                  }}
                  modifiersClassNames={{
                    weekend: "rdp-day__weekend",
                  }}
                  showWeekNumber={showWeekNumber}
                  /* selected={selected} */
                  {...rest}
                />
              </Popover>
            )}
          </FloatingPortal>
        </div>
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;

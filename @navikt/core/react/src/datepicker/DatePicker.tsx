import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import cl from "clsx";
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
  isMatch,
  Matcher,
  SelectMultipleEventHandler,
  SelectRangeEventHandler,
  SelectSingleEventHandler,
} from "react-day-picker";
import { mergeRefs, Popover, useId } from "..";
import { omit } from "../util";
import { Caption, DropdownCaption } from "./caption";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";
import DatePickerStandalone, {
  DatePickerStandaloneType,
} from "./DatePickerStandalone";
import { getLocaleFromString, labels } from "./utils";

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
    }
  | {
      mode?: "range";
      onSelect?: (val?: DateRange) => void;
      selected?: DateRange;
      defaultSelected?: DateRange;
    };

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerDefaultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect" | "className">,
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
   * {@link https://react-day-picker.js.org/api/types/Matcher | Matcher type-definition}
   */
  disabled?: Matcher[];
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
   * Open state
   * @remark Controlled by component by default
   */
  open?: boolean;
  /**
   * onClose callback
   */
  onClose?: () => void;
  /**
   * onOpenToggle callback
   */
  onOpenToggle?: () => void;
  /**
   *
   */
  classNames?: {
    wrapper?: string;
    datepicker?: string;
  };
}

export type DatePickerProps = DatePickerDefaultProps & ConditionalModeProps;

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Input: DatePickerInputType;
  Standalone: DatePickerStandaloneType;
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
      defaultSelected,
      classNames,
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
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

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
      <DatePickerContext.Provider
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
        <div
          ref={mergedRef}
          className={cl("navds-date__wrapper", classNames?.wrapper)}
        >
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
              >
                <DayPicker
                  locale={getLocaleFromString(locale)}
                  mode={mode}
                  {...overrideProps}
                  selected={selected ?? selectedDates}
                  components={{
                    Caption: yearSelector ? DropdownCaption : Caption,
                  }}
                  className={cl("navds-date", classNames?.datepicker)}
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
                  initialFocus={focusOnOpen}
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
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;
DatePicker.Standalone = DatePickerStandalone;

export default DatePicker;

import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import React, {
  createContext,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker } from "react-day-picker";
import { mergeRefs, Popover } from "..";
import Caption from "./caption/Caption";
import DropdownCaption from "./caption/DropdownCaption";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";
import { getLocale } from "./util";
import { labels } from "./utils/labels";

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
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
  disabled?: Array<Date>;
  /**
   * Sets focus on selected date or todays date if not selected.
   * @warning If selected/todays date is disabled, this will focus first visible day.
   * @default false
   */
  focusOnOpen?: boolean;
}

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Input: DatePickerInputType;
}

interface DatePickerContextProps {
  open: boolean;
  onOpen: () => void;
}

export const DatePickerContext = createContext<DatePickerContextProps>({
  open: false,
  onOpen: () => null,
});

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      children,
      locale = "nb",
      yearSelector,
      focusOnOpen,
      disabled = [],
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const initialDate = !disabled.includes(new Date()) ? undefined : new Date();

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

    const [selected, setSelected] = React.useState<Date | undefined>(
      initialDate
    );

    /* TMP for dev */
    useEffect(() => {
      setOpen(true);
    }, []);

    /* TMP for dev */
    const disabledDays = [
      new Date("Aug 28 2022"),
      new Date("Aug 30 2022"),
      new Date("Aug 31 2022"),
      { from: new Date("Sept 05 2022"), to: new Date("Sept 09 2022") },
    ];

    return (
      <DatePickerContext.Provider
        value={{ open, onOpen: () => setOpen((x) => !x) }}
      >
        <div ref={mergedRef}>{children}</div>
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
                locale={getLocale(locale)}
                mode="single"
                selected={selected}
                onSelect={(selectedDate: Date | undefined) => {
                  setSelected(selectedDate);
                }}
                components={{
                  Caption: yearSelector ? DropdownCaption : Caption,
                }}
                className="navds-date__calendar"
                toYear={2022}
                fromDate={new Date("Aug 23 2019")}
                classNames={{ vhidden: "navds-sr-only" }}
                disabled={disabledDays}
                weekStartsOn={1}
                initialFocus={focusOnOpen}
                labels={labels as any}
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

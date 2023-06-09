import cl from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { RootProvider } from "react-day-picker";
import { Popover, useId } from "../..";
import { DateInputProps, MonthPickerInput } from "../DateInput";
import { DateContext, SharedMonthProvider } from "../context";
import { getLocaleFromString, Matcher } from "../utils";
import MonthCaption from "./MonthCaption";
import MonthPickerStandalone, {
  MonthPickerStandaloneType,
} from "./MonthPickerStandalone";
import MonthSelector from "./MonthSelector";

export interface MonthPickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element monthpicker anchors to. Use <MonthPicker.Input /> for built-in toggle,
   * or make your own with the open/onClose props
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
   * The earliest month to start navigation.
   */
  fromDate?: Date;
  /**
   * The latest day to end  navigation.
   */
  toDate?: Date;
  /**
   * Changes monthpicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * Display dropdown for choosing year. Needs `fromDate` + `toDate` to work.
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching months. Uses a subset of React Day Picker Matcher type. https://react-day-picker.js.org/api/types/Matcher
   */
  disabled?: Matcher[];
  /**
   * Controlled selected-month
   */
  selected?: Date;
  /**
   * Default selected month.
   */
  defaultSelected?: Date;
  /**
   * Open state for user-controlled state. Component controlled by default
   */
  open?: boolean;
  /**
   * onClose callback for user-controlled state
   */
  onClose?: () => void;
  /**
   * onOpenToggle callback for user-controlled-state. Only called if `<MonthPicker.Input />` is used
   */
  onOpenToggle?: () => void;
  /**
   * Callback for user-controlled state
   */
  onMonthSelect?: Function;
  /**
   * Used to set visible year programmatically. Component controlled by default
   */
  year?: Date;
  /**
   * Event fired when the user navigates between years.
   */
  onYearChange?: (y?: Date) => void;
  /**
   * Avoid using if possible!
   * Changes what CSS position property to use
   * You want to use "fixed" if parent wrapper has position relative, but you want popover to escape
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed";
}

interface MonthPickerComponent
  extends React.ForwardRefExoticComponent<MonthPickerProps> {
  /**
   * @example
   * ```jsx
   * <MonthPicker.Standalone
   *   dropdownCaption
   *   fromDate={new Date("1 Oct 2020")}
   *   toDate={new Date("1 Oct 2024")}
   * />
   * ```
   */
  Standalone: MonthPickerStandaloneType;
  /**
   * Custom TextField for MonthPicker
   * @see 🏷️ {@link DateInputProps}
   */
  Input: React.ForwardRefExoticComponent<
    DateInputProps & React.RefAttributes<HTMLInputElement>
  >;
}

/**
 * A component that displays a month picker.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/monthpicker)
 * @see 🏷️ {@link MonthPickerProps}
 *
 * @example
 * ```jsx
 *  const { inputProps, monthpickerProps } = useMonthpicker({
 *    onMonthChange: console.log,
 *  });
 *
 *  return (
 *     <MonthPicker {...monthpickerProps} dropdownCaption>
 *       <MonthPicker.Input
 *         {...inputProps}
 *         label="Velg måned"
 *       />
 *     </MonthPicker>
 *  );
 * ```
 */
export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerProps>(
  (
    {
      children,
      dropdownCaption = false,
      fromDate,
      toDate,
      disabled = [],
      selected,
      open: _open,
      id,
      onClose,
      onOpenToggle,
      locale = "nb",
      onMonthSelect,
      className,
      wrapperClassName,
      defaultSelected,
      year,
      onYearChange,
      strategy = "absolute",
    },
    ref
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(
      defaultSelected
    );

    const handleSelect = (month?: Date) => {
      !onMonthSelect && setSelectedMonth(month);
      onMonthSelect?.(month);
      month && (onClose?.() ?? setOpen(false));
    };

    if (dropdownCaption && (!fromDate || !toDate)) {
      console.warn("Using dropdownCaption required fromDate and toDate");
      return null;
    }

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
              onClose={() => onClose?.() ?? setOpen(false)}
              placement="bottom-start"
              role="dialog"
              ref={ref}
              id={ariaId}
              className="navds-date navds-date__popover"
              strategy={strategy}
            >
              <RootProvider
                locale={getLocaleFromString(locale)}
                selected={selected ?? selectedMonth}
                toDate={toDate}
                fromDate={fromDate}
                month={selected ?? selectedMonth}
              >
                <div className={cl("rdp-month", className)}>
                  <SharedMonthProvider
                    dropdownCaption={dropdownCaption}
                    disabled={disabled}
                    selected={selected ?? selectedMonth}
                    onSelect={handleSelect}
                    year={year}
                    onYearChange={onYearChange}
                  >
                    <MonthCaption />
                    <MonthSelector />
                  </SharedMonthProvider>
                </div>
              </RootProvider>
            </Popover>
          )}
        </div>
      </DateContext.Provider>
    );
  }
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

export default MonthPicker;

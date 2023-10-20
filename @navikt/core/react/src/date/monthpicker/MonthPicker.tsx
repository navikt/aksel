import cl from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { RootProvider } from "react-day-picker";
import { Popover } from "../../popover";
import { useId } from "../../util";
import { MonthPickerInput } from "../DateInput";
import { DateContext, SharedMonthProvider } from "../context";
import { getLocaleFromString } from "../utils";
import MonthCaption from "./MonthCaption";
import MonthPickerStandalone from "./MonthPickerStandalone";
import MonthSelector from "./MonthSelector";
import { MonthPickerProps } from "./types";

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
  Standalone: typeof MonthPickerStandalone;
  /**
   * Custom TextField for MonthPicker
   * @see 🏷️ {@link DateInputProps}
   */
  Input: typeof MonthPickerInput;
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
      bubbleEscape = false,
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
              bubbleEscape={bubbleEscape}
              flip={false}
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

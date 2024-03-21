import cl from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { DayPickerProvider } from "react-day-picker";
import { useId } from "../../util/hooks";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { DateContext, SharedMonthProvider } from "../context";
import { MonthPickerInput } from "../parts/DateInput";
import { DateWrapper } from "../parts/DateWrapper";
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
    },
    ref,
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(wrapperRef, ref);

    const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(
      defaultSelected,
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
          defined: true,
        }}
      >
        <div
          ref={mergedRef}
          className={cl("navds-date__wrapper", wrapperClassName)}
        >
          {children}
          <DateWrapper
            open={_open ?? open}
            anchor={wrapperRef.current}
            onClose={() => onClose?.() ?? setOpen(false)}
            locale={locale}
            variant="month"
            popoverProps={{
              id: ariaId,
              strategy,
            }}
          >
            <DayPickerProvider
              initialProps={{
                locale: getLocaleFromString(locale),
                selected: selected ?? selectedMonth,
                toDate,
                fromDate,
                month: selected ?? selectedMonth,
              }}
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
            </DayPickerProvider>
          </DateWrapper>
        </div>
      </DateContext.Provider>
    );
  },
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

export default MonthPicker;

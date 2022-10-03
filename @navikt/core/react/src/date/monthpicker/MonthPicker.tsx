import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import cl from "clsx";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { RootProvider } from "react-day-picker";
import { Popover, useId } from "../..";
import { DateInputType, MonthPickerInput } from "../DateInput";
import {
  SharedMonthContext,
  SharedMonthProvider,
} from "../hooks/useSharedMonthContext";
import { DateContext } from "../hooks/useDateInputContext";
import { getDefaultSelected, getLocaleFromString, Matcher } from "../utils";
import MonthCaption from "./MonthCaption";
import MonthPickerStandalone, {
  MonthPickerStandaloneType,
} from "./MonthPickerStandalone";
import MonthSelector from "./MonthSelector";

export interface MonthPickerDefaultProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Element monthpicker anchors to. Use <MonthPicker.Input /> for built-in toggle,
   * or make your own with the open/onClose props
   */
  children?: React.ReactNode;
  /**
   * The earliest day to start the month navigation.
   */
  fromDate?: Date;
  /**
   * The latest day to end the month navigation.
   */
  toDate?: Date;
  /**
   * Changes monthpicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * Adds a `Select` for picking Year and Month
   * Needs `fromDate` + `toDate` to be shown!
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching days. Uses a subset of React Day Picker Matcher type.
   * {@link https://react-day-picker.js.org/api/types/Matcher | Matcher type-definition}
   */
  disabled?: Matcher[];
  /**
   * The initial selected month. Defaults to fromDate when using dropdownCaption, and todays month without dropdownCaption.
   */
  selected?: Date;
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
   * @remark only called if `<MonthPicker.Input />` is used
   */
  onOpenToggle?: () => void;
  /**
   * onMonthSelect callback for user-controlled-state
   */
  onMonthSelect?: Function;
  /**
   * Classname
   */
  className?: string;
  /**
   * Classname for wrapper
   */
  wrapperClassName?: string;
}

export type MonthPickerProps = MonthPickerDefaultProps;

interface MonthPickerComponent
  extends React.ForwardRefExoticComponent<MonthPickerDefaultProps> {
  Standalone: MonthPickerStandaloneType;
  Input: DateInputType;
}

/* TODO: Gjøre at man ikke har en defaultselected ved start */
export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerDefaultProps>(
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
    },
    ref
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [selectedMonth, setSelectedMonth] = useState<Date>(
      getDefaultSelected(disabled, dropdownCaption, selected, toDate, fromDate)
    );
    const [yearState, setYearState] = useState<Date>(selectedMonth);

    useEffect(() => {
      selected && setYearState(selected);
      selected && setSelectedMonth(selected);
    }, [selected]);

    if (dropdownCaption && (!fromDate || !toDate)) {
      console.warn("Using dropdownCaption required fromDate and toDate");
      return null;
    }

    const onSelect = (selectedDay: Date) => {
      onMonthSelect && onMonthSelect?.(selectedDay);
      if (!onMonthSelect?.()?.useMonthPicker) {
        setSelectedMonth(selectedDay);
      }
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
        <div
          ref={wrapperRef}
          className={cl("navds-date__wrapper", wrapperClassName)}
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
                role="dialog"
                ref={ref}
                id={ariaId}
                className="navds-date"
              >
                <RootProvider
                  locale={getLocaleFromString(locale)}
                  selected={selected}
                  toDate={toDate}
                  fromDate={fromDate}
                >
                  <div className={cl("rdp-month", className)}>
                    <SharedMonthProvider
                      dropdownCaption={dropdownCaption}
                      disabled={disabled}
                      selected={selected}
                    >
                      <MonthCaption />
                      <MonthSelector />
                    </SharedMonthProvider>
                  </div>
                </RootProvider>
              </Popover>
            )}
          </FloatingPortal>
        </div>
      </DateContext.Provider>
    );
  }
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

export default MonthPicker;

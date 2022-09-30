import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import cl from "clsx";
import React, {
  createContext,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { RootProvider } from "react-day-picker";
import { Popover, useId } from "../..";
import { SharedMonthContext } from "../hooks/useSharedMonthContext";
import DateInput, { DateInputType } from "../shared/DateInput";
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
   * Classnames for adding classes
   */
  classNames?: {
    /**
     * Children wrapper
     */
    wrapper?: string;
    /**
     * DatePicker-wrapper
     */
    datepicker?: string;
  };
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
}

export type MonthPickerProps = MonthPickerDefaultProps;

interface MonthPickerComponent
  extends React.ForwardRefExoticComponent<MonthPickerDefaultProps> {
  Standalone: MonthPickerStandaloneType;
  Input: DateInputType;
}

interface MonthickerContextProps {
  open: boolean;
  onOpen: () => void;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null> | null;
  ariaId?: string;
}

export const MonthPickerContext = createContext<MonthickerContextProps>({
  open: false,
  onOpen: () => null,
  buttonRef: null,
  ariaId: undefined,
});

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerDefaultProps>(
  (
    {
      children,
      dropdownCaption = false,
      fromDate = new Date(),
      toDate,
      disabled = [],
      selected,
      classNames,
      open: _open,
      id,
      onClose,
      onOpenToggle,
      locale = "nb",
      onMonthSelect,
    },
    ref
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [selectedMonth, setSelectedMonth] = useState<Date>(
      getDefaultSelected(disabled, dropdownCaption, fromDate, selected, toDate)
    );
    const [yearState, setYearState] = useState<Date>(selectedMonth);

    useEffect(() => {
      selected && setYearState(selected);
      selected && setSelectedMonth(selected);
    }, [selected]);

    if (dropdownCaption && (!fromDate || !toDate)) return <></>;

    const isValidDropdownCaption =
      dropdownCaption && fromDate && toDate ? true : false;

    const onSelect = (selectedDay: Date) => {
      onMonthSelect && onMonthSelect?.(selectedDay);
      if (!onMonthSelect?.()?.useMonthPicker) {
        setSelectedMonth(selectedDay);
      }
    };

    return (
      <MonthPickerContext.Provider
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
                role="dialog"
                ref={ref}
                id={ariaId}
              >
                <RootProvider
                  locale={getLocaleFromString(locale)}
                  selected={selected}
                  className="navds-monthpicker-month"
                  toDate={toDate}
                  fromDate={fromDate}
                >
                  <div className="navds-date navds-monthpicker__wrapper">
                    <SharedMonthContext.Provider
                      value={{
                        isValidDropdownCaption,
                        selectedMonth,
                        onSelect: (date) => {
                          onSelect(date);
                        },
                        yearState,
                        setYearState,
                        disabled,
                      }}
                    >
                      <MonthCaption dropdownCaption={dropdownCaption} />
                      <MonthSelector />
                    </SharedMonthContext.Provider>
                  </div>
                </RootProvider>
              </Popover>
            )}
          </FloatingPortal>
        </div>
      </MonthPickerContext.Provider>
    );
  }
) as MonthPickerComponent;

MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = DateInput;

export default MonthPicker;

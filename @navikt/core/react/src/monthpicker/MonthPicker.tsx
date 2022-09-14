import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import cl from "clsx";
import {
  compareAsc,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
} from "date-fns";
import React, {
  forwardRef,
  useState,
  useRef,
  createContext,
  useEffect,
} from "react";
import { RootProvider, useDayPicker } from "react-day-picker";
import { BodyShort, Popover, useId } from "..";
import { getLocaleFromString } from "../datepicker/utils";
import Month from "./Month";
import MonthCaption from "./MonthCaption";
import MonthPickerInput, { MonthPickerInputType } from "./MonthPickerInput";
import MonthPickerStandalone, {
  MonthPickerStandaloneType,
} from "./MonthPickerStandalone";
import { getDefaultSelected } from "./utils/get-initial-month";
import { Matcher } from "./utils/is-match";

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
  defaultSelected?: Date;
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
   * @remark only called if `<MONTHPicker.Input />` is used
   */
  onOpenToggle?: () => void;
}

export type MonthPickerProps = MonthPickerDefaultProps;

interface MonthPickerComponent
  extends React.ForwardRefExoticComponent<MonthPickerDefaultProps> {
  Standalone: MonthPickerStandaloneType;
  Input: MonthPickerInputType;
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

const MonthSelector = ({
  onSelect,
  selected,
  dropdownCaption,
  disabled,
  yearState,
  setYearState,
}: {
  onSelect: (m: Date) => void;
  selected: Date;
  dropdownCaption: boolean;
  disabled: Matcher[];
  yearState: Date;
  setYearState: Function;
}) => {
  const months: Date[] = [];
  const { fromDate, toDate, locale } = useDayPicker();

  const monthRefs = useRef(new Array<HTMLButtonElement>());
  const [focus, setFocus] = useState<Date>();

  if (dropdownCaption && fromDate && toDate && isSameYear(fromDate, toDate)) {
    const date = startOfMonth(fromDate);
    for (let month = fromDate.getMonth(); month <= toDate.getMonth(); month++) {
      months.push(setMonth(date, month));
    }
  } else {
    const date = startOfMonth(new Date());
    for (let month = 0; month <= 11; month++) {
      months.push(setMonth(date, month));
    }
  }

  const hideMonth = (month: Date) => {
    if (dropdownCaption && fromDate) return compareAsc(month, fromDate) === -1;
  };

  return (
    <BodyShort as="div" className="navds-monthpicker__months">
      {months.map((month: Date, y) => {
        const currentRef = (month: any) => monthRefs.current.push(month);
        return (
          <Month
            key={month.toDateString()}
            y={y}
            locale={locale}
            selected={selected}
            month={setYear(month, Number(yearState.getFullYear()))}
            yearState={yearState}
            disabled={disabled}
            onSelect={onSelect}
            months={months}
            currentRef={currentRef}
            hideMonth={hideMonth}
            focus={focus}
            setFocus={setFocus}
            setYearState={setYearState}
            dropdownCaption={dropdownCaption}
            fromDate={fromDate}
            toDate={toDate}
          />
        );
      })}
    </BodyShort>
  );
};

export const MonthPicker = forwardRef<HTMLDivElement, MonthPickerDefaultProps>(
  (
    {
      children,
      dropdownCaption = false,
      fromDate = new Date(),
      toDate,
      disabled = [],
      defaultSelected,
      classNames,
      open: _open,
      id,
      onClose,
      onOpenToggle,
      locale = "nb",
    },
    ref
  ) => {
    const ariaId = useId(id);
    const [open, setOpen] = useState(_open ?? false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [selected, setSelected] = useState<Date>(
      getDefaultSelected(
        disabled,
        dropdownCaption,
        fromDate,
        defaultSelected,
        toDate
      )
    );
    const [yearState, setYearState] = useState<Date>(selected);

    useEffect(() => {
      defaultSelected && setYearState(defaultSelected);
      defaultSelected && setSelected(defaultSelected);
    }, [defaultSelected]);

    if (dropdownCaption && (!fromDate || !toDate)) return <></>;

    const isValidDropdownCaption =
      dropdownCaption && fromDate && toDate ? true : false;

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
          className={cl("navds-month__wrapper", classNames?.wrapper)}
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
                  <div className="navds-monthpicker__wrapper">
                    <MonthCaption
                      selected={selected}
                      onSelect={setSelected}
                      dropdownCaption={dropdownCaption}
                      isValidDropdownCaption={isValidDropdownCaption}
                      yearState={yearState}
                      setYearState={setYearState}
                    />
                    <MonthSelector
                      dropdownCaption={dropdownCaption}
                      onSelect={setSelected}
                      selected={selected}
                      disabled={disabled}
                      yearState={yearState}
                      setYearState={setYearState}
                    />
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

export default MonthPicker;
MonthPicker.Standalone = MonthPickerStandalone;
MonthPicker.Input = MonthPickerInput;

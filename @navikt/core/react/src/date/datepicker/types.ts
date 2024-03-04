import { DateRange, DayPickerBase, Matcher } from "react-day-picker";

export type SingleMode = {
  mode?: "single";
  onSelect?: (val?: Date) => void;
  selected?: Date;
  defaultSelected?: Date;
  onWeekNumberClick?: never;
};

export type MultipleMode = {
  mode: "multiple";
  onSelect?: (val?: Date[]) => void;
  selected?: Date[];
  defaultSelected?: Date[];
  min?: number;
  max?: number;
  /**
   * Allows selecting a week at a time. Only used with `mode` is set to "multiple".
   */
  onWeekNumberClick?: DayPickerBase["onWeekNumberClick"];
};

export type RangeMode = {
  mode: "range";
  onSelect?: (val?: DateRange) => void;
  selected?: DateRange;
  defaultSelected?: DateRange;
  min?: number;
  max?: number;
  onWeekNumberClick?: never;
};

export type ConditionalModeProps = SingleMode | MultipleMode | RangeMode;

//github.com/gpbl/react-day-picker/blob/50b6dba/packages/react-day-picker/src/types/DayPickerBase.ts#L139
export interface DatePickerDefaultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    Pick<DayPickerBase, "month" | "onMonthChange" | "today" | "onDayClick"> {
  /**
   * Element datepicker anchors to. Use <DatePicker.Input /> for built-in toggle, or make your own with the open/onClose props
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
   * Changes datepicker locale
   * @default "nb" (norsk bokmål)
   */
  locale?: "nb" | "nn" | "en";
  /**
   * The earliest day to start navigation.
   */
  fromDate?: Date;
  /**
   * The latests day to end navigation.
   */
  toDate?: Date;
  /**
   * Display dropdown for choosing the month and the year. Needs `fromDate` + `toDate` to work.
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching days.
   * https://react-day-picker.js.org/api/types/Matcher
   */
  disabled?: Matcher[];
  /**
   * Disable saturday and sunday.
   * @default false
   */
  disableWeekends?: boolean;
  /**
   * Shows week numbers in left-column. Use with caution, takes up valuable screenspace for small screens.
   * @default false
   */
  showWeekNumber?: boolean;
  /**
   * Open state for user-controlled state. Component controlled by default.
   */
  open?: boolean;
  /**
   * onClose callback for user-controlled state.
   */
  onClose?: () => void;
  /**
   * onOpenToggle callback for user-controlled state. Only called if `<DatePicker.Input />` is used.
   */
  onOpenToggle?: () => void;
  /**
   * **Avoid using if possible!**
   *
   * Changes what CSS position property to use.
   * You want to use "fixed" if parent wrapper has position relative, but you want popover to escape.
   * @default See Popover
   */
  strategy?: "absolute" | "fixed";
}

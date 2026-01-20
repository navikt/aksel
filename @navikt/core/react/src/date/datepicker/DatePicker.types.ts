import { CalendarWeek, Matcher, PropsBase } from "react-day-picker";
import { ComponentTranslation } from "../../utils/i18n/i18n.types";
import { DateRange } from "../Date.typeutils";

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
   * @param week Current week number
   * @param days Dates in the week
   */
  onWeekNumberClick?: (week: CalendarWeek["weekNumber"], days: Date[]) => void;
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

// https://daypicker.dev/api/interfaces/PropsBase
export interface DatePickerDefaultProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    Pick<
      PropsBase,
      "month" | "onMonthChange" | "today" | "onDayClick" | "defaultMonth"
    > {
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
   * @deprecated Use `<Provider />`-component
   */
  locale?: "nb" | "nn" | "en";
  /**
   * i18n-API for customizing texts and labels.
   *
   * **NB: If you need to change the language, use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) instead.**
   */
  translations?: ComponentTranslation<"DatePicker">;
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
   * https://react-day-picker.js.org/api/type-aliases/Matcher
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
   * If datepicker should be fixed to 6 weeks, regardless of actual weeks in month.
   * @default false
   */
  fixedWeeks?: boolean;
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

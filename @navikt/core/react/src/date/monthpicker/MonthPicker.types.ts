import { ComponentTranslation } from "../../util/i18n/i18n.types";
import { Matcher } from "../Date.typeutils";

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
   * Display dropdown for choosing year. Needs `fromDate` + `toDate` to work.
   * @default false
   */
  dropdownCaption?: boolean;
  /**
   * Apply the disabled modifier to the matching months. Uses a subset of React Day Picker Matcher type. https://react-day-picker.js.org/api/type-aliases/Matcher
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
  onMonthSelect?: (month?: Date) => void;
  /**
   * Used to set visible year programmatically. Component controlled by default
   */
  year?: Date;
  /**
   * Event fired when the user navigates between years.
   */
  onYearChange?: (y?: Date) => void;
  /**
   * **Avoid using if possible!**
   *
   * Changes what CSS position property to use
   * You want to use "fixed" if parent wrapper has position relative, but you want popover to escape
   * @default "absolute"
   */
  strategy?: "absolute" | "fixed";
}

import React, { forwardRef } from "react";
import { DateRange } from "react-day-picker";
import { cl } from "../../../util/className";
import { useControllableState } from "../../../util/hooks";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import {
  DateTranslationContextProvider,
  getTranslations,
} from "../../Date.locale";
import {
  DatePickerDefaultProps,
  MultipleMode,
  RangeMode,
  SingleMode,
} from "../DatePicker.types";
import { ReactDayPicker } from "./DatePicker.RDP";

interface DatePickerStandaloneDefaultProps
  extends Omit<
    DatePickerDefaultProps,
    "open" | "onClose" | "onOpenToggle" | "wrapperClassName" | "strategy"
  > {
  /**
   * Datepicker classname
   */
  className?: string;
  /**
   * If datepicker should be fixed to 6 weeks, regardless of actual weeks in month
   * @default true
   */
  fixedWeeks?: boolean;
}

type StandaloneConditionalModeProps = SingleMode | MultipleMode | RangeMode;

export type DatePickerStandaloneProps = DatePickerStandaloneDefaultProps &
  StandaloneConditionalModeProps;

export type DatePickerStandaloneType = React.ForwardRefExoticComponent<
  DatePickerStandaloneProps & React.RefAttributes<HTMLDivElement>
>;

export const DatePickerStandalone: DatePickerStandaloneType = forwardRef<
  HTMLDivElement,
  DatePickerStandaloneProps
>(
  (
    {
      className,
      locale,
      translations,
      selected,
      defaultSelected,
      onSelect,
      mode,
      ...rest
    },
    ref,
  ) => {
    const translate = useI18n(
      "DatePicker",
      translations,
      getTranslations(locale),
    );

    const [value, setValue] = useControllableState<
      Date | Date[] | DateRange | undefined
    >({
      defaultValue: defaultSelected,
      value: selected,
      onChange: (newValue) => onSelect?.(newValue as any),
    });

    return (
      <DateTranslationContextProvider translate={translate}>
        <div
          ref={ref}
          className={cl("aksel-date__standalone-wrapper", className)}
        >
          <ReactDayPicker
            {...rest}
            locale={locale}
            handleSelect={setValue}
            selected={value as any}
            mode={mode as any}
          />
        </div>
      </DateTranslationContextProvider>
    );
  },
);

export default DatePickerStandalone;

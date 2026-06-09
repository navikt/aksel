import React, { forwardRef } from "react";
import { DateRange } from "react-day-picker";
import { cl } from "../../../utils/helpers";
import { useControllableState } from "../../../utils/hooks";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
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

interface DatePickerStandaloneDefaultProps extends Omit<
  DatePickerDefaultProps,
  "open" | "onClose" | "onOpenToggle" | "wrapperClassName" | "strategy"
> {
  /**
   * Datepicker classname
   */
  className?: string;
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

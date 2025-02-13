import { isWeekend } from "date-fns";
import React, { forwardRef } from "react";
import { DateRange, DayPicker, isMatch } from "react-day-picker";
import { useRenameCSS } from "../../theme/Theme";
import { omit } from "../../util";
import { useDateLocale, useI18n } from "../../util/i18n/i18n.hooks";
import { DateTranslationContextProvider } from "../context";
import { getLocaleFromString, getTranslations } from "../utils";
import Caption from "./parts/Caption";
import DropdownCaption from "./parts/DropdownCaption";
import { HeadRow } from "./parts/HeadRow";
import Row from "./parts/Row";
import TableHead from "./parts/TableHead";
import WeekNumber from "./parts/WeekNumber";
import {
  DatePickerDefaultProps,
  MultipleMode,
  RangeMode,
  SingleMode,
} from "./types";

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
      dropdownCaption,
      disabled = [],
      disableWeekends = false,
      showWeekNumber = false,
      selected,
      defaultSelected,
      onSelect,
      fixedWeeks = false,
      onWeekNumberClick,
      ...rest
    },
    ref,
  ) => {
    const translate = useI18n(
      "DatePicker",
      translations,
      getTranslations(locale),
    );
    const langProviderLocale = useDateLocale();
    const { cn } = useRenameCSS();

    const [selectedDates, setSelectedDates] = React.useState<
      Date | Date[] | DateRange | undefined
    >(defaultSelected);

    const mode = rest.mode ?? ("single" as any);

    /**
     * @param newSelected Date | Date[] | DateRange | undefined
     */
    const handleSelect = (newSelected) => {
      setSelectedDates(newSelected);
      onSelect?.(newSelected);
    };

    return (
      <div
        ref={ref}
        className={cn("navds-date__standalone-wrapper", className)}
      >
        <DateTranslationContextProvider translate={translate}>
          <DayPicker
            locale={locale ? getLocaleFromString(locale) : langProviderLocale}
            mode={mode}
            onSelect={handleSelect}
            selected={selected ?? selectedDates}
            components={{
              Caption: dropdownCaption ? DropdownCaption : Caption,
              Head: TableHead,
              HeadRow,
              WeekNumber,
              Row,
            }}
            className={cn("navds-date")}
            classNames={{ vhidden: cn("navds-sr-only") }}
            disabled={(day) => {
              return (
                (disableWeekends && isWeekend(day)) || isMatch(day, disabled)
              );
            }}
            weekStartsOn={1}
            initialFocus={false}
            modifiers={{
              weekend: (day) => disableWeekends && isWeekend(day),
            }}
            modifiersClassNames={{
              weekend: "rdp-day__weekend",
            }}
            showWeekNumber={showWeekNumber}
            onWeekNumberClick={
              mode === "multiple" ? onWeekNumberClick : undefined
            }
            fixedWeeks={fixedWeeks}
            showOutsideDays
            {...omit(rest, ["children", "id"])}
          />
        </DateTranslationContextProvider>
      </div>
    );
  },
);

export default DatePickerStandalone;

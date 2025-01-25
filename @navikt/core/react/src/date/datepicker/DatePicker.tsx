import cl from "clsx";
import React, { forwardRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { useControllableState, useId } from "../../util/hooks";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { useI18n } from "../../util/i18n/i18n.hooks";
import { DateDialog } from "../Date.Dialog";
import { DateInputContextProvider, DatePickerInput } from "../Date.Input";
import {
  DateTranslationContextProvider,
  getTranslations,
} from "../Date.locale";
import {
  ConditionalModeProps,
  DatePickerDefaultProps,
} from "./DatePicker.types";
import { ReactDayPicker } from "./parts/DatePicker.RDP";
import DatePickerStandalone from "./parts/DatePicker.Standalone";

export type DatePickerProps = DatePickerDefaultProps & ConditionalModeProps;

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  /**
   * @example
   * ```jsx
   * <DatePicker.Standalone
   *   dropdownCaption
   *   fromDate={new Date("2022-10-01")}
   *   toDate={new Date("2026-10-01")}
   * />
   * ```
   */
  Standalone: typeof DatePickerStandalone;
  /**
   * Custom TextField for DatePicker
   * @see 🏷️ {@link DateInputProps}
   */
  Input: typeof DatePickerInput;
}

/**
 * A component that allows users to select a date from a calendar.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/datepicker)
 * @see 🏷️ {@link DatePickerProps}
 *
 * @example
 * ```jsx
 *  const { inputProps, datepickerProps } = useMonthpicker({
 *    onMonthChange: console.log,
 *  });
 *
 *  return (
 *     <DatePicker {...datepickerProps} dropdownCaption>
 *       <DatePicker.Input
 *         {...inputProps}
 *         label="Velg dato"
 *       />
 *     </DatePicker>
 *  );
 * ```
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      children,
      locale,
      translations,
      selected,
      id,
      defaultSelected,
      wrapperClassName,
      open: _open,
      onClose,
      onOpenToggle,
      strategy,
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
    const ariaId = useId(id);

    const [open, setOpen] = useControllableState({
      defaultValue: false,
      value: _open,
      onChange: () => {
        onOpenToggle?.();
      },
    });

    /* We use state here to insure that anchor is defined if open is true on initial render */
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const mergedRef = useMergeRefs(setWrapperRef, ref);

    function isDateRange(dateValue: any): dateValue is DateRange {
      return (
        dateValue &&
        typeof dateValue === "object" &&
        "from" in dateValue &&
        "to" in dateValue
      );
    }

    const [value, setValue] = useControllableState<
      Date | Date[] | DateRange | undefined
    >({
      defaultValue: defaultSelected,
      value: selected,
      onChange: (newValue) => {
        let closeDialog = false;
        if (mode === "single" && newValue) {
          closeDialog = true;
        } else if (isDateRange(newValue) && newValue.from && newValue.to) {
          closeDialog = true;
        }

        if (closeDialog) {
          onClose?.();
          setOpen(false);
        }

        rest?.onSelect?.(newValue as any);
      },
    });

    return (
      <DateTranslationContextProvider translate={translate}>
        <DateInputContextProvider
          open={_open ?? open}
          onOpen={() => setOpen((x) => !x)}
          ariaId={ariaId}
          defined={true}
        >
          <div
            ref={mergedRef}
            className={cl("navds-date__wrapper", wrapperClassName)}
          >
            {children}
            <DateDialog
              open={_open ?? open}
              anchor={wrapperRef}
              onClose={() => {
                onClose?.();
                setOpen(false);
              }}
              locale={locale}
              translate={translate}
              variant={mode ?? "single"}
              popoverProps={{
                id: ariaId,
                strategy,
              }}
            >
              <ReactDayPicker
                {...rest}
                locale={locale}
                handleSelect={setValue}
                selected={value as any}
                mode={mode as any}
              />
            </DateDialog>
          </div>
        </DateInputContextProvider>
      </DateTranslationContextProvider>
    );
  },
) as DatePickerComponent;

DatePicker.Standalone = DatePickerStandalone;
DatePicker.Input = DatePickerInput;

export default DatePicker;

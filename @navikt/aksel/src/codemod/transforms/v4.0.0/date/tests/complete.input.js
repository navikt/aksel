import {
  UNSAFE_useMonthpicker as DsUnsafeUseMonthpicker,
  UNSAFE_DatePicker,
  UNSAFE_MonthPicker,
  UNSAFE_useDatepicker,
  UNSAFE_useRangeDatepicker,
} from "@navikt/ds-react";

/* eslint-disable react/jsx-no-undef */
export const UseDatepicker = () => {
  const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.info,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <UNSAFE_DatePicker {...datepickerProps} dropdownCaption>
        <UNSAFE_DatePicker.Input {...inputProps} label="Velg dato" />
      </UNSAFE_DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { datepickerProps, fromInputProps, toInputProps } =
    UNSAFE_useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
      onRangeChange: console.info,
      onValidate: console.info,
    });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <UNSAFE_DatePicker {...datepickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <UNSAFE_DatePicker.Input {...fromInputProps} label="Fra" />
          <UNSAFE_DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </UNSAFE_DatePicker>
    </div>
  );
};

export const UseMonthpicker = () => {
  const { inputProps, monthpickerProps } = UNSAFE_useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    onMonthChange: console.info,
    fromDate: new Date("Jan 1 2022"),
    toDate: new Date("Sep 27 2025"),
  });

  const {} = UNSAFE_useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    onMonthChange: console.info,
    fromDate: new Date("Jan 1 2022"),
    toDate: new Date("Sep 27 2025"),
  });

  return (
    <div style={{ height: "20rem" }}>
      <UNSAFE_MonthPicker {...monthpickerProps} dropdownCaption>
        <UNSAFE_MonthPicker.Input
          {...inputProps}
          label="Velg måned"
          variant="monthpicker"
        />
      </UNSAFE_MonthPicker>
    </div>
  );
};

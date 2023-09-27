import {
  useDatepicker,
  DatePicker,
  useRangeDatepicker,
  MonthPicker,
  useMonthpicker,
} from "@navikt/ds-react";

/* eslint-disable react/jsx-no-undef */
export const UseDatepicker = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    toDate: new Date("Feb 23 2024"),
    onDateChange: console.log,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps} dropdownCaption>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { datepickerProps, fromInputProps, toInputProps } = useRangeDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onRangeChange: console.log,
    onValidate: console.log,
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const UseMonthpicker = () => {
  const { inputProps, monthpickerProps } = DsUnsafeUseMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    onMonthChange: console.log,
    fromDate: new Date("Jan 1 2022"),
    toDate: new Date("Sep 27 2025"),
  });

  const {} = UNSAFE_useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    onMonthChange: console.log,
    fromDate: new Date("Jan 1 2022"),
    toDate: new Date("Sep 27 2025"),
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps} dropdownCaption>
        <MonthPicker.Input
          {...inputProps}
          label="Velg måned"
          variant="monthpicker"
        />
      </MonthPicker>
    </div>
  );
};

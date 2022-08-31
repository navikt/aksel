import { isSameDay } from "date-fns";
import React from "react";
import DatePicker from "./DatePicker";
import { useDatepicker } from "./useDatepicker";
import { useRangeDatepicker } from "./useRangeDatepicker";
/* import MonthPicker from "./MonthPicker"; */

const disabledDays = [
  new Date("Aug 10 2022"),
  { from: new Date("Aug 31 2022"), to: new Date("Sep 8 2022") },
];

export default {
  title: "ds-react/Datepicker",
  component: DatePicker,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    locale: {
      control: {
        type: "radio",
        options: ["nb", "nn", "en"],
      },
    },
  },
};

export const Default = (props) => {
  return (
    <div style={{ height: "30rem" }}>
      <DatePicker
        locale={props?.locale}
        yearSelector={props?.yearSelector}
        disableWeekends={props?.disableWeekends}
        focusOnOpen={props?.focusOnOpen}
      >
        <DatePicker.Input label="Velg dato" size={props?.size} />
      </DatePicker>
    </div>
  );
};

Default.args = {
  yearSelector: false,
  disableWeekends: false,
  focusOnOpen: true,
  showWeekNumber: false,
};

export const Dropdown = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const NoDropdown = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const LocaleNB = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector locale="nb">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const LocaleNN = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector locale="nn">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const LocaleEN = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector locale="en">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const DisabledDays = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker disabled={disabledDays} disableWeekends locale="en">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const ShowWeekNumber = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker showWeekNumber>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const FromTo = () => {
  return (
    <div style={{ height: "30rem", display: "flex", gap: "1rem" }}>
      <DatePicker showWeekNumber>
        <DatePicker.Input label="Fra"></DatePicker.Input>
      </DatePicker>
      <DatePicker showWeekNumber>
        <DatePicker.Input label="Til"></DatePicker.Input>
      </DatePicker>
    </div>
  );
};

export const UseDatepicker = () => {
  const { dayPickerProps, selectedDay, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    locale: "en",
  });

  return (
    <div style={{ height: "30rem", display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <DatePicker.Input
          error={
            isSameDay(selectedDay, new Date()) ? "Invalid date" : undefined
          }
          {...inputProps}
          label="Velg dato"
        />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { dayPickerProps, startInputProps, endInputProps } = useRangeDatepicker(
    {
      fromDate: new Date("Aug 23 2019"),
    }
  );

  return (
    <div style={{ height: "30rem", display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...startInputProps} label="Fra" />
          <DatePicker.Input {...endInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

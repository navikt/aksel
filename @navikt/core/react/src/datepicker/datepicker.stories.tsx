import React from "react";
import DatePicker from "./DatePicker";
/* import MonthPicker from "./MonthPicker"; */

const disabledDays = [
  new Date("Aug 28 2022"),
  new Date("Aug 29 2022"),
  new Date("Aug 30 2022"),
  new Date("Aug 31 2022"),
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
  },
};

/* export const MonthPickerDemo = (props) => (
  <div style={{ height: "30rem" }}>
    <MonthPicker />
  </div>
); */

export const Default = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

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

Default.args = {};

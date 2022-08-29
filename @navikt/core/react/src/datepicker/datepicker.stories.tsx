import React from "react";
import DatePicker from "./DatePicker";
/* import MonthPicker from "./MonthPicker"; */

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

Default.args = {};

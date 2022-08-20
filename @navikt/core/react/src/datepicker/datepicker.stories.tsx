import React from "react";
import DatePicker from "./DatePicker";

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

export const Default = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker label="Velg dato" size={props.size} />
  </div>
);

Default.args = {};

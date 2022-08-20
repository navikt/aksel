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

export const Default = (props) => <DatePicker size={props.size} />;

Default.args = {};

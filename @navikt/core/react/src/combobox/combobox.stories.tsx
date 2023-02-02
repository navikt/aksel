import React from "react";
import { Combobox } from ".";

export default {
  title: "ds-react/Combobox",
  component: Combobox,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
};

export const Default = () => {
  return <Combobox>COMBOBOX WIP</Combobox>;
};

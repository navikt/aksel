import { Meta } from "@storybook/react/types-6-0";
import React, { useState, useId } from "react";

import { Combobox } from "../../index";

const options = [
  "Apples",
  "Bananas",
  "Grapes",
  "Oranges",
  "Pears",
  "Pineapples",
];

export default {
  title: "ds-react/Combobox",
  component: Combobox,
} as Meta;

export const Default = (props) => {
  const [value, setValue] = useState("");
  const id = useId();
  return (
    <div data-theme={props.darkmode ? "dark" : "light"}>
      <Combobox
        value={props.controlled ? value : undefined}
        onChange={props.controlled ? setValue : undefined}
        label="Komboboks"
        size="medium"
        clearButton={true}
        variant="simple"
        error={props.error && "error here"}
        isListOpen={false}
        options={options}
        id={id}
      />
    </div>
  );
};

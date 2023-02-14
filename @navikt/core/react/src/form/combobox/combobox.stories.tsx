import { Meta } from "@storybook/react";
import React, { useState, useId } from "react";

import { Combobox } from "../../index";

export default {
  title: "ds-react/Combobox",
  component: Combobox,
} as Meta;

const OriginalOptions = [
  "banana",
  "apple",
  "orange",
  "pear",
  "grape",
  "kiwi",
  "mango",
  "pineapple",
  "strawberry",
  "watermelon",
];

export const Default = (props) => {
  const [options, setOptions] = useState(OriginalOptions);
  const [selectedOptions, setSelectedOptions] = useState(["value1", "value2"]);
  const [value, setValue] = useState("");
  const id = useId();
  return (
    <div data-theme={props.darkmode ? "dark" : "light"}>
      <Combobox
        options={options}
        setOptions={setOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        value={props.controlled ? value : undefined}
        onChange={props.controlled ? setValue : undefined}
        label="Komboboks"
        /* everything under here is optional? */
        size="medium"
        variant="simple"
        error={props.error && "error here"}
        isListOpen={false}
        id={id}
      />
    </div>
  );
};

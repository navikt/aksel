import { Meta } from "@storybook/react/types-6-0";
import React, { useState, useId } from "react";

import { Combobox } from "../../index";

export default {
  title: "ds-react/Combobox",
  component: Combobox,
} as Meta;

const OriginalOptions = [
  { label: "Label 1", value: "value1" },
  { label: "Label 2", value: "value2" },
  { label: "Label 3", value: "value3" },
  { label: "Label 4", value: "value4" },
  { label: "Label 5", value: "value5" },
  { label: "Label 6", value: "value6" },
  { label: "Label 7", value: "value7" },
  { label: "Label 8", value: "value8" },
  { label: "Label 9", value: "value9" },
  { label: "Label 10", value: "value10" },
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
        label="komboboks"
        /* everything under here is optional? */
        size="medium"
        variant="simple"
        hideLabel={true}
        error={props.error && "error here"}
        isListOpen={false}
        aria-controls={id}
      />
    </div>
  );
};

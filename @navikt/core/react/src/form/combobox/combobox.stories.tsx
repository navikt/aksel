/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState, useId } from "react";

import { Combobox } from "../../index";

export default {
  title: "ds-react/Combobox",
  component: Combobox,
  argTypes: {
    loading: {
      control: {
        type: "boolean",
      },
    },
    isListOpen: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta;

const originalOptions = [
  "banana",
  "apple",
  "tangerine",
  "pear",
  "grape",
  "kiwi",
  "mango",
  "passion fruit",
  "pineapple",
  "strawberry",
  "watermelon",
  "grape fruit",
];

const initialSelectedOptions = ["passion fruit", "grape fruit"];

export const Default = (props) => {
  const [options, setOptions] = useState(originalOptions);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    initialSelectedOptions
  );
  const [value, setValue] = useState("");
  const id = useId();
  return (
    <div data-theme={props.darkmode ? "dark" : "light"}>
      <Combobox
        options={options}
        setOptions={setOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isListOpen={props.isListOpen}
        /* everything under here is optional */
        value={props.controlled ? value : undefined}
        onChange={props.controlled ? setValue : undefined}
        label="Komboboks"
        loading={props.loading}
        size="medium"
        error={props.error && "error here"}
        hasError={props.error && true}
        id={id}
      />
    </div>
  );
};

Default.args = {
  controlled: false,
  isListOpen: false,
  loading: false,
  error: "",
};

export const Loading = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <div>
      <Combobox
        options={options}
        setOptions={setOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        isListOpen={true}
        loading={true}
      />
    </div>
  );
};

Loading.args = {
  loading: true,
  isListOpen: true,
};

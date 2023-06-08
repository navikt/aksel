/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState, useId } from "react";

import { Chips, Combobox } from "../../index";

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

const options = [
  "banana",
  "apple",
  "apple pie",
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
  "undefined",
  "undefinedagain",
];

const initialSelectedOptions = ["passion fruit", "grape fruit"];

export const Default = (props) => {
  const id = useId();
  return (
    <div data-theme="light">
      <Combobox
        options={options}
        selectedOptions={initialSelectedOptions}
        label="Hva er dine favorittfrukter?"
        /* everything under here is optional? */
        size="medium"
        id={id}
      />
    </div>
  );
};

Default.args = {
  controlled: false,
  loading: false,
  options,
  initialSelectedOptions,
  selectedOptions: [],
};

export const WithExternalChips = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    props.selectedOptions
  );
  const [value, setValue] = useState("");
  const id = useId();

  const toggleSelected = (option) =>
    selectedOptions.includes(option)
      ? setSelectedOptions(selectedOptions.filter((opt) => opt !== option))
      : setSelectedOptions([...selectedOptions, option]);
  return (
    <div data-theme={props.darkmode ? "dark" : "light"}>
      {selectedOptions && (
        <Chips>
          {selectedOptions.map((option) => (
            <Chips.Removable
              key={option}
              onMouseUp={() => toggleSelected(option)}
              onKeyUp={(e) => e.key === "Enter" && toggleSelected(option)}
            >
              {option}
            </Chips.Removable>
          ))}
        </Chips>
      )}
      <Combobox
        options={options}
        selectedOptions={selectedOptions}
        onToggleSelected={(option: string) => toggleSelected(option)}
        isListOpen={props.isListOpen}
        /* everything under here is optional */
        value={props.controlled ? value : undefined}
        onChange={props.controlled ? setValue : undefined}
        label="Komboboks"
        loading={props.loading}
        size="medium"
        error={props.error && "error here"}
        id={id}
        shouldShowSelectedOptions={false}
      />
    </div>
  );
};

WithExternalChips.args = {
  controlled: false,
  loading: false,
  options,
  selectedOptions: [],
};

export function Loading({ isListOpen, loading }) {
  const id = useId();
  return (
    <div>
      <Combobox
        id={id}
        label="Komboboks (laster)"
        options={[]}
        selectedOptions={[]}
        isListOpen={isListOpen}
        loading={loading}
      />
    </div>
  );
}

Loading.args = {
  loading: true,
  isListOpen: true,
};

export function SingleSelectWithAutocomplete(props) {
  const id = useId();
  return (
    <div>
      <Combobox
        id={id}
        label="Komboboks (single select)"
        singleSelect={props.singleSelect || true}
        options={props.options}
        selectedOptions={props.selectedOptions}
        shouldAutocomplete={props.shouldAutocomplete}
      />
    </div>
  );
}

SingleSelectWithAutocomplete.args = {
  singleSelect: true,
  options,
  initialSelectedOptions,
  shouldAutocomplete: true,
};

export function SingleSelectWithoutAutoComplete(props) {
  const id = useId();
  return (
    <div>
      <Combobox
        id={id}
        label="Komboboks (single select)"
        singleSelect={props.singleSelect || true}
        options={props.options}
        selectedOptions={props.selectedOptions}
        shouldAutocomplete={props.shouldAutocomplete}
      />
    </div>
  );
}

SingleSelectWithoutAutoComplete.args = {
  singleSelect: true,
  options,
  initialSelectedOptions,
  shouldAutocomplete: false,
};

export const WithCallbacks = () => {
  const id = useId();
  const [lastSelected, setLastSelected] = useState<{
    option: string;
    isSelected: boolean;
  }>();
  return (
    <div>
      {lastSelected && (
        <p>
          Sist valgt: {lastSelected.option} (
          {lastSelected.isSelected ? "valgt" : "ikke valgt"})
        </p>
      )}
      <Combobox
        label="Hva er dine favorittfrukter?"
        size="medium"
        id={id}
        options={options}
        onToggleSelected={(option, isSelected) =>
          setLastSelected({ option, isSelected })
        }
      />
    </div>
  );
};

WithCallbacks.args = {
  options: [],
};

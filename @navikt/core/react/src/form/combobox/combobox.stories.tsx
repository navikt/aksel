/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState, useId, useMemo } from "react";
import { userEvent, within } from "@storybook/testing-library";
import { Chips, Combobox, TextField } from "../../index";

export default {
  title: "ds-react/Combobox",
  component: Combobox,
  argTypes: {
    isListOpen: {
      control: {
        type: "boolean",
      },
    },
    isLoading: {
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
];

const initialSelectedOptions = ["passion fruit", "grape fruit"];

export const Default = (props) => {
  const id = useId();
  return (
    <div data-theme="light">
      <Combobox
        shouldAutocomplete={props.shouldAutoComplete}
        options={props.options}
        label="Hva er dine favorittfrukter?"
        /* everything under here is optional? */
        size="medium"
        id={id}
      />
    </div>
  );
};

Default.args = {
  options,
  shouldAutoComplete: true,
};

export function MultiSelect(props) {
  const id = useId();
  return (
    <div>
      <Combobox
        id={id}
        label="Komboboks - velg flere"
        options={props.options}
        isMultiSelect={props.isMultiSelect}
      />
    </div>
  );
}

MultiSelect.args = {
  options,
  isMultiSelect: true,
};

export function MultiSelectWithAddNewOptions(props) {
  const id = useId();
  return (
    <div>
      <Combobox
        id={id}
        isMultiSelect={props.isMultiSelect}
        label="Komboboks (med mulighet for å legge til nye verdier)"
        options={props.options}
        allowNewValues={props.allowNewValues}
      />
    </div>
  );
}

MultiSelectWithAddNewOptions.args = {
  allowNewValues: true,
  isMultiSelect: true,
  options,
  shouldAutocomplete: false,
};

export const MultiSelectWithExternalChips = (props) => {
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
              onPointerUp={() => toggleSelected(option)}
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
        isMultiSelect
        value={props.controlled ? value : undefined}
        onChange={(event) =>
          props.controlled ? setValue(event.currentTarget.value) : undefined
        }
        label="Komboboks"
        size="medium"
        error={props.error && "error here"}
        id={id}
        shouldShowSelectedOptions={false}
      />
    </div>
  );
};

MultiSelectWithExternalChips.args = {
  controlled: false,
  options,
  selectedOptions: [],
};

export function Loading({ isListOpen, isLoading }) {
  const id = useId();
  return (
    <div>
      <Combobox
        id={id}
        label="Komboboks (laster)"
        options={[]}
        selectedOptions={[]}
        isListOpen={isListOpen}
        isLoading={isLoading}
      />
    </div>
  );
}

Loading.args = {
  isLoading: true,
  isListOpen: true,
};

export function ComboboxWithNoHits(props) {
  const id = useId();
  const [value, setValue] = useState(props.value);
  return (
    <div>
      <Combobox
        id={id}
        label="Komboboks (uten søketreff)"
        options={props.options}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        isListOpen={true}
      />
    </div>
  );
}

ComboboxWithNoHits.args = {
  options,
  value: "Orange",
};

export const Controlled = (props) => {
  const id = useId();
  const [value, setValue] = useState(props.value);
  const [selectedOptions, setSelectedOptions] = useState(props.selectedOptions);
  const filteredOptions = useMemo(
    () => props.options.filter((option) => option.includes(value)),
    [props.options, value]
  );

  const onToggleSelected = (option, isSelected) => {
    if (isSelected) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    }
  };

  return (
    <>
      <TextField
        label="Overstyr value"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <br />
      <Combobox
        label="Hva er dine favorittfrukter?"
        id={id}
        filteredOptions={filteredOptions}
        options={props.options}
        onChange={(event) => setValue(event.target.value)}
        onToggleSelected={onToggleSelected}
        selectedOptions={selectedOptions}
        value={value}
      />
    </>
  );
};

Controlled.args = {
  value: "apple",
  options,
  selectedOptions: initialSelectedOptions,
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const CancelInputTest = {
  render: () => {
    return (
      <div data-theme="light">
        <Combobox options={options} label="Hva er dine favorittfrukter?" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "apple", { delay: 200 });
    await sleep(1000);

    userEvent.keyboard("{ArrowDown}");
    await sleep(1000);
    userEvent.keyboard("{Escape}");
    await sleep(1000);
    userEvent.keyboard("{ArrowDown}");
    const banana = canvas.getByText("banana");
    userEvent.click(banana);
  },
};

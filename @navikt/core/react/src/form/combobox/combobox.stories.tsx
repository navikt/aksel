/* eslint-disable react-hooks/rules-of-hooks */
import { Meta } from "@storybook/react";
import React, { useState, useId, useMemo } from "react";
import { userEvent, within } from "@storybook/testing-library";
import { Chips, UNSAFE_Combobox, TextField } from "../../index";
import { expect, jest } from "@storybook/jest";

export default {
  title: "ds-react/Combobox",
  component: UNSAFE_Combobox,
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

const DemoContainer = ({
  dataTheme,
  children,
}: {
  children: any;
  dataTheme: "dark" | "light";
}) => (
  <div data-theme={dataTheme} style={{ width: "300px" }}>
    {children}
  </div>
);

export const Default = (props) => {
  const id = useId();
  return (
    <DemoContainer dataTheme={props.darkMode}>
      <UNSAFE_Combobox
        options={props.options}
        label="Hva er dine favorittfrukter?"
        /* everything under here is optional? */
        shouldAutocomplete={props.shouldAutoComplete}
        size="medium"
        id={id}
      />
    </DemoContainer>
  );
};

Default.args = {
  options,
  shouldAutoComplete: true,
};

export function MultiSelect(props) {
  const id = useId();
  return (
    <DemoContainer dataTheme={props.darkMode}>
      <UNSAFE_Combobox
        id={id}
        label="Komboboks - velg flere"
        options={props.options}
        isMultiSelect={props.isMultiSelect}
        size={props.size}
      />
    </DemoContainer>
  );
}

MultiSelect.args = {
  options,
  isMultiSelect: true,
  size: "medium",
};

export function WithAddNewOptions(props) {
  const id = useId();
  return (
    <DemoContainer dataTheme={props.darkMode}>
      <UNSAFE_Combobox
        id={id}
        label="Komboboks med mulighet for å legge til nye verdier"
        options={props.options}
        allowNewValues={props.allowNewValues}
        shouldAutocomplete={props.shouldAutoComplete}
      />
    </DemoContainer>
  );
}

WithAddNewOptions.args = {
  options,
  allowNewValues: true,
  shouldAutoComplete: true,
};

export function MultiSelectWithAddNewOptions(props) {
  const id = useId();
  return (
    <DemoContainer dataTheme={props.darkMode}>
      <UNSAFE_Combobox
        id={id}
        isMultiSelect={props.isMultiSelect}
        label="Multiselect komboboks med mulighet for å legge til nye verdier"
        options={props.options}
        allowNewValues={props.allowNewValues}
      />
    </DemoContainer>
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
    <DemoContainer dataTheme={props.darkMode}>
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
      <UNSAFE_Combobox
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
    </DemoContainer>
  );
};

MultiSelectWithExternalChips.args = {
  controlled: false,
  options,
  selectedOptions: [],
};

export function Loading(props) {
  const id = useId();
  return (
    <DemoContainer dataTheme={props.darkMode}>
      <UNSAFE_Combobox
        id={id}
        label="Komboboks (laster)"
        options={[]}
        selectedOptions={[]}
        isListOpen={props.isListOpen}
        isLoading={props.isLoading}
      />
    </DemoContainer>
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
    <DemoContainer dataTheme={props.darkMode}>
      <UNSAFE_Combobox
        id={id}
        label="Komboboks (uten søketreff)"
        options={props.options}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        isListOpen={true}
      />
    </DemoContainer>
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
    <DemoContainer dataTheme={props.darkMode}>
      <TextField
        label="Overstyr value"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
      <br />
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        id={id}
        filteredOptions={filteredOptions}
        isMultiSelect
        options={props.options}
        onChange={(event) => setValue(event.target.value)}
        onToggleSelected={onToggleSelected}
        selectedOptions={selectedOptions}
        value={value}
      />
    </DemoContainer>
  );
};

Controlled.args = {
  value: "apple",
  options,
  selectedOptions: initialSelectedOptions,
};

export const ComboboxSizes = (props) => (
  <DemoContainer dataTheme={props.darkMode}>
    <UNSAFE_Combobox
      label="Hva er dine favorittfrukter?"
      description="Medium single-select"
      options={options}
    />
    <br />
    <UNSAFE_Combobox
      label="Hva er dine favorittfrukter?"
      description="Small single-select"
      options={options}
      size="small"
    />
    <br />
    <UNSAFE_Combobox
      label="Hva er dine favorittfrukter?"
      description="Medium multiselect"
      options={options}
      isMultiSelect
      allowNewValues
    />
    <br />
    <UNSAFE_Combobox
      label="Hva er dine favorittfrukter?"
      description="Small multiselect"
      options={options}
      isMultiSelect
      size="small"
      allowNewValues
    />
  </DemoContainer>
);

ComboboxSizes.args = {
  options,
};

export const WithError = {
  args: {
    error: "Du må velge en favorittfrukt.",
    isLoading: true,
  },
  render: (props) => {
    const [hasSelectedValue, setHasSelectedValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return (
      <DemoContainer dataTheme={props.darkMode}>
        <UNSAFE_Combobox
          filteredOptions={isLoading ? [] : undefined}
          options={options}
          label="Hva er dine favorittfrukter?"
          error={!hasSelectedValue && props.error}
          isLoading={isLoading}
          onChange={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 2000);
          }}
          onToggleSelected={(_, isSelected) => setHasSelectedValue(isSelected)}
        />
      </DemoContainer>
    );
  },
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const CancelInputTest = {
  render: (props) => {
    return (
      <DemoContainer dataTheme={props.darkMode}>
        <UNSAFE_Combobox
          options={options}
          label="Hva er dine favorittfrukter?"
        />
      </DemoContainer>
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
    await sleep(500);
    const banana = canvas.getByText("banana");
    userEvent.click(banana);
  },
};

export const RemoveSelectedMultiSelectTest = {
  render: (props) => {
    return (
      <DemoContainer dataTheme={props.darkMode}>
        <UNSAFE_Combobox
          options={options}
          label="Hva er dine favorittfrukter?"
          isMultiSelect
        />
      </DemoContainer>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "apple", { delay: 200 });
    await sleep(250);

    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    userEvent.keyboard("{Enter}");
    await sleep(250);
    userEvent.keyboard("{Escape}");
    await sleep(250);

    userEvent.click(input);
    await userEvent.type(input, "banana", { delay: 200 });
    await sleep(250);

    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    userEvent.keyboard("{Enter}");
    await sleep(250);

    const appleSlett = canvas.getByLabelText("apple slett");
    appleSlett.focus();
    await sleep(250);
    userEvent.click(appleSlett);
    await sleep(250);
    const appleOption = canvas.getByRole("option", {
      name: "apple",
      selected: false,
    });
    expect(appleOption).toBeVisible();
    userEvent.keyboard("{Escape}");
    await sleep(250);
    expect(appleOption).not.toBeVisible();

    const bananaSlett = canvas.getByLabelText("banana slett");
    expect(bananaSlett).toBeInTheDocument();
    const appleSlettAgain = canvas.queryByLabelText("apple slett");
    expect(appleSlettAgain).not.toBeInTheDocument();
  },
};

export const AddWhenAddNewDisabledTest = {
  render: (props) => {
    return (
      <DemoContainer dataTheme={props.darkMode}>
        <UNSAFE_Combobox
          options={options}
          label="Hva er dine favorittfrukter?"
          isMultiSelect
        />
      </DemoContainer>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");

    userEvent.click(input);
    await userEvent.type(input, "aaa", { delay: 200 });
    await sleep(250);

    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    userEvent.keyboard("{Enter}");
    await sleep(250);
    userEvent.keyboard("{Escape}");
    await sleep(250);

    const invalidSelect = canvas.queryByLabelText("aaa slett");
    expect(invalidSelect).not.toBeInTheDocument();
  },
};

export const TestThatCallbacksOnlyFireWhenExpected = {
  args: {
    onChange: jest.fn(),
    onClear: jest.fn(),
    onToggleSelected: jest.fn(),
  },
  render: (props) => {
    return (
      <DemoContainer dataTheme={props.darkMode}>
        <UNSAFE_Combobox
          options={options}
          label="Hva er dine favorittfrukter?"
          {...props}
        />
      </DemoContainer>
    );
  },
  play: async ({ canvasElement, args }) => {
    args.onToggleSelected.mockClear();
    args.onClear.mockClear();
    args.onChange.mockClear();
    const canvas = within(canvasElement);

    const input = canvas.getByLabelText("Hva er dine favorittfrukter?");
    const searchWord = "tangerine";

    userEvent.click(input);
    await userEvent.type(input, searchWord, { delay: 200 });
    await sleep(250);
    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    userEvent.keyboard("{Enter}");
    await sleep(250);
    expect(args.onClear.mock.calls).toHaveLength(1);
    expect(args.onToggleSelected.mock.calls).toHaveLength(1);
    expect(args.onChange.mock.calls).toHaveLength(searchWord.length + 1);
  },
};

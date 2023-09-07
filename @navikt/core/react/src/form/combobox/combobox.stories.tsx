/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useState, useId, useMemo } from "react";
import { userEvent, within } from "@storybook/testing-library";
import { Chips, UNSAFE_Combobox, ComboboxProps, TextField } from "../../index";
import { expect, jest } from "@storybook/jest";

export default {
  title: "ds-react/Combobox",
  component: UNSAFE_Combobox,
  decorators: [(story) => <div style={{ width: "300px" }}>{story()}</div>],
} satisfies Meta<typeof UNSAFE_Combobox>;

type StoryObject = StoryObj<typeof UNSAFE_Combobox>;
type StoryFunction = StoryFn<typeof UNSAFE_Combobox>;

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

export const Default: StoryFunction = (props) => {
  const id = useId();
  return <UNSAFE_Combobox {...props} id={id} />;
};
Default.args = {
  options,
  label: "Hva er dine favorittfrukter?",
  shouldAutocomplete: true,
  isLoading: false,
};
Default.argTypes = {
  isListOpen: {
    control: { type: "boolean" },
  },
  size: {
    options: ["medium", "small"],
    defaultValue: "medium",
    control: { type: "radio" },
  },
};

export const MultiSelect: StoryFunction = (props) => {
  const id = useId();
  return (
    <UNSAFE_Combobox
      id={id}
      label="Komboboks - velg flere"
      options={props.options}
      isMultiSelect={props.isMultiSelect}
      size={props.size}
    />
  );
};

MultiSelect.args = {
  options,
  isMultiSelect: true,
  size: "medium",
};

export const WithAddNewOptions: StoryFunction = (props) => {
  const id = useId();
  return (
    <UNSAFE_Combobox
      id={id}
      label="Komboboks med mulighet for å legge til nye verdier"
      options={props.options}
      allowNewValues={props.allowNewValues}
      shouldAutocomplete={props.shouldAutocomplete}
    />
  );
};

WithAddNewOptions.args = {
  options,
  allowNewValues: true,
  shouldAutocomplete: true,
};

export const MultiSelectWithAddNewOptions: StoryFunction = (props) => {
  const id = useId();
  return (
    <UNSAFE_Combobox
      id={id}
      isMultiSelect={props.isMultiSelect}
      label="Multiselect komboboks med mulighet for å legge til nye verdier"
      options={props.options}
      allowNewValues={props.allowNewValues}
    />
  );
};

MultiSelectWithAddNewOptions.args = {
  allowNewValues: true,
  isMultiSelect: true,
  options,
  shouldAutocomplete: false,
};

export const MultiSelectWithExternalChips: StoryFn<{
  controlled: boolean;
  options: ComboboxProps["options"];
}> = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const id = useId();

  const toggleSelected = (option: string) =>
    selectedOptions.includes(option)
      ? setSelectedOptions(selectedOptions.filter((opt) => opt !== option))
      : setSelectedOptions([...selectedOptions, option]);
  return (
    <>
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
        options={props.options}
        selectedOptions={selectedOptions}
        onToggleSelected={(option) => toggleSelected(option)}
        isMultiSelect
        value={props.controlled ? value : undefined}
        onChange={(event) =>
          props.controlled
            ? setValue(event?.currentTarget.value || "")
            : undefined
        }
        label="Komboboks"
        size="medium"
        id={id}
        shouldShowSelectedOptions={false}
      />
    </>
  );
};

MultiSelectWithExternalChips.args = {
  controlled: false,
  options,
};

export const Loading: StoryFunction = (props) => {
  const id = useId();
  return (
    <UNSAFE_Combobox
      id={id}
      label="Komboboks (laster)"
      options={[]}
      selectedOptions={[]}
      isListOpen={props.isListOpen}
      isLoading={props.isLoading}
    />
  );
};

Loading.args = {
  isLoading: true,
  isListOpen: true,
};

export const ComboboxWithNoHits: StoryFunction = (props) => {
  const id = useId();
  const [value, setValue] = useState(props.value);
  return (
    <UNSAFE_Combobox
      id={id}
      label="Komboboks (uten søketreff)"
      options={props.options}
      value={value}
      onChange={(event) => setValue(event?.currentTarget.value)}
      isListOpen={true}
    />
  );
};

ComboboxWithNoHits.args = {
  options,
  value: "Orange",
};

export const Controlled: StoryFn<{
  value: string;
  options: string[];
  initialSelectedOptions: string[];
}> = (props) => {
  const id = useId();
  const [value, setValue] = useState(props.value);
  const [selectedOptions, setSelectedOptions] = useState(
    props.initialSelectedOptions
  );
  const filteredOptions = useMemo(
    () => props.options.filter((option) => option.includes(value)),
    [props.options, value]
  );

  const onToggleSelected = (option: string, isSelected: boolean) => {
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
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        id={id}
        filteredOptions={filteredOptions}
        isMultiSelect
        options={props.options}
        onChange={(event) => setValue(event?.target.value || "")}
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
  initialSelectedOptions: ["passion fruit", "grape fruit"],
};

export const ComboboxSizes = () => (
  <>
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
  </>
);

export const MaxSelectedOptions = () => {
  const id = useId();
  return (
    <UNSAFE_Combobox
      id={id}
      label="Komboboks med begrenset antall valg"
      options={options}
      maxSelectedOptions={2}
      selectedOptions={[options[0], options[1]]}
      isMultiSelect
      allowNewValues
      isListOpen
      value="a"
    />
  );
};

export const WithError: StoryObject = {
  args: {
    error: "Du må velge en favorittfrukt.",
  },
  render: (props) => {
    const [hasSelectedValue, setHasSelectedValue] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return (
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
    );
  },
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const CancelInputTest: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox options={options} label="Hva er dine favorittfrukter?" />
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

export const RemoveSelectedMultiSelectTest: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        isMultiSelect
      />
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

export const AddWhenAddNewDisabledTest: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        isMultiSelect
      />
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

export const TestThatCallbacksOnlyFireWhenExpected: StoryObj<{
  onChange: ReturnType<typeof jest.fn>;
  onClear: ReturnType<typeof jest.fn>;
  onToggleSelected: ReturnType<typeof jest.fn>;
}> = {
  args: {
    onChange: jest.fn(),
    onClear: jest.fn(),
    onToggleSelected: jest.fn(),
  },
  render: (props) => {
    return (
      <UNSAFE_Combobox
        options={options}
        label="Hva er dine favorittfrukter?"
        {...props}
      />
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

export const TestHoverAndFocusSwitching: StoryObject = {
  render: () => {
    return (
      <UNSAFE_Combobox options={options} label="Hva er dine favorittfrukter?" />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await sleep(500);

    const getInput = () =>
      canvas.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });

    userEvent.click(getInput());
    expect(getInput().getAttribute("aria-expanded")).toEqual("false");
    expect(getInput().getAttribute("aria-activedescendant")).toBeNull();

    await sleep(250);
    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    const bananaOption = canvas.getByRole("option", { name: "banana" });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      bananaOption.getAttribute("id")
    );

    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    const appleOption = canvas.getByRole("option", { name: "apple" });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      appleOption.getAttribute("id")
    );

    userEvent.hover(bananaOption);
    await sleep(250);
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      bananaOption.getAttribute("id")
    );
  },
};

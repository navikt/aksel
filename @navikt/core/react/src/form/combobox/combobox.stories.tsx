import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, within } from "@storybook/test";
import React, { useMemo, useRef, useState } from "react";
import { Chips } from "../../chips";
import { TextField } from "../textfield";
import { ComboboxProps, UNSAFE_Combobox } from "./index";

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

export const Default: StoryFunction = (props) => (
  <UNSAFE_Combobox {...props} id="combobox" />
);

Default.args = {
  options,
  label: "Hva er dine favorittfrukter?",
  shouldAutocomplete: true,
  isLoading: false,
  isMultiSelect: false,
  allowNewValues: false,
};
Default.argTypes = {
  isListOpen: {
    control: { type: "boolean" },
  },
  maxSelected: {
    control: { type: "number" },
  },
  size: {
    options: ["medium", "small"],
    defaultValue: "medium",
    control: { type: "radio" },
  },
};

export const MultiSelect: StoryFunction = (props) => {
  return (
    <UNSAFE_Combobox
      id="combobox-with-multiselect"
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

export const MultiSelectWithComplexOptions: StoryFunction = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <>
      <UNSAFE_Combobox
        {...props}
        options={props.options.map((option) => ({
          ...option,
          label: `${option.label} [${option.value}]`,
        }))}
        id="combobox-with-complex-options"
        label="Velg temakoder"
        allowNewValues
        onToggleSelected={(value, isSelected) =>
          isSelected
            ? setSelectedOptions([...selectedOptions, value])
            : setSelectedOptions(selectedOptions.filter((o) => o !== value))
        }
        selectedOptions={selectedOptions}
      />
    </>
  );
};

MultiSelectWithComplexOptions.args = {
  options: [
    { label: "Hjelpemidler", value: "HJE" },
    { label: "Oppfølging", value: "OPP" },
    { label: "Sykepenger", value: "SYK" },
    { label: "Sykemelding", value: "SYM" },
    { label: "Foreldre- og svangerskapspenger", value: "FOR" },
    { label: "Arbeidsavklaringspenger", value: "AAP" },
    { label: "Uføretrygd", value: "UFO" },
    { label: "Pensjon", value: "PEN" },
    { label: "Barnetrygd", value: "BAR" },
    { label: "Kontantstøtte", value: "KON" },
    { label: "Bostøtte", value: "BOS" },
    { label: "Barnebidrag", value: "BBI" },
    { label: "Bidragsforskudd", value: "BIF" },
    { label: "Grunn- og hjelpestønad", value: "GRU" },
  ],
  isMultiSelect: true,
  size: "medium",
};

export const WithAddNewOptions: StoryFunction = (props) => {
  return (
    <UNSAFE_Combobox
      id="combobox-with-add-new-options"
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
  return (
    <UNSAFE_Combobox
      id="combobox-with-multiselect-and-add-new-options"
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
        id="combobox-with-external-chips"
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
        shouldShowSelectedOptions={false}
      />
    </>
  );
};

MultiSelectWithExternalChips.args = {
  controlled: false,
  options,
};

export const Loading: StoryFunction = (props) => (
  <UNSAFE_Combobox
    id="combobox-with-loading-indicator"
    label="Komboboks (laster)"
    options={[]}
    selectedOptions={[]}
    isListOpen={props.isListOpen}
    isLoading={props.isLoading}
  />
);

Loading.args = {
  isLoading: true,
  isListOpen: true,
};

export const ComboboxWithNoHits: StoryFunction = (props) => {
  const [value, setValue] = useState(props.value);
  return (
    <UNSAFE_Combobox
      id="combobox-with-no-hits"
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
  const [value, setValue] = useState(props.value);
  const [selectedOptions, setSelectedOptions] = useState(
    props.initialSelectedOptions,
  );
  const filteredOptions = useMemo(
    () => props.options.filter((option) => option.includes(value)),
    [props.options, value],
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
        id="combobox-controlled"
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

export const MaxSelectedOptions: StoryFunction = () => {
  const [value, setValue] = useState<string | undefined>("");
  const [selectedOptions, setSelectedOptions] = useState([
    options[0],
    options[1],
  ]);
  const comboboxRef = useRef<HTMLInputElement>(null);
  return (
    <UNSAFE_Combobox
      id="combobox-with-max-selected-options"
      label="Komboboks med begrenset antall valg"
      options={options}
      maxSelected={{ limit: 2 }}
      selectedOptions={selectedOptions}
      onToggleSelected={(option, isSelected) =>
        isSelected
          ? setSelectedOptions([...selectedOptions, option])
          : setSelectedOptions(selectedOptions.filter((o) => o !== option))
      }
      isMultiSelect
      allowNewValues
      isListOpen={comboboxRef.current ? undefined : true}
      value={value}
      onChange={(event) => setValue(event?.target.value)}
      ref={comboboxRef}
    />
  );
};

export const WithError: StoryFunction = (props) => {
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
};
WithError.args = {
  error: "Du må velge en favorittfrukt.",
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
  onChange: ReturnType<typeof fn>;
  onClear: ReturnType<typeof fn>;
  onToggleSelected: ReturnType<typeof fn>;
}> = {
  args: {
    onChange: fn(),
    onClear: fn(),
    onToggleSelected: fn(),
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

export const TestCasingWhenAutoCompleting = {
  args: {
    onChange: fn(),
    onClear: fn(),
    onToggleSelected: fn(),
  },
  render: (props) => {
    return (
      <UNSAFE_Combobox
        options={["Camel Case", "lowercase", "UPPERCASE"]}
        label="Liker du best store eller små bokstaver?"
        shouldAutocomplete
        allowNewValues
        {...props}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole<HTMLInputElement>("combobox");

    // With exisiting option
    userEvent.click(input);
    await userEvent.type(input, "cAmEl CaSe", { delay: 250 });
    await sleep(250);
    expect(input.value).toBe("cAmEl CaSe");
    await userEvent.type(input, "{Enter}");
    await sleep(250);
    const chips = canvas.getAllByRole("list")[0];
    const selectedUpperCaseChip = within(chips).getAllByRole("listitem")[0];
    expect(selectedUpperCaseChip).toHaveTextContent("Camel Case"); // A weird issue is preventing the accessible name from being used in the test, even if it works in VoiceOver

    // With custom option
    userEvent.click(input);
    await userEvent.type(input, "cAmEl{Backspace}", { delay: 250 });
    await sleep(250);
    expect(input.value).toBe("cAmEl");
    await userEvent.type(input, "{Enter}");
    await sleep(250);
    const selectedNewValueChip = within(chips).getAllByRole("listitem")[0];
    expect(selectedNewValueChip).toHaveTextContent("cAmEl"); // A weird issue is preventing the accessible name from being used in the test, even if it works in VoiceOver
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
      bananaOption.getAttribute("id"),
    );

    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    const appleOption = canvas.getByRole("option", { name: "apple" });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      appleOption.getAttribute("id"),
    );

    userEvent.hover(bananaOption);
    await sleep(250);
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      bananaOption.getAttribute("id"),
    );
  },
};

export const TestEnterNotSubmittingForm: StoryObj<{
  onSubmit: ReturnType<typeof fn>;
}> = {
  args: {
    onSubmit: fn(),
  },
  render: ({ onSubmit }) => {
    return (
      <form action="https://www.aksel.nav.no" method="get" onSubmit={onSubmit}>
        <UNSAFE_Combobox
          options={options}
          label="Hva er dine favorittfrukter?"
          isMultiSelect
        />
      </form>
    );
  },
  play: async ({ canvasElement, args }) => {
    args.onSubmit.mockClear();
    const canvas = within(canvasElement);

    await sleep(500);

    const getInput = () =>
      canvas.getByRole("combobox", {
        name: "Hva er dine favorittfrukter?",
      });

    userEvent.click(getInput());
    await sleep(250);

    userEvent.keyboard("{ArrowDown}");
    await sleep(250);
    const bananaOption = canvas.getByRole("option", { name: "banana" });
    expect(getInput().getAttribute("aria-activedescendant")).toBe(
      bananaOption.getAttribute("id"),
    );

    userEvent.keyboard("{Enter}");
    await sleep(250);
    expect(args.onSubmit).not.toHaveBeenCalled();

    userEvent.keyboard("{Shift>}{Tab}");
    await sleep(250);

    userEvent.keyboard("{Enter}");
    await sleep(250);
    expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

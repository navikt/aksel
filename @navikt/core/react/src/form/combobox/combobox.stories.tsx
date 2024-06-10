import { Meta, StoryFn } from "@storybook/react";
import React, { useMemo, useRef, useState } from "react";
import { Chips } from "../../chips";
import { VStack } from "../../layout/stack";
import { TextField } from "../textfield";
import { UNSAFE_Combobox } from "./index";

export default {
  title: "ds-react/Combobox",
  component: UNSAFE_Combobox,
  decorators: [(story) => <div style={{ width: "300px" }}>{story()}</div>],
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof UNSAFE_Combobox>;

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

export const MultiSelect: StoryFn = () => {
  return (
    <UNSAFE_Combobox
      id="combobox-with-multiselect"
      label="Komboboks - velg flere"
      options={options}
      isMultiSelect={true}
    />
  );
};

export const MultiSelectWithComplexOptions: StoryFn = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  return (
    <>
      <UNSAFE_Combobox
        options={complexOptions.map((option) => ({
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

const complexOptions = [
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
];

export const WithAddNewOptions: StoryFn = () => {
  return (
    <UNSAFE_Combobox
      id="combobox-with-add-new-options"
      label="Komboboks med mulighet for å legge til nye verdier"
      options={options}
      allowNewValues={true}
      shouldAutocomplete={true}
    />
  );
};

export const MultiSelectWithAddNewOptions: StoryFn = () => {
  return (
    <UNSAFE_Combobox
      id="combobox-with-multiselect-and-add-new-options"
      isMultiSelect={true}
      label="Multiselect komboboks med mulighet for å legge til nye verdier"
      options={options}
      allowNewValues={true}
    />
  );
};

export const MultiSelectWithExternalChips: StoryFn = () => {
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
        options={options}
        selectedOptions={selectedOptions}
        onToggleSelected={(option) => toggleSelected(option)}
        isMultiSelect
        value={value}
        onChange={(event) => setValue(event?.currentTarget.value || "")}
        label="Komboboks"
        size="medium"
        shouldShowSelectedOptions={false}
      />
    </>
  );
};

export const Loading: StoryFn = () => (
  <UNSAFE_Combobox
    id="combobox-with-loading-indicator"
    label="Komboboks (laster)"
    options={[]}
    selectedOptions={[]}
    isListOpen={true}
    isLoading={true}
  />
);

export const ComboboxWithNoHits: StoryFn = () => {
  const [value, setValue] = useState<string | undefined>("Orange");
  return (
    <UNSAFE_Combobox
      id="combobox-with-no-hits"
      label="Komboboks (uten søketreff)"
      options={options}
      value={value}
      onChange={(event) => setValue(event?.currentTarget.value)}
      isListOpen={true}
    />
  );
};

export const Controlled: StoryFn = () => {
  const [value, setValue] = useState<string>("apple");
  const [selectedOptions, setSelectedOptions] = useState([
    "passion fruit",
    "grape fruit",
  ]);
  const filteredOptions = useMemo(
    () => options.filter((option) => option.includes(value)),
    [value],
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
        options={options}
        onChange={(event) => setValue(event?.target.value || "")}
        onToggleSelected={onToggleSelected}
        selectedOptions={selectedOptions}
        value={value}
      />
    </>
  );
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

export const MaxSelectedOptions: StoryFn = () => {
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

export const WithError: StoryFn = () => {
  const [hasSelectedValue, setHasSelectedValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <UNSAFE_Combobox
      filteredOptions={isLoading ? [] : undefined}
      options={options}
      label="Hva er dine favorittfrukter?"
      error={!hasSelectedValue && "Du må velge en favorittfrukt."}
      isLoading={isLoading}
      onChange={() => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
      }}
      onToggleSelected={(_, isSelected) => setHasSelectedValue(isSelected)}
    />
  );
};

export const Chromatic: StoryFn = () => {
  return (
    <VStack gap="2">
      <h2>MultiSelect</h2>
      <MultiSelect />
      <h2>ComboboxWithNoHits</h2>
      <ComboboxWithNoHits />
      <h2 style={{ marginTop: "5rem" }}>MultiSelectWithComplexOptions</h2>
      <MultiSelectWithComplexOptions />
      <h2>WithAddNewOptions</h2>
      <WithAddNewOptions />
      <h2>MultiSelectWithAddNewOptions</h2>
      <MultiSelectWithAddNewOptions />
      <h2>MultiSelectWithExternalChips</h2>
      <MultiSelectWithExternalChips />
      <h2>Loading</h2>
      <Loading />
      <h2 style={{ marginTop: "5rem" }}>Controlled</h2>
      <Controlled />
      <h2>ComboboxSizes</h2>
      <ComboboxSizes />
      <h2>MaxSelectedOptions</h2>
      <MaxSelectedOptions />
      <h2 style={{ marginTop: "20rem" }}>WithError</h2>
      <WithError />
    </VStack>
  );
};

Chromatic.parameters = {
  chromatic: {
    disable: false,
  },
};

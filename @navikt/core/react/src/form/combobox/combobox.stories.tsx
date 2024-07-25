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
  onChange: console.log,
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
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "pear",
    "kiwi",
  ]);
  return (
    <UNSAFE_Combobox
      id="combobox-with-multiselect"
      label="Komboboks - velg flere"
      options={options}
      isMultiSelect={true}
      selectedOptions={selectedOptions}
      onToggleSelected={(option, isSelected) =>
        isSelected
          ? setSelectedOptions([...selectedOptions, option])
          : setSelectedOptions(selectedOptions.filter((o) => o !== option))
      }
    />
  );
};

export const MultiSelectWithComplexOptions: StoryFn = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "HJE",
    "OPP",
  ]);
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
        isMultiSelect
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

export const WithAddNewOptions: StoryFn = ({ open }: { open?: boolean }) => {
  const [value, setValue] = useState<string | undefined>("hello");
  const comboboxRef = useRef<HTMLInputElement>(null);
  return (
    <UNSAFE_Combobox
      id="combobox-with-add-new-options"
      label="Komboboks med mulighet for å legge til nye verdier"
      options={options}
      allowNewValues={true}
      shouldAutocomplete={true}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      isListOpen={open ?? (comboboxRef.current ? true : undefined)}
      ref={comboboxRef}
    />
  );
};

export const MultiSelectWithAddNewOptions: StoryFn = ({
  open,
}: {
  open?: boolean;
}) => {
  const [value, setValue] = useState<string | undefined>("world");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["hello"]);
  const comboboxRef = useRef<HTMLInputElement>(null);
  return (
    <UNSAFE_Combobox
      id="combobox-with-multiselect-and-add-new-options"
      isMultiSelect={true}
      label="Multiselect komboboks med mulighet for å legge til nye verdier"
      options={options}
      allowNewValues={true}
      value={value}
      selectedOptions={selectedOptions}
      onChange={(newValue) => setValue(newValue)}
      onToggleSelected={(option, isSelected) =>
        isSelected
          ? setSelectedOptions([...selectedOptions, option])
          : setSelectedOptions(selectedOptions.filter((o) => o !== option))
      }
      isListOpen={open ?? (comboboxRef.current ? true : undefined)}
      ref={comboboxRef}
    />
  );
};

export const MultiSelectWithExternalChips: StoryFn = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "kiwi",
    "pear",
  ]);
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
        onChange={(newValue) => setValue(newValue || "")}
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
      onChange={(newValue) => setValue(newValue)}
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
        onChange={(newValue) => setValue(newValue || "")}
        onToggleSelected={onToggleSelected}
        selectedOptions={selectedOptions}
        value={value}
      />
    </>
  );
};

export const ComboboxSizes = () => {
  const [multiSelectedOptions, setMultiSelectedOptions] = useState<string[]>([
    "pear",
    "kiwi",
  ]);
  const [singleSelectedOption, setSingleSelectedOption] = useState<string[]>([
    "apple",
  ]);
  return (
    <>
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        description="Medium single-select"
        options={options}
        selectedOptions={singleSelectedOption}
        onToggleSelected={(option, isSelected) =>
          isSelected
            ? setSingleSelectedOption([option])
            : setSingleSelectedOption(
                singleSelectedOption.filter((o) => o !== option),
              )
        }
      />
      <br />
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        description="Small single-select"
        options={options}
        size="small"
        selectedOptions={singleSelectedOption}
        onToggleSelected={(option, isSelected) =>
          isSelected
            ? setSingleSelectedOption([option])
            : setSingleSelectedOption(
                singleSelectedOption.filter((o) => o !== option),
              )
        }
      />
      <br />
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        description="Medium multiselect"
        options={options}
        isMultiSelect
        allowNewValues
        selectedOptions={multiSelectedOptions}
        onToggleSelected={(option, isSelected) =>
          isSelected
            ? setMultiSelectedOptions([...multiSelectedOptions, option])
            : setMultiSelectedOptions(
                multiSelectedOptions.filter((o) => o !== option),
              )
        }
      />
      <br />
      <UNSAFE_Combobox
        label="Hva er dine favorittfrukter?"
        description="Small multiselect"
        options={options}
        isMultiSelect
        size="small"
        allowNewValues
        selectedOptions={multiSelectedOptions}
        onToggleSelected={(option, isSelected) =>
          isSelected
            ? setMultiSelectedOptions([...multiSelectedOptions, option])
            : setMultiSelectedOptions(
                multiSelectedOptions.filter((o) => o !== option),
              )
        }
      />
    </>
  );
};

export const MaxSelectedOptions: StoryFn = ({ open }: { open?: boolean }) => {
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
      isListOpen={open ?? (comboboxRef.current ? undefined : true)}
      value={value}
      onChange={(newValue) => setValue(newValue)}
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
  const H2 = (props: { children: string; style?: React.CSSProperties }) => (
    <h2 style={{ marginBottom: "-0.25rem", ...props.style }}>
      {props.children}
    </h2>
  );
  return (
    <VStack gap="2">
      <H2>MultiSelect</H2>
      <MultiSelect />
      <H2>ComboboxWithNoHits</H2>
      <ComboboxWithNoHits />
      <H2 style={{ marginTop: "5rem" }}>MultiSelectWithComplexOptions</H2>
      <MultiSelectWithComplexOptions />
      <H2>WithAddNewOptions</H2>
      <WithAddNewOptions open />
      <H2 style={{ marginTop: "5rem" }}>MultiSelectWithAddNewOptions</H2>
      <MultiSelectWithAddNewOptions open />
      <H2 style={{ marginTop: "5rem" }}>MultiSelectWithExternalChips</H2>
      <MultiSelectWithExternalChips />
      <H2>Loading</H2>
      <Loading />
      <H2 style={{ marginTop: "5rem" }}>Controlled Input Value</H2>
      <Controlled />
      <H2>ComboboxSizes</H2>
      <ComboboxSizes />
      <H2>MaxSelectedOptions</H2>
      <MaxSelectedOptions open />
      <H2 style={{ marginTop: "20rem" }}>WithError</H2>
      <WithError />
    </VStack>
  );
};

Chromatic.parameters = {
  chromatic: {
    disable: false,
  },
};

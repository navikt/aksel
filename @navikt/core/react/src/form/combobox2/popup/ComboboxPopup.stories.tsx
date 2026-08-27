import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { HStack } from "../../../primitives/stack";
import { BodyShort } from "../../../typography";
import { ComboboxFilter } from "../filter/ComboboxFilter";
import { ComboboxList } from "../list/ComboboxList";
import { ComboboxPopup } from "../popup/ComboboxPopup";
import { ComboboxRoot } from "../root/ComboboxRoot";

const meta: Meta<typeof ComboboxRoot> = {
  title: "ds-react/Combobox2/Popup",
  component: ComboboxRoot,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type MyOption = {
  label: string;
  value: `opt-${number}`;
  metadata?: string;
};

const options: MyOption[] = [
  { label: "Norway", value: "opt-1", metadata: "foo1" },
  { label: "Finland", value: "opt-2" },
  { label: "Sweden", value: "opt-3", metadata: "foo3" },
  { label: "Denmark", value: "opt-4" },
  { label: "Iceland", value: "opt-5" },
  { label: "Faroe Islands", value: "opt-6" },
  { label: "Åland Islands", value: "opt-7" },
  { label: "Estonia", value: "opt-8" },
  { label: "Latvia", value: "opt-9" },
  { label: "Lithuania", value: "opt-10" },
];

type MyGroup = {
  label: string;
  id: `group-${number}`;
  options: MyOption[];
};

const groupedOptions: (MyGroup | MyOption)[] = [
  {
    label: "Nordic countries",
    id: "group-1",
    options: options.slice(0, 6),
  },
  {
    label: "Baltic countries",
    id: "group-2",
    options: options.slice(6),
  },
  { label: "Singel option", value: "opt-01" } satisfies MyOption,
];

export const Default = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  return (
    <ComboboxRoot
      defaultOpen
      options={options}
      selectedOptions={selectedOptions}
      onToggleOption={(option, newSelected) => {
        setSelectedOptions((prev) =>
          newSelected
            ? [...prev, option.value]
            : prev.filter((v) => v !== option.value),
        );
      }}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList />
      </ComboboxPopup>
    </ComboboxRoot>
  );
};

export const SingleSelect = () => {
  const [selectedOption, setSelectedOption] = useState<MyOption>(options[0]);

  return (
    <ComboboxRoot
      defaultOpen
      options={options}
      selectedOptions={[selectedOption.value]}
      onToggleOption={setSelectedOption}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList />
      </ComboboxPopup>
    </ComboboxRoot>
  );
};

export const Groups = () => {
  const [selectedOption, setSelectedOption] = useState<MyOption>(options[0]);

  return (
    <HStack gap="space-12">
      <ComboboxRoot
        defaultOpen
        options={groupedOptions}
        selectedOptions={[selectedOption.value]}
        onToggleOption={setSelectedOption}
      >
        <ComboboxPopup>
          <ComboboxFilter />
          <ComboboxList />
        </ComboboxPopup>
      </ComboboxRoot>

      <ComboboxRoot
        size="small"
        defaultOpen
        options={groupedOptions}
        selectedOptions={[selectedOption.value]}
        onToggleOption={setSelectedOption}
      >
        <ComboboxPopup>
          <ComboboxFilter />
          <ComboboxList />
        </ComboboxPopup>
      </ComboboxRoot>
    </HStack>
  );
};

export const CustomOptionRendering = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  return (
    <ComboboxRoot
      defaultOpen
      options={options}
      selectedOptions={selectedOptions}
      onToggleOption={(option, isSelected) => {
        setSelectedOptions(
          isSelected
            ? [...selectedOptions, option.value]
            : selectedOptions.filter((v) => v !== option.value),
        );
      }}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList<MyOption>>
          {(option) => (
            <HStack justify="space-between" align="center">
              <span>{option.label}</span>
              <BodyShort textColor="subtle" size="small">
                {"metadata" in option ? option.metadata : null}{" "}
                {option.label.substring(0, 2).toUpperCase()}
              </BodyShort>
            </HStack>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxRoot>
  );
};

export const CustomOptionRenderingGroups = () => {
  const [selectedOption, setSelectedOption] = useState<MyOption>(options[0]);

  return (
    <ComboboxRoot
      defaultOpen
      options={groupedOptions}
      selectedOptions={[selectedOption.value]}
      onToggleOption={setSelectedOption}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList<MyOption | MyGroup>>
          {(optOrGroup) =>
            "options" in optOrGroup ? (
              <em>{optOrGroup.label}</em>
            ) : (
              <HStack justify="space-between" align="center">
                <span>{optOrGroup.label}</span>
                <BodyShort textColor="subtle" size="small">
                  {optOrGroup.metadata}{" "}
                  {optOrGroup.label.substring(0, 2).toUpperCase()}
                </BodyShort>
              </HStack>
            )
          }
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxRoot>
  );
};
// Alternativer: Kun støtte option, måtte iterere selv, renderOption/group-props på root, flytte props ned (hvordan få tak i valgte i Input?) 🤔

export const ControlledInput = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);
  const [filterString, setFilterString] = useState("");
  const filterStringLowerCase = filterString.toLocaleLowerCase();

  const filteredOptions = filterString
    ? options
        .filter((option) =>
          option.label.toLocaleLowerCase().includes(filterStringLowerCase),
        )
        .sort((a, b) => {
          const labelA = a.label.toLocaleLowerCase();
          const labelB = b.label.toLocaleLowerCase();
          return labelA.startsWith(filterStringLowerCase) ===
            labelB.startsWith(filterStringLowerCase)
            ? 0
            : labelA.startsWith(filterStringLowerCase)
              ? -1
              : 1;
        })
    : options;

  return (
    <ComboboxRoot
      defaultOpen
      options={filteredOptions}
      selectedOptions={selectedOptions}
      onToggleOption={(option) => {
        setSelectedOptions((prev) =>
          prev.includes(option.value)
            ? prev.filter((v) => v !== option.value)
            : [...prev, option.value],
        );
      }}
    >
      <ComboboxPopup>
        <ComboboxFilter value={filterString} onChange={setFilterString} />
        <ComboboxList />
      </ComboboxPopup>
    </ComboboxRoot>
  );
};

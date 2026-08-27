import type { Meta, StoryFn } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { Button } from "../../button";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort } from "../../typography";
import { Select } from "../select";
import { Combobox, type ComboboxProps } from "./Combobox";
import { ComboboxField } from "./field/ComboboxField";
import { ComboboxFilter } from "./filter/ComboboxFilter";
import { ComboboxLabel } from "./label/ComboboxLabel";
import { ComboboxList } from "./list/ComboboxList";
import { ComboboxOverlay } from "./overlay/ComboboxOverlay";
import { ComboboxPopup } from "./popup/ComboboxPopup";
import { ComboboxRoot } from "./root/ComboboxRoot";
import { ComboboxTrigger } from "./trigger/ComboboxTrigger";

const meta: Meta<typeof ComboboxRoot> = {
  title: "ds-react/Combobox22",
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
  { label: "Norge", value: "opt-1", metadata: "foo1" },
  { label: "Finland", value: "opt-2" },
  { label: "Sverige", value: "opt-3", metadata: "foo3" },
  { label: "Danmark", value: "opt-4" },
  { label: "Island", value: "opt-5" },
  { label: "Færøyene", value: "opt-6" },
  { label: "Åland", value: "opt-7" },
  { label: "Estland", value: "opt-8" },
  { label: "Latvia", value: "opt-9" },
  { label: "Litauen", value: "opt-10" },
];

type MyGroup = {
  label: string;
  id: `group-${number}`;
  options: MyOption[];
};

const groupedOptions: (MyGroup | MyOption)[] = [
  {
    label: "Nordiske land",
    id: "group-1",
    options: options.slice(0, 6),
  },
  {
    label: "Baltiske land",
    id: "group-2",
    options: options.slice(6),
  },
  { label: "Ikke gruppert", value: "opt-01" } satisfies MyOption,
];

type DefaultProps = Pick<ComboboxProps<MyOption>, "label" | "description">;

export const Default: StoryFn<DefaultProps> = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  return (
    <Combobox
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
      {...props}
    />
  );
};
Default.args = {
  label: "Velg land",
  description: "Landet hvor du er født.",
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

type ManyOptionsProps = {
  count: number;
};
export const ManyOptions: StoryFn<ManyOptionsProps> = ({ count }) => {
  const [selectedOptions, setSelectedOptions] = useState(["opt-1"]);

  const manyOptions = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        label: `Option ${String(i + 1).padStart(4, "0")}`,
        value: `opt-${i + 1}`,
      })),
    [count],
  );

  return (
    <div style={{ minHeight: "400px", width: "250px" }}>
      <Combobox
        options={manyOptions}
        selectedOptions={selectedOptions}
        onToggleOption={(option) => {
          setSelectedOptions((prev) =>
            prev.includes(option.value)
              ? prev.filter((v) => v !== option.value)
              : [...prev, option.value],
          );
        }}
        label="Test"
      />
    </div>
  );
};
ManyOptions.args = {
  count: 5000,
};
ManyOptions.parameters = {
  a11y: { disable: true },
  docs: { disable: true },
};

export const Trigger = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  const [selectedOption, setSelectedOption] = useState<MyOption>(options[0]);

  const rootProps = {
    options,
    selectedOptions,
    onToggleOption: (option) => {
      setSelectedOptions((prev) =>
        prev.includes(option.value)
          ? prev.filter((v) => v !== option.value)
          : [...prev, option.value],
      );
    },
  };

  return (
    <HStack gap="space-16" align="start">
      <ComboboxRoot {...rootProps}>
        <ComboboxTrigger>
          <Button>Med input</Button>
        </ComboboxTrigger>
        <ComboboxOverlay>
          <ComboboxPopup>
            <ComboboxFilter />
            <ComboboxList />
          </ComboboxPopup>
        </ComboboxOverlay>
      </ComboboxRoot>

      <ComboboxRoot {...rootProps}>
        <ComboboxTrigger>
          <Button>Uten input</Button>
        </ComboboxTrigger>
        <ComboboxOverlay>
          <ComboboxPopup>
            <ComboboxList />
          </ComboboxPopup>
        </ComboboxOverlay>
      </ComboboxRoot>

      <ComboboxRoot
        options={options}
        selectedOptions={[selectedOption.value]}
        onToggleOption={setSelectedOption}
        multiselect={false}
      >
        <ComboboxTrigger>
          <Button>Single select</Button>
        </ComboboxTrigger>
        <ComboboxOverlay>
          <ComboboxPopup>
            <ComboboxList />
          </ComboboxPopup>
        </ComboboxOverlay>
      </ComboboxRoot>

      <VStack>
        <ComboboxRoot {...rootProps}>
          <ComboboxLabel>Velg land</ComboboxLabel>
          <ComboboxTrigger>
            <Button>Med input og label</Button>
          </ComboboxTrigger>
          <ComboboxOverlay>
            <ComboboxPopup>
              <ComboboxFilter />
              <ComboboxList />
            </ComboboxPopup>
          </ComboboxOverlay>
        </ComboboxRoot>
      </VStack>

      <Select label="Vanlig select">
        <option value="">Velg land</option>
        <option value="norge">Norge</option>
        <option value="sverige">Sverige</option>
        <option value="danmark">Danmark</option>
      </Select>

      <div style={{ width: "300px" }}>
        <ComboboxRoot
          options={options}
          selectedOptions={[selectedOption.value]}
          onToggleOption={setSelectedOption}
          multiselect={false}
        >
          <ComboboxLabel>Velg land</ComboboxLabel>
          <ComboboxTrigger>
            <ComboboxField />
          </ComboboxTrigger>
          <ComboboxOverlay>
            <ComboboxPopup>
              <ComboboxFilter />
              <ComboboxList />
            </ComboboxPopup>
          </ComboboxOverlay>
        </ComboboxRoot>
      </div>

      <ComboboxRoot {...rootProps}>
        <ComboboxLabel>Velg land</ComboboxLabel>
        <ComboboxTrigger>
          <ComboboxField />
        </ComboboxTrigger>
        <ComboboxOverlay>
          <ComboboxPopup>
            <ComboboxFilter />
            <ComboboxList />
          </ComboboxPopup>
        </ComboboxOverlay>
      </ComboboxRoot>
    </HStack>
  );
};
Trigger.parameters = { layout: "padded" };

export const TriggerSingleSelect = () => {
  const [selectedOption, setSelectedOption] = useState<MyOption>();

  return (
    <VStack gap="space-32" width="300px">
      <button type="button" onClick={() => console.log("Knapp før")}>
        Knapp før
      </button>

      <ComboboxRoot
        options={options}
        selectedOptions={selectedOption ? [selectedOption.value] : []}
        onToggleOption={setSelectedOption}
        multiselect={false}
      >
        <ComboboxLabel>Velg land (Combobox root)</ComboboxLabel>
        <ComboboxTrigger>
          <ComboboxField />
        </ComboboxTrigger>
        <ComboboxOverlay>
          <ComboboxPopup>
            <ComboboxFilter />
            <ComboboxList />
          </ComboboxPopup>
        </ComboboxOverlay>
      </ComboboxRoot>

      <Combobox
        options={options}
        selectedOptions={selectedOption ? [selectedOption.value] : []}
        onToggleOption={setSelectedOption}
        multiselect={false}
        label="Velg land (Combobox)"
        description="Beskrivelse"
      />

      <Select
        label="Velg land (vanlig select)"
        description="Dette er en vanlig select."
        //error="Test"
      >
        <option value=""></option>
        <option value="norway">Norway</option>
        <option value="finland">Finland</option>
        <option value="sweden">Sweden</option>
        <option value="denmark">Denmark</option>
        <option value="iceland">Iceland</option>
        <option value="faroe-islands">Faroe Islands</option>
        <option value="aland-islands">Åland Islands</option>
        <option value="estonia">Estonia</option>
        <option value="latvia">Latvia</option>
        <option value="lithuania">Lithuania</option>
      </Select>
    </VStack>
  );
};

/* TODO:
- Fullskjerm på mobil
- Følge Combobox-pattern (mer)? Kan ikke følge det slavisk uansett.
    Pil opp og ned velger
    Ikke loop
- Skal den hete noe annet enn Combobox? Er jo på en måte ikke det...
- Vurder om fokus skal låses til søkefelt (mest aktuelt ved multiselect).
- Åpne på pil ned (og ev. opp)?
- PageUp/Down
- Error, disabled (?), readonly osv.
- Vurder hvilke funksjoner i gamle CB vi skal ta med (maks valg, legg til osv.)
- Tester
- A11y-sjekk
- Beslutningsloggen?
- Ikke wrappe options


Utfordringer med komposisjon:
- Vanskelig å bruke
- Utfordrende for oss å endre (ref FormSummary)
- Context er litt magisk/uoversiktlig
- Description: Hvordan skal root/trigger vite at aria-describedby skal settes?
Forslag: Tilby enkeltkomponent for de vanligste tilfellene, men også subkomponentene for fleksibilitet.
  Kan ev. ha slot/render-props for enkelte ting.
  Kan ev. bruke children for å kunne bytte ut/skreddersy innholdet i popup.


Ressurser:
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/combobox_role
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/listbox_role
*/

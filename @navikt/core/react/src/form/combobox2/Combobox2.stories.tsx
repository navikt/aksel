import type { Meta, StoryFn } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { Button } from "../../button";
import { HStack, VStack } from "../../primitives/stack";
import { Select } from "../select";
import { Combobox, type ComboboxProps } from "./Combobox";
import { ComboboxField } from "./field/ComboboxField";
import { ComboboxFilter } from "./filter/ComboboxFilter";
import { ComboboxLabel } from "./label/ComboboxLabel";
import { ComboboxList } from "./list/ComboboxList";
import { ComboboxOverlay } from "./overlay/ComboboxOverlay";
import { ComboboxPopup } from "./popup/ComboboxPopup";
import {
  type ComboboxGroupData,
  type ComboboxOptionData,
  ComboboxRoot,
} from "./root/ComboboxRoot";
import { ComboboxTrigger } from "./trigger/ComboboxTrigger";

const meta: Meta<typeof Combobox> = {
  title: "ds-react/Combobox2",
  component: Combobox,
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

const countries: MyOption[] = [
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

const groupedCountries: (MyGroup | MyOption)[] = [
  {
    label: "Nordiske land",
    id: "group-1",
    options: countries.slice(0, 6),
  },
  {
    label: "Baltiske land",
    id: "group-2",
    options: countries.slice(6),
  },
  { label: "Annet (ikke gruppert)", value: "opt-01" } satisfies MyOption,
];

type DefaultProps = Pick<
  ComboboxProps<MyOption>,
  | "label"
  | "description"
  | "hideLabel"
  | "size"
  | "defaultOpen"
  | "multiselect"
  | "triggerId"
  | "readOnly"
>;

export const Default: StoryFn<DefaultProps> = (props) => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  return (
    <Combobox
      defaultOpen
      options={countries}
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
  hideLabel: false,
  defaultOpen: false,
  //multiselect: true,
  readOnly: false,
};
Default.argTypes = {
  size: {
    control: { type: "select" },
    options: ["small", "medium"],
  },
  triggerId: {
    control: { type: "text" },
  },
};

function BaseCombobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData> =
    MyOption,
>(props: Partial<ComboboxProps<T>>) {
  const [selectedOptions, setSelectedOptions] = useState(["opt-1"]);

  return (
    <Combobox
      options={countries as T[]}
      selectedOptions={selectedOptions}
      onToggleOption={(option, newSelected) => {
        setSelectedOptions((prev) =>
          newSelected
            ? [...prev, option.value]
            : prev.filter((v) => v !== option.value),
        );
      }}
      label="Velg land"
      description="Landet hvor du er født."
      {...props}
    />
  );
}

export const HideLabel = () => <BaseCombobox hideLabel />;

export const ReadOnly = () => <BaseCombobox readOnly />;

export const SingleSelect = () => {
  const [selectedOption, setSelectedOption] = useState<MyOption>(countries[0]);
  return (
    <BaseCombobox
      selectedOptions={[selectedOption.value]}
      onToggleOption={(option) => setSelectedOption(option)}
      multiselect={false}
    />
  );
};

export const Groups = () => {
  return (
    <HStack gap="space-56" minHeight="300px">
      <BaseCombobox
        options={groupedCountries}
        description="Landene du har statsborgerskap."
      />

      <BaseCombobox
        options={groupedCountries}
        description="Landene du har statsborgerskap."
        size="small"
      />
    </HStack>
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

export const Composition = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  const [selectedOption, setSelectedOption] = useState<MyOption>(countries[0]);

  const rootProps = {
    options: countries,
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
        options={countries}
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

      <ComboboxRoot
        options={countries}
        selectedOptions={[selectedOption.value]}
        onToggleOption={setSelectedOption}
        multiselect={false}
      >
        <ComboboxLabel>Velg land (single select)</ComboboxLabel>
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

      <ComboboxRoot {...rootProps}>
        <ComboboxLabel>Velg land (multiselect)</ComboboxLabel>
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
Composition.parameters = { layout: "padded" };

export const Testing = () => {
  const [selectedOption, setSelectedOption] = useState<MyOption>();

  return (
    <VStack gap="space-32" width="300px">
      <button type="button" onClick={() => console.log("Knapp før")}>
        Knapp før
      </button>

      <Combobox
        options={countries}
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

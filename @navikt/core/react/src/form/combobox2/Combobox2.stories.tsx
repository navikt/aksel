import type { Meta, StoryFn } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
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
  | "id"
  | "readOnly"
  | "disabled"
  | "error"
>;

export const Default: StoryFn<DefaultProps> = (props) => {
  return <Combobox defaultOpen options={countries} {...props} />;
};
Default.args = {
  label: "Velg land",
  description: "Landet hvor du er født.",
  hideLabel: false,
  defaultOpen: false,
  multiselect: false,
  readOnly: false,
  disabled: false,
  error: "",
};
Default.argTypes = {
  size: {
    control: { type: "select" },
    options: ["small", "medium"],
  },
  id: {
    control: { type: "text" },
  },
};

function BasicCombobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData> =
    MyOption,
>(props: Partial<ComboboxProps<T>>) {
  return (
    <Combobox
      options={countries as T[]}
      defaultSelectedOptions={["opt-1"]}
      label="Velg land"
      description="Landet hvor du er født."
      multiselect={false}
      {...props}
    />
  );
}

export const Small = () => <BasicCombobox size="small" error="Error" />;

export const Hidelabel = () => <BasicCombobox hideLabel />;

export const Readonly = () => <BasicCombobox readOnly />;

export const Disabled = () => <BasicCombobox disabled />;

export const ErrorStory = () => <BasicCombobox error="Du må velge et land." />;
ErrorStory.storyName = "Error";

export const DefaultOpen = () => <BasicCombobox defaultOpen />;
DefaultOpen.storyName = "DefaultOpen";

export const DefaultSelectedOptions = () => (
  <BasicCombobox defaultSelectedOptions={["opt-1"]} />
);
DefaultSelectedOptions.storyName = "DefaultSelectedOptions";

export const Name = () => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const land = formData.getAll("land");
      console.log(land);
    }}
  >
    <BasicCombobox name="land" />
    <br />
    <button type="submit">Submit</button>
  </form>
);

export const Controlled = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  return (
    <VStack gap="space-8" minWidth="250px">
      <Combobox
        options={countries}
        selectedOptions={selectedOptions}
        onToggleOption={(option, newSelected) => {
          setSelectedOptions((prev) =>
            newSelected
              ? [...prev, option.value]
              : prev.filter((v) => v !== option.value),
          );
        }}
        label="Velg land"
      />
      Selected: {selectedOptions.join(", ")}
      <div>
        <button type="button" onClick={() => setSelectedOptions([])}>
          Clear
        </button>
      </div>
    </VStack>
  );
};

export const Controlled2 = () => {
  const [selectedOptions, setSelectedOptions] = useState<MyOption["value"][]>([
    "opt-1",
  ]);

  return (
    <VStack gap="space-8" minWidth="250px">
      <Combobox
        options={countries}
        selectedOptions={selectedOptions}
        onSelectedOptionsChange={setSelectedOptions}
        label="Velg land"
      />
      Selected: {selectedOptions.join(", ")}
      <div>
        <button type="button" onClick={() => setSelectedOptions([])}>
          Clear
        </button>
      </div>
    </VStack>
  );
};

export const Groups = () => (
  <HStack gap="space-56" minHeight="300px">
    <BasicCombobox options={groupedCountries} />

    <BasicCombobox options={groupedCountries} size="small" />
  </HStack>
);

type ManyOptionsProps = {
  count: number;
};
export const ManyOptions: StoryFn<ManyOptionsProps> = ({ count }) => {
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
      <Combobox options={manyOptions} label="Test" />
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

export const LongLabels = () => (
  <div style={{ maxWidth: "300px" }}>
    <ComboboxRoot
      defaultOpen
      options={[
        {
          id: "group-1",
          label:
            "Dette er en veldig lang label for å teste hvordan lange labels håndteres",
          options: [
            {
              label:
                "Dette er en veldig lang label for å teste hvordan dette håndteres",
              value: "opt-1",
            },
            {
              label:
                "Dette er en veldig lang label for å teste hvordan dette håndteres",
              value: "opt-2",
            },
          ],
        },
      ]}
      selectedOptions={["opt-1"]}
      onToggleOption={() => {}}
    >
      <ComboboxField />
      <ComboboxPopup>
        <ComboboxList />
      </ComboboxPopup>
    </ComboboxRoot>
  </div>
);

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
          <ComboboxLabel htmlFor="demo">Velg land</ComboboxLabel>
          <ComboboxTrigger id="demo">
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
        <ComboboxLabel htmlFor="demo2">Velg land (single select)</ComboboxLabel>
        <ComboboxTrigger id="demo2">
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
        <ComboboxLabel htmlFor="demo3">Velg land (multiselect)</ComboboxLabel>
        <ComboboxTrigger id="demo3">
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

export const InDialog = () => {
  return (
    <Dialog defaultOpen>
      <Dialog.Trigger>
        <Button>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup width="small">
        <Dialog.Header>
          <Dialog.Title>Dialog title</Dialog.Title>
          <Dialog.Description>Dialog description</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <BasicCombobox />
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button>Close dialog</Button>
          </Dialog.CloseTrigger>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

export const Testing = () => {
  return (
    <VStack gap="space-32" width="300px">
      <button type="button" onClick={() => console.log("Knapp før")}>
        Knapp før
      </button>

      <Combobox
        options={countries}
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

      <Select label="Mange alternativer (vanlig select)">
        {Array.from({ length: 100 }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Don't care
          <option key={i} value={`opt-${i + 1}`}>
            {`Option ${String(i + 1).padStart(4, "0")}`}
          </option>
        ))}
      </Select>
    </VStack>
  );
};

/* TODO:
- Vurder om fokus skal låses til søkefelt (mest aktuelt ved multiselect).
- Åpne på pil ned (og ev. opp)?
- Vurder funksjoner fra gamle CB (ikke brukt: dropp, brukt lite: muliggjør med komposisjon, brukt mye: bygg inn støtte)
  - allowNewValues (er dette ofte egentlig Autocomplete?)
  - isLoading
  - maxSelected
- Skal den hete noe annet enn Combobox?
- Vurder om Label og Description (og error?) skal være sub-komponenter eller ikke.
- Følge Combobox-pattern (mer)? Kan ikke følge det slavisk uansett.
    Pil opp og ned velger
    Ikke loop
- A11y-sjekk (skjermleser, zoom, høykontrast...)
- Beslutningsloggen?


Utfordringer med komposisjon:
- Vanskelig å bruke
- Utfordrende for oss å endre (ref FormSummary)
- Context er litt magisk/uoversiktlig
- Description: Hvordan skal root/trigger vite at aria-describedby skal settes?
Forslag: Tilby enkeltkomponent for de vanligste tilfellene, men også subkomponentene for fleksibilitet.
  Kan ev. ha slot/render-props for enkelte ting.
  Kan ev. bruke children for å kunne bytte ut/skreddersy innholdet i popup.

*/

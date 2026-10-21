import type { Meta, StoryFn } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
import { HStack, VStack } from "../../primitives/stack";
import { ComboboxMulti, ComboboxSingle } from "./Combobox";
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

const meta: Meta<typeof ComboboxSingle> = {
  title: "ds-react/Combobox2",
  component: ComboboxSingle,
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

const nordicCountries: MyOption[] = [
  { label: "Norge", value: "opt-1", metadata: "foo1" },
  { label: "Finland", value: "opt-2" },
  { label: "Sverige", value: "opt-3", metadata: "foo3" },
  { label: "Danmark", value: "opt-4" },
  { label: "Island", value: "opt-5" },
  { label: "Grønland", value: "opt-6" },
  { label: "Færøyene", value: "opt-7" },
  { label: "Åland", value: "opt-8" },
];
const centralEuropeanCountries: MyOption[] = [
  { label: "Tyskland", value: "opt-9" },
  { label: "Østerrike", value: "opt-10" },
  { label: "Sveits", value: "opt-11" },
  { label: "Liechtenstein", value: "opt-12" },
  { label: "Polen", value: "opt-13" },
  { label: "Tsjekkia", value: "opt-14" },
  { label: "Slovakia", value: "opt-15" },
  { label: "Ungarn", value: "opt-16" },
  { label: "Slovenia", value: "opt-17" },
];
const countries: MyOption[] = [...nordicCountries, ...centralEuropeanCountries];

type MyGroup = {
  label: string;
  id: `group-${number}`;
  options: MyOption[];
};

const groupedCountries: (MyGroup | MyOption)[] = [
  {
    label: "Norden",
    id: "group-1",
    options: nordicCountries,
  },
  {
    label: "Sentral-Europa",
    id: "group-2",
    options: centralEuropeanCountries,
  },
  { label: "Annet (ikke gruppert)", value: "opt-01" } satisfies MyOption,
];

type DefaultProps = Pick<
  ComboboxSingle.Props<MyOption>,
  | "label"
  | "description"
  | "hideLabel"
  | "size"
  | "defaultOpen"
  | "id"
  | "readOnly"
  | "disabled"
  | "error"
>;

export const Default: StoryFn<DefaultProps> = (props) => {
  return <ComboboxSingle options={countries} {...props} />;
};
Default.args = {
  label: "Velg land",
  description: "Landet hvor du er født.",
  hideLabel: false,
  defaultOpen: false,
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

export const Multiselect = () => {
  return <ComboboxMulti label="Velg land" options={countries} />;
};
Multiselect.storyName = "Multiselect (WIP)";

function BasicCombobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData> =
    MyOption,
>(props: Partial<ComboboxSingle.Props<T>>) {
  return (
    <ComboboxSingle
      options={countries as T[]}
      defaultValue="opt-1"
      label="Velg land"
      description="Landet hvor du er født."
      {...props}
    />
  );
}

export const Small = () => <BasicCombobox size="small" error="Error" />;

export const Hidelabel = () => <BasicCombobox hideLabel />;

export const Readonly = () => <BasicCombobox readOnly error="Test" />;

export const Disabled = () => <BasicCombobox disabled error="Test" />;

export const ErrorStory = () => (
  <VStack gap="space-16">
    <BasicCombobox error="Du må velge et land." defaultValue={undefined} />
    <BasicCombobox error="Ugyldig land." />
  </VStack>
);
ErrorStory.storyName = "Error";

export const DefaultOpen = () => <BasicCombobox defaultOpen />;
DefaultOpen.storyName = "DefaultOpen";

export const DefaultValue = () => <BasicCombobox defaultValue="opt-1" />;
DefaultValue.storyName = "DefaultValue";

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
  const [value, setValue] = useState<MyOption["value"] | undefined>("opt-1");

  return (
    <VStack gap="space-8" minWidth="250px">
      <ComboboxSingle
        options={countries}
        value={value}
        onChange={setValue}
        label="Velg land"
      />
      Selected: {value}
      <div>
        <button type="button" onClick={() => setValue(undefined)}>
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
      <ComboboxSingle options={manyOptions} label="Test" />
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
      value={["opt-1"]}
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
  const [value, setSelectedOptions] = useState<MyOption["value"][]>(["opt-1"]);

  const [selectedOption, setSelectedOption] = useState<MyOption>(countries[0]);

  const rootProps = {
    options: countries,
    value,
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
        <ComboboxTrigger openWhenStartsTyping={false}>
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
        value={[selectedOption.value]}
        onToggleOption={setSelectedOption}
        multiple={false}
      >
        <ComboboxTrigger openWhenStartsTyping={false}>
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
        value={[selectedOption.value]}
        onToggleOption={setSelectedOption}
        multiple={false}
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
        <ComboboxLabel htmlFor="demo3">Velg land (multiple)</ComboboxLabel>
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

function WithValidation() {
  const [error, setError] = useState("Du må velge et land");
  return (
    <BasicCombobox
      options={nordicCountries}
      defaultValue={undefined}
      error={error}
      onChange={(newVal) => {
        if (!newVal) {
          setError("Du må velge et land");
          return;
        }
        setError(newVal === "opt-5" ? "" : "Du må velge Island");
      }}
    />
  );
}

export const ScreenreaderTesting = () => (
  <div>
    <h2>Med grupper</h2>
    <BasicCombobox options={groupedCountries} defaultValue={undefined} />

    <h2>Uten grupper</h2>
    <BasicCombobox options={nordicCountries} defaultValue={undefined} />

    <h2>Label skjult visuelt</h2>
    <BasicCombobox options={nordicCountries} hideLabel />

    <h2>Med feilmelding</h2>
    <WithValidation />

    <h2>Readonly med verdi</h2>
    <BasicCombobox readOnly />

    <h2>Readonly uten verdi</h2>
    <BasicCombobox readOnly defaultValue={undefined} />

    <h2>Disabled</h2>
    <BasicCombobox disabled />
  </div>
);

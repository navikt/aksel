import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { Button } from "../../button";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort } from "../../typography";
import { Select } from "../select";
import { Combobox } from "./Combobox";
import { ComboboxField } from "./field/ComboboxField";
import { ComboboxFilter } from "./filter/ComboboxFilter";
import { ComboboxLabel } from "./label/ComboboxLabel";
import { ComboboxList } from "./list/ComboboxList";
import { ComboboxOverlay } from "./overlay/ComboboxOverlay";
import { ComboboxPopup } from "./popup/ComboboxPopup";
import { ComboboxRoot } from "./root/ComboboxRoot";
import { ComboboxTrigger } from "./trigger/ComboboxTrigger";

const meta: Meta<typeof ComboboxRoot> = {
  title: "ds-react/Combobox2",
  component: ComboboxRoot,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type MyItem = {
  label: string;
  value: `item-${number}`;
  metadata?: string;
};

const items: MyItem[] = [
  { label: "Norway", value: "item-1", metadata: "foo1" },
  { label: "Finland", value: "item-2" },
  { label: "Sweden", value: "item-3", metadata: "foo3" },
  { label: "Denmark", value: "item-4" },
  { label: "Iceland", value: "item-5" },
  { label: "Faroe Islands", value: "item-6" },
  { label: "Åland Islands", value: "item-7" },
  { label: "Estonia", value: "item-8" },
  { label: "Latvia", value: "item-9" },
  { label: "Lithuania", value: "item-10" },
];

type MyGroup = {
  label: string;
  id: `group-${number}`;
  items: MyItem[];
};

const groupedItems: (MyGroup | MyItem)[] = [
  {
    label: "Nordic countries",
    id: "group-1",
    items: items.slice(0, 6),
  },
  {
    label: "Baltic countries",
    id: "group-2",
    items: items.slice(6),
  },
  { label: "Singel item", value: "item-01" } satisfies MyItem,
];

export const Default = () => {
  const [selectedItems, setSelectedItems] = React.useState<MyItem["value"][]>([
    "item-1",
  ]);

  return (
    <ComboboxRoot
      defaultOpen
      items={items}
      selectedItems={selectedItems}
      onToggleItem={(item, newSelected) => {
        setSelectedItems((prev) =>
          newSelected
            ? [...prev, item.value]
            : prev.filter((v) => v !== item.value),
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
  const [selectedItem, setSelectedItem] = React.useState<MyItem>(items[0]);

  return (
    <ComboboxRoot
      defaultOpen
      items={items}
      selectedItems={[selectedItem.value]}
      onToggleItem={setSelectedItem}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList />
      </ComboboxPopup>
    </ComboboxRoot>
  );
};

export const Groups = () => {
  const [selectedItem, setSelectedItem] = React.useState<MyItem>(items[0]);

  return (
    <HStack gap="space-12">
      <ComboboxRoot
        defaultOpen
        items={groupedItems}
        selectedItems={[selectedItem.value]}
        onToggleItem={setSelectedItem}
      >
        <ComboboxPopup>
          <ComboboxFilter />
          <ComboboxList />
        </ComboboxPopup>
      </ComboboxRoot>

      <ComboboxRoot
        size="small"
        defaultOpen
        items={groupedItems}
        selectedItems={[selectedItem.value]}
        onToggleItem={setSelectedItem}
      >
        <ComboboxPopup>
          <ComboboxFilter />
          <ComboboxList />
        </ComboboxPopup>
      </ComboboxRoot>
    </HStack>
  );
};

export const CustomItemRendering = () => {
  const [selectedItems, setSelectedItems] = useState<MyItem["value"][]>([
    "item-1",
  ]);

  return (
    <ComboboxRoot
      defaultOpen
      items={items}
      selectedItems={selectedItems}
      onToggleItem={(item, isSelected) => {
        setSelectedItems(
          isSelected
            ? [...selectedItems, item.value]
            : selectedItems.filter((v) => v !== item.value),
        );
      }}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList<MyItem>>
          {(item) => (
            <HStack justify="space-between" align="center">
              <span>{item.label}</span>
              <BodyShort textColor="subtle" size="small">
                {"metadata" in item ? item.metadata : null}{" "}
                {item.label.substring(0, 2).toUpperCase()}
              </BodyShort>
            </HStack>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxRoot>
  );
};

export const CustomItemRenderingGroups = () => {
  const [selectedItem, setSelectedItem] = React.useState<MyItem>(items[0]);

  return (
    <ComboboxRoot
      defaultOpen
      items={groupedItems}
      selectedItems={[selectedItem.value]}
      onToggleItem={setSelectedItem}
    >
      <ComboboxPopup>
        <ComboboxFilter />
        <ComboboxList<MyItem | MyGroup>>
          {(itemOrGroup) =>
            "items" in itemOrGroup ? (
              <em>{itemOrGroup.label}</em>
            ) : (
              <HStack justify="space-between" align="center">
                <span>{itemOrGroup.label}</span>
                <BodyShort textColor="subtle" size="small">
                  {itemOrGroup.metadata}{" "}
                  {itemOrGroup.label.substring(0, 2).toUpperCase()}
                </BodyShort>
              </HStack>
            )
          }
        </ComboboxList>
      </ComboboxPopup>
    </ComboboxRoot>
  );
};
// Alternativer: Kun støtte item, måtte iterere selv, renderItem/group-props på root, flytte props ned (hvordan få tak i valgte i Input?) 🤔

export const ControlledInput = () => {
  const [selectedItems, setSelectedItems] = useState<MyItem["value"][]>([
    "item-1",
  ]);
  const [filterString, setFilterString] = useState("");
  const filterStringLowerCase = filterString.toLocaleLowerCase();

  const filteredItems = filterString
    ? items
        .filter((item) =>
          item.label.toLocaleLowerCase().includes(filterStringLowerCase),
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
    : items;

  return (
    <ComboboxRoot
      defaultOpen
      items={filteredItems}
      selectedItems={selectedItems}
      onToggleItem={(item) => {
        setSelectedItems((prev) =>
          prev.includes(item.value)
            ? prev.filter((v) => v !== item.value)
            : [...prev, item.value],
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

const manyItems = Array.from({ length: 10_000 }, (_, i) => ({
  label: `Item ${String(i + 1).padStart(4, "0")}`,
  value: `item-${i + 1}`,
}));

export const ManyItems = () => {
  const [selectedItems, setSelectedItems] = React.useState(["item-1"]);

  return (
    <div style={{ minHeight: "400px", width: "250px" }}>
      <Combobox
        items={manyItems}
        selectedItems={selectedItems}
        onToggleItem={(item) => {
          setSelectedItems((prev) =>
            prev.includes(item.value)
              ? prev.filter((v) => v !== item.value)
              : [...prev, item.value],
          );
        }}
        label="Test"
      />
    </div>
  );
};
ManyItems.parameters = {
  a11y: { disable: true },
  controls: { disable: true },
  docs: { disable: true },
};

export const Trigger = () => {
  const [selectedItems, setSelectedItems] = useState<MyItem["value"][]>([
    "item-1",
  ]);

  const [selectedItem, setSelectedItem] = React.useState<MyItem>(items[0]);

  const rootProps = {
    items,
    selectedItems,
    onToggleItem: (item) => {
      setSelectedItems((prev) =>
        prev.includes(item.value)
          ? prev.filter((v) => v !== item.value)
          : [...prev, item.value],
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
        items={items}
        selectedItems={[selectedItem.value]}
        onToggleItem={setSelectedItem}
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
          items={items}
          selectedItems={[selectedItem.value]}
          onToggleItem={setSelectedItem}
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
  const [selectedItem, setSelectedItem] = React.useState<MyItem>();

  return (
    <VStack gap="space-32" width="300px">
      <button type="button" onClick={() => console.log("Knapp før")}>
        Knapp før
      </button>

      <ComboboxRoot
        items={items}
        selectedItems={selectedItem ? [selectedItem.value] : []}
        onToggleItem={setSelectedItem}
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
        items={items}
        selectedItems={selectedItem ? [selectedItem.value] : []}
        onToggleItem={setSelectedItem}
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
- Åpne på pil ned?
- PageUp/Down
- Error, disabled (?), readonly osv.
- Vurder hvilke funksjoner i gamle CB vi skal ta med (maks valg, legg til osv.)
- Tester
- A11y-sjekk
- Beslutningsloggen?


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

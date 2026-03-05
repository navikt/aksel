import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { TextField } from "../../../form/textfield";
import { Popover } from "../../../popover";
import type { ListboxGroupData, ListboxItemData } from "./list/ListboxList";
import Listbox from "./root/ListboxRoot";

const meta: Meta<typeof Listbox> = {
  title: "utilities/Listbox",
  component: Listbox,
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

const myItems: MyItem[] = [
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
  { label: "Single item first", value: "item-01" },
  {
    label: "Nordic countries",
    id: "group-1",
    items: myItems.slice(0, 6),
  },
  {
    label: "Baltic countries",
    id: "group-2",
    items: myItems.slice(6),
  },
  { label: "Single item last", value: "item-02" },
];

export const Default = () => {
  const [filterString, setFilterString] = useState("");
  const [selectedItems, setSelectedItems] = useState<MyItem["value"][]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [virtuallyFocusedItemValue, setVirtuallyFocusedItemValue] =
    useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = filterString
    ? filterItems(groupedItems, filterString)
    : groupedItems;

  return (
    <Listbox setVirtuallyFocusedItemValue={setVirtuallyFocusedItemValue}>
      <Listbox.InputSlot>
        <TextField
          label="Test"
          value={filterString}
          onChange={(event) => {
            setFilterString(event.currentTarget.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          ref={inputRef}
        />
      </Listbox.InputSlot>

      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={inputRef.current}
        placement="bottom"
      >
        <Popover.Content>
          <Listbox.List
            virtuallyFocusedItemValue={virtuallyFocusedItemValue}
            setVirtuallyFocusedItemValue={setVirtuallyFocusedItemValue}
            textToHighlight={filterString}
            items={filteredItems}
            selectedItems={selectedItems}
            onToggleItem={(item) => {
              setSelectedItems([item.value]);
              //setOpen(false);
              console.log(item);
            }}
            style={{ maxHeight: "350px" }}
          />
        </Popover.Content>
      </Popover>
    </Listbox>
  );
};

function filterItems<T extends ListboxItemData>(
  items: (T | ListboxGroupData<T>)[],
  filterString: string,
): (T | ListboxGroupData<T>)[] {
  const filterStringLowerCase = filterString.toLocaleLowerCase();

  return items
    .map((itemOrGroup) => {
      if ("items" in itemOrGroup) {
        const matchingItems = itemOrGroup.items.filter((item) =>
          item.label.toLocaleLowerCase().includes(filterStringLowerCase),
        );
        if (matchingItems.length > 0) {
          return { ...itemOrGroup, items: matchingItems };
        }
        return null;
      }
      if (
        itemOrGroup.label.toLocaleLowerCase().includes(filterStringLowerCase)
      ) {
        return itemOrGroup;
      }
      return null;
    })
    .filter((item): item is T | ListboxGroupData<T> => item !== null);
}

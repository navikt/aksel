import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { Search } from "../../../form/search";
import { TextField } from "../../../form/textfield";
import { Popover } from "../../../popover";
import { Box } from "../../../primitives/box";
import { HighlightText } from "../HighlightText/HighlightText";
import { DismissableLayer } from "../dismissablelayer/DismissableLayer";
import { Floating } from "../floating/Floating";
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

interface RenderItemsProps {
  items: (MyGroup | MyItem)[];
  selectedItems: MyItem["value"][];
  filterString: string;
  virtuallyFocusedItemId: string;
  onSelect: (item: MyItem) => void;
}
const RenderItems = ({
  items,
  selectedItems,
  filterString,
  virtuallyFocusedItemId,
  onSelect,
}: RenderItemsProps) =>
  items.map((itemOrGroup) =>
    "items" in itemOrGroup ? (
      <Listbox.Group
        key={itemOrGroup.label}
        label={<em>{itemOrGroup.label}</em>}
      >
        {itemOrGroup.items.map((item) => (
          <Listbox.Item
            key={item.value}
            id={item.value}
            onClick={() => onSelect(item)}
            aria-selected={selectedItems.includes(item.value)}
            hasVirtualFocus={virtuallyFocusedItemId === item.value}
            style={{ paddingLeft: "1em" }}
          >
            <HighlightText text={filterString}>{item.label}</HighlightText>
            {selectedItems.includes(item.value) && <Checkmark />}
          </Listbox.Item>
        ))}
      </Listbox.Group>
    ) : (
      <Listbox.Item
        key={itemOrGroup.value}
        id={itemOrGroup.value}
        onClick={() => onSelect(itemOrGroup)}
        aria-selected={selectedItems.includes(itemOrGroup.value)}
        hasVirtualFocus={virtuallyFocusedItemId === itemOrGroup.value}
      >
        <HighlightText text={filterString}>{itemOrGroup.label}</HighlightText>
        {selectedItems.includes(itemOrGroup.value) && <Checkmark />}
      </Listbox.Item>
    ),
  );
const Checkmark = () => <div style={{ float: "right" }}>✓</div>;

export const Default = () => {
  const [filterString, setFilterString] = useState("");
  const [selectedItem, setSelectedItem] = useState<MyItem["value"] | null>(
    null,
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [virtuallyFocusedItemId, setVirtuallyFocusedItemId] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = filterString
    ? filterItems(groupedItems, filterString)
    : groupedItems;

  const onSelect = (item: MyItem) => {
    setSelectedItem(item.value);
    //setOpen(false);
    console.log(item);
  };

  return (
    <Floating>
      <div>Selected: {selectedItem}</div>

      <Listbox setVirtuallyFocusedItemId={setVirtuallyFocusedItemId}>
        <Floating.Anchor>
          <Listbox.InputSlot>
            <Search
              label="Velg noe"
              hideLabel={false}
              variant="simple"
              ref={inputRef}
              value={filterString}
              onChange={setFilterString}
              onClick={() => setOpen(true)}
              onFocus={() => setOpen(true)}
            />
          </Listbox.InputSlot>
        </Floating.Anchor>
        {open && (
          <DismissableLayer
            asChild
            onDismiss={() => setOpen(false)}
            safeZone={{ anchor: inputRef.current }}
          >
            <Floating.Content
              align="start"
              side="bottom"
              fallbackPlacements={[]}
              sideOffset={4}
            >
              <Box
                background="default"
                borderWidth="1"
                overflow="auto"
                style={{
                  maxHeight:
                    "calc(var(--__axc-floating-available-height) - 4px)",
                  width: "var(--__axc-floating-anchor-width)",
                }}
              >
                <Listbox.List
                  setVirtuallyFocusedItemId={setVirtuallyFocusedItemId}
                >
                  <RenderItems
                    items={filteredItems}
                    selectedItems={selectedItem ? [selectedItem] : []}
                    filterString={filterString}
                    virtuallyFocusedItemId={virtuallyFocusedItemId}
                    onSelect={onSelect}
                  />
                </Listbox.List>
              </Box>
            </Floating.Content>
          </DismissableLayer>
        )}
      </Listbox>
    </Floating>
  );
};

export const WithPopover = () => {
  const [filterString, setFilterString] = useState("");
  const [selectedItems, setSelectedItems] = useState<MyItem["value"][]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [virtuallyFocusedItemId, setVirtuallyFocusedItemId] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = filterString
    ? filterItems(groupedItems, filterString)
    : groupedItems;

  return (
    <Listbox setVirtuallyFocusedItemId={setVirtuallyFocusedItemId}>
      <Listbox.InputSlot>
        <TextField
          label="Test"
          value={filterString}
          onChange={(event) => {
            setFilterString(event.currentTarget.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          //onBlur={() => setOpen(false)}
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
          <Listbox.List setVirtuallyFocusedItemId={setVirtuallyFocusedItemId}>
            <RenderItems
              items={filteredItems}
              selectedItems={selectedItems}
              filterString={filterString}
              virtuallyFocusedItemId={virtuallyFocusedItemId}
              onSelect={(item) => {
                setSelectedItems((prev) =>
                  prev.includes(item.value)
                    ? prev.filter((v) => v !== item.value)
                    : [...prev, item.value],
                );
                //setOpen(false);
              }}
            />
          </Listbox.List>
        </Popover.Content>
      </Popover>
    </Listbox>
  );
};

type Item = {
  label: string;
  value: string;
};

type Group<T extends Item> = {
  label: string;
  id: string;
  items: T[];
};

function filterItems<T extends (Item | Group<Item>)[]>(
  items: T,
  filterString: string,
): T {
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
    .filter((item) => item !== null) as T;
}

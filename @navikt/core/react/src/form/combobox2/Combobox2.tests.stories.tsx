import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { ComboboxFilter } from "./filter/ComboboxFilter";
import { ComboboxList } from "./list/ComboboxList";
import { ComboboxPopup } from "./popup/ComboboxPopup";
import { ComboboxRoot } from "./root/ComboboxRoot";

const meta: Meta<typeof ComboboxRoot> = {
  title: "ds-react/Combobox2/Tests",
  component: ComboboxRoot,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

const items = [
  { label: "Norway", value: "item-1" },
  { label: "Finland", value: "item-2" },
  { label: "Sweden", value: "item-3" },
  { label: "Denmark", value: "item-4" },
  { label: "Iceland", value: "item-5" },
  { label: "Faroe Islands", value: "item-6" },
  { label: "Åland Islands", value: "item-7" },
  { label: "Estonia", value: "item-8" },
  { label: "Latvia", value: "item-9" },
  { label: "Lithuania", value: "item-10" },
];

const groupedItems = [
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
  { label: "Singel item", value: "item-01" },
];

let itemMemoTestRenderCnt = 0;
const itemMemoTestRenderFn = (itemOrGroup: (typeof groupedItems)[number]) => {
  if ("items" in itemOrGroup) return itemOrGroup.label;
  itemMemoTestRenderCnt++;
  const renderCountEl = document.getElementById("render-count");
  if (renderCountEl) renderCountEl.textContent = String(itemMemoTestRenderCnt);
  return itemOrGroup.label;
};
export const ItemMemoization = () => {
  const [selectedItems, setSelectedItems] = useState(["item-1"]);

  return (
    <div style={{ minHeight: "450px" }}>
      <div>
        Item render count:{" "}
        <span id="render-count" data-testid="count">
          0
        </span>
      </div>
      <ComboboxRoot
        defaultOpen
        items={groupedItems}
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
          <ComboboxFilter />
          <ComboboxList>{itemMemoTestRenderFn}</ComboboxList>
        </ComboboxPopup>
      </ComboboxRoot>
    </div>
  );
};
ItemMemoization.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const combobox = canvas.getByRole("combobox");
  const countElm = canvas.getByTestId("count"); // Number of times an item has been rendered
  const startCount = Number(countElm.textContent);
  expect(startCount).toBeGreaterThan(3); // Minimum items needed for the test to be meaningful

  // Moving virtual focus should re-render old and new option
  await userEvent.click(combobox);
  await userEvent.keyboard("{ArrowDown}");
  let expectedCount = startCount + 2;
  expect(Number(countElm.textContent)).toBe(expectedCount);

  // Seleting an option should re-render only that option
  await userEvent.keyboard("{Enter}");
  expectedCount++;
  expect(Number(countElm.textContent)).toBe(expectedCount);

  // Filtering should not re-render any items
  // TODO: For this to work we must omit the filterString prop on ComboboxItem
  /*await userEvent.type(combobox, "nor", { delay: 200 });
  expect(Number(countElm.textContent)).toBe(expectedCount);
  expect(canvas.getAllByRole("option").length).toBe(1);*/
};

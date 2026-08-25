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

const options = [
  { label: "Norway", value: "option-1" },
  { label: "Finland", value: "option-2" },
  { label: "Sweden", value: "option-3" },
  { label: "Denmark", value: "option-4" },
  { label: "Iceland", value: "option-5" },
  { label: "Faroe Islands", value: "option-6" },
  { label: "Åland Islands", value: "option-7" },
  { label: "Estonia", value: "option-8" },
  { label: "Latvia", value: "option-9" },
  { label: "Lithuania", value: "option-10" },
];

const groupedOptions = [
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
  { label: "Singel option", value: "option-01" },
];

let optionMemoTestRenderCnt = 0;
const optionMemoTestRenderFn = (
  optOrGroup: (typeof groupedOptions)[number],
) => {
  if ("options" in optOrGroup) return optOrGroup.label;
  optionMemoTestRenderCnt++;
  const renderCountEl = document.getElementById("render-count");
  if (renderCountEl)
    renderCountEl.textContent = String(optionMemoTestRenderCnt);
  return optOrGroup.label;
};
export const OptionMemoization = () => {
  const [selectedOptions, setSelectedOptions] = useState(["option-1"]);

  return (
    <div style={{ minHeight: "450px" }}>
      <div>
        Option render count:{" "}
        <span id="render-count" data-testid="count">
          0
        </span>
      </div>
      <ComboboxRoot
        defaultOpen
        options={groupedOptions}
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
          <ComboboxFilter />
          <ComboboxList>{optionMemoTestRenderFn}</ComboboxList>
        </ComboboxPopup>
      </ComboboxRoot>
    </div>
  );
};
OptionMemoization.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const combobox = canvas.getByRole("combobox");
  const countElm = canvas.getByTestId("count"); // Number of times an option has been rendered
  const startCount = Number(countElm.textContent);
  expect(startCount).toBeGreaterThan(3); // Minimum options needed for the test to be meaningful

  // Moving virtual focus should re-render old and new option
  await userEvent.click(combobox);
  await userEvent.keyboard("{ArrowDown}");
  let expectedCount = startCount + 2;
  expect(Number(countElm.textContent)).toBe(expectedCount);

  // Seleting an option should re-render only that option
  await userEvent.keyboard("{Enter}");
  expectedCount++;
  expect(Number(countElm.textContent)).toBe(expectedCount);

  // Filtering should not re-render any options
  // TODO: For this to work we must omit the filterString prop on ComboboxOption
  /*await userEvent.type(combobox, "nor", { delay: 200 });
  expect(Number(countElm.textContent)).toBe(expectedCount);
  expect(canvas.getAllByRole("option").length).toBe(1);*/
};

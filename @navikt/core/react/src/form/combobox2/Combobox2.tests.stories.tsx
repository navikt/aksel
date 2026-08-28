import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Combobox, type ComboboxProps } from "./Combobox";
import { ComboboxFilter } from "./filter/ComboboxFilter";
import { ComboboxList } from "./list/ComboboxList";
import { ComboboxPopup } from "./popup/ComboboxPopup";
import {
  type ComboboxGroupData,
  type ComboboxOptionData,
  ComboboxRoot,
} from "./root/ComboboxRoot";

const meta: Meta<typeof ComboboxRoot> = {
  title: "ds-react/Combobox2/Tests",
  component: ComboboxRoot,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

const countries = [
  { label: "Norge", value: "option-1" },
  { label: "Finland", value: "option-2" },
  { label: "Sverige", value: "option-3" },
  { label: "Danmark", value: "option-4" },
  { label: "Island", value: "option-5" },
  { label: "Færøyene", value: "option-6" },
  { label: "Åland", value: "option-7" },
  { label: "Estland", value: "option-8" },
  { label: "Latvia", value: "option-9" },
  { label: "Litauenm", value: "option-10" },
];

const groupedOptions = [
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
  { label: "Ikke gruppert", value: "option-01" },
];

function BaseCombobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>(props: Partial<ComboboxProps<T>>) {
  const [selectedOptions, setSelectedOptions] = useState(["option-1"]);

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

export const AccessibleNameAndDesc = () => <BaseCombobox />;
AccessibleNameAndDesc.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const trigger = await canvas.findByRole("combobox", { name: "Velg land" });
  await expect(trigger).toHaveAccessibleDescription("Landet hvor du er født.");
};

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

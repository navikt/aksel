import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fireEvent } from "storybook/test";
import Listbox from "./root/ListboxRoot";

const meta: Meta<typeof Listbox> = {
  title: "utilities/Listbox/Tests",
  component: Listbox,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

const items = [
  { label: "First item", value: "first" },
  {
    label: "Group 1",
    id: "group-1",
    items: [
      { label: "Group 1 First item", value: "group-1-first" },
      { label: "Group 1 Last item", value: "group-1-last" },
    ],
  },
  {
    label: "Group 2",
    id: "group-2",
    items: [{ label: "Group 2 Only item", value: "group-2-only" }],
  },
  { label: "Last item", value: "last" },
];

function ListboxStory() {
  const [virtuallyFocusedItemValue, setVirtuallyFocusedItemValue] =
    useState("");

  return (
    <Listbox setVirtuallyFocusedItemValue={setVirtuallyFocusedItemValue}>
      <Listbox.List
        virtuallyFocusedItemValue={virtuallyFocusedItemValue}
        setVirtuallyFocusedItemValue={setVirtuallyFocusedItemValue}
        items={items}
        onToggleItem={() => {}}
      />
    </Listbox>
  );
}

const getVirtuallyFocusedValue = (canvasElement: HTMLElement) => {
  const focused = canvasElement.querySelector<HTMLElement>(
    '[data-virtual-focus="true"]',
  );
  return focused?.dataset.value;
};

const pressKey = (canvasElement: HTMLElement, key: string) => {
  const container = canvasElement.firstElementChild as HTMLElement;
  fireEvent.keyDown(container, { key });
};

export const ArrowDown: StoryObj = {
  render: () => <ListboxStory />,
  play: async ({ canvasElement }) => {
    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("first");

    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-1-first");

    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-1-last");

    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-2-only");

    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("last");

    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("first");
  },
};

export const ArrowUp: StoryObj = {
  render: () => <ListboxStory />,
  play: async ({ canvasElement }) => {
    pressKey(canvasElement, "ArrowUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("last");

    pressKey(canvasElement, "ArrowUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-2-only");

    pressKey(canvasElement, "ArrowUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-1-last");

    pressKey(canvasElement, "ArrowUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-1-first");

    pressKey(canvasElement, "ArrowUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("first");

    pressKey(canvasElement, "ArrowUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("last");
  },
};

export const HomeAndEndKeys: StoryObj = {
  render: () => <ListboxStory />,
  play: async ({ canvasElement }) => {
    pressKey(canvasElement, "Home");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("first");

    pressKey(canvasElement, "End");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("last");
  },
};

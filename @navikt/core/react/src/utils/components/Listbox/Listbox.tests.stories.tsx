import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fireEvent, fn } from "storybook/test";
import { ListboxItemProps } from "./item/ListboxItem";
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

function ListboxStory({
  onClick = () => {},
}: {
  onClick?: ListboxItemProps["onClick"];
}) {
  const [virtuallyFocusedItemId, setVirtuallyFocusedItemId] = useState("");

  return (
    <Listbox setVirtuallyFocusedItemId={setVirtuallyFocusedItemId}>
      <Listbox.List setVirtuallyFocusedItemId={setVirtuallyFocusedItemId}>
        {items.map((itemOrGroup) =>
          "items" in itemOrGroup && itemOrGroup.items ? (
            <Listbox.Group key={itemOrGroup.label} label={itemOrGroup.label}>
              {itemOrGroup.items.map((item) => (
                <Listbox.Item
                  key={item.value}
                  id={item.value}
                  onClick={onClick}
                  hasVirtualFocus={virtuallyFocusedItemId === item.value}
                >
                  {item.label}
                </Listbox.Item>
              ))}
            </Listbox.Group>
          ) : (
            <Listbox.Item
              key={itemOrGroup.value}
              id={itemOrGroup.value}
              onClick={onClick}
              hasVirtualFocus={virtuallyFocusedItemId === itemOrGroup.value}
            >
              {itemOrGroup.label}
            </Listbox.Item>
          ),
        )}
      </Listbox.List>
    </Listbox>
  );
}

const getVirtuallyFocusedValue = (canvasElement: HTMLElement) => {
  const focused = canvasElement.querySelector<HTMLElement>(
    '[data-virtual-focus="true"]',
  );
  return focused?.dataset.id;
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

export const EnterKey: StoryObj<{
  onClick: (id: string | undefined) => void;
}> = {
  render: ({ onClick }) => (
    <ListboxStory
      onClick={(event) => onClick(event.currentTarget.dataset.id)}
    />
  ),
  play: async ({ canvasElement, args }) => {
    pressKey(canvasElement, "ArrowDown");
    pressKey(canvasElement, "ArrowDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("group-1-first");

    pressKey(canvasElement, "Enter");
    expect(args.onClick).toHaveBeenCalledOnce();
    expect(args.onClick).toHaveBeenCalledWith("group-1-first");
  },
  args: {
    onClick: fn(),
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef, useState } from "react";
import { expect, fireEvent, fn, within } from "storybook/test";
import type { ListboxOptionProps } from "./option/ListboxOption";
import { Listbox } from "./root/ListboxRoot";

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
  onClick?: ListboxOptionProps["onClick"];
}) {
  const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] = useState("");

  return (
    <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
      <Listbox.Options>
        {items.map((itemOrGroup) =>
          "items" in itemOrGroup && itemOrGroup.items ? (
            <Listbox.Group key={itemOrGroup.label} label={itemOrGroup.label}>
              {itemOrGroup.items.map((item) => (
                <Listbox.Option
                  key={item.value}
                  id={item.value}
                  onClick={onClick}
                  hasVirtualFocus={virtuallyFocusedOptionId === item.value}
                  aria-selected={false}
                >
                  {item.label}
                </Listbox.Option>
              ))}
            </Listbox.Group>
          ) : (
            <Listbox.Option
              key={itemOrGroup.value}
              id={itemOrGroup.value}
              onClick={onClick}
              hasVirtualFocus={virtuallyFocusedOptionId === itemOrGroup.value}
              aria-selected={false}
            >
              {itemOrGroup.label}
            </Listbox.Option>
          ),
        )}
      </Listbox.Options>
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
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("last"); // No looping
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
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("first"); // No looping
  },
};

export const PageUpAndPageDownKeys: StoryObj = {
  render: () => {
    const [focusedOption, setFocusedOption] = useState("");
    return (
      <Listbox setVirtuallyFocusedOptionId={setFocusedOption}>
        <Listbox.Options style={{ maxHeight: "300px" }}>
          {Array.from({ length: 15 }, (_, i) => (
            <Listbox.Option
              key={i.toString()}
              id={i.toString()}
              onClick={() => {}}
              hasVirtualFocus={focusedOption === i.toString()}
              aria-selected={false}
            >
              {i.toString()}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    );
  },
  play: async ({ canvasElement }) => {
    pressKey(canvasElement, "PageDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("5");

    pressKey(canvasElement, "PageDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("10");

    pressKey(canvasElement, "PageDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("14"); // Last

    pressKey(canvasElement, "PageDown");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("14"); // No looping

    pressKey(canvasElement, "PageUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("9");

    pressKey(canvasElement, "PageUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("4");

    pressKey(canvasElement, "PageUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("0");

    pressKey(canvasElement, "PageUp");
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("0"); // No looping
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

const ListboxStoryWithFilterInput = () => {
  const [virtuallyFocusedOptionId, setVirtuallyFocusedOptionId] =
    useState("second-item");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  console.log({ virtuallyFocusedOptionId });
  return (
    <Listbox setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionId}>
      <Listbox.InputSlot virtuallyFocusedOptionId={virtuallyFocusedOptionId}>
        <input ref={ref} type="text" aria-label="Filter" />
      </Listbox.InputSlot>
      <Listbox.Options>
        <Listbox.Option
          id="first-item"
          onClick={() => {}}
          hasVirtualFocus={virtuallyFocusedOptionId === "first-item"}
          aria-selected={false}
        >
          First item
        </Listbox.Option>
        <Listbox.Option
          id="second-item"
          onClick={() => {}}
          hasVirtualFocus={virtuallyFocusedOptionId === "second-item"}
          aria-selected={false}
        >
          Second item
        </Listbox.Option>
        <Listbox.Option
          id="last-item"
          onClick={() => {}}
          hasVirtualFocus={virtuallyFocusedOptionId === "last-item"}
          aria-selected={false}
        >
          Last item
        </Listbox.Option>
      </Listbox.Options>
    </Listbox>
  );
};

// When a filter input has real focus, ArrowUp on first option and
// ArrowDown on last option should remove virtual focus so that
// perceived focus is returned to the input.
export const ArrowUpOnFirstOptionFocusInput: StoryObj = {
  render: ListboxStoryWithFilterInput,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Filter");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("first-item");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(getVirtuallyFocusedValue(canvasElement)).toBeUndefined();
  },
};
export const ArrowDownOnLastOptionFocusInput: StoryObj = {
  render: ListboxStoryWithFilterInput,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Filter");
    input.focus();
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(getVirtuallyFocusedValue(canvasElement)).toBe("last-item");
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(getVirtuallyFocusedValue(canvasElement)).toBeUndefined();
  },
};

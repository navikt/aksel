import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { DropdownMenu } from "./DropdownMenu";

export default {
  title: "ds-react/DropdownMenu",
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof DropdownMenu>;

const DemoDecorator = (Story: any) => (
  <VStack gap="4" align="start">
    <p>Placeholder before button</p>
    <button>Focusable item before dropdown</button>
    <Story />
    <button>Focusable item after dropdown</button>
    <p>Placeholder after button</p>
  </VStack>
);

export const OnlyItems: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button>Open dropdown</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => console.log("Item 1 clicked")}>
            Item 1
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => console.log("Item 2 clicked")}>
            Item 2
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const GroupedItems: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button>Open dropdown</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group label="Group 1">
            <DropdownMenu.Item onSelect={() => console.log("Item 1 clicked")}>
              Item 1
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log("Item 2 clicked")}>
              Item 2
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log("Item 3 clicked")}>
              Item 3
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Group label="Group 2">
            <DropdownMenu.Item onSelect={() => console.log("Item 4 clicked")}>
              Item 4
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log("Item 5 clicked")}>
              Item 5
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log("Item 6 clicked")}>
              Item 6
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const CheckboxGroups: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState({
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
    });

    // Step 3: Handle change
    const handleCheckboxChange = (checkboxId: string) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [checkboxId]: !prevState[checkboxId],
      }));
    };

    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button>Open dropdown</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group label="Group 1">
            <DropdownMenu.CheckboxItem
              checked={checkedItems.checkbox1}
              onCheckedChange={() => handleCheckboxChange("checkbox1")}
            >
              Checkbox 1
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              checked={checkedItems.checkbox2}
              onCheckedChange={() => handleCheckboxChange("checkbox2")}
            >
              Checkbox 1
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
          <DropdownMenu.Group label="Group 2">
            <DropdownMenu.CheckboxItem
              checked={checkedItems.checkbox3}
              onCheckedChange={() => handleCheckboxChange("checkbox3")}
            >
              Checkbox 3
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              checked={checkedItems.checkbox4}
              onCheckedChange={() => handleCheckboxChange("checkbox4")}
            >
              Checkbox 4
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const RadioGroups: Story = {
  render: () => {
    const [group1Value, setGroup1Value] = useState("1");
    const [group2Value, setGroup2Value] = useState("4");

    // Step 3: Handle value change
    const handleGroup1ValueChange = (value: string) => {
      setGroup1Value(value);
    };

    const handleGroup2ValueChange = (value: string) => {
      setGroup2Value(value);
    };

    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button>Open dropdown</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup
            onValueChange={handleGroup1ValueChange}
            value={group1Value}
            label="Group 1"
          >
            <DropdownMenu.RadioItem value="1">Radio 1</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="2">Radio 2</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
          <DropdownMenu.RadioGroup
            onValueChange={handleGroup2ValueChange}
            value={group2Value}
            label="Group 2"
          >
            <DropdownMenu.RadioItem value="3">Radio 3</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="4">Radio 4</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Demo: Story = {
  render: () => {
    return (
      <DropdownMenu open>
        <DropdownMenu.Trigger>
          <Button>Dropdown</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group label="Lenker">
            <DropdownMenu.Item onSelect={() => console.log("Item 1 clicked")}>
              Item 1
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => console.log("Item 2 clicked")}
              shortcut="⌘+S"
            >
              Item 2
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.CheckboxItem checked>
            Checkbox
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem shortcut="⌘+S">
            Checkbox
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup value="2">
            <DropdownMenu.RadioItem value="1">Radio 1</DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="2">Radio 2</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const MarkupDemo = () => {
  return (
    <div className="root">
      <style>{`ul, li {list-style:none; margin:0;padding:0}
      .root {
      display:flex; gap: 2rem;}`}</style>
      <section aria-label="List markup test">
        <ul role="menu" aria-orientation="vertical" id="r5" tabIndex={0}>
          <li>
            <ul role="group" aria-labelledby="r6">
              <li id="r6" aria-hidden="true">
                Gruppe 1
              </li>
              <li role="presentation">
                <a href="#123" role="menuitem" tabIndex={0}>
                  item 1 i gruppe 1
                </a>
              </li>
              <li role="presentation">
                <a href="#123" role="menuitem" tabIndex={0}>
                  item 2 i gruppe 1
                </a>
              </li>
            </ul>
          </li>
          <li>
            <ul role="group" aria-labelledby="r10">
              <li id="r10" aria-hidden="true">
                Gruppe 2
              </li>
              <li role="presentation">
                <a href="#123" role="menuitem" tabIndex={0}>
                  item 3 i gruppe 2
                </a>
              </li>
              <li role="presentation">
                <a href="#123" role="menuitem" tabIndex={0}>
                  item 4 i gruppe 2
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <section aria-label="div-markup test">
        <div role="menu" aria-orientation="vertical" id="r5" tabIndex={0}>
          <div role="group" aria-labelledby="r6">
            <div id="r6" aria-hidden="true">
              Gruppe 1
            </div>
            <div role="menuitem" tabIndex={0}>
              item 1 i gruppe 1
            </div>
            <div role="menuitem" tabIndex={0}>
              item 2 i gruppe 1
            </div>
          </div>
          <div role="group" aria-labelledby="r11">
            <div id="r11" aria-hidden="true">
              Gruppe 2
            </div>
            <div role="menuitem" tabIndex={0}>
              item 3 i gruppe 2
            </div>
            <div role="menuitem" tabIndex={0}>
              item 4 i gruppe 2
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const MarkupDemo2 = () => {
  return (
    <div className="root">
      <style>{`ul, li {list-style:none; margin:0;padding:0}
      .root {
      display:flex; gap: 2rem;}`}</style>
      <section aria-label="Link versus button test">
        <div role="menu" aria-orientation="vertical" tabIndex={0}>
          <a
            href="#123"
            role="menuitem"
            tabIndex={0}
            onClick={() => alert("klikket på lenke")}
          >
            Dette er en lenke med menuitem
          </a>
          <button
            role="menuitem"
            tabIndex={0}
            onClick={() => alert("klikket på knapp")}
          >
            Dette er en knapp med menuitem
          </button>
        </div>
      </section>
    </div>
  );
};

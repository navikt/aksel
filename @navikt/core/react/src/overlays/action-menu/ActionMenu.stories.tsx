import { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import { PencilIcon, StarIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { HStack, VStack } from "../../layout/stack";
import { Modal } from "../../modal";
import { Tooltip } from "../../tooltip";
import { BodyShort } from "../../typography";
import { ActionMenu } from "./ActionMenu";

export default {
  title: "ds-react/ActionMenu",
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
} satisfies Meta<typeof ActionMenu>;

type Story = StoryObj<typeof ActionMenu>;

const DemoDecorator: Story["decorators"] = (Story, { name }) => {
  return (
    <VStack gap="4" align="start">
      <h2>{name}</h2>
      <p>Placeholder before button</p>
      <button>Focusable item before action</button>
      <Story />
      <button>Focusable item after action</button>
      <p>Placeholder after button</p>
    </VStack>
  );
};

export const OnlyItems: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item onSelect={() => console.log("Item 1 clicked")}>
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={() => console.log("Item 2 clicked")}>
            Item 2
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const GroupedItems: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Group 1">
            <ActionMenu.Item onSelect={() => console.log("Item 1 clicked")}>
              Item 1
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 2 clicked")}>
              Item 2
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 3 clicked")}>
              Item 3
            </ActionMenu.Item>
          </ActionMenu.Group>
          <ActionMenu.Group label="Group 2">
            <ActionMenu.Item onSelect={() => console.log("Item 4 clicked")}>
              Item 4
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 5 clicked")}>
              Item 5
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 6 clicked")}>
              Item 6
            </ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const ShortcutsAndIcons: Story = {
  render: (props) => {
    const [checkedItems, setCheckedItems] = useState({
      checkbox1: false,
      checkbox2: false,
    });

    const handleCheckboxChange = (checkboxId: string) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [checkboxId]: !prevState[checkboxId],
      }));
    };

    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <VStack asChild align="start" gap="1" paddingBlock="2">
            <ActionMenu.Label>
              <BodyShort weight="semibold" as="div">
                Ola Normann
              </BodyShort>
              <div>D123456</div>
            </ActionMenu.Label>
          </VStack>
          <ActionMenu.Divider />
          <ActionMenu.Group label="Group 1">
            <ActionMenu.CheckboxItem
              checked={checkedItems.checkbox1}
              onCheckedChange={() => handleCheckboxChange("checkbox1")}
              shortcut="⌘+T"
            >
              Checkbox 1
            </ActionMenu.CheckboxItem>
            <ActionMenu.CheckboxItem
              checked={checkedItems.checkbox2}
              onCheckedChange={() => handleCheckboxChange("checkbox2")}
              shortcut="⇧+⌘+N"
            >
              Checkbox 2
            </ActionMenu.CheckboxItem>
          </ActionMenu.Group>
          <ActionMenu.Divider />
          <ActionMenu.Group label="Group 2">
            <ActionMenu.Item
              shortcut="⌘+T"
              onSelect={() => console.log("Item 1 clicked")}
              icon={<StarIcon aria-hidden />}
            >
              Item 1
            </ActionMenu.Item>
            <ActionMenu.Item
              shortcut="⇧+⌘+N"
              onSelect={() => console.log("Item 2 clicked")}
              icon={<PencilIcon aria-hidden />}
            >
              Item 2
            </ActionMenu.Item>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Checkboxes: Story = {
  render: (props) => {
    const [checkedItems, setCheckedItems] = useState({
      checkbox1: false,
      checkbox2: true,
      checkbox3: false,
      checkbox4: false,
    });

    const handleCheckboxChange = (checkboxId: string) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [checkboxId]: !prevState[checkboxId],
      }));
    };

    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.CheckboxItem
            checked={
              Object.values(checkedItems).every(Boolean)
                ? true
                : Object.values(checkedItems).some(Boolean)
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={() =>
              Object.values(checkedItems).every(Boolean)
                ? setCheckedItems((prevState) =>
                    Object.keys(prevState).reduce(
                      (acc, key) => ({ ...acc, [key]: false }),
                      {} as typeof checkedItems,
                    ),
                  )
                : setCheckedItems((prevState) =>
                    Object.keys(prevState).reduce(
                      (acc, key) => ({ ...acc, [key]: true }),
                      {} as typeof checkedItems,
                    ),
                  )
            }
          >
            Select all
          </ActionMenu.CheckboxItem>
          <ActionMenu.Group label="Group 1">
            <ActionMenu.CheckboxItem
              checked={checkedItems.checkbox1}
              onCheckedChange={() => handleCheckboxChange("checkbox1")}
            >
              Checkbox 1
            </ActionMenu.CheckboxItem>
            <ActionMenu.CheckboxItem
              checked={checkedItems.checkbox2}
              onCheckedChange={() => handleCheckboxChange("checkbox2")}
            >
              Checkbox 1
            </ActionMenu.CheckboxItem>
          </ActionMenu.Group>
          <ActionMenu.Group label="Group 2">
            <ActionMenu.CheckboxItem
              checked={checkedItems.checkbox3}
              onCheckedChange={() => handleCheckboxChange("checkbox3")}
            >
              Checkbox 3
            </ActionMenu.CheckboxItem>
            <ActionMenu.CheckboxItem
              checked={checkedItems.checkbox4}
              onCheckedChange={() => handleCheckboxChange("checkbox4")}
            >
              Checkbox 4
            </ActionMenu.CheckboxItem>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const RadioGroups: Story = {
  render: (props) => {
    const [group1Value, setGroup1Value] = useState("1");
    const [group2Value, setGroup2Value] = useState("4");

    const handleGroup1ValueChange = (value: string) => {
      setGroup1Value(value);
    };

    const handleGroup2ValueChange = (value: string) => {
      setGroup2Value(value);
    };

    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.RadioGroup
            onValueChange={handleGroup1ValueChange}
            value={group1Value}
            label="Group 1"
          >
            <ActionMenu.RadioItem value="1">Radio 1</ActionMenu.RadioItem>
            <ActionMenu.RadioItem value="2">Radio 2</ActionMenu.RadioItem>
          </ActionMenu.RadioGroup>
          <ActionMenu.RadioGroup
            onValueChange={handleGroup2ValueChange}
            value={group2Value}
            label="Group 2"
          >
            <ActionMenu.RadioItem value="3">Radio 3</ActionMenu.RadioItem>
            <ActionMenu.RadioItem value="4">Radio 4</ActionMenu.RadioItem>
          </ActionMenu.RadioGroup>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Dividers: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Group 1">
            <ActionMenu.Item onSelect={() => console.log("Item 1 clicked")}>
              Item 1
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 2 clicked")}>
              Item 2
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 3 clicked")}>
              Item 3
            </ActionMenu.Item>
          </ActionMenu.Group>
          <ActionMenu.Divider />
          <ActionMenu.Group label="Group 2">
            <ActionMenu.Item onSelect={() => console.log("Item 4 clicked")}>
              Item 4
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 5 clicked")}>
              Item 5
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 6 clicked")}>
              Item 6
            </ActionMenu.Item>
          </ActionMenu.Group>
          <ActionMenu.Divider />
          <ActionMenu.Item onSelect={() => console.log("Item 7 clicked")}>
            Item 7
          </ActionMenu.Item>
          <ActionMenu.Divider />
          <ActionMenu.Item onSelect={() => console.log("Item 8 clicked")}>
            Item 8
          </ActionMenu.Item>
          <ActionMenu.Divider />
          <ActionMenu.Item onSelect={() => console.log("Item 9 clicked")}>
            Item 9
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Submenus: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item onSelect={() => console.log("Item 1 clicked")}>
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Sub open={props.open}>
            <ActionMenu.SubTrigger>Submenu 1</ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={() => console.log("Subitem 1 clicked")}
              >
                Subitem 1
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={() => console.log("Subitem 2 clicked")}
              >
                Subitem 2
              </ActionMenu.Item>
              <ActionMenu.Sub open={props.open}>
                <ActionMenu.SubTrigger>Nested submenu 1</ActionMenu.SubTrigger>
                <ActionMenu.SubContent>
                  <ActionMenu.Item
                    onSelect={() => console.log("Nested Subitem 1 clicked")}
                  >
                    Nested Subitem 1
                  </ActionMenu.Item>
                  <ActionMenu.Item
                    onSelect={() => console.log("Nested Subitem 2 clicked")}
                  >
                    Nested Subitem 2
                  </ActionMenu.Item>
                </ActionMenu.SubContent>
              </ActionMenu.Sub>
            </ActionMenu.SubContent>
          </ActionMenu.Sub>

          <ActionMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Disabled: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item
            onSelect={() => console.log("Item 1 clicked")}
            disabled
            shortcut="T+W"
          >
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Sub>
            <ActionMenu.SubTrigger disabled>Submenu 1</ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={() => console.log("Subitem 1 clicked")}
              >
                Subitem 1
              </ActionMenu.Item>
            </ActionMenu.SubContent>
          </ActionMenu.Sub>

          <ActionMenu.CheckboxItem checked disabled shortcut="T+W">
            Checkbox disabled
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem>Checkbox 2</ActionMenu.CheckboxItem>
          <ActionMenu.RadioGroup value="1" label="Radiogroup">
            <ActionMenu.RadioItem disabled value="1">
              Radio disabled
            </ActionMenu.RadioItem>
            <ActionMenu.RadioItem value="2">Radio</ActionMenu.RadioItem>
          </ActionMenu.RadioGroup>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const TriggerWithTooltip: Story = {
  render: () => {
    return (
      <ActionMenu>
        <Tooltip content="Tooltip!">
          <ActionMenu.Trigger>
            <button>Open action</button>
          </ActionMenu.Trigger>
        </Tooltip>
        <ActionMenu.Content>
          <ActionMenu.Item onSelect={() => console.log("Item 1 clicked")}>
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={() => console.log("Item 2 clicked")}>
            Item 2
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

/**
 * TODO: Bugs
 * - When keydown "space" on open modal button, the modal is closed instantly.
 * Unsure if this is because of the keydown-event repeats or if its caused by eventbubbling
 */
export const ModalTrigger: Story = {
  render: () => {
    const ref = useRef<HTMLDialogElement>(null);

    return (
      <div>
        <ActionMenu>
          <ActionMenu.Trigger>
            <button>Open action</button>
          </ActionMenu.Trigger>

          <ActionMenu.Content>
            <ActionMenu.Item onSelect={() => ref.current?.showModal()}>
              open modal
            </ActionMenu.Item>
            <ActionMenu.Item onSelect={() => console.log("Item 2 clicked")}>
              Item 2
            </ActionMenu.Item>
          </ActionMenu.Content>
        </ActionMenu>
        <Modal ref={ref} header={{ heading: "Heading" }}>
          <Modal.Body>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua.
          </Modal.Body>
          <Modal.Footer>
            <Button type="button" onClick={() => ref.current?.close()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
  decorators: [DemoDecorator],
};

export const Links: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item as="a" href="#1">
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#2">
            Item 2
          </ActionMenu.Item>
          <ActionMenu.Item as="a" href="#3">
            Item 3
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Chromatic: Story = {
  render: (args, context) => {
    const newArgs = { ...args, open: true };
    return (
      <VStack style={{ gap: "25rem" }}>
        <HStack gap="12">
          <div>
            <h2>OnlyItems</h2>
            {OnlyItems.render?.(newArgs, context)}
          </div>
          <div>
            <h2>GroupedItems</h2>
            {GroupedItems.render?.(newArgs, context)}
          </div>
          <div>
            <h2>Shortcut</h2>
            {ShortcutsAndIcons.render?.(newArgs, context)}
          </div>
        </HStack>
        <HStack gap="12">
          <div>
            <h2>Checkboxes</h2>
            {Checkboxes.render?.(newArgs, context)}
          </div>
          <div>
            <h2>RadioGroups</h2>
            {RadioGroups.render?.(newArgs, context)}
          </div>
        </HStack>
        <HStack gap="12">
          <div>
            <h2>Dividers</h2>
            {Dividers.render?.(newArgs, context)}
          </div>
        </HStack>
        <div>
          <h2>Submenus</h2>
          {Submenus.render?.(newArgs, context)}
        </div>

        <div>
          <h2>Disabled</h2>
          {Disabled.render?.(newArgs, context)}
        </div>
        <div>
          <h2>Links</h2>
          {Links.render?.(newArgs, context)}
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};

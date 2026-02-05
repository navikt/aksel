import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDownRightIcon,
  CloudIcon,
  LeaveIcon,
  PencilIcon,
  StarIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { InternalHeader } from "../internal-header";
import { Modal } from "../modal";
import { HStack, Spacer, VStack } from "../primitives/stack";
import { Theme } from "../theme";
import { Tooltip } from "../tooltip";
import { BodyShort, Detail } from "../typography";
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
    <VStack gap="space-16" align="start">
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
          <ActionMenu.Item
            onSelect={() => console.log("Item 4 clicked")}
            variant="danger"
          >
            Item 4
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
          <VStack asChild align="start" gap="space-4" paddingBlock="space-8">
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
                      (acc, key) => {
                        acc[key] = false;
                        return acc;
                      },
                      {} as typeof checkedItems,
                    ),
                  )
                : setCheckedItems((prevState) =>
                    Object.keys(prevState).reduce(
                      (acc, key) => {
                        acc[key] = true;
                        return acc;
                      },
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

    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.RadioGroup
            onValueChange={setGroup1Value}
            value={group1Value}
            label="Group 1"
          >
            <ActionMenu.RadioItem value="1">Radio 1</ActionMenu.RadioItem>
            <ActionMenu.RadioItem value="2">Radio 2</ActionMenu.RadioItem>
          </ActionMenu.RadioGroup>
          <ActionMenu.RadioGroup
            onValueChange={setGroup2Value}
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
          </ActionMenu.Group>
          <ActionMenu.Divider />
          <ActionMenu.Group label="Group 2">
            <ActionMenu.Item onSelect={() => console.log("Item 4 clicked")}>
              Item 4
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
          <ActionMenu.Item disabled shortcut="T+W">
            Item 1
          </ActionMenu.Item>
          <ActionMenu.Item disabled variant="danger">
            Delete
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

export const OpenInsideModal: Story = {
  render: () => {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
      ref.current?.showModal();
    }, []);

    return (
      <div>
        <button onClick={() => ref.current?.showModal()}>Open modal</button>
        <Modal ref={ref} header={{ heading: "Heading" }}>
          <Modal.Body>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua.
            <ActionMenu>
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
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
                <ActionMenu.Item>Item</ActionMenu.Item>
              </ActionMenu.Content>
            </ActionMenu>
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

export const Align: Story = {
  render: (props) => {
    return (
      <HStack gap="space-96">
        <ActionMenu open={props.open}>
          <ActionMenu.Trigger>
            <button>Start</button>
          </ActionMenu.Trigger>
          <ActionMenu.Content align="start">
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
        <ActionMenu open={props.open}>
          <ActionMenu.Trigger>
            <button>End</button>
          </ActionMenu.Trigger>
          <ActionMenu.Content align="end">
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
      </HStack>
    );
  },
  decorators: [DemoDecorator],
};

export const Chromatic: Story = {
  render: (args, context) => {
    const newArgs = { ...args, open: true };
    return (
      <VStack style={{ gap: "32rem" }}>
        <div>
          <h2>Submenus</h2>
          {Submenus.render?.(newArgs, context)}
        </div>
        <HStack gap="space-48">
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
        <HStack gap="space-48">
          <div>
            <h2>Checkboxes</h2>
            {Checkboxes.render?.(newArgs, context)}
          </div>
          <div>
            <h2>RadioGroups</h2>
            {RadioGroups.render?.(newArgs, context)}
          </div>
        </HStack>
        <div>
          <h2>Dividers</h2>
          {Dividers.render?.(newArgs, context)}
        </div>
        <HStack gap="space-48">
          <div>
            <h2>Links</h2>
            {Links.render?.(newArgs, context)}
          </div>
          <div>
            <h2>Disabled</h2>
            {Disabled.render?.(newArgs, context)}
          </div>
        </HStack>
        <div style={{ marginBottom: "10rem" }}>
          <h2>Align</h2>
          {Align.render?.(newArgs, context)}
        </div>
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};

export const ColorRole = {
  render: (args, context) => {
    return (
      <div>
        <h2>Themed with meta-purple</h2>
        <Theme data-color="meta-purple">
          {Chromatic.render?.(args, context)}
        </Theme>
      </div>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};

export const HeaderWithUserInfo = () => {
  return (
    <div style={{ minHeight: "8rem" }}>
      <InternalHeader>
        <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
        <Spacer />
        <ActionMenu>
          <ActionMenu.Trigger>
            <InternalHeader.UserButton
              name="Ola N."
              description="Enhet: Skien"
            />
          </ActionMenu.Trigger>
          <ActionMenu.Content align="end" aria-labelledby="user-info">
            <dl id="user-info">
              <BodyShort as="dt" size="small">
                Ola Normann
              </BodyShort>
              <Detail as="dd">D123456</Detail>
            </dl>
            <ActionMenu.Divider />
            <ActionMenu.Group aria-label="Systemhandlinger">
              <ActionMenu.Item as="a" href="#">
                Logg ut
                <Spacer />
                <LeaveIcon aria-hidden />
              </ActionMenu.Item>
            </ActionMenu.Group>
          </ActionMenu.Content>
        </ActionMenu>
      </InternalHeader>
    </div>
  );
};

export const IconPosition: Story = {
  render: (props) => {
    return (
      <ActionMenu open={props.open}>
        <ActionMenu.Trigger>
          <button>Open action</button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Group label="Group 1">
            <ActionMenu.Item
              onSelect={() => console.log("Item 1 clicked")}
              icon={<StarIcon aria-hidden />}
            >
              Item 1
            </ActionMenu.Item>
            <ActionMenu.Item
              onSelect={() => console.log("Item 2 clicked")}
              icon={<PencilIcon aria-hidden />}
              iconPosition="right"
            >
              Item 2
            </ActionMenu.Item>
          </ActionMenu.Group>
          <ActionMenu.Divider />
          <ActionMenu.Group label="Group 2">
            <ActionMenu.Sub open={props.open}>
              <ActionMenu.SubTrigger icon={<ArrowDownRightIcon aria-hidden />}>
                Submenu 1
              </ActionMenu.SubTrigger>
              <ActionMenu.SubContent>
                <ActionMenu.Item
                  onSelect={() => console.log("Subitem 1 clicked")}
                >
                  Subitem 1
                </ActionMenu.Item>
              </ActionMenu.SubContent>
            </ActionMenu.Sub>
            <ActionMenu.Sub open={props.open}>
              <ActionMenu.SubTrigger
                icon={<CloudIcon aria-hidden />}
                iconPosition="right"
              >
                Submenu 2
              </ActionMenu.SubTrigger>
              <ActionMenu.SubContent>
                <ActionMenu.Item
                  onSelect={() => console.log("Subitem 1 clicked")}
                >
                  Subitem 1
                </ActionMenu.Item>
              </ActionMenu.SubContent>
            </ActionMenu.Sub>
          </ActionMenu.Group>
        </ActionMenu.Content>
      </ActionMenu>
    );
  },
  decorators: [DemoDecorator],
};

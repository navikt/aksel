import { Meta, StoryObj } from "@storybook/react";
import React, { useRef, useState } from "react";
import {
  MenuElipsisHorizontalCircleIcon,
  PencilIcon,
  PlusIcon,
  PushPinIcon,
  TasklistStartIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../button";
import { HStack, VStack } from "../../layout/stack";
import { Modal } from "../../modal";
import { Table } from "../../table";
import { Tag } from "../../tag";
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

const DemoDecorator = (Story: any, { name }) => {
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

export const Shortcut: Story = {
  render: (props) => {
    const [checkedItems, setCheckedItems] = useState({
      checkbox1: false,
      checkbox2: false,
    });

    // Step 3: Handle change
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
          <ActionMenu.Separator />
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
          <ActionMenu.Separator />
          <ActionMenu.Group label="Group 2">
            <ActionMenu.Item
              shortcut="⌘+T"
              onSelect={() => console.log("Item 1 clicked")}
            >
              Item 1
            </ActionMenu.Item>
            <ActionMenu.Item
              shortcut="⇧+⌘+N"
              onSelect={() => console.log("Item 2 clicked")}
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

export const CheckboxGroups: Story = {
  render: (props) => {
    const [checkedItems, setCheckedItems] = useState({
      checkbox1: false,
      checkbox2: true,
      checkbox3: false,
      checkbox4: true,
    });

    // Step 3: Handle change
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

export const CheckboxIndeterminateGroups: Story = {
  render: (props) => {
    const [checkedItems, setCheckedItems] = useState({
      checkbox1: false,
      checkbox2: true,
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
                ? checkedItems
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

    // Step 3: Handle value change
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

export const SeparatorWithGroupedItems: Story = {
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
          <ActionMenu.Separator />
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

export const SeparatorWithItems: Story = {
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
          <ActionMenu.Separator />
          <ActionMenu.Item onSelect={() => console.log("Item 2 clicked")}>
            Item 2
          </ActionMenu.Item>
          <ActionMenu.Separator />
          <ActionMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
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

const data = [
  {
    task: "Finish the report",
    status: "New",
  },
  {
    task: "Call the client",
    status: "In progress",
  },
  {
    task: "Prepare the presentation",
    status: "Done",
  },
  {
    task: "Review the budget",
    status: "Done",
  },
  {
    task: "Update website",
    status: "Backlog",
  },
] satisfies { task: string; status: Status }[];

const StatusArray = ["New", "In progress", "Done", "Backlog"] as const;

type Status = (typeof StatusArray)[number];

const StatusTag = ({ status }: { status: Status }) => {
  return (
    <Tag
      variant={
        status === "Done"
          ? "success"
          : status === "New"
            ? "alt1"
            : status === "Backlog"
              ? "warning"
              : "info"
      }
    >
      {status}
    </Tag>
  );
};

type Task = {
  id: number;
  task: string;
  status: Status;
};

export const ViewDemo: Story = {
  render: () => {
    const [tasks, setTasks] = useState<Task[]>(
      data.map((task, i) => ({ id: i, ...task })),
    );

    const updateTaskStatus = (taskId: number, newStatus: Status) => {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    };

    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell scope="col">Task</Table.HeaderCell>
            <Table.HeaderCell scope="col">Status</Table.HeaderCell>
            <Table.HeaderCell scope="col" align="right">
              Actions
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tasks.map(({ task, status, id }, i) => (
            <Table.Row key={i + task}>
              <Table.HeaderCell scope="row">{task}</Table.HeaderCell>
              <Table.DataCell>
                <StatusTag status={status} />
              </Table.DataCell>
              <Table.DataCell align="right">
                <ActionMenu>
                  <ActionMenu.Trigger>
                    <Button
                      icon={<MenuElipsisHorizontalCircleIcon title="Meny" />}
                      size="small"
                      variant="tertiary-neutral"
                    />
                  </ActionMenu.Trigger>
                  <ActionMenu.Content>
                    <ActionMenu.Group label="Dashboard">
                      <ActionMenu.Item onSelect={() => console.log("Edit")}>
                        <PlusIcon fontSize="20" /> Add to dashboard
                      </ActionMenu.Item>
                      <ActionMenu.Item onSelect={() => console.log("Edit")}>
                        <PushPinIcon fontSize="20" /> Pin task
                      </ActionMenu.Item>
                    </ActionMenu.Group>

                    <ActionMenu.Group label="Actions">
                      <ActionMenu.Item
                        onSelect={() => updateTaskStatus(id, "In progress")}
                      >
                        <TasklistStartIcon fontSize="20" /> Start task
                      </ActionMenu.Item>
                      <ActionMenu.Sub>
                        <ActionMenu.SubTrigger>
                          <PencilIcon fontSize="20" /> Edit status
                        </ActionMenu.SubTrigger>
                        <ActionMenu.SubContent>
                          {StatusArray.map((_status) => (
                            <ActionMenu.Item
                              key={_status}
                              onSelect={() => updateTaskStatus(id, _status)}
                              disabled={status === _status}
                            >
                              {_status}
                            </ActionMenu.Item>
                          ))}
                          <ActionMenu.Sub>
                            <ActionMenu.SubTrigger>
                              Nested submenu demo
                            </ActionMenu.SubTrigger>
                            <ActionMenu.SubContent>
                              {StatusArray.map((_status) => (
                                <ActionMenu.Item
                                  key={_status}
                                  onSelect={() => updateTaskStatus(id, _status)}
                                  disabled={status === _status}
                                >
                                  {_status}
                                </ActionMenu.Item>
                              ))}
                            </ActionMenu.SubContent>
                          </ActionMenu.Sub>
                        </ActionMenu.SubContent>
                      </ActionMenu.Sub>
                      <ActionMenu.Separator />
                      <ActionMenu.Item
                        destructive
                        onSelect={() =>
                          setTasks(tasks.filter((_task) => _task.id !== id))
                        }
                      >
                        <TrashIcon fontSize="20" />
                        Delete
                      </ActionMenu.Item>
                    </ActionMenu.Group>
                  </ActionMenu.Content>
                </ActionMenu>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
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
            {Shortcut.render?.(newArgs, context)}
          </div>
        </HStack>
        <HStack gap="12">
          <div>
            <h2>CheckboxGroups</h2>
            {CheckboxGroups.render?.(newArgs, context)}
          </div>
          <div>
            <h2>CheckboxIndeterminateGroups</h2>
            {CheckboxIndeterminateGroups.render?.(newArgs, context)}
          </div>
          <div>
            <h2>RadioGroups</h2>
            {RadioGroups.render?.(newArgs, context)}
          </div>
        </HStack>
        <HStack gap="12">
          <div>
            <h2>SeparatorWithGroupedItems</h2>
            {SeparatorWithGroupedItems.render?.(newArgs, context)}
          </div>
          <div>
            <h2>SeparatorWithItems</h2>
            {SeparatorWithItems.render?.(newArgs, context)}
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
      </VStack>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};

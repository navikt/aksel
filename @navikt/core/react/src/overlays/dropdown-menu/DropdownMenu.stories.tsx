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
import { VStack } from "../../layout/stack";
import { Modal } from "../../modal";
import { Table } from "../../table";
import { Tag } from "../../tag";
import { Tooltip } from "../../tooltip";
import { BodyShort } from "../../typography";
import { DropdownMenu } from "./DropdownMenu";

export default {
  title: "ds-react/DropdownMenu",
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DropdownMenu>;

type Story = StoryObj<typeof DropdownMenu>;

const DemoDecorator = (Story: any, { name }) => {
  return (
    <VStack gap="4" align="start">
      <h2>{name}</h2>
      <p>Placeholder before button</p>
      <button>Focusable item before dropdown</button>
      <Story />
      <button>Focusable item after dropdown</button>
      <p>Placeholder after button</p>
    </VStack>
  );
};

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

export const Shortcut: Story = {
  render: () => {
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
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button>Open dropdown</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <VStack asChild align="start" gap="1" paddingBlock="2">
            <DropdownMenu.Label>
              <BodyShort weight="semibold" as="div">
                Ola Normann
              </BodyShort>
              <div>D123456</div>
            </DropdownMenu.Label>
          </VStack>
          <DropdownMenu.Separator />
          <DropdownMenu.Group label="Group 1">
            <DropdownMenu.CheckboxItem
              checked={checkedItems.checkbox1}
              onCheckedChange={() => handleCheckboxChange("checkbox1")}
              shortcut="⌘T"
            >
              Checkbox 1
            </DropdownMenu.CheckboxItem>
            <DropdownMenu.CheckboxItem
              checked={checkedItems.checkbox2}
              onCheckedChange={() => handleCheckboxChange("checkbox2")}
              shortcut="⇧⌘N"
            >
              Checkbox 2
            </DropdownMenu.CheckboxItem>
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Group label="Group 2">
            <DropdownMenu.Item
              shortcut="⌘T"
              onSelect={() => console.log("Item 1 clicked")}
            >
              Item 1
            </DropdownMenu.Item>
            <DropdownMenu.Item
              shortcut="⇧⌘N"
              onSelect={() => console.log("Item 2 clicked")}
            >
              Item 2
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

export const CheckboxIndeterminateGroups: Story = {
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
          <DropdownMenu.CheckboxItem
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
          </DropdownMenu.CheckboxItem>
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

export const SeparatorWithGroupedItems: Story = {
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
          <DropdownMenu.Separator />
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

export const SeparatorWithItems: Story = {
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
          <DropdownMenu.Separator />
          <DropdownMenu.Item onSelect={() => console.log("Item 2 clicked")}>
            Item 2
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Submenus: Story = {
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
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>Submenu 1</DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item
                onSelect={() => console.log("Subitem 1 clicked")}
              >
                Subitem 1
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => console.log("Subitem 2 clicked")}
              >
                Subitem 2
              </DropdownMenu.Item>
              <DropdownMenu.Sub>
                <DropdownMenu.SubTrigger>
                  Nested submenu 1
                </DropdownMenu.SubTrigger>
                <DropdownMenu.SubContent>
                  <DropdownMenu.Item
                    onSelect={() => console.log("Nested Subitem 1 clicked")}
                  >
                    Nested Subitem 1
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => console.log("Nested Subitem 2 clicked")}
                  >
                    Nested Subitem 2
                  </DropdownMenu.Item>
                </DropdownMenu.SubContent>
              </DropdownMenu.Sub>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.Item onSelect={() => console.log("Item 3 clicked")}>
            Item 3
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const Disabled: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <button>Open dropdown</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item
            onSelect={() => console.log("Item 1 clicked")}
            disabled
          >
            Item 1
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger disabled>
              Submenu 1
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.Item
                onSelect={() => console.log("Subitem 1 clicked")}
              >
                Subitem 1
              </DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>

          <DropdownMenu.CheckboxItem checked disabled>
            Checkbox disabled
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem>Checkbox 2</DropdownMenu.CheckboxItem>
          <DropdownMenu.RadioGroup value="1" label="Radiogroup">
            <DropdownMenu.RadioItem disabled value="1">
              Radio disabled
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="2">Radio</DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu>
    );
  },
  decorators: [DemoDecorator],
};

export const TriggerWithTooltip: Story = {
  render: () => {
    return (
      <DropdownMenu>
        <Tooltip content="Tooltip!">
          <DropdownMenu.Trigger>
            <button>Open dropdown</button>
          </DropdownMenu.Trigger>
        </Tooltip>
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
        <DropdownMenu>
          <DropdownMenu.Trigger>
            <button>Open dropdown</button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content>
            <DropdownMenu.Item onSelect={() => ref.current?.showModal()}>
              open modal
            </DropdownMenu.Item>
            <DropdownMenu.Item onSelect={() => console.log("Item 2 clicked")}>
              Item 2
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
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
                <DropdownMenu>
                  <DropdownMenu.Trigger>
                    <Button
                      icon={<MenuElipsisHorizontalCircleIcon title="Meny" />}
                      size="small"
                      variant="tertiary-neutral"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Group label="Dashboard">
                      <DropdownMenu.Item onSelect={() => console.log("Edit")}>
                        <PlusIcon fontSize="20" /> Add to dashboard
                      </DropdownMenu.Item>
                      <DropdownMenu.Item onSelect={() => console.log("Edit")}>
                        <PushPinIcon fontSize="20" /> Pin task
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>

                    <DropdownMenu.Group label="Actions">
                      <DropdownMenu.Item
                        onSelect={() => updateTaskStatus(id, "In progress")}
                      >
                        <TasklistStartIcon fontSize="20" /> Start task
                      </DropdownMenu.Item>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>
                          <PencilIcon fontSize="20" /> Edit status
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          {StatusArray.map((_status) => (
                            <DropdownMenu.Item
                              key={_status}
                              onSelect={() => updateTaskStatus(id, _status)}
                              disabled={status === _status}
                            >
                              {_status}
                            </DropdownMenu.Item>
                          ))}
                          <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>
                              Nested submenu demo
                            </DropdownMenu.SubTrigger>
                            <DropdownMenu.SubContent>
                              {StatusArray.map((_status) => (
                                <DropdownMenu.Item
                                  key={_status}
                                  onSelect={() => updateTaskStatus(id, _status)}
                                  disabled={status === _status}
                                >
                                  {_status}
                                </DropdownMenu.Item>
                              ))}
                            </DropdownMenu.SubContent>
                          </DropdownMenu.Sub>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        destructive
                        onSelect={() =>
                          setTasks(tasks.filter((_task) => _task.id !== id))
                        }
                      >
                        <TrashIcon fontSize="20" />
                        Delete
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};

import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Spacer } from "../layout/stack";
import Dropdown from "./Dropdown";

export default {
  title: "ds-react/Dropdown",
  component: Dropdown,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Dropdown>;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => (
    <Dropdown onSelect={(event) => console.log(event)}>
      <Dropdown.Toggle>Toggle</Dropdown.Toggle>
      <Dropdown.Menu strategy="fixed">
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Systemer og oppslagsverk
          </Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item
            onClick={() => console.log("GroupedList.Item-click")}
          >
            Gosys
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
        <Dropdown.Menu.Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item onClick={() => console.log("Item-click")}>
            Gosys
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item disabled>Infotrygd</Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <Dropdown onSelect={(event) => console.log(event)} defaultOpen>
      <Button as={Dropdown.Toggle}>Toggle</Button>
      <Dropdown.Menu
        strategy="fixed"
        onClose={() => console.log("ONCLOSE default")}
      >
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Systemer og oppslagsverk
          </Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item
            onClick={() => console.log("GroupedList.Item-click")}
          >
            Gosys
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const ControlledOpen: Story = {
  render: () => {
    const [openState, setOpenState] = useState(true);
    return (
      <Dropdown onSelect={(event) => console.log(event)} open={openState}>
        <Button as={Dropdown.Toggle} onClick={() => setOpenState(!openState)}>
          Toggle
        </Button>
        <Dropdown.Menu
          strategy="fixed"
          onClose={() => console.log("ONCLOSE CONTROLLED")}
        >
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Heading>
              Systemer og oppslagsverk
            </Dropdown.Menu.GroupedList.Heading>
            <Dropdown.Menu.GroupedList.Item
              onClick={() => console.log("GroupedList.Item-click")}
            >
              Gosys
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

/**
 * Demo for testing Popover positioning strategy and event-handling on outside-click and escape-key
 */
export const NestedDemo: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Toggle>Toggle</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Systemer og oppslagsverk
          </Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item
            onClick={() => console.log("GroupedList.Item-click")}
          >
            Gosys
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
        <Dropdown.Menu.Divider />

        <Dropdown.Menu.List>
          <Dropdown>
            <Dropdown.Menu.List.Item as={Dropdown.Toggle}>
              Settings <Spacer />
              <ChevronRightIcon aria-hidden fontSize="1.5rem" />
            </Dropdown.Menu.List.Item>
            <Dropdown.Menu placement="right" strategy="fixed">
              <Dropdown.Menu.GroupedList>
                <Dropdown.Menu.GroupedList.Heading>
                  Systemer og oppslagsverk
                </Dropdown.Menu.GroupedList.Heading>
                <Dropdown.Menu.GroupedList.Item>
                  Gosys
                </Dropdown.Menu.GroupedList.Item>
              </Dropdown.Menu.GroupedList>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item disabled>Infotrygd</Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const Chromatic: Story = {
  render: () => (
    <Dropdown onSelect={(event) => console.log(event)} open>
      <Dropdown.Toggle>Toggle</Dropdown.Toggle>
      <Dropdown.Menu strategy="fixed">
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Systemer og oppslagsverk
          </Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item
            onClick={() => console.log("GroupedList.Item-click")}
          >
            Gosys
          </Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
        <Dropdown.Menu.Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item onClick={() => console.log("Item-click")}>
            Gosys
          </Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item disabled>Infotrygd</Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  ),
  parameters: {
    chromatic: { disable: false, delay: 300 },
  },
};

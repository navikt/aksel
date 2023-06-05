import React, { useState } from "react";
import { Dropdown } from "..";
import { Meta } from "@storybook/react";
import { Button } from "../button";

export default {
  title: "ds-react/Dropdown",
  component: Dropdown,
} as Meta;

export const Default = () => {
  return (
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
  );
};

export const DefaultOpen = {
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
  args: { chromatic: { delay: 300 } },
};

export const ControlledOpen = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
  args: { chromatic: { delay: 300 } },
};

import React from "react";
import { Dropdown } from "..";
import { Meta } from "@storybook/react";

export default {
  title: "ds-react-internal/Dropdown",
  component: Dropdown,
} as Meta;

export const Default = () => {
  return (
    <Dropdown onElementChosen={(element) => console.log(element)}>
      <Dropdown.Toggle>Toggle</Dropdown.Toggle>
      <Dropdown.Menu strategy="fixed">
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Systemer og oppslagsverk
          </Dropdown.Menu.GroupedList.Heading>
          <Dropdown.Menu.GroupedList.Item>Gosys</Dropdown.Menu.GroupedList.Item>
        </Dropdown.Menu.GroupedList>
        <Dropdown.Menu.Divider />
        <Dropdown.Menu.List>
          <Dropdown.Menu.List.Item>Gosys</Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item>Psys</Dropdown.Menu.List.Item>
          <Dropdown.Menu.List.Item disabled>Infotrygd</Dropdown.Menu.List.Item>
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  );
};

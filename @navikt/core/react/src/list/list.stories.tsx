import { Meta } from "@storybook/react";
import React from "react";
import { List } from "..";

export default {
  title: "ds-react/List",
  component: List,
} as Meta;

export const Default = {
  render: () => {
    return (
      <List>
        <List.Item>Item 1</List.Item>
        <List.Item>Item 2</List.Item>
        <List.Item>Item 3</List.Item>
      </List>
    );
  },
};

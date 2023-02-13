import { Meta } from "@storybook/react";
import React from "react";
import { List } from "..";

export default {
  title: "ds-react/List",
  component: List,
} as Meta;

export const Default = {
  render: (props: any) => {
    return (
      <List>
        <li>En</li>
        <li>To</li>
        <li>Tre</li>
      </List>
    );
  },
};

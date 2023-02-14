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
        <List.Item title="Item 1">Beskrivelse 1</List.Item>
        <List.Item title="Item 2">Beskrivelse 2</List.Item>
        <List.Item title="Item 2">Beskrivelse 3</List.Item>
      </List>
    );
  },
};

export const Ordered = {
  render: () => {
    return (
      <List as="ol">
        <List.Item title="Item 1">Beskrivelse 1</List.Item>
        <List.Item title="Item 2">Beskrivelse 2</List.Item>
        <List.Item title="Item 2">Beskrivelse 3</List.Item>
      </List>
    );
  },
};

export const WithHeading = {
  render: () => {
    return (
      <List
        title="Tittel på listen"
        description="Dette er en beskrivelse på hva denne listen inneholder :)"
      >
        <List.Item title="Tittel på punktet">
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item title="Tittel på punktet">
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item title="Tittel på punktet">
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
      </List>
    );
  },
};

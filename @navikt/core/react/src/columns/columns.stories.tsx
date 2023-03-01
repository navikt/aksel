import React from "react";
import { Columns } from ".";

export default {
  title: "ds-react/Columns",
  component: Columns,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: () => (
    <Columns>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const Gap = {
  render: () => (
    <Columns gap={{ sm: "6" }}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const Width = {
  render: () => (
    <Columns gap={{ sm: "6" }} columns={{ sm: 1, lg: "2fr 1fr 2fr 1fr" }}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

export const DynamicWidth = {
  render: () => (
    <Columns
      gap={{ sm: "6", lg: "8" }}
      columns={{ sm: "1fr 3fr", lg: "2fr 2fr" }}
    >
      <Placeholder text="1" />
      <Placeholder text="2" />
    </Columns>
  ),
};

export const CardsStacking = {
  render: () => (
    <Columns
      gap={{ xs: "4", sm: "6", lg: "8" }}
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
    >
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </Columns>
  ),
};

function Placeholder({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "20rem",
        width: "auto",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}

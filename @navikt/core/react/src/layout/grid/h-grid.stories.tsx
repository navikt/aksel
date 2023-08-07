import React from "react";
import { HGrid } from ".";

export default {
  title: "ds-react/HGrid",
  component: HGrid,
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = {
  render: (props) => (
    <HGrid {...props}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </HGrid>
  ),
  columns: 0,
  gap: "0",
};

export const Gap = {
  render: () => (
    <HGrid gap="6">
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </HGrid>
  ),
};

export const DynamicGap = {
  render: () => (
    <HGrid gap={{ xs: "2", md: "8" }}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </HGrid>
  ),
};

export const Columns = {
  render: () => (
    <HGrid gap="4" columns={2}>
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </HGrid>
  ),
};

export const DynamicColumns = {
  render: () => (
    <HGrid gap="4" columns={{ sm: "1fr 5fr", md: "2fr 2fr" }}>
      <Placeholder text="1" />
      <Placeholder text="2" />
    </HGrid>
  ),
};

function Placeholder({ text }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: "5rem",
        width: "auto",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}

import React from "react";
import { HGrid } from ".";
import { VStack } from "../stack";

const columnsVariants = {
  Number: "columnNumber",
  String: "columnString",
  Object: "columnObject",
};

export default {
  title: "ds-react/Primitives/HGrid",
  component: HGrid,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    columnsType: {
      defaultValue: Object.keys(columnsVariants)[0],
      options: Object.keys(columnsVariants),
      control: { type: "radio" },
    },
  },
};

/* const getColumnsProp = () */

export const Default = {
  render: (props) => (
    <HGrid
      gap={props?.gap ?? 4}
      columns={props[columnsVariants[props.columnsType]]}
    >
      <Placeholder text="1" />
      <Placeholder text="2" />
      <Placeholder text="3" />
      <Placeholder text="4" />
    </HGrid>
  ),
  args: {
    columnNumber: 4,
    columnObject: { xs: 1, md: 4 },
    columnString: "repeat(3, minmax(0, 1fr))",
    gap: "4",
  },
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

export const AlignItems = {
  render: () => (
    <VStack gap="8">
      <HGrid gap="4" columns={2} align="start">
        <Placeholder text="start" height="8rem" />
        <Placeholder text="auto" height="auto" />
      </HGrid>
      <HGrid gap="4" columns={2} align="center">
        <Placeholder text="center" height="8rem" />
        <Placeholder text="auto" height="auto" />
      </HGrid>
      <HGrid gap="4" columns={2} align="end">
        <Placeholder text="end" height="8rem" />
        <Placeholder text="auto" height="auto" />
      </HGrid>
    </VStack>
  ),
};

function Placeholder({ text, height }: { text: string; height?: string }) {
  return (
    <div
      style={{
        background: "var(--a-deepblue-900)",
        height: height ?? "5rem",
        width: "auto",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}

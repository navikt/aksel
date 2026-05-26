import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataGrid } from "../../data-grid";
import { Box } from "../../primitives/box";
import { VStack } from "../../primitives/stack";
import { TEST_DATA, columnDef_TEST_DATA } from "./Data.test-data";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/Data/Sticky header",
  component: DataGrid,
  parameters: {
    chromatic: { disable: true },
    layout: "fullscreen",
    a11y: { disable: true },
    docs: { disable: true },
  },
};

export default meta;

const getColDefs = (overflow: string) =>
  overflow === "none" || overflow === "y"
    ? columnDef_TEST_DATA.slice(0, 5)
    : columnDef_TEST_DATA;

const getData = (overflow: string) =>
  overflow === "none" || overflow === "x" ? TEST_DATA.slice(0, 5) : TEST_DATA;

type Story = StoryObj<{ overflow: "none" | "x" | "y" | "both" }>;

export const Flex: Story = {
  render: ({ overflow }) => {
    return (
      <VStack padding="space-16" gap="space-16" height="100vh">
        <Box
          borderWidth="1"
          padding="space-16"
          borderColor="neutral"
          borderRadius="12"
        >
          Greier før tabell
        </Box>

        <div style={{ overflow: "hidden", display: "flex" }}>
          <DataGrid columns={getColDefs(overflow)} data={getData(overflow)}>
            <div>Greier inni DataGrid før tabell</div>
            <DataGrid.Table />
            <div>Greier inni DataGrid etter tabell</div>
          </DataGrid>
        </div>

        <Box
          borderWidth="1"
          padding="space-16"
          borderColor="neutral"
          borderRadius="12"
        >
          Greier etter tabell
        </Box>
      </VStack>
    );
  },
  argTypes: {
    overflow: {
      control: { type: "radio" },
      options: ["none", "x", "y", "both"],
    },
  },
};

export const FlexNativeMinimal: Story = {
  render: ({ overflow }) => {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <div>Greier før tabell</div>
        <DataGrid columns={getColDefs(overflow)} data={getData(overflow)}>
          <DataGrid.Table />
        </DataGrid>
        <div>Greier etter tabell</div>
      </div>
    );
  },
  argTypes: {
    overflow: {
      control: { type: "radio" },
      options: ["none", "x", "y", "both"],
    },
  },
};

export const FlexMinimal: Story = {
  render: ({ overflow }) => {
    return (
      <VStack height="100vh">
        <div>Greier før tabell</div>
        <DataGrid columns={getColDefs(overflow)} data={getData(overflow)}>
          <DataGrid.Table />
        </DataGrid>
        <div>Greier etter tabell</div>
      </VStack>
    );
  },
  argTypes: {
    overflow: {
      control: { type: "radio" },
      options: ["none", "x", "y", "both"],
    },
  },
};

export const Maxheight: Story = {
  render: ({ overflow }) => {
    return (
      <VStack padding="space-16" gap="space-16" height="100vh">
        <Box
          borderWidth="1"
          padding="space-16"
          borderColor="neutral"
          borderRadius="12"
        >
          Greier før tabell
        </Box>

        <div style={{ display: "flex", maxHeight: "500px" }}>
          <DataGrid columns={getColDefs(overflow)} data={getData(overflow)}>
            <div>Greier inni DataGrid før tabell</div>
            <DataGrid.Table />
            <div>Greier inni DataGrid etter tabell</div>
          </DataGrid>
        </div>

        <Box
          borderWidth="1"
          padding="space-16"
          borderColor="neutral"
          borderRadius="12"
        >
          Greier etter tabell
        </Box>
      </VStack>
    );
  },
  argTypes: {
    overflow: {
      control: { type: "radio" },
      options: ["none", "x", "y", "both"],
    },
  },
};

export const MaxheightMinimal: Story = {
  render: ({ overflow }) => {
    return (
      <div style={{ display: "flex", maxHeight: "500px" }}>
        <DataGrid columns={getColDefs(overflow)} data={getData(overflow)}>
          <DataGrid.Table />
        </DataGrid>
      </div>
    );
  },
  argTypes: {
    overflow: {
      control: { type: "radio" },
      options: ["none", "x", "y", "both"],
    },
  },
};

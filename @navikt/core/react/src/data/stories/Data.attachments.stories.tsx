import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataGrid } from "../../data-grid";
import { VStack } from "../../primitives/stack";
import { BodyShort, Heading } from "../../typography";
import { renderStoriesForChromatic } from "../../utils/renderStoriesForChromatic";
import { TEST_DATA, columnDef_TEST_DATA } from "./Data.test-data";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/Data/Attachments",
  component: DataGrid,
  parameters: {
    chromatic: { disable: true },
    layout: "fullscreen",
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

export const Attachments: Story = {
  render: ({ overflow }) => {
    return (
      <VStack padding="space-16" gap="space-16" height="100vh">
        <VStack
          gap="space-8"
          justify="center"
          style={{ minHeight: "20vh", flexShrink: 0 }}
        >
          <Heading size="large" level="1">
            Attachments page layout
          </Heading>
          <BodyShort>
            The table and its attachments fill the remaining space. Only the
            table content scrolls.
          </BodyShort>
        </VStack>
        <div
          style={{
            overflow: "hidden",
            display: "flex",
            flex: 1,
            minHeight: 0,
          }}
        >
          <DataGrid
            columns={getColDefs(overflow)}
            data={getData(overflow)}
            getRowId={(row) => `${row.id}`}
            pagination={{ defaultPage: 0 }}
          >
            <DataGrid.Table
              topContent={<DataGrid.Pagination />}
              bottomContent={<DataGrid.Pagination />}
              stickyHeader
            />
          </DataGrid>
        </div>
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

export const Chromatic = renderStoriesForChromatic({
  Attachments,
});

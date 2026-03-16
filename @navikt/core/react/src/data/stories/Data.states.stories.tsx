import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import { DataTable } from "../table";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const EmptyStateAuto: Story = {
  render: () => (
    <DataTable layout="auto" withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th>Column 1</DataTable.Th>
          <DataTable.Th>Column 2</DataTable.Th>
          <DataTable.Th>Column 3</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.EmptyState>
          <div>No data available</div>
          <Button size="small">Create data</Button>
        </DataTable.EmptyState>
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const EmptyStateFixed: Story = {
  render: () => (
    <DataTable layout="fixed" withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th>Column 1</DataTable.Th>
          <DataTable.Th>Column 2</DataTable.Th>
          <DataTable.Th>Column 3</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.EmptyState>
          <div>No data available</div>
          <Button size="small">Create data</Button>
        </DataTable.EmptyState>
      </DataTable.Tbody>
    </DataTable>
  ),
};

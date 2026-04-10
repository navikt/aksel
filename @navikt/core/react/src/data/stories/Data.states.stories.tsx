import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import { DataTable } from "../table";
import { DataTableColumnHeader } from "../table/column-header/DataTableColumnHeader";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/States",
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
          <DataTableColumnHeader>Column 1</DataTableColumnHeader>
          <DataTableColumnHeader>Column 2</DataTableColumnHeader>
          <DataTableColumnHeader>Column 3</DataTableColumnHeader>
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
          <DataTableColumnHeader>Column 1</DataTableColumnHeader>
          <DataTableColumnHeader>Column 2</DataTableColumnHeader>
          <DataTableColumnHeader>Column 3</DataTableColumnHeader>
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

export const LoadingStateAuto: Story = {
  render: () => (
    <DataTable layout="auto" withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTableColumnHeader>Column 1</DataTableColumnHeader>
          <DataTableColumnHeader>Column 2</DataTableColumnHeader>
          <DataTableColumnHeader>Column 3</DataTableColumnHeader>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.LoadingState>Loading resources...</DataTable.LoadingState>
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const LoadingStateFixed: Story = {
  render: () => (
    <DataTable layout="fixed" withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTableColumnHeader>Column 1</DataTableColumnHeader>
          <DataTableColumnHeader>Column 2</DataTableColumnHeader>
          <DataTableColumnHeader>Column 3</DataTableColumnHeader>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.LoadingState>Loading resources...</DataTable.LoadingState>
      </DataTable.Tbody>
    </DataTable>
  ),
};

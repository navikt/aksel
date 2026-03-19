import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
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

const allRowIds = ["row-1", "row-2", "row-3", "row-4", "row-5"];

export const SelectionMultiple: Story = {
  render: () => {
    return (
      <DataTable
        layout="auto"
        withKeyboardNav
        selectionMode="multiple"
        defaultSelectedKeys={allRowIds}
      >
        <h2>Temp out of commision while rewriting selection API</h2>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTable.Th>Column 1</DataTable.Th>
            <DataTable.Th>Column 2</DataTable.Th>
            <DataTable.Th>Column 3</DataTable.Th>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Data</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Data</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Data</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Data</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Data</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    );
  },
};

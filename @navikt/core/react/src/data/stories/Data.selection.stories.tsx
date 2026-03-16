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

export const SelectionMultiple: Story = {
  render: () => (
    <DataTable layout="auto" withKeyboardNav selectionMode="multiple">
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
  ),
};

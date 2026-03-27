import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTable } from "../table";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Settings",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const TextAlign: Story = {
  render: () => (
    <DataTable layout="auto" withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th>Left</DataTable.Th>
          <DataTable.Th textAlign="center">Center</DataTable.Th>
          <DataTable.Th textAlign="right">Right</DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td textAlign="center">Yes</DataTable.Td>
          <DataTable.Td textAlign="right">100 500</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 2</DataTable.Td>
          <DataTable.Td textAlign="center">No</DataTable.Td>
          <DataTable.Td textAlign="right">2 000 200</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 3</DataTable.Td>
          <DataTable.Td textAlign="center">Maybe</DataTable.Td>
          <DataTable.Td textAlign="right">1 000 200</DataTable.Td>
        </DataTable.Tr>
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const TextAlignSortable: Story = {
  render: () => (
    <DataTable layout="auto" withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th sortable>Left</DataTable.Th>
          <DataTable.Th sortable textAlign="center">
            Center
          </DataTable.Th>
          <DataTable.Th sortable textAlign="right">
            Right
          </DataTable.Th>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td textAlign="center">Yes</DataTable.Td>
          <DataTable.Td textAlign="right">100 500</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 2</DataTable.Td>
          <DataTable.Td textAlign="center">No</DataTable.Td>
          <DataTable.Td textAlign="right">2 000 200</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 3</DataTable.Td>
          <DataTable.Td textAlign="center">Maybe</DataTable.Td>
          <DataTable.Td textAlign="right">1 000 200</DataTable.Td>
        </DataTable.Tr>
      </DataTable.Tbody>
    </DataTable>
  ),
};

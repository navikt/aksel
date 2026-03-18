import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTable } from "../table";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Resize",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const Resize: Story = {
  render: () => (
    <DataTable withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTable.Th
            maxWidth="400px"
            minWidth="100px"
            defaultWidth="100%"
            textAlign="left"
          >
            Left
          </DataTable.Th>
          <DataTable.Th
            maxWidth="400px"
            minWidth="50px"
            defaultWidth="100%"
            textAlign="center"
          >
            Center
          </DataTable.Th>
          <DataTable.Th
            maxWidth="400px"
            minWidth="200px"
            defaultWidth="100%"
            textAlign="right"
          >
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

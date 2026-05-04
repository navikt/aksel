import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTableColumnHeader } from "../table/column-header/DataTableColumnHeader";
import { DataTable } from "../table/root/DataTableRoot.legacy";

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
          <DataTableColumnHeader label="Left" textAlign="left">
            Left
          </DataTableColumnHeader>
          <DataTableColumnHeader label="Center" textAlign="center">
            Center
          </DataTableColumnHeader>
          <DataTableColumnHeader label="Right" textAlign="right">
            Right
          </DataTableColumnHeader>
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

export const ResizeMinMax: Story = {
  render: () => (
    <DataTable withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTableColumnHeader
            label="Left"
            maxWidth={400}
            minWidth={100}
            textAlign="left"
          >
            Left
          </DataTableColumnHeader>
          <DataTableColumnHeader
            label="Center"
            maxWidth={400}
            minWidth={50}
            textAlign="center"
          >
            Center
          </DataTableColumnHeader>
          <DataTableColumnHeader
            label="Right"
            maxWidth={400}
            minWidth={200}
            textAlign="right"
          >
            Right
          </DataTableColumnHeader>
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

export const ResizeDefaultStaticWidth: Story = {
  render: () => (
    <DataTable withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTableColumnHeader
            label="Left"
            defaultWidth="300px"
            textAlign="left"
          >
            Left
          </DataTableColumnHeader>
          <DataTableColumnHeader
            label="Center"
            defaultWidth="300px"
            textAlign="center"
          >
            Center
          </DataTableColumnHeader>
          <DataTableColumnHeader
            label="Right"
            defaultWidth="300px"
            textAlign="right"
          >
            Right
          </DataTableColumnHeader>
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

export const ResizeDefaultDynamicWidth: Story = {
  render: () => (
    <DataTable withKeyboardNav>
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTableColumnHeader
            label="Left"
            defaultWidth="100%"
            textAlign="left"
          >
            Left
          </DataTableColumnHeader>
          <DataTableColumnHeader
            label="Center"
            defaultWidth="100%"
            textAlign="center"
          >
            Center
          </DataTableColumnHeader>
          <DataTableColumnHeader
            label="Right"
            defaultWidth="100%"
            textAlign="right"
          >
            Right
          </DataTableColumnHeader>
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

import { Meta } from "@storybook/react-vite";
import React from "react";
import { DataTable } from "./root/DataTableRoot";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/DataTable",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

export const Default = () => (
  <DataTable>
    <DataTable.Thead>
      <DataTable.Tr>
        <DataTable.Th>Header 1</DataTable.Th>
        <DataTable.Th>Header 2</DataTable.Th>
      </DataTable.Tr>
    </DataTable.Thead>
    <DataTable.Tbody>
      <DataTable.Tr>
        <DataTable.Td>Data 1</DataTable.Td>
        <DataTable.Td>Data 2</DataTable.Td>
      </DataTable.Tr>
      <DataTable.Tr>
        <DataTable.Td>Data 1</DataTable.Td>
        <DataTable.Td>Data 2</DataTable.Td>
      </DataTable.Tr>
      <DataTable.Tr>
        <DataTable.Td>Data 1</DataTable.Td>
        <DataTable.Td>Data 2</DataTable.Td>
      </DataTable.Tr>
    </DataTable.Tbody>
  </DataTable>
);

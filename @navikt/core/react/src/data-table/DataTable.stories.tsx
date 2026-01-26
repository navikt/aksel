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
      <tr>
        <th>Header 1</th>
        <th>Header 2</th>
      </tr>
    </DataTable.Thead>
  </DataTable>
);

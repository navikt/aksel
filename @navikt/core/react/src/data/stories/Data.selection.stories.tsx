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
    const [visible, setVisible] = React.useState(false);

    return (
      <div>
        <button onClick={() => setVisible((x) => !x)}>click</button>
        {visible && (
          <DataTable
            layout="auto"
            withKeyboardNav
            selectionMode="multiple"
            /* disabledKeys={["row-4"]} */
            defaultSelectedKeys={allRowIds}
            /* getAllRowIds={() => allRowIds} */
            /* allRowIds={allRowIds}
      items={rows} */
          >
            <DataTable.Thead>
              <DataTable.Tr>
                <DataTable.Th>Column 1</DataTable.Th>
                <DataTable.Th>Column 2</DataTable.Th>
                <DataTable.Th>Column 3</DataTable.Th>
              </DataTable.Tr>
            </DataTable.Thead>
            <DataTable.Tbody>
              <DataTable.Tr value="row-1">
                <DataTable.Td>Test</DataTable.Td>
                <DataTable.Td>Data</DataTable.Td>
                <DataTable.Td>Example</DataTable.Td>
              </DataTable.Tr>
              <DataTable.Tr value="row-2">
                <DataTable.Td>Test</DataTable.Td>
                <DataTable.Td>Data</DataTable.Td>
                <DataTable.Td>Example</DataTable.Td>
              </DataTable.Tr>
              <DataTable.Tr value="row-3">
                <DataTable.Td>Test</DataTable.Td>
                <DataTable.Td>Data</DataTable.Td>
                <DataTable.Td>Example</DataTable.Td>
              </DataTable.Tr>
              <DataTable.Tr value="row-4">
                <DataTable.Td>Test</DataTable.Td>
                <DataTable.Td>Data</DataTable.Td>
                <DataTable.Td>Example</DataTable.Td>
              </DataTable.Tr>
              <DataTable.Tr value="row-5">
                <DataTable.Td>Test</DataTable.Td>
                <DataTable.Td>Data</DataTable.Td>
                <DataTable.Td>Example</DataTable.Td>
              </DataTable.Tr>
            </DataTable.Tbody>
          </DataTable>
        )}
      </div>
    );
  },
};

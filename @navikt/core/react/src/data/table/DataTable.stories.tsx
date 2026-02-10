import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTable } from ".";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/DataTable",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof DataTable>;

export default meta;

export const Default: Story = {
  render: (props) => (
    <DataTable
      rowDensity={props.rowDensity}
      style={{ width: "500px" }}
      zebraStripes={props.zebraStripes}
      truncateContent={props.truncateContent}
    >
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
          <DataTable.Td>
            Very long content that should be truncated
          </DataTable.Td>
        </DataTable.Tr>
      </DataTable.Tbody>
    </DataTable>
  ),
  args: {
    rowDensity: "normal",
    zebraStripes: false,
    truncateContent: true,
  },
  argTypes: {
    rowDensity: {
      control: { type: "radio" },
      options: ["condensed", "normal", "spacious"],
      defaultValue: "normal",
    },
    zebraStripes: {
      control: { type: "boolean" },
    },
    truncateContent: {
      control: { type: "boolean" },
    },
  },
};

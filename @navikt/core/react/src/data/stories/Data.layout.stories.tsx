import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTableColumnHeader } from "../table/column-header/DataTableColumnHeader";
import { DataTable } from "../table/root/DataTableRoot.legacy";
import { sampleData } from "./dummy-data";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Layout",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

const columns = [
  {
    header: "Id",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "National id",
    accessorKey: "nationalId",
  },
  {
    header: "Day job",
    accessorKey: "dayJob",
  },
  {
    header: "Supervisor",
    accessorKey: "supervisor",
  },
  {
    header: "Date received",
    accessorKey: "dateReceived",
  },
  {
    header: "Message",
    accessorKey: "message",
    contentMaxWidth: 200,
  },
  {
    header: "Age",
    accessorKey: "age",
  },
  {
    header: "Force sensitive",
    accessorKey: "forceSensitive",
  },
  {
    header: "Home system",
    accessorKey: "homeSystem",
  },
  {
    header: "Skills",
    accessorKey: "skills",
  },
];

export const AutoLayoutMinimal: Story = {
  render: () => {
    return (
      <DataTable layout="auto">
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTableColumnHeader>Column 1</DataTableColumnHeader>
            <DataTableColumnHeader>Column 2</DataTableColumnHeader>
            <DataTableColumnHeader>Column 3</DataTableColumnHeader>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
            <DataTable.Td>Demo of small table</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

export const AutoLayoutOverflowX: Story = {
  render: () => {
    return (
      <DataTable layout="auto">
        <DataTable.Thead>
          <DataTable.Tr>
            {columns.map((column) => {
              return (
                <DataTableColumnHeader key={column.header}>
                  {column.header}
                </DataTableColumnHeader>
              );
            })}
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          {sampleData.slice(0, 4).map((row) => (
            <DataTable.Tr key={row.name}>
              {columns.map((column) => (
                <DataTable.Td
                  key={column.accessorKey}
                  contentMaxWidth={column.contentMaxWidth}
                >
                  {row[column.accessorKey]}
                </DataTable.Td>
              ))}
            </DataTable.Tr>
          ))}
        </DataTable.Tbody>
      </DataTable>
    );
  },
};

export const AutoLayoutNoCellTruncation: Story = {
  render: () => {
    return (
      <DataTable layout="auto" truncateContent={false}>
        <DataTable.Thead>
          <DataTable.Tr>
            {columns.map((column) => (
              <DataTableColumnHeader key={column.header}>
                {column.header}
              </DataTableColumnHeader>
            ))}
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          {sampleData.slice(0, 3).map((row) => (
            <DataTable.Tr key={row.name}>
              {columns.map((column) => (
                <DataTable.Td key={column.accessorKey}>
                  {column.accessorKey === "message"
                    ? row[column.accessorKey].split(" ").slice(0, 4).join(" ") +
                      "."
                    : row[column.accessorKey]}
                </DataTable.Td>
              ))}
            </DataTable.Tr>
          ))}
        </DataTable.Tbody>
      </DataTable>
    );
  },
};

export const AutoLayoutSortable: Story = {
  render: () => (
    <DataTable layout="auto">
      <DataTable.Thead>
        <DataTable.Tr>
          <DataTableColumnHeader sortable>Left</DataTableColumnHeader>
          <DataTableColumnHeader sortable>Center</DataTableColumnHeader>
          <DataTableColumnHeader sortable>Right</DataTableColumnHeader>
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        <DataTable.Tr>
          <DataTable.Td>Data 1</DataTable.Td>
          <DataTable.Td>Yes</DataTable.Td>
          <DataTable.Td>100 500</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 2</DataTable.Td>
          <DataTable.Td>No</DataTable.Td>
          <DataTable.Td>2 000 200</DataTable.Td>
        </DataTable.Tr>
        <DataTable.Tr>
          <DataTable.Td>Data 3</DataTable.Td>
          <DataTable.Td>Maybe</DataTable.Td>
          <DataTable.Td>1 000 200</DataTable.Td>
        </DataTable.Tr>
      </DataTable.Tbody>
    </DataTable>
  ),
};

export const FixedLayoutMinimal: Story = {
  render: () => {
    return (
      <DataTable layout="fixed">
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTableColumnHeader>Column 1</DataTableColumnHeader>
            <DataTableColumnHeader>Column 2</DataTableColumnHeader>
            <DataTableColumnHeader>Column 3</DataTableColumnHeader>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
            <DataTable.Td>Demo of small table</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

export const FixedLayoutDynamicWidth: Story = {
  render: () => {
    return (
      <DataTable layout="fixed">
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTableColumnHeader defaultWidth="100%">
              Column 1
            </DataTableColumnHeader>
            <DataTableColumnHeader defaultWidth="100%">
              Column 2
            </DataTableColumnHeader>
            <DataTableColumnHeader defaultWidth="100%">
              Column 3
            </DataTableColumnHeader>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Test</DataTable.Td>
            <DataTable.Td>Example</DataTable.Td>
            <DataTable.Td>Demo of small table</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

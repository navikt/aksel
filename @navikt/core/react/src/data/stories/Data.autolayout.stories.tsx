import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { VStack } from "../../primitives/stack";
import { DataTable } from "../table";
import { sampleData } from "./dummy-data";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data",
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

export const AutoLayout: Story = {
  render: () => {
    return (
      <VStack gap="space-16" maxWidth="1000px">
        <p>Small table width layout=auto</p>
        <DataTable layout="auto">
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
              <DataTable.Td>Example</DataTable.Td>
              <DataTable.Td>Demo of small table</DataTable.Td>
            </DataTable.Tr>
          </DataTable.Tbody>
        </DataTable>

        <p>Overflowing table width layout=auto</p>
        <DataTable layout="auto">
          <DataTable.Thead>
            <DataTable.Tr>
              {columns.map((column) => {
                return (
                  <DataTable.Th key={column.header}>
                    {column.header}
                  </DataTable.Th>
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

        <p>Overflowing table width layout=auto and truncateContent=false</p>
        <DataTable layout="auto" truncateContent={false}>
          <DataTable.Thead>
            <DataTable.Tr>
              {columns.map((column) => (
                <DataTable.Th key={column.header}>{column.header}</DataTable.Th>
              ))}
            </DataTable.Tr>
          </DataTable.Thead>
          <DataTable.Tbody>
            {sampleData.slice(0, 3).map((row) => (
              <DataTable.Tr key={row.name}>
                {columns.map((column) => (
                  <DataTable.Td key={column.accessorKey}>
                    {column.accessorKey === "message"
                      ? row[column.accessorKey]
                          .split(" ")
                          .slice(0, 4)
                          .join(" ") + "."
                      : row[column.accessorKey]}
                  </DataTable.Td>
                ))}
              </DataTable.Tr>
            ))}
          </DataTable.Tbody>
        </DataTable>
      </VStack>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

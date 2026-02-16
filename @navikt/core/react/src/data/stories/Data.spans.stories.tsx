import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { VStack } from "../../primitives/stack";
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

export const Spans: Story = {
  render: () => {
    return (
      <VStack height="100vh" padding="space-16">
        <DataTable style={{ width: "100%" }}>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th colSpan={2}>Group A</DataTable.Th>
              <DataTable.Th colSpan={2}>Group B</DataTable.Th>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Th>Col 1</DataTable.Th>
              <DataTable.Th>Col 2</DataTable.Th>
              <DataTable.Th>Col 3</DataTable.Th>
              <DataTable.Th>Col 4</DataTable.Th>
            </DataTable.Tr>
          </DataTable.Thead>
          <DataTable.Tbody>
            <DataTable.Tr>
              <DataTable.Td rowSpan={2}>Rowspan 2-1</DataTable.Td>
              <DataTable.Td>R1C2</DataTable.Td>
              <DataTable.Td colSpan={2}>Colspan 2-1</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td>R2C2</DataTable.Td>
              <DataTable.Td>R2C3</DataTable.Td>
              <DataTable.Td>R2C4</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td>R3C1</DataTable.Td>
              <DataTable.Td colSpan={2}>Colspan 2-2</DataTable.Td>
              <DataTable.Td>R3C4</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Th>Test</DataTable.Th>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td rowSpan={2}>Rowspan 2</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
              <DataTable.Td>Test</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td rowSpan={2}>Rowspan 2-2</DataTable.Td>
              <DataTable.Td>R4C2</DataTable.Td>
              <DataTable.Td>R4C3</DataTable.Td>
              <DataTable.Td>R4C4</DataTable.Td>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTable.Td colSpan={3}>Colspan 3</DataTable.Td>
            </DataTable.Tr>
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

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { VStack } from "../../primitives/stack";
import { DataTableColumnHeader } from "../table/column-header/DataTableColumnHeader";
import { DataTable } from "../table/root/DataTableRoot.legacy";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Spans",
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
        <DataTable>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTableColumnHeader
                label="Group A"
                defaultWidth="100%"
                colSpan={2}
              >
                Group A
              </DataTableColumnHeader>
              <DataTableColumnHeader
                label="Group B"
                defaultWidth="100%"
                colSpan={2}
              >
                Group B
              </DataTableColumnHeader>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTableColumnHeader label="Col 1">Col 1</DataTableColumnHeader>
              <DataTableColumnHeader label="Col 2">Col 2</DataTableColumnHeader>
              <DataTableColumnHeader label="Col 3">Col 3</DataTableColumnHeader>
              <DataTableColumnHeader label="Col 4">Col 4</DataTableColumnHeader>
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
              <DataTable.Td>Test</DataTable.Td>
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

export const SpansSortable: Story = {
  render: () => {
    return (
      <VStack height="100vh" padding="space-16">
        <DataTable>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTableColumnHeader
                label="Group A"
                defaultWidth="100%"
                colSpan={2}
                sortable
              >
                Group A
              </DataTableColumnHeader>
              <DataTableColumnHeader
                label="Group B"
                defaultWidth="100%"
                colSpan={2}
                sortable
              >
                Group B
              </DataTableColumnHeader>
            </DataTable.Tr>
            <DataTable.Tr>
              <DataTableColumnHeader label="Col 1" sortable>
                Col 1
              </DataTableColumnHeader>
              <DataTableColumnHeader label="Col 2" sortable>
                Col 2
              </DataTableColumnHeader>
              <DataTableColumnHeader label="Col 3" sortable>
                Col 3
              </DataTableColumnHeader>
              <DataTableColumnHeader label="Col 4" sortable>
                Col 4
              </DataTableColumnHeader>
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
              <DataTable.Td>Test</DataTable.Td>
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

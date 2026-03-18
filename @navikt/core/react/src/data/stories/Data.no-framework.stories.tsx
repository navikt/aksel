import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useDeferredValue, useMemo, useState } from "react";
import { VStack } from "../../primitives/stack";
import { DataTable } from "../table";
import { DataToolbar } from "../toolbar";
import { PersonInfo, sampleData } from "./dummy-data";

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

export const WithoutTanstack: Story = {
  render: () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const deferredFilterString = useDeferredValue(globalFilter); // Perf: Makes input rerender independently of table
    /* const [columnPinning, setColumnPinning] = useState<{
      left: string[];
      right: string[];
    }>({ left: [], right: [] });*/

    const globalFilterLower = deferredFilterString.toLowerCase();
    // Perf: Memoize data to avoid rerendering table body on unrelated state changes (the filtering itself is not expensive)
    const data = useMemo(
      () =>
        deferredFilterString
          ? sampleData.filter((item) =>
              Object.values(item).some((value) =>
                String(value).toLowerCase().includes(globalFilterLower),
              ),
            )
          : sampleData,
      [deferredFilterString, globalFilterLower],
    );

    return (
      <VStack gap="space-16">
        <DataToolbar>
          <DataToolbar.SearchField
            label="Tekstfilter"
            onChange={(e) => setGlobalFilter(e)}
          />
        </DataToolbar>

        <DataTable>
          <DataTable.Thead>
            <DataTable.Tr>
              {columns.map((column) => {
                return (
                  <DataTable.Th
                    key={column.header}
                    defaultWidth={150}
                    //style={{ width: `var(--header-${header.id}-size)` }}
                    data-key={column.accessorKey}
                    /* pinningHandler={() => {
                      const isPinned = columnPinning.left.includes(
                        column.accessorKey,
                      );
                      const newLeft = isPinned
                        ? columnPinning.left.filter(
                            (key) => key !== column.accessorKey,
                          )
                        : [...columnPinning.left, column.accessorKey];
                      setColumnPinning({
                        ...columnPinning,
                        left: newLeft,
                      });
                    }}
                    isPinned={columnPinning.left.includes(column.accessorKey)} */
                  >
                    {column.header}
                  </DataTable.Th>
                );
              })}
            </DataTable.Tr>
          </DataTable.Thead>
          <MemoizedTableBody data={data} />
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

const TableBody = ({ data }: { data: PersonInfo[] }) => (
  <DataTable.Tbody>
    {data.map((row) => (
      <DataTable.Tr key={row.name}>
        {columns.map((column) => (
          <DataTable.Td key={column.accessorKey}>
            {row[column.accessorKey]}
          </DataTable.Td>
        ))}
      </DataTable.Tr>
    ))}
  </DataTable.Tbody>
);

const MemoizedTableBody = React.memo(TableBody) as typeof TableBody;

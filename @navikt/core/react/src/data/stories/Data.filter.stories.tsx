import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Select } from "../../form/select";
import { Box } from "../../primitives/box";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort } from "../../typography";
import { DataTable } from "../table";
import { DataTableProfiler } from "./DataTableProfiler";
import { PersonInfo, columns, sampleData } from "./dummy-data";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
  decorators: [(Story) => <DataTableProfiler>{Story()}</DataTableProfiler>],
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const TanstackColumnFilter: Story = {
  render: () => {
    const table = useReactTable({
      columns,
      data: sampleData,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: "includesString",
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageIndex: 1,
          pageSize: 20,
        },
      },
    });

    const getColumnValues = (columnId: string) => {
      const values = table
        .getCoreRowModel()
        .flatRows.map((row) => row.getValue(columnId)) as string[];
      return Array.from(new Set(values));
    };

    return (
      <DataTable style={{ width: "3000px" }}>
        <DataTable.Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <DataTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <DataTable.Th
                      key={header.id}
                      resizeHandler={header.getResizeHandler()}
                      sortDirection={header.column.getIsSorted() || "none"}
                      onSortChange={(_, event) => {
                        const handler = header.column.getToggleSortingHandler();
                        handler?.(event);
                      }}
                      render={{
                        filterMenu: {
                          title: "Filter",
                          content: (
                            <DummyFilter
                              values={getColumnValues(header.column.id)}
                              /* This only work for values without custom renderer (like boolean tags now) */
                              title={`Filter: ${header.column.columnDef.header}`}
                            />
                          ),
                        },
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </DataTable.Th>
                  );
                })}
              </DataTable.Tr>
            );
          })}
        </DataTable.Thead>

        {table.getState().columnSizingInfo.isResizingColumn ? (
          <MemoizedTableBody table={table} />
        ) : (
          <TableBody table={table} />
        )}
        <DataTable.Tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <DataTable.Tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <DataTable.Td key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </DataTable.Td>
              ))}
            </DataTable.Tr>
          ))}
        </DataTable.Tfoot>
      </DataTable>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

function DummyFilter({ values, title }: { values: string[]; title: string }) {
  return (
    <VStack gap="space-8" padding="space-8">
      <BodyShort as="div" size="large" weight="semibold">
        {title}
      </BodyShort>
      <HStack gap="space-8">
        <Select label="Operator" hideLabel>
          <option value="is">is</option>
          <option value="is-not">is not</option>
          <option value="is-any">is any of</option>
          <option value="is-none">is none of</option>
        </Select>
        <Select label="Verdi" hideLabel>
          <option value="">-- Velg verdi --</option>
          {values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </HStack>
      <Box
        as="hr"
        width="100%"
        borderWidth="0 0 1 0"
        borderColor="neutral-subtleA"
      />
      <HStack gap="space-6" justify="space-between">
        <Button data-color="neutral" variant="tertiary" size="small">
          Slett
        </Button>
        <Button
          data-color="neutral"
          variant="primary"
          size="small"
          icon={<CheckmarkIcon aria-hidden />}
        >
          Lagre
        </Button>
      </HStack>
    </VStack>
  );
}

const TableBody = ({ table }: { table: Table<PersonInfo> }) => (
  <DataTable.Tbody>
    {table.getRowModel().rows.map((row) => {
      return (
        <DataTable.Tr key={row.id}>
          {row.getVisibleCells().map((cell) => {
            return (
              <DataTable.Td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </DataTable.Td>
            );
          })}
        </DataTable.Tr>
      );
    })}
  </DataTable.Tbody>
);

const MemoizedTableBody = React.memo(
  TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof TableBody;

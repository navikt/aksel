import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  type ColumnFiltersState,
  Table,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
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
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
      columns,
      data: sampleData,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: "includesString",
      getPaginationRowModel: getPaginationRowModel(),
      getFacetedRowModel: getFacetedRowModel(), // client-side faceting
      getFacetedUniqueValues: getFacetedUniqueValues(),
      initialState: {
        pagination: {
          pageIndex: 1,
          pageSize: 20,
        },
      },
      onColumnFiltersChange: setColumnFilters,
      state: {
        columnFilters,
      },
      filterFns: {},
    });

    return (
      <DataTable withKeyboardNav>
        <DataTable.Thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <DataTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <DataTable.Th
                      key={header.id}
                      defaultWidth={200}
                      sortable
                      sortDirection={header.column.getIsSorted() || "none"}
                      onSortClick={(event) => {
                        const handler = header.column.getToggleSortingHandler();
                        handler?.(event);
                      }}
                      /* render={{

                        filterMenu: header.column.getCanFilter()
                          ? {
                              title: "Filter",
                              content: (
                                <DummyFilter
                                  column={header.column}

                                  title={`Filter: ${header.column.columnDef.header}`}
                                />
                              ),
                            }
                          : undefined,
                      }} */
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

        <MemoizedTableBody table={table} />

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
  (_prev, next) => !!next.table.getState().columnSizingInfo.isResizingColumn,
) as typeof TableBody;

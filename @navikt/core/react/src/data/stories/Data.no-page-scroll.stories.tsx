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
import { Search } from "../../form/search";
import { Box } from "../../primitives/box";
import { VStack } from "../../primitives/stack";
import { DataTableColumnHeader } from "../table/column-header/DataTableColumnHeader";
import { DataTable } from "../table/root/DataTableRoot.legacy";
import { DataToolbar } from "../toolbar";
import { PersonInfo, columns, sampleData } from "./dummy-data";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Scroll",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

export const NoPageScroll: Story = {
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
      state: {},
      columnResizeMode: "onChange",
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    });

    return (
      <VStack padding="space-16" gap="space-16" height="100vh">
        <Box
          borderWidth="1"
          padding="space-16"
          borderColor="neutral"
          borderRadius="12"
        >
          Aktive filtre her
        </Box>

        <DataToolbar
          renderInput={
            <Search
              label="Tekstfilter"
              variant="simple"
              size="small"
              onChange={(value) => table.setGlobalFilter(value)}
            />
          }
        />

        <Box flexGrow="1" overflow="hidden">
          <DataTable withKeyboardNav>
            <DataTable.Thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <DataTable.Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <DataTableColumnHeader
                          key={header.id}
                          defaultWidth={header.getSize()}
                          sortable
                          sortDirection={header.column.getIsSorted() || "none"}
                          onSortClick={(event) => {
                            const handler =
                              header.column.getToggleSortingHandler();
                            handler?.(event);
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </DataTableColumnHeader>
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
        </Box>

        <Box
          borderWidth="1"
          padding="space-16"
          borderColor="neutral"
          borderRadius="12"
        >
          Paginering og sånn her
        </Box>
      </VStack>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

const TableBody = ({ table }: { table: Table<PersonInfo> }) => {
  return (
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
};

const MemoizedTableBody = React.memo(
  TableBody,
  (_prev, next) => !!next.table.getState().columnSizingInfo.isResizingColumn,
) as typeof TableBody;

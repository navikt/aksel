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
import { CogIcon, RectangleSectionsIcon } from "@navikt/aksel-icons";
import { ActionMenu } from "../../action-menu";
import { Button } from "../../button";
import { Box } from "../../primitives/box";
import { VStack } from "../../primitives/stack";
import { DataTable } from "../table";
import { DataToolbar } from "../toolbar";
import { PersonInfo, columns, sampleData } from "./dummy-data";

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

        <DataToolbar>
          <DataToolbar.SearchField
            label="Tekstfilter"
            onChange={(value) => table.setGlobalFilter(value)}
          />
          <DataToolbar.ToggleButton icon={<RectangleSectionsIcon />} />
          <ActionMenu>
            <ActionMenu.Trigger>
              <Button
                data-color="neutral"
                variant="tertiary"
                size="small"
                icon={<CogIcon title="Kolonner" />}
              />
            </ActionMenu.Trigger>
            <ActionMenu.Content>
              <ActionMenu.CheckboxItem
                checked={table.getIsAllColumnsVisible()}
                onSelect={(event) => {
                  const handler = table.getToggleAllColumnsVisibilityHandler();
                  handler(event);
                }}
              >
                Vis alle
              </ActionMenu.CheckboxItem>
              {table.getAllLeafColumns().map((column) => {
                return (
                  <ActionMenu.CheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onSelect={(event) => {
                      const handler = column.getToggleVisibilityHandler();
                      handler(event);
                    }}
                  >
                    {column.id}
                  </ActionMenu.CheckboxItem>
                );
              })}
            </ActionMenu.Content>
          </ActionMenu>
        </DataToolbar>

        <DataTable>
          <DataTable.Thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <DataTable.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <DataTable.Th
                        key={header.id}
                        size={header.getSize()}
                        resizeHandler={header.getResizeHandler()}
                        sortDirection={header.column.getIsSorted() || "none"}
                        onSortChange={(_, event) => {
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

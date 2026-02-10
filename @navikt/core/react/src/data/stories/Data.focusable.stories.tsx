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

export const Focusable: Story = {
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
          pageSize: 5,
        },
      },
      state: {},
      columnResizeMode: "onChange",
      debugTable: true,
      debugHeaders: true,
      debugColumns: true,
    });

    const columnSizeVars = () => {
      const headers = table.getFlatHeaders();
      const colSizes: { [key: string]: `${number}px` } = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        colSizes[`--header-${header.id}-size`] = `${header.getSize()}px`;
        colSizes[`--col-${header.column.id}-size`] =
          `${header.column.getSize()}px`;
      }
      return colSizes;
    };

    return (
      <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
        <button>Focuable before</button>
        <DataTable withKeyboardNav style={columnSizeVars()}>
          <DataTable.Thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <DataTable.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <DataTable.Th
                        key={header.id}
                        style={{ width: `var(--header-${header.id}-size)` }}
                        resizeHandler={header.getResizeHandler()}
                        /* pinningHandler={
                          header.column.getIsPinned() === "left"
                            ? () => header.column.pin(false)
                            : () => header.column.pin("left")
                        }
                        isPinned={header.column.getIsPinned() === "left"} */
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
        </DataTable>
        <button>Focuable after</button>
      </div>
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

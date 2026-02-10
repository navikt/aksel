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
};

export const Spans: Story = {
  render: () => (
    <div style={{ padding: "4rem", display: "grid", gap: "2rem" }}>
      <DataTable style={{ width: "100%" }} withKeyboardNav>
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
            <DataTable.Td rowSpan={2}>Rowspan 2</DataTable.Td>
            <DataTable.Td>R1C2</DataTable.Td>
            <DataTable.Td colSpan={2}>Colspan 2</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>R2C2</DataTable.Td>
            <DataTable.Td>R2C3</DataTable.Td>
            <DataTable.Td>R2C4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>R3C1</DataTable.Td>
            <DataTable.Td colSpan={2}>Colspan 2</DataTable.Td>
            <DataTable.Td>R3C4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td rowSpan={2}>Rowspan 2</DataTable.Td>
            <DataTable.Td>R4C2</DataTable.Td>
            <DataTable.Td>R4C3</DataTable.Td>
            <DataTable.Td>R4C4</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td colSpan={3}>Colspan 3</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    </div>
  ),
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

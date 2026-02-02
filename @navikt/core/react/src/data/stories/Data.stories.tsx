import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { CogIcon, RectangleSectionsIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { VStack } from "../../layout/stack";
import { ActionMenu } from "../../overlays/action-menu";
import DataActionBar from "../action-bar/root/DataActionBarRoot";
import { DataTable } from "../table";
import { DataToolbar } from "../toolbar";
import { columns, sampleData } from "./dummy-data";

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

export const Default: Story = {
  render: () => (
    <VStack gap="space-16">
      <DataToolbar>
        <DataToolbar.SearchField label="Tekstfilter" />
        <DataToolbar.ToggleButton icon={<RectangleSectionsIcon />} />
      </DataToolbar>

      <DataActionBar numOfSelectedRows={2} onClear={() => alert("Cleared!")}>
        <Button variant="secondary" size="small">
          Handling 1
        </Button>
        <Button variant="secondary" size="small">
          Handling 2
        </Button>
      </DataActionBar>

      <DataTable>
        <DataTable.Thead>
          <DataTable.Tr>
            <DataTable.Th>Header 1</DataTable.Th>
            <DataTable.Th>Header 2</DataTable.Th>
          </DataTable.Tr>
        </DataTable.Thead>
        <DataTable.Tbody>
          <DataTable.Tr>
            <DataTable.Td>Data 1</DataTable.Td>
            <DataTable.Td>Data 2</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Data 1</DataTable.Td>
            <DataTable.Td>Data 2</DataTable.Td>
          </DataTable.Tr>
          <DataTable.Tr>
            <DataTable.Td>Data 1</DataTable.Td>
            <DataTable.Td>Data 2</DataTable.Td>
          </DataTable.Tr>
        </DataTable.Tbody>
      </DataTable>
    </VStack>
  ),
};

export const TanstackExample: Story = {
  render: () => {
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [columnPinning, setColumnPinning] =
      React.useState<ColumnPinningState>({ left: [], right: [] });

    const table = useReactTable({
      columns,
      data: sampleData,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: "includesString",
      state: {
        globalFilter,
        columnVisibility,
        columnPinning,
      },
      onColumnPinningChange: setColumnPinning,
      onGlobalFilterChange: setGlobalFilter,
      onColumnVisibilityChange: setColumnVisibility,
      columnResizeMode: "onChange",
    });

    return (
      <VStack gap="space-16">
        <DataToolbar>
          <DataToolbar.SearchField
            label="Tekstfilter"
            onChange={(e) => setGlobalFilter(e)}
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

        <DataActionBar numOfSelectedRows={2} onClear={() => alert("Cleared!")}>
          <Button variant="secondary" size="small">
            Handling 1
          </Button>
          <Button variant="secondary" size="small">
            Handling 2
          </Button>
        </DataActionBar>

        <DataTable style={{ width: "3000px" }}>
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
                        pinningHandler={
                          header.column.getIsPinned() === "left"
                            ? () => header.column.pin(false)
                            : () => header.column.pin("left")
                        }
                        isPinned={header.column.getIsPinned() === "left"}
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
          <DataTable.Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <DataTable.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <DataTable.Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </DataTable.Td>
                    );
                  })}
                </DataTable.Tr>
              );
            })}
          </DataTable.Tbody>
        </DataTable>
      </VStack>
    );
  },
};

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
import {
  CheckmarkIcon,
  ChevronDownUpIcon,
  ChevronUpDownIcon,
  CogIcon,
  Density1Icon,
  NotePencilFillIcon,
  NotePencilIcon,
  RectangleSectionsIcon,
} from "@navikt/aksel-icons";
import { ActionMenu } from "../../action-menu";
import { Button } from "../../button";
import { VStack } from "../../primitives/stack";
import DataActionBar from "../action-bar/root/DataActionBarRoot";
import { DataTable } from "../table";
import { DataToolbar } from "../toolbar";
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
    const [rowDensity, setRowDensity] = React.useState<
      "normal" | "condensed" | "spacious"
    >("normal");
    const [zebraStripes, setZebraStripes] = React.useState(false);
    const [truncateContent, setTruncateContent] = React.useState(true);
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
      <VStack gap="space-16">
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
          <ActionMenu>
            <ActionMenu.Trigger>
              <Button
                data-color="neutral"
                variant="tertiary"
                size="small"
                icon={<Density1Icon title="Tetthet" />}
              />
            </ActionMenu.Trigger>
            <ActionMenu.Content>
              <ActionMenu.Group aria-label="Velg tetthet">
                <ActionMenu.Item
                  onSelect={() => setRowDensity("condensed")}
                  icon={
                    rowDensity === "condensed" ? <CheckmarkIcon /> : undefined
                  }
                >
                  Tett
                </ActionMenu.Item>
                <ActionMenu.Item
                  onSelect={() => setRowDensity("normal")}
                  icon={rowDensity === "normal" ? <CheckmarkIcon /> : undefined}
                >
                  Normal
                </ActionMenu.Item>
                <ActionMenu.Item
                  onSelect={() => setRowDensity("spacious")}
                  icon={
                    rowDensity === "spacious" ? <CheckmarkIcon /> : undefined
                  }
                >
                  Løs
                </ActionMenu.Item>
              </ActionMenu.Group>
            </ActionMenu.Content>
          </ActionMenu>
          <Button
            icon={
              zebraStripes ? (
                <NotePencilFillIcon title="Skru striper av" />
              ) : (
                <NotePencilIcon title="Skru striper på" />
              )
            }
            data-color="neutral"
            variant="tertiary"
            size="small"
            onClick={() => setZebraStripes((old) => !old)}
          />
          <Button
            icon={
              truncateContent ? (
                <ChevronUpDownIcon title="Kutt innhold" />
              ) : (
                <ChevronDownUpIcon title="Vis fullstendig innhold" />
              )
            }
            data-color="neutral"
            variant="tertiary"
            size="small"
            onClick={() => setTruncateContent((old) => !old)}
          />
        </DataToolbar>

        <DataActionBar numOfSelectedRows={2} onClear={() => alert("Cleared!")}>
          <Button variant="secondary" size="small">
            Handling 1
          </Button>
          <Button variant="secondary" size="small">
            Handling 2
          </Button>
        </DataActionBar>

        <DataTable
          style={columnSizeVars()}
          rowDensity={rowDensity}
          zebraStripes={zebraStripes}
          truncateContent={truncateContent}
        >
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
      </VStack>
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

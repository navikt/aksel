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
  MenuElipsisVerticalCircleIcon,
  RectangleSectionsIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
import { Radio, RadioGroup } from "../../form/radio";
import { Switch } from "../../form/switch";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort } from "../../typography";
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
          <Dialog>
            <Dialog.Trigger>
              <Button
                icon={
                  <MenuElipsisVerticalCircleIcon
                    aria-hidden
                    title="Åpne meny for innstillinger"
                  />
                }
                data-color="neutral"
                variant="tertiary"
                size="small"
              />
            </Dialog.Trigger>
            <Dialog.Popup width="large">
              <Dialog.Header>
                <Dialog.Title>Innstillinger</Dialog.Title>
                <Dialog.Description>
                  Her kan du justere innstillinger for tabellen
                </Dialog.Description>
              </Dialog.Header>
              <Dialog.Body>
                <HStack gap="space-32" paddingBlock="space-0 space-32">
                  <VStack gap="space-36" maxWidth="50%">
                    <RadioGroup
                      legend="Velg radtetthet"
                      onChange={setRowDensity}
                      size="small"
                      value={rowDensity}
                    >
                      <Radio value="condensed">Tett</Radio>
                      <Radio value="normal">Normal</Radio>
                      <Radio value="spacious">Løs</Radio>
                    </RadioGroup>
                    <Switch
                      size="small"
                      checked={truncateContent}
                      onChange={(e) => setTruncateContent(e.target.checked)}
                      description="Velg denne for å kutte innhold som ikke får plass i cellen til en linje."
                    >
                      Kutt innhold
                    </Switch>
                    <Switch
                      size="small"
                      checked={zebraStripes}
                      onChange={(e) => setZebraStripes(e.target.checked)}
                      description="Velg denne for å få stripede rader."
                    >
                      Stripede rader
                    </Switch>
                  </VStack>
                  <VStack maxWidth="50%" gap="space-16">
                    <BodyShort weight="semibold">Vis kolonner</BodyShort>
                    <VStack gap="space-8">
                      <Switch
                        checked={table.getIsAllColumnsVisible()}
                        size="small"
                        onChange={(event) => {
                          const handler =
                            table.getToggleAllColumnsVisibilityHandler();
                          handler?.(event);
                        }}
                      >
                        Velg alle
                      </Switch>
                      {table.getAllLeafColumns().map((column) => {
                        return (
                          <Switch
                            key={column.id}
                            size="small"
                            checked={column.getIsVisible()}
                            onChange={(event) => {
                              const handler =
                                column.getToggleVisibilityHandler();
                              handler(event);
                            }}
                          >
                            {column.id}
                          </Switch>
                        );
                      })}
                    </VStack>
                  </VStack>
                </HStack>
              </Dialog.Body>
            </Dialog.Popup>
          </Dialog>
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

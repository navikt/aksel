import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  type RowSelectionState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Dialog } from "../../dialog";
import { CheckboxInput } from "../../form/checkbox/checkbox-input/CheckboxInput";
import { Radio, RadioGroup } from "../../form/radio";
import { RadioInput } from "../../form/radio/radio-input/RadioInput";
import { Search } from "../../form/search";
import { Switch } from "../../form/switch";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort } from "../../typography";
import DataDragAndDrop from "../drag-and-drop-old/root/DataDragAndDropRoot";
import { DataTableColumnHeader } from "../table/column-header/DataTableColumnHeader";
import { DataTable } from "../table/root/DataTableRoot";
import { DataTable as DataTableLegacy } from "../table/root/DataTableRoot.legacy";
import { TokenFilter } from "../token-filter/TokenFilter";
import type { ExternalQuery } from "../token-filter/TokenFilter.types";
import { DataToolbar } from "../toolbar";
import { TEST_DATA, columnDef_TEST_DATA } from "./Data.test-data";
import {
  PersonInfo,
  columns,
  homeSystemOptions,
  sampleData,
} from "./dummy-data";

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

export const KitchenSink: Story = {
  render: () => {
    const [rowDensity, setRowDensity] = React.useState<
      "normal" | "condensed" | "spacious"
    >("normal");
    const [zebraStripes, setZebraStripes] = React.useState(false);
    const [truncateContent, setTruncateContent] = React.useState(true);
    const [columnOrder, setColumnOrder] = React.useState<string[]>(
      columns.map((col) => col.accessorKey!),
    );

    const table = useReactTable({
      columns,
      data: sampleData,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      globalFilterFn: "includesString",
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
      },
      state: {
        columnOrder,
      },
      enableRowSelection: false,
      onColumnOrderChange: setColumnOrder,
      columnResizeMode: "onChange",
      debugTable: false,
      debugHeaders: false,
      debugColumns: false,
    });

    return (
      <VStack gap="space-16">
        <DataToolbar
          renderInput={
            <Search
              label="Tekstfilter"
              variant="simple"
              size="small"
              onChange={(value) => table.setGlobalFilter(value)}
            />
          }
          renderPagination={
            <HStack gap="space-2" wrap={false} align="center">
              <Button
                size="small"
                variant="tertiary"
                icon={<ChevronLeftIcon aria-hidden />}
                data-color="neutral"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
              <BodyShort as="div" style={{ whiteSpace: "pre" }} size="small">
                {`Side ${table.getState().pagination.pageIndex + 1} av ${table.getPageCount()}`}
              </BodyShort>
              <Button
                size="small"
                variant="tertiary"
                icon={<ChevronRightIcon aria-hidden />}
                data-color="neutral"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </HStack>
          }
          renderPreferences={
            <Dialog>
              <Dialog.Trigger>
                <Button
                  icon={
                    <CogIcon aria-hidden title="Åpne meny for innstillinger" />
                  }
                  data-color="neutral"
                  variant="tertiary"
                  size="small"
                />
              </Dialog.Trigger>
              <Dialog.Popup position="right" withBackdrop={false}>
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
                        <DataDragAndDrop setItems={setColumnOrder}>
                          {table.getAllLeafColumns().map((column, index) => {
                            return (
                              <DataDragAndDrop.Item
                                id={column.id}
                                index={index}
                                key={column.id}
                              >
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
                              </DataDragAndDrop.Item>
                            );
                          })}
                        </DataDragAndDrop>
                      </VStack>
                    </VStack>
                  </HStack>
                </Dialog.Body>
              </Dialog.Popup>
            </Dialog>
          }
        />

        <DataTableLegacy
          rowDensity={rowDensity}
          zebraStripes={zebraStripes}
          truncateContent={truncateContent}
          withKeyboardNav
        >
          <DataTableLegacy.Thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <DataTableLegacy.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <DataTableColumnHeader
                        key={header.id}
                        style={{ width: `var(--header-${header.id}-size)` }}
                        defaultWidth={header.getSize()}
                        /* pinningHandler={
                          header.column.getIsPinned() === "left"
                            ? () => header.column.pin(false)
                            : () => header.column.pin("left")
                        }
                        isPinned={header.column.getIsPinned() === "left"} */
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
                </DataTableLegacy.Tr>
              );
            })}
          </DataTableLegacy.Thead>

          <MemoizedTableBody table={table} />

          {table.getRowModel().rows.length > 0 && (
            <DataTableLegacy.Tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <DataTableLegacy.Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <DataTableLegacy.Td key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </DataTableLegacy.Td>
                  ))}
                </DataTableLegacy.Tr>
              ))}
            </DataTableLegacy.Tfoot>
          )}
        </DataTableLegacy>
      </VStack>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

const dayJobValues = [
  "Jedi Knight",
  "Bounty Hunter",
  "Sith Lord",
  "Smuggler",
  "Imperial Officer",
  "Rebel Pilot",
  "Moisture Farmer",
  "Podracer",
  "Clone Trooper",
  "Droid Mechanic",
];

const filterPropertyDefs = [
  {
    key: "name",
    label: "Name",
    group: "Person",
    operators: [":", "!:", "=", "!=", "^", "!^"],
  },
  {
    key: "nationalId",
    label: "National Id",
    group: "Person",
    operators: ["=", ":"],
  },
  {
    key: "dayJob",
    label: "Day job",
    group: "Workplace",
    operators: ["=", "!=", ":", "!:"],
  },
  {
    key: "supervisor",
    label: "Supervisor",
    group: "Workplace",
    operators: ["=", "!=", ":", "!:"],
  },
  {
    key: "homeSystem",
    label: "Home system",
    groupLabel: "Home system",
    group: "Home",
    operators: ["=", "!=", ":", "!:"],
  },
];

const filterOptions = [
  ...dayJobValues.map((v) => ({ propertyKey: "dayJob", value: v })),
  ...homeSystemOptions.map((v) => ({
    propertyKey: "homeSystem",
    value: v,
  })),
  ...Array.from(new Set(sampleData.map((row) => row.supervisor))).map(
    (value) => ({
      propertyKey: "supervisor",
      value,
    }),
  ),
  ...Array.from(new Set(sampleData.map((row) => row.nationalId))).map(
    (value) => ({
      propertyKey: "nationalId",
      value,
    }),
  ),
  ...Array.from(new Set(sampleData.map((row) => row.name))).map((value) => ({
    propertyKey: "name",
    value,
  })),
];

export const KitchenSinkAdvancedFilter: Story = {
  render: () => {
    const [rowDensity, setRowDensity] = React.useState<
      "normal" | "condensed" | "spacious"
    >("normal");
    const [zebraStripes, setZebraStripes] = React.useState(false);
    const [truncateContent, setTruncateContent] = React.useState(true);
    const [columnOrder, setColumnOrder] = React.useState<string[]>(
      columns.map((col) => col.accessorKey!),
    );

    const [query, setQuery] = useState<ExternalQuery>({
      tokens: [],
      operation: "and",
    });

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [selectionMode, setSelectionMode] = useState<"single" | "multiple">(
      "multiple",
    );

    const filteredData = useMemo(() => {
      if (query.tokens.length === 0) {
        return sampleData;
      }

      return sampleData.filter((row) => {
        const results = query.tokens.map((token) => {
          const value = row[token.propertyKey as keyof PersonInfo];
          if (token.operator === "=") {
            return value === token.value;
          }
          if (token.operator === "!=") {
            return value !== token.value;
          }
          if (token.operator === ":") {
            return String(value)
              .toLowerCase()
              .includes(String(token.value).toLowerCase());
          }
          if (token.operator === "!:") {
            return !String(value)
              .toLowerCase()
              .includes(String(token.value).toLowerCase());
          }
          if (token.operator === "^") {
            return String(value)
              .toLowerCase()
              .startsWith(String(token.value).toLowerCase());
          }
          if (token.operator === "!^") {
            return !String(value)
              .toLowerCase()
              .startsWith(String(token.value).toLowerCase());
          }
          return true;
        });

        return query.operation === "and"
          ? results.every(Boolean)
          : results.some(Boolean);
      });
    }, [query]);

    const table = useReactTable({
      columns,
      data: filteredData,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      globalFilterFn: "includesString",
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 20,
        },
      },
      state: {
        columnOrder,
        rowSelection,
      },
      onColumnOrderChange: setColumnOrder,
      onRowSelectionChange: setRowSelection,
      enableRowSelection: true,
      enableMultiRowSelection: selectionMode === "multiple",
      columnResizeMode: "onChange",
      debugTable: false,
      debugHeaders: false,
      debugColumns: false,
    });

    return (
      <VStack gap="space-16">
        <DataToolbar
          renderInput={
            <TokenFilter
              query={query}
              onChange={setQuery}
              options={filterOptions}
              propertyDefinitions={filterPropertyDefs}
            />
          }
          renderPagination={
            <HStack gap="space-2" wrap={false} align="center">
              <Button
                size="small"
                variant="tertiary"
                icon={<ChevronLeftIcon aria-hidden />}
                data-color="neutral"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              />
              <BodyShort as="div" style={{ whiteSpace: "pre" }} size="small">
                {`Side ${table.getState().pagination.pageIndex + 1} av ${table.getPageCount()}`}
              </BodyShort>
              <Button
                size="small"
                variant="tertiary"
                icon={<ChevronRightIcon aria-hidden />}
                data-color="neutral"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              />
            </HStack>
          }
          renderPreferences={
            <Dialog>
              <Dialog.Trigger>
                <Button
                  icon={
                    <CogIcon aria-hidden title="Åpne meny for innstillinger" />
                  }
                  data-color="neutral"
                  variant="tertiary"
                  size="small"
                />
              </Dialog.Trigger>
              <Dialog.Popup position="right" withBackdrop={false}>
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
                      <Switch
                        size="small"
                        checked={selectionMode === "multiple"}
                        onChangeCapture={(e) =>
                          setSelectionMode(
                            e.target.checked ? "multiple" : "single",
                          )
                        }
                        description="Slår på flervalg"
                      >
                        Flervalg
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
                        <DataDragAndDrop setItems={setColumnOrder}>
                          {table.getAllLeafColumns().map((column, index) => {
                            return (
                              <DataDragAndDrop.Item
                                id={column.id}
                                index={index}
                                key={column.id}
                              >
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
                              </DataDragAndDrop.Item>
                            );
                          })}
                        </DataDragAndDrop>
                      </VStack>
                    </VStack>
                  </HStack>
                </Dialog.Body>
              </Dialog.Popup>
            </Dialog>
          }
        />

        <DataTable
          columnDefinitions={columnDef_TEST_DATA}
          data={TEST_DATA}
          rowDensity={rowDensity}
          zebraStripes={zebraStripes}
          truncateContent={truncateContent}
          withKeyboardNav
        />

        <DataTableLegacy
          rowDensity={rowDensity}
          zebraStripes={zebraStripes}
          truncateContent={truncateContent}
          withKeyboardNav
        >
          <DataTableLegacy.Thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <DataTableLegacy.Tr key={headerGroup.id}>
                  {table.options.enableMultiRowSelection ? (
                    <DataTableColumnHeader textAlign="center" width="64px">
                      <CheckboxInput
                        compact
                        checked={table.getIsAllPageRowsSelected()}
                        indeterminate={table.getIsSomePageRowsSelected()}
                        onChange={table.getToggleAllPageRowsSelectedHandler()}
                        aria-label="Velg alle rader"
                      />
                    </DataTableColumnHeader>
                  ) : (
                    <DataTableColumnHeader textAlign="center" width="64px" />
                  )}
                  {headerGroup.headers.map((header) => {
                    return (
                      <DataTableColumnHeader
                        key={header.id}
                        style={{ width: `var(--header-${header.id}-size)` }}
                        defaultWidth={header.getSize()}
                        /* pinningHandler={
                          header.column.getIsPinned() === "left"
                            ? () => header.column.pin(false)
                            : () => header.column.pin("left")
                        }
                        isPinned={header.column.getIsPinned() === "left"} */
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
                </DataTableLegacy.Tr>
              );
            })}
          </DataTableLegacy.Thead>

          <MemoizedTableBody table={table} />

          {table.getRowModel().rows.length > 0 && (
            <DataTableLegacy.Tfoot>
              {table.getFooterGroups().map((footerGroup) => (
                <DataTableLegacy.Tr key={footerGroup.id}>
                  <DataTableLegacy.Td />
                  {footerGroup.headers.map((header) => (
                    <DataTableLegacy.Td key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                          )}
                    </DataTableLegacy.Td>
                  ))}
                </DataTableLegacy.Tr>
              ))}
            </DataTableLegacy.Tfoot>
          )}
        </DataTableLegacy>
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
  const hasRowSelection = table.options.enableRowSelection;
  const multiRowSelection = table.options.enableMultiRowSelection;

  if (table.getRowModel().rows.length === 0) {
    return (
      <DataTableLegacy.Tbody>
        <DataTableLegacy.EmptyState>
          <div>No data available</div>
          <Button size="small">Create data</Button>
        </DataTableLegacy.EmptyState>
      </DataTableLegacy.Tbody>
    );
  }

  return (
    <DataTableLegacy.Tbody>
      {table.getRowModel().rows.map((row) => {
        return (
          <DataTableLegacy.Tr key={row.id} selected={row.getIsSelected()}>
            {hasRowSelection && (
              <DataTableLegacy.Td textAlign="center" UNSAFE_isSelection>
                {multiRowSelection ? (
                  <CheckboxInput
                    compact
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                    aria-label={`Velg rad ${row.id}`}
                  />
                ) : (
                  <RadioInput
                    compact
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                    aria-label={`Velg rad ${row.id}`}
                  />
                )}
              </DataTableLegacy.Td>
            )}
            {row.getVisibleCells().map((cell) => {
              return (
                <DataTableLegacy.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </DataTableLegacy.Td>
              );
            })}
          </DataTableLegacy.Tr>
        );
      })}
    </DataTableLegacy.Tbody>
  );
};

const MemoizedTableBody = React.memo(
  TableBody,
  (_prev, next) => !!next.table.getState().columnSizingInfo.isResizingColumn,
) as typeof TableBody;

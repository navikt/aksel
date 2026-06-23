import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CogIcon,
} from "@navikt/aksel-icons";
import { Button } from "../../button";
import { DataGrid } from "../../data-grid";
import { Dialog } from "../../dialog";
import { Checkbox } from "../../form/checkbox";
import { Radio, RadioGroup } from "../../form/radio";
import { Select } from "../../form/select";
import { Switch } from "../../form/switch";
import { HStack, VStack } from "../../primitives/stack";
import { BodyShort, Heading } from "../../typography";
import DragAndDrop from "../drag-and-drop/root/DragAndDropRoot";
import { DataGridTable } from "../table/root/DataGridTableRoot";
import { TokenFilter } from "../token-filter/TokenFilter";
import type { ExternalQuery } from "../token-filter/TokenFilter.types";
import { DataToolbar } from "../toolbar";
import {
  TEST_DATA,
  TEST_DATA_NESTED,
  columnDef_TEST_DATA,
  columnDef_TEST_DATA_NESTED,
} from "./Data.test-data";
import { PersonInfo, homeSystemOptions } from "./dummy-data";

const meta: Meta<typeof DataGridTable> = {
  title: "ds-react/Data",
  component: DataGridTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGridTable>;

/* export const KitchenSink: Story = {
  render: () => {
    const [rowDensity, setRowDensity] = React.useState<
      "normal" | "condensed" | "spacious"
    >("normal");
    const [zebraStripes, setZebraStripes] = React.useState(false);
    const [truncateContent, setTruncateContent] = React.useState(true);
    const [columnOrder, setColumnOrder] = React.useState<
      ColumnDefinitions<any, any>
    >(
      columns.map((col) => ({
        id: col.accessorKey!,
        label: col.accessorKey!,
        cell: () => <></>,
      })),
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
        columnOrder: columnOrder.map((col) => col.id),
      },
      enableRowSelection: false,
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
                        <DragAndDrop
                          items={columnOrder}
                          setItems={setColumnOrder}
                          renderItem={(item) => {
                            const column = table
                              .getAllLeafColumns()
                              .find((col) => col.id === item.id);
                            return (
                              <Switch
                                key={item.id}
                                size="small"
                                checked={column?.getIsVisible()}
                                onChange={(event) => {
                                  const handler =
                                    column?.getToggleVisibilityHandler();
                                  handler?.(event);
                                }}
                              >
                                {item.id}
                              </Switch>
                            );
                          }}
                        />
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
                        sortable
                        sortDirection={header.column.getIsSorted() || "none"}
                        onSortClick={(event) => {
                          const handler =
                            header.column.getToggleSortingHandler();
                          handler?.(event);
                        }}
                        label={(
                          header.column.columnDef.header || ""
                        ).toString()}
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
}; */

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
  ...Array.from(new Set(TEST_DATA.map((row) => row.supervisor))).map(
    (value) => ({
      propertyKey: "supervisor",
      value,
    }),
  ),
  ...Array.from(new Set(TEST_DATA.map((row) => row.nationalId))).map(
    (value) => ({
      propertyKey: "nationalId",
      value,
    }),
  ),
  ...Array.from(new Set(TEST_DATA.map((row) => row.name))).map((value) => ({
    propertyKey: "name",
    value,
  })),
];

const allColumnIds = columnDef_TEST_DATA.map((col) => col.id);

export const KitchenSinkAdvancedFilter: Story = {
  render: () => {
    const [rowDensity, setRowDensity] = React.useState<
      "tight" | "standard" | "loose"
    >("standard");
    const [textSize, setTextSize] = React.useState<"small" | "medium">(
      "medium",
    );
    const [zebraStripes, setZebraStripes] = React.useState(false);
    const [truncateContent, setTruncateContent] = React.useState(true);
    const [columnDividers, setColumnDividers] = React.useState(true);
    const [columnView, setColumnView] = React.useState(columnDef_TEST_DATA);
    const [visibleColumns, setVisibleColumns] =
      useState<string[]>(allColumnIds);

    const [stickyColumns, setStickyColumns] = React.useState<{
      first: "none" | "first";
      last: "none" | "last";
    }>({
      first: "none",
      last: "none",
    });
    const [showDetailsPanel, setShowDetailsPanel] = useState(false);
    const [showNestedRows, setNestedRows] = useState(false);

    const [query, setQuery] = useState<ExternalQuery>({
      tokens: [],
      operation: "and",
    });

    const [selectionMode, setSelectionMode] =
      useState<DataGrid.Selection["mode"]>("none");

    const filteredData = useMemo(() => {
      if (query.tokens.length === 0) {
        return showNestedRows ? TEST_DATA_NESTED : TEST_DATA;
      }

      return (showNestedRows ? TEST_DATA_NESTED : TEST_DATA).filter((row) => {
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
    }, [query.operation, query.tokens, showNestedRows]);

    /* const table = useReactTable({
      columns: [{}],
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
    }); */

    const pagedData = usePaginatedData(filteredData);

    return (
      <VStack gap="space-16" maxHeight="100vh" padding="space-24">
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
                onClick={() => pagedData.setPageIndex(pagedData.pageIndex - 1)}
                disabled={!pagedData.canPreviousPage}
              />
              <BodyShort as="div" style={{ whiteSpace: "pre" }} size="small">
                {`Side ${pagedData.pageIndex + 1} av ${pagedData.pageCount}`}
              </BodyShort>
              <Button
                size="small"
                variant="tertiary"
                icon={<ChevronRightIcon aria-hidden />}
                data-color="neutral"
                onClick={() => pagedData.setPageIndex(pagedData.pageIndex + 1)}
                disabled={!pagedData.canNextPage}
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
                    <VStack gap="space-24" maxWidth="50%">
                      <RadioGroup
                        legend="Velg radtetthet"
                        onChange={setRowDensity}
                        size="small"
                        value={rowDensity}
                      >
                        <Radio value="tight">Tett</Radio>
                        <Radio value="standard">Standard</Radio>
                        <Radio value="loose">Løs</Radio>
                      </RadioGroup>
                      <RadioGroup
                        legend="Velg tekststørrelse"
                        onChange={setTextSize}
                        size="small"
                        value={textSize}
                      >
                        <Radio value="small">Liten</Radio>
                        <Radio value="medium">Medium</Radio>
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
                        checked={columnDividers}
                        onChange={(e) => setColumnDividers(e.target.checked)}
                        description="Velg denne for å få kolonne separatorer."
                      >
                        Kolonne separatorer
                      </Switch>
                      <RadioGroup
                        legend="Sticky første kolonne"
                        onChange={(value) =>
                          setStickyColumns((prev) => ({
                            ...prev,
                            first: value as "none" | "first",
                          }))
                        }
                        size="small"
                        value={stickyColumns.first}
                      >
                        <Radio value="none">Ingen</Radio>
                        <Radio value="first">Første kolonne</Radio>
                      </RadioGroup>
                      <RadioGroup
                        legend="Sticky siste kolonne"
                        onChange={(value) =>
                          setStickyColumns((prev) => ({
                            ...prev,
                            last: value as "none" | "last",
                          }))
                        }
                        size="small"
                        value={stickyColumns.last}
                      >
                        <Radio value="none">Ingen</Radio>
                        <Radio value="last">Siste kolonne</Radio>
                      </RadioGroup>
                      <VStack gap="space-8">
                        <Heading size="xsmall" spacing>
                          Demo innstillinger
                        </Heading>
                        <Select
                          label="Radvalg"
                          size="small"
                          value={selectionMode}
                          onChange={(e) =>
                            setSelectionMode(
                              e.target.value as DataGrid.Selection["mode"],
                            )
                          }
                        >
                          <option value="none">Ingen</option>
                          <option value="single">Enkeltvalg</option>
                          <option value="multiple">Flervalg</option>
                        </Select>
                        <Checkbox
                          onChange={(e) =>
                            setShowDetailsPanel(e.target.checked)
                          }
                          size="small"
                          checked={showDetailsPanel}
                        >
                          Vis detaljer
                        </Checkbox>
                        <Checkbox
                          onChange={(e) => {
                            setNestedRows(e.target.checked);
                            setColumnView(
                              e.target.checked
                                ? columnDef_TEST_DATA_NESTED
                                : columnDef_TEST_DATA,
                            );
                          }}
                          size="small"
                          checked={showNestedRows}
                        >
                          Vis nestede rader
                        </Checkbox>
                      </VStack>
                    </VStack>
                    <VStack maxWidth="50%" gap="space-16">
                      <BodyShort weight="semibold">Vis kolonner</BodyShort>
                      <VStack gap="space-8">
                        <Switch
                          checked={
                            visibleColumns.length === allColumnIds.length
                          }
                          size="small"
                          onChange={() => {
                            const allVisible =
                              visibleColumns.length === allColumnIds.length;
                            setVisibleColumns(allVisible ? [] : allColumnIds);
                          }}
                        >
                          Velg alle
                        </Switch>
                        <DragAndDrop
                          items={columnView}
                          setItems={setColumnView}
                          renderItem={(item) => {
                            return (
                              <Switch
                                key={item.id}
                                size="small"
                                checked={visibleColumns.includes(item.id)}
                                onChange={(event) => {
                                  const isChecked = event.target.checked;
                                  setVisibleColumns((prev) => {
                                    if (isChecked) {
                                      return [...prev, item.id];
                                    }
                                    return prev.filter((id) => id !== item.id);
                                  });
                                }}
                              >
                                {item.header}
                              </Switch>
                            );
                          }}
                        />
                      </VStack>
                    </VStack>
                  </HStack>
                </Dialog.Body>
              </Dialog.Popup>
            </Dialog>
          }
        />

        <DataGrid
          getRowId={(row) => row.name}
          columns={columnView.filter((col) =>
            visibleColumns.find((c) => c === col.id),
          )}
          data={pagedData.paginatedData}
          selection={{
            mode: selectionMode,
          }}
          settings={{
            rowDensity,
            zebraStripes,
            textSize,
            truncateContent,
            stickyColumns: {
              start: stickyColumns.first === "first" ? 1 : undefined,
              end: stickyColumns.last === "last" ? 1 : undefined,
            },
            columnDividers,
          }}
        >
          <DataGrid.Table<(typeof TEST_DATA)[number]>
            stickyHeader
            detailsPanel={
              showDetailsPanel
                ? { getContent: (rowData) => <DetailsPanel row={rowData} /> }
                : undefined
            }
            subRows={{
              /* @ts-expect-error Test-data just hacked together now  */
              getRows: showNestedRows
                ? (rowData) => rowData.nestedRows
                : undefined,
            }}
          />
        </DataGrid>
      </VStack>
    );
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
    layout: "fullscreen",
  },
};

function DetailsPanel({ row }: { row: PersonInfo }) {
  return (
    <VStack gap="space-16" padding="space-16">
      <Heading size="small">{row.name}</Heading>
      <BodyShort>National ID: {row.nationalId}</BodyShort>
      <BodyShort>Day job: {row.dayJob}</BodyShort>
      <BodyShort>Supervisor: {row.supervisor}</BodyShort>
      <BodyShort>Home system: {row.homeSystem}</BodyShort>
    </VStack>
  );
}

const pageSize = 20;

function usePaginatedData<T extends any[]>(data: T) {
  const [pageIndex, setPageIndex] = useState(0);

  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex]);

  const pageCount = Math.ceil(data.length / pageSize);

  const canNextPage = pageIndex < pageCount - 1;
  const canPreviousPage = pageIndex > 0;

  return {
    paginatedData,
    pageIndex,
    setPageIndex,
    canNextPage,
    canPreviousPage,
    pageCount,
  };
}

/* const TableBody = ({ table }: { table: Table<PersonInfo> }) => {
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
              <DataTableLegacy.Td textAlign="center" cellType="action">
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
}; */
/*
const MemoizedTableBody = React.memo(
  TableBody,
  (_prev, next) => !!next.table.getState().columnSizingInfo.isResizingColumn,
) as typeof TableBody; */

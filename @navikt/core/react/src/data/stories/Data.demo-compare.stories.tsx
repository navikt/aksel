import type { Meta } from "@storybook/react-vite";
import React, { useState } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { Button } from "../../button";
import { Checkbox } from "../../form/checkbox";
import { HStack, Spacer } from "../../primitives/stack";
import { Table } from "../../table";
import { Tag } from "../../tag";
import { DataTable } from "../table";
import type { ColumnDefinitions } from "../table/root/DataTable.types";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Compare",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

export default meta;

const generateUserData = (
  count: number,
  addNested: boolean = true,
): UserDataTest[] => {
  const num = (index: number) => index + 1;

  return Array.from({ length: count }, (_, i) => ({
    id: num(i) + (addNested ? 0 : 100),
    foo: `foo${num(i)}`,
    bar: `bar${num(i)}`,
    baz: num(i) % 2 === 0,
    time: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    nestedRows: addNested ? generateUserData(Math.floor(count / 2), false) : [],
  }));
};

const data = generateUserData(10);

type UserDataTest = {
  id: number;
  foo: string;
  bar: string;
  baz: boolean;
  time: Date;
  nestedRows: UserDataTest[];
};

const columns: ColumnDefinitions<UserDataTest> = [
  {
    id: "id",
    label: "Id",
    cell: ({ id }) => id,
    align: "right",
  },
  {
    id: "foo",
    label: "Foo",
    cell: ({ foo }) => foo,
    isRowHeader: true,
  },
  {
    id: "bar",
    label: "Bar",
    cell: ({ bar }) => (
      <Tag variant="strong" size="xsmall">
        {bar}
      </Tag>
    ),
  },
  {
    id: "baz",
    label: "Baz",
    cell: ({ baz }) => (baz ? "Yes" : "No"),
  },
  {
    id: "time",
    label: "Time",
    align: "right",
    cell: ({ time }) => time.toLocaleTimeString("no"),
  },
];

export function DataTableOne() {
  return <DataTable columnDefinitions={columns} data={data} layout="auto" />;
}

export function OriginalOne() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeader
              scope="col"
              key={column.id}
              align={column.align}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => {
          return (
            <Table.Row key={row.id}>
              {columns.map((column) =>
                column.isRowHeader ? (
                  <Table.HeaderCell
                    key={column.id}
                    scope="row"
                    align={column.align}
                  >
                    {column.cell(row)}
                  </Table.HeaderCell>
                ) : (
                  <Table.DataCell key={column.id} align={column.align}>
                    {column.cell(row)}
                  </Table.DataCell>
                ),
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export function DataTableTwo() {
  return (
    <DataTable
      columnDefinitions={columns}
      data={data}
      layout="auto"
      getRowId={(row) => row.id}
      selection={{
        selectionMode: "multiple",
        onSelectionChange: console.info,
      }}
    />
  );
}

export function OriginalTwo() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectedRow = (value) =>
    setSelectedRows((list) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value],
    );

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.DataCell>
            <Checkbox
              checked={selectedRows.length === data.length}
              indeterminate={
                selectedRows.length > 0 && selectedRows.length !== data.length
              }
              onChange={() => {
                selectedRows.length
                  ? setSelectedRows([])
                  : setSelectedRows(data.map(({ id }) => id));
              }}
              hideLabel
            >
              Velg alle rader
            </Checkbox>
          </Table.DataCell>
          {columns.map((column) => (
            <Table.ColumnHeader
              scope="col"
              key={column.id}
              align={column.align}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => {
          return (
            <Table.Row key={row.id} selected={selectedRows.includes(row.id)}>
              <Table.DataCell>
                <Checkbox
                  hideLabel
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleSelectedRow(row.id)}
                  aria-labelledby={`id-${row.id}`}
                >
                  {" "}
                </Checkbox>
              </Table.DataCell>
              {columns.map((column) =>
                column.isRowHeader ? (
                  <Table.HeaderCell
                    key={column.id}
                    scope="row"
                    align={column.align}
                  >
                    {column.cell(row)}
                  </Table.HeaderCell>
                ) : (
                  <Table.DataCell key={column.id} align={column.align}>
                    {column.cell(row)}
                  </Table.DataCell>
                ),
              )}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

function DetailsPanel() {
  return <div>Placeholder</div>;
}

export function DataTableThree() {
  return (
    <DataTable
      columnDefinitions={columns}
      data={data}
      layout="auto"
      getRowId={(row) => row.id}
      selection={{
        selectionMode: "multiple",
        onSelectionChange: console.info,
      }}
      detailsPanel={{
        getContent: DetailsPanel,
      }}
    />
  );
}

export function OriginalThree() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectedRow = (value) =>
    setSelectedRows((list) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value],
    );

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.DataCell aria-hidden />
          <Table.DataCell>
            <Checkbox
              checked={selectedRows.length === data.length}
              indeterminate={
                selectedRows.length > 0 && selectedRows.length !== data.length
              }
              onChange={() => {
                selectedRows.length
                  ? setSelectedRows([])
                  : setSelectedRows(data.map(({ id }) => id));
              }}
              hideLabel
            >
              Velg alle rader
            </Checkbox>
          </Table.DataCell>
          {columns.map((column) => (
            <Table.ColumnHeader
              scope="col"
              key={column.id}
              align={column.align}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => {
          return (
            <Table.ExpandableRow
              key={row.id}
              selected={selectedRows.includes(row.id)}
              content={<DetailsPanel />}
            >
              <Table.DataCell>
                <Checkbox
                  hideLabel
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleSelectedRow(row.id)}
                  aria-labelledby={`id-${row.id}`}
                >
                  {" "}
                </Checkbox>
              </Table.DataCell>
              {columns.map((column) =>
                column.isRowHeader ? (
                  <Table.HeaderCell
                    key={column.id}
                    scope="row"
                    align={column.align}
                  >
                    {column.cell(row)}
                  </Table.HeaderCell>
                ) : (
                  <Table.DataCell key={column.id} align={column.align}>
                    {column.cell(row)}
                  </Table.DataCell>
                ),
              )}
            </Table.ExpandableRow>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export function DataTableFour() {
  return (
    <DataTable
      columnDefinitions={columns}
      data={data}
      layout="auto"
      getRowId={(row) => row.id}
      selection={{
        selectionMode: "multiple",
        onSelectionChange: console.info,
      }}
      detailsPanel={{
        getContent: DetailsPanel,
      }}
      subRows={{
        getRows: (row) => row.nestedRows,
      }}
    />
  );
}

export function OriginalFour() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleSelectedRow = (value) =>
    setSelectedRows((list) =>
      list.includes(value)
        ? list.filter((id) => id !== value)
        : [...list, value],
    );

  const RowComponent = ({
    row,
    nested = false,
  }: {
    row: UserDataTest;
    nested: boolean;
  }) => {
    const WrapperComponent = ({
      children,
      selected,
    }: {
      children: React.ReactNode;
      selected: boolean;
    }) => {
      if (nested) {
        return (
          <Table.Row selected={selected}>
            <Table.DataCell aria-hidden />
            {children}
          </Table.Row>
        );
      }

      return (
        <Table.ExpandableRow content={<DetailsPanel />} selected={selected}>
          {children}
        </Table.ExpandableRow>
      );
    };

    return (
      <WrapperComponent key={row.id} selected={selectedRows.includes(row.id)}>
        <Table.DataCell>
          <Checkbox
            hideLabel
            checked={selectedRows.includes(row.id)}
            onChange={() => toggleSelectedRow(row.id)}
            aria-labelledby={`id-${row.id}`}
          >
            {" "}
          </Checkbox>
        </Table.DataCell>
        {columns.map((column, index) =>
          column.isRowHeader ? (
            <Table.HeaderCell key={column.id} scope="row" align={column.align}>
              {column.cell(row)}
            </Table.HeaderCell>
          ) : (
            <Table.DataCell key={column.id} align={column.align}>
              <HStack align="center" gap="space-4" justify="space-between">
                {index === 0 && row.nestedRows.length > 0 && (
                  <Button
                    icon={<ChevronDownIcon />}
                    size="small"
                    variant="tertiary"
                    data-color="neutral"
                    onClick={() => {
                      setExpandedRows((list) =>
                        list.includes(row.id)
                          ? list.filter((id) => id !== row.id)
                          : [...list, row.id],
                      );
                    }}
                  />
                )}
                <Spacer />
                <span>{column.cell(row)}</span>
              </HStack>
            </Table.DataCell>
          ),
        )}
      </WrapperComponent>
    );
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.DataCell aria-hidden />
          <Table.DataCell>
            <Checkbox
              checked={selectedRows.length === data.length}
              indeterminate={
                selectedRows.length > 0 && selectedRows.length !== data.length
              }
              onChange={() => {
                selectedRows.length
                  ? setSelectedRows([])
                  : setSelectedRows(data.map(({ id }) => id));
              }}
              hideLabel
            >
              Velg alle rader
            </Checkbox>
          </Table.DataCell>
          {columns.map((column) => (
            <Table.ColumnHeader
              scope="col"
              key={column.id}
              align={column.align}
            >
              {column.label}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row) => {
          if (row.nestedRows.length > 0) {
            return (
              <React.Fragment key={row.id}>
                <RowComponent row={row} nested={false} />
                {expandedRows.includes(row.id) &&
                  row.nestedRows.map((nestedRow) => (
                    <RowComponent key={nestedRow.id} row={nestedRow} nested />
                  ))}
              </React.Fragment>
            );
          }
          return <RowComponent row={row} nested={false} key={row.id} />;
        })}
      </Table.Body>
    </Table>
  );
}

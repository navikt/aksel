import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTable } from "../table";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/ItemsAsData",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

type UserDataTest = {
  id: number;
  foo: string;
  bar: string;
  on: boolean;
  time: Date;
};

const userColumnDef: ColumnDef<UserDataTest> = [
  {
    header: "Id",
    accessor: "id",
  },
  {
    accessor: "foo",
    header: "Foo",
  },
  {
    accessor: "bar",
    header: "Bar",
  },
  {
    accessor: "on",
    header: "Boolean demo",
    Cell: ({ value }) => (value ? "Yes" : "No"),
  },
  {
    accessor: "time",
    header: "Time",
    Cell: ({ value }) => value.toISOString(),
  },
];

const userData = [
  {
    id: 1,
    foo: "foo1",
    bar: "bar1",
    on: true,
    time: new Date(),
  },
  {
    id: 2,
    foo: "foo2",
    bar: "bar2",
    on: false,
    time: new Date(),
  },
];

export const ItemsAsData: Story = {
  render: () => {
    return <DataTableAsItems columns={userColumnDef} data={userData} />;
  },
  parameters: {
    a11y: { disable: true },
    controls: { disable: true },
    docs: { disable: true },
  },
};

type ColumnDefItem<T, K extends keyof T = keyof T> = {
  accessor: K;
  header: string;
  Cell?: (data: { value: T[K] }) => React.ReactNode;
};

type ColumnDef<T> = { [K in keyof T]: ColumnDefItem<T, K> }[keyof T][];

type Items<T> = T[];

function DataTableAsItems<T>({
  columns,
  data,
}: {
  columns: ColumnDef<T>;
  data: Items<T>;
}) {
  return (
    <DataTable layout="auto">
      <DataTable.Thead>
        <DataTable.Tr>
          {columns.map((column) => {
            return (
              <DataTable.Th key={column.header}>{column.header}</DataTable.Th>
            );
          })}
        </DataTable.Tr>
      </DataTable.Thead>
      <DataTable.Tbody>
        {data.map((row, rowIndex) => (
          <DataTable.Tr key={rowIndex}>
            {columns.map((column) => {
              const value = row[column.accessor];
              return (
                <DataTable.Td key={column.accessor as string}>
                  {column.Cell ? column.Cell({ value }) : String(value)}
                </DataTable.Td>
              );
            })}
          </DataTable.Tr>
        ))}
      </DataTable.Tbody>
    </DataTable>
  );
}

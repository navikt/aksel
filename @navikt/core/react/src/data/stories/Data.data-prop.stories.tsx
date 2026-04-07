import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Tag } from "../../tag";
import { DataTable } from "../table";
import type { ColumnDefinitions } from "../table/root/DataTable.types";
import DataTableAuto from "../table/root/DataTableAuto";

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/Data Prop",
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

type Story = StoryObj<typeof DataTable>;

type UserDataTest = {
  id: number;
  foo: string;
  bar: string;
  on: boolean;
  time: Date;
};

const userColumnDef: ColumnDefinitions<UserDataTest> = [
  {
    id: "id",
    header: "Id",
    cell: ({ id }) => id,
  },
  {
    id: "foo",
    header: "Foo",
    cell: ({ foo }) => foo,
  },
  {
    id: "bar",
    header: "Bar",
    cell: ({ bar }) => (
      <Tag variant="strong" size="xsmall">
        {bar}
      </Tag>
    ),
  },
  {
    id: "on",
    header: "Boolean demo",
    cell: ({ on }) => (on ? "Yes" : "No"),
  },
  {
    id: "time",
    header: "Time",
    cell: ({ time }) => time.toISOString(),
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
  {
    id: 3,
    foo: "foo3",
    bar: "bar3",
    on: true,
    time: new Date(),
  },
];

export const ItemsAsData: Story = {
  render: () => {
    return <DataTableAuto columnDefinitions={userColumnDef} data={userData} />;
  },
};

export const ItemsAsDataWithCustomRowId: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="multiple"
        onSelectionChange={console.info}
        getRowId={(row) => row.foo + row.bar}
      />
    );
  },
};

export const SelectionModeMultiple: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="multiple"
        onSelectionChange={console.info}
        getRowId={(row) => row.foo + row.bar}
        withKeyboardNav
      />
    );
  },
};

export const SelectionModeSingle: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="single"
        onSelectionChange={console.info}
        getRowId={(row) => row.foo + row.bar}
        withKeyboardNav
      />
    );
  },
};

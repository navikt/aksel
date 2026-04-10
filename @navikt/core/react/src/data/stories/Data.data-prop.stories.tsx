import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../../button";
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
    type: "number",
    defaultWidth: "100px",
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
  {
    id: 4,
    foo: "foo4",
    bar: "bar4",
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

export const SelectionModeSingleWithoutKeyboardNav: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="single"
        onSelectionChange={console.info}
        getRowId={(row) => row.foo + row.bar}
      />
    );
  },
};

export const SelectionWithDisabledRows: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="multiple"
        onSelectionChange={console.info}
        getRowId={(row) => row.id}
        withKeyboardNav
        disabledSelectionKeys={[1, 2]}
      />
    );
  },
};

export const ControlledSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([1]);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button size="small" onClick={() => setSelectedKeys([1, 2, 3])}>
            Select all
          </Button>
          <Button size="small" onClick={() => setSelectedKeys([])}>
            Clear selection
          </Button>
        </div>
        <DataTableAuto
          columnDefinitions={userColumnDef}
          data={userData}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          getRowId={(row) => row.id}
        />
      </div>
    );
  },
};

export const DefaultSelectedKeys: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="multiple"
        defaultSelectedKeys={[1, 3]}
        onSelectionChange={console.info}
        getRowId={(row) => row.id}
      />
    );
  },
};

export const SingleSelectionWithDisabledRows: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={userData}
        selectionMode="single"
        onSelectionChange={console.info}
        getRowId={(row) => row.id}
        disabledSelectionKeys={[2]}
      />
    );
  },
};

export const EmptyData: Story = {
  render: () => {
    return (
      <DataTableAuto
        columnDefinitions={userColumnDef}
        data={[]}
        selectionMode="multiple"
      />
    );
  },
};

const selectionPaginationSpy = fn();

export const SelectionPagination: Story = {
  render: () => {
    const [page, setPage] = useState<"0" | "1">("0");

    const dataToShow =
      page === "0" ? userData.slice(0, 2) : userData.slice(2, 4);

    return (
      <div>
        <button onClick={() => setPage("0")}>Page 1</button>
        <button onClick={() => setPage("1")}>Page 2</button>
        <DataTableAuto
          columnDefinitions={userColumnDef}
          data={dataToShow}
          selectionMode="multiple"
          onSelectionChange={(keys) => {
            console.info({ keys });
            selectionPaginationSpy(keys);
          }}
          getRowId={(row) => row.foo + row.bar}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    selectionPaginationSpy.mockClear();
    const canvas = within(canvasElement);
    const page1Button = canvas.getByRole("button", { name: "Page 1" });
    const page2Button = canvas.getByRole("button", { name: "Page 2" });

    /* keys */
    await userEvent.click(page1Button);

    /* Page 1 rows: foo1bar1, foo2bar2 */
    let checkboxes = canvas.getAllByRole("checkbox");
    const theadCheckbox = () =>
      canvas.getAllByRole("checkbox")[0] as HTMLInputElement;

    /* Select first row on page 1 */
    await userEvent.click(checkboxes[1]);
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith(["foo1bar1"]);

    /* Thead should be indeterminate (1 of 2 visible rows selected) */
    expect(theadCheckbox().indeterminate).toBe(true);
    expect(theadCheckbox().checked).toBe(false);

    /* Switch to page 2 (rows: foo3bar3, foo4bar4) */
    await userEvent.click(page2Button);

    /* Thead should NOT be indeterminate (no visible rows are selected) */
    expect(theadCheckbox().indeterminate).toBe(false);
    expect(theadCheckbox().checked).toBe(false);

    /* Select first row on page 2 */
    checkboxes = canvas.getAllByRole("checkbox");
    await userEvent.click(checkboxes[1]);

    /* onSelectionChange should include foo1bar1 from page 1 */
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith([
      "foo1bar1",
      "foo3bar3",
    ]);

    /* Thead should be indeterminate (1 of 2 visible rows selected) */
    expect(theadCheckbox().indeterminate).toBe(true);

    /* Click thead checkbox (indeterminate -> select all visible) */
    /* Should preserve selections from other pages */
    await userEvent.click(theadCheckbox());
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith([
      "foo1bar1",
      "foo3bar3",
      "foo4bar4",
    ]);

    /* Thead should now be checked (all visible selected) */
    expect(theadCheckbox().checked).toBe(true);
    expect(theadCheckbox().indeterminate).toBe(false);

    /* Click thead checkbox again (all selected -> unselect all visible) */
    /* Should NOT unselect rows from other pages */
    await userEvent.click(theadCheckbox());
    expect(selectionPaginationSpy).toHaveBeenLastCalledWith(["foo1bar1"]);

    /* Thead should not be checked or indeterminate */
    expect(theadCheckbox().checked).toBe(false);
    expect(theadCheckbox().indeterminate).toBe(false);

    /* Switch back to page 1 - foo1bar1 should still be selected */
    await userEvent.click(page1Button);
    checkboxes = canvas.getAllByRole("checkbox");
    expect(theadCheckbox().indeterminate).toBe(true);
    expect((checkboxes[1] as HTMLInputElement).checked).toBe(true);
    expect((checkboxes[2] as HTMLInputElement).checked).toBe(false);
  },
};

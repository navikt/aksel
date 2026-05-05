import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import type { ColumnDefinitions } from "./DataTable.types";
import { DataTable } from "./DataTableRoot";

type TestRow = {
  id: string;
  name: string;
  subRows?: TestRow[];
};

const meta: Meta<typeof DataTable> = {
  title: "ds-react/Data/DataTable/Tests",
  component: DataTable,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

const data: TestRow[] = [
  {
    id: "root",
    name: "Root",
    subRows: [{ id: "child", name: "Child" }],
  },
];

const deepNestedData: TestRow[] = [
  {
    id: "root",
    name: "Root",
    subRows: [
      {
        id: "child",
        name: "Child",
        subRows: [{ id: "grandchild", name: "Grandchild" }],
      },
    ],
  },
];

const fallbackIdData: TestRow[] = [
  {
    id: "unused-root-1",
    name: "Root",
    subRows: [{ id: "unused-child", name: "Child" }],
  },
  {
    id: "unused-root-2",
    name: "Sibling",
  },
];

const duplicateObjectRow: TestRow = {
  id: "shared-root",
  name: "Root",
  subRows: [{ id: "shared-child", name: "Child" }],
};

const duplicateObjectData: TestRow[] = [duplicateObjectRow, duplicateObjectRow];

const columns: ColumnDefinitions<TestRow> = [
  {
    id: "name",
    label: "Name",
    header: "Name",
    cell: (row) => row.name,
  },
];

const getSubRows = (row: TestRow) => row.subRows ?? [];

const getCheckboxes = (canvasElement: HTMLElement) =>
  within(canvasElement).getAllByRole("checkbox") as HTMLInputElement[];

export const ExpandedChildRowsIncludedInSelectAll: Story = {
  render: () => (
    <DataTable
      columnDefinitions={columns}
      data={data}
      getRowId={(row) => row.id}
      subRows={{ getRows: getSubRows }}
      selection={{ selectionMode: "multiple" }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText("Child")).not.toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(canvas.getByText("Child")).toBeInTheDocument();
    expect(getCheckboxes(canvasElement)).toHaveLength(3);

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );

    expect(
      getCheckboxes(canvasElement).every((checkbox) => checkbox.checked),
    ).toBe(true);
  },
};

export const FallbackIdsSelectAllVisibleRows: Story = {
  render: () => (
    <DataTable
      columnDefinitions={columns}
      data={fallbackIdData}
      subRows={{
        getRows: getSubRows,
        defaultExpandedRowIds: [0],
      }}
      getRowId={(row) => row.id}
      selection={{ selectionMode: "multiple" }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );

    const rowCheckboxes = getCheckboxes(canvasElement) as HTMLInputElement[];

    expect(rowCheckboxes).toHaveLength(3);
    expect(rowCheckboxes.every((checkbox) => checkbox.checked)).toBe(true);
  },
};

export const ParentSelectionFollowsVisibleNestedRows: Story = {
  render: () => (
    <DataTable
      columnDefinitions={columns}
      data={data}
      getRowId={(row) => row.id}
      subRows={{ getRows: getSubRows }}
      selection={{ selectionMode: "multiple" }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    await userEvent.click(getCheckboxes(canvasElement)[2]);

    expect(getCheckboxes(canvasElement)[1].checked).toBe(false);
    expect(getCheckboxes(canvasElement)[1].indeterminate).toBe(true);

    await userEvent.click(getCheckboxes(canvasElement)[1]);

    expect(getCheckboxes(canvasElement)[1].checked).toBe(true);
    expect(getCheckboxes(canvasElement)[2].checked).toBe(true);

    await userEvent.click(getCheckboxes(canvasElement)[1]);

    expect(getCheckboxes(canvasElement)[1].checked).toBe(false);
    expect(getCheckboxes(canvasElement)[2].checked).toBe(false);
  },
};

export const CollapsedParentSelectionIncludesHiddenDescendants: Story = {
  render: () => (
    <DataTable
      columnDefinitions={columns}
      data={deepNestedData}
      getRowId={(row) => row.id}
      subRows={{ getRows: getSubRows }}
      selection={{ selectionMode: "multiple" }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(getCheckboxes(canvasElement)[1]);

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(getCheckboxes(canvasElement)[1].checked).toBe(true);
    expect(getCheckboxes(canvasElement)[2].checked).toBe(true);

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(getCheckboxes(canvasElement)[3].checked).toBe(true);

    await userEvent.click(
      canvas.getAllByRole("button", { name: "Skjul under-rader" })[0],
    );
    await userEvent.click(getCheckboxes(canvasElement)[1]);

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(getCheckboxes(canvasElement)[1].checked).toBe(false);
    expect(getCheckboxes(canvasElement)[2].checked).toBe(false);
    expect(getCheckboxes(canvasElement)[3].checked).toBe(false);
  },
};

export const SelectAllIncludesHiddenDescendantsForCollapsedParents: Story = {
  render: () => (
    <DataTable
      columnDefinitions={columns}
      data={deepNestedData}
      getRowId={(row) => row.id}
      subRows={{ getRows: getSubRows }}
      selection={{ selectionMode: "multiple" }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(getCheckboxes(canvasElement)[1].checked).toBe(true);
    expect(getCheckboxes(canvasElement)[2].checked).toBe(true);

    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(getCheckboxes(canvasElement)[3].checked).toBe(true);

    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Fjern alle synlige valgte rader",
      }),
    );

    expect(getCheckboxes(canvasElement)[0].checked).toBe(false);

    await userEvent.click(
      canvas.getAllByRole("button", { name: "Skjul under-rader" })[0],
    );
    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );

    expect(getCheckboxes(canvasElement)[1].checked).toBe(false);
    expect(getCheckboxes(canvasElement)[2].checked).toBe(false);
    expect(getCheckboxes(canvasElement)[3].checked).toBe(false);
  },
};

export const DuplicateObjectRowsKeepDistinctMetadata: Story = {
  render: () => (
    <DataTable
      columnDefinitions={columns}
      data={duplicateObjectData}
      getRowId={(_row, index) => String(index)}
      subRows={{
        getRows: getSubRows,
        defaultExpandedRowIds: ["0"],
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getAllByText("Root")).toHaveLength(2);
    expect(canvas.getByText("Child")).toBeInTheDocument();
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../../data-grid";
import type { ColumnDefinitions } from "../table/root/DataGridTable.types";
import { DataGridTable } from "../table/root/DataGridTableRoot";

type TestRow = {
  id: string;
  name: string;
  subRows?: TestRow[];
};

const meta: Meta<typeof DataGridTable> = {
  title: "ds-react/Data/DataTable/Tests",
  component: DataGridTable,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGridTable>;

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

const columns: ColumnDefinitions<TestRow> = [
  {
    id: "name",
    header: "Name",
    bodyCell: (row) => row.name,
  },
];

const getSubRows = (row: TestRow) => row.subRows ?? [];

const getCheckboxes = (canvasElement: HTMLElement) =>
  within(canvasElement).getAllByRole("checkbox") as HTMLInputElement[];

export const ExpandedChildRowsIncludedInSelectAll: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      selection={{ mode: "multiple" }}
    >
      <DataGrid.Table subRows={{ getRows: getSubRows }} />
    </DataGrid>
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
    <DataGrid
      columns={columns}
      data={fallbackIdData}
      getRowId={(row) => row.id}
      selection={{ mode: "multiple" }}
    >
      <DataGrid.Table
        subRows={{
          getRows: getSubRows,
          defaultExpandedRowIds: ["0"],
        }}
      />
    </DataGrid>
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

export const CollapsedParentSelectionIncludesHiddenDescendants: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={deepNestedData}
      getRowId={(row) => row.id}
      selection={{ mode: "multiple" }}
    >
      <DataGrid.Table subRows={{ getRows: getSubRows }} />
    </DataGrid>
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
    <DataGrid
      columns={columns}
      data={deepNestedData}
      getRowId={(row) => row.id}
      selection={{ mode: "multiple" }}
    >
      <DataGrid.Table subRows={{ getRows: getSubRows }} />
    </DataGrid>
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

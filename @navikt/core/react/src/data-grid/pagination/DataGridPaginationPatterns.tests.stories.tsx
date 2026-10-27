import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";
import { ResetPageOnSort } from "./DataGridPagination.stories";
import { DataGridPagination } from "./index";

const meta: Meta<typeof DataGridPagination> = {
  title: "ds-react/DataGrid/Pagination/patterns/tests",
  component: DataGridPagination,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGridPagination>;

type Row = { id: string; name: string; children?: Row[] };

const rows: Row[] = [
  {
    id: "alpha",
    name: "Alpha",
    children: [
      {
        id: "alpha-child",
        name: "Alpha child",
        children: [{ id: "alpha-grandchild", name: "Alpha grandchild" }],
      },
    ],
  },
  { id: "beta", name: "Beta" },
  {
    id: "gamma",
    name: "Gamma",
    children: [
      {
        id: "gamma-child",
        name: "Gamma child",
        children: [{ id: "gamma-grandchild", name: "Gamma grandchild" }],
      },
    ],
  },
  { id: "delta", name: "Delta" },
];

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name },
];

const getSubRows = (row: Row) => row.children ?? [];

export const TestSelectionAcrossPages: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);

    return (
      <>
        <output aria-label="Selected row IDs">
          {JSON.stringify([...selectedRowIds].sort())}
        </output>
        <DataGrid
          columns={columns}
          data={rows.slice(page * 2, (page + 1) * 2)}
          getRowId={(row) => row.id}
          selection={{
            mode: "multiple",
            onSelectedRowIdsChange: setSelectedRowIds,
          }}
        >
          <DataGrid.Table subRows={{ getRows: getSubRows }} />
          <DataGridPagination
            data={rows.slice(page * 2, (page + 1) * 2)}
            page={page}
            onPageChange={setPage}
            defaultPageSize={2}
            pageSizeOptions={[2]}
            totalRows={rows.length}
          />
        </DataGrid>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectedIds = canvas.getByRole("status", {
      name: "Selected row IDs",
    });
    const firstPageIds = ["alpha", "alpha-child", "alpha-grandchild", "beta"];
    const secondPageIds = ["delta", "gamma", "gamma-child", "gamma-grandchild"];

    expect(canvas.queryByText("Alpha child")).not.toBeInTheDocument();
    expect(canvas.queryByText("Alpha grandchild")).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );
    expect(selectedIds.textContent).toBe(JSON.stringify(firstPageIds));

    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByText("Gamma")).toBeInTheDocument();
    expect(canvas.queryByText("Alpha")).not.toBeInTheDocument();
    expect(selectedIds.textContent).toBe(JSON.stringify(firstPageIds));
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      expect(checkbox).not.toBeChecked();
    }

    await userEvent.click(
      canvas.getByRole("checkbox", { name: "Velg alle synlige rader" }),
    );
    expect(selectedIds.textContent).toBe(
      JSON.stringify([...firstPageIds, ...secondPageIds].sort()),
    );

    await userEvent.click(canvas.getByRole("button", { name: "Forrige side" }));
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      expect(checkbox).toBeChecked();
    }
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Fjern alle synlige valgte rader",
      }),
    );
    expect(selectedIds.textContent).toBe(JSON.stringify(secondPageIds));
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      expect(checkbox).not.toBeChecked();
    }

    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      expect(checkbox).toBeChecked();
    }
    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );
    expect(
      within(canvas.getByRole("row", { name: /Gamma child/ })).getByRole(
        "checkbox",
      ),
    ).toBeChecked();
    await userEvent.click(
      canvas.getByRole("button", { name: "Vis under-rader" }),
    );
    expect(
      within(canvas.getByRole("row", { name: /Gamma grandchild/ })).getByRole(
        "checkbox",
      ),
    ).toBeChecked();
    await userEvent.click(
      canvas.getByRole("checkbox", {
        name: "Fjern alle synlige valgte rader",
      }),
    );
    expect(selectedIds.textContent).toBe("[]");
    for (const checkbox of canvas.getAllByRole("checkbox")) {
      expect(checkbox).not.toBeChecked();
    }
  },
};

export const TestControlledSortResetsPage: Story = {
  render: ResetPageOnSort.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table");
    const scrollIntoView = fn();
    Object.defineProperty(table, "scrollIntoView", { value: scrollIntoView });
    const navigation = within(
      canvas.getByRole("navigation", { name: "Sidenavigering" }),
    );

    for (const direction of ["ascending", "descending", "none"]) {
      await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
      expect(scrollIntoView).toHaveBeenCalledWith({
        block: "start",
        behavior: "instant",
      });
      await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
      expect(navigation.getByText("Side 3 av 14")).toBeInTheDocument();
      await userEvent.click(canvas.getByRole("button", { name: "Id" }));

      expect(navigation.getByText("Side 1 av 14")).toBeInTheDocument();
      expect(canvas.getByRole("columnheader", { name: "Id" })).toHaveAttribute(
        "aria-sort",
        direction,
      );
      const firstRow = canvas.getAllByRole("row")[1];
      expect(
        within(firstRow).getByRole("cell", {
          name: direction === "descending" ? "137" : "1",
        }),
      ).toBeInTheDocument();
      expect(canvas.getAllByRole("row")).toHaveLength(11);
    }
  },
};

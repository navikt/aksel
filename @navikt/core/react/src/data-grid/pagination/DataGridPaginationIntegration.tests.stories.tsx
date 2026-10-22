import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/Integration tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;
type Row = { id: number; name: string };

const rows: Row[] = Array.from({ length: 53 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "id", header: "Id", bodyCell: (row) => row.id },
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
];

function FixedHeightGrid() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  return (
    <div style={{ display: "flex", height: 400 }}>
      <DataGrid
        columns={columns}
        data={rows.slice(page * pageSize, (page + 1) * pageSize)}
        getRowId={(row) => String(row.id)}
        pagination={{
          page,
          onPageChange: setPage,
          pageSize,
          onPageSizeChange: setPageSize,
          pageSizeOptions: [10, 20, 50],
          totalRows: rows.length,
        }}
      >
        <DataGrid.Table aria-label="Personer" />
        <DataGrid.Pagination />
      </DataGrid>
    </div>
  );
}

function getScrollWrapper(canvasElement: HTMLElement) {
  const wrapper = canvasElement.querySelector<HTMLElement>(
    ".aksel-data-table__scroll-wrapper",
  );
  if (!wrapper) {
    throw new Error("Table scroll wrapper not found");
  }
  return wrapper;
}

export const ScrollResetOnPageAndPageSizeChange: Story = {
  render: () => <FixedHeightGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getScrollWrapper(canvasElement);
    const view = canvasElement.ownerDocument.defaultView ?? window;
    const documentScrollTop = view.scrollY;

    wrapper.scrollTop = 150;
    expect(wrapper.scrollTop).toBeGreaterThan(0);
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByRole("cell", { name: "Person 21" })).toBeInTheDocument();
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));
    expect(view.scrollY).toBe(documentScrollTop);

    wrapper.scrollTop = 150;
    expect(wrapper.scrollTop).toBeGreaterThan(0);
    await userEvent.selectOptions(
      canvas.getByRole("combobox", { name: "Rader per side" }),
      "10",
    );
    expect(canvas.getByText("Side 1 av 6")).toBeInTheDocument();
    expect(wrapper.scrollHeight).toBeGreaterThan(wrapper.clientHeight);
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));
    expect(view.scrollY).toBe(documentScrollTop);
  },
};

export const KeyboardCellClampedOnShorterLastPage: Story = {
  render: () => (
    <>
      <button type="button">Før tabellen</button>
      <FixedHeightGrid />
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const table = canvas.getByRole("table", { name: "Personer" });
    const lastPage = canvas.getByRole("button", { name: "Siste side" });
    const beforeTable = canvas.getByRole("button", { name: "Før tabellen" });

    await userEvent.click(beforeTable);
    await userEvent.tab();
    await userEvent.keyboard("{Control>}{End}{/Control}");
    expect(canvas.getByRole("cell", { name: "Person 20" })).toHaveFocus();

    await userEvent.click(lastPage);

    expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
    expect(within(table).getAllByRole("row")).toHaveLength(14);
    expect(lastPage).toHaveFocus();

    await userEvent.click(beforeTable);
    await userEvent.tab();
    expect(canvas.getByRole("cell", { name: "Person 53" })).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(canvas.getByRole("cell", { name: "Person 52" })).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(canvas.getByRole("cell", { name: "52" })).toHaveFocus();
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";
import { useDataGridRootPaginationContext } from "../root/DataGridRoot.context";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/Root tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;
type Row = { id: number; name: string };

const rows: Row[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name },
];

function PaginationStateProbe() {
  const { mode, page, pageCount, pageSize, canNext, setPage } =
    useDataGridRootPaginationContext();

  return (
    <>
      <p>
        {`${mode === "client" ? "Client" : "Server"} mode · Page ${page + 1} of ${pageCount ?? "unknown"} · ${pageSize} rows`}
      </p>
      <button
        type="button"
        disabled={!canNext}
        onClick={() => setPage(page + 1)}
      >
        Next page
      </button>
    </>
  );
}

export const ClientModeUsesRootPaginationState: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={rows}
      pagination={{ defaultPageSize: 2, pageSizeOptions: [2] }}
    >
      <PaginationStateProbe />
      <DataGrid.Table />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("cell", { name: "Person 1" })).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 2" })).toBeInTheDocument();
    expect(
      canvas.queryByRole("cell", { name: "Person 3" }),
    ).not.toBeInTheDocument();
    expect(
      canvas.getByText("Client mode · Page 1 of 3 · 2 rows"),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    expect(
      canvas.queryByRole("cell", { name: "Person 1" }),
    ).not.toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 3" })).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 4" })).toBeInTheDocument();
    expect(
      canvas.getByText("Client mode · Page 2 of 3 · 2 rows"),
    ).toBeInTheDocument();
  },
};

export const ServerModeUsesKnownTotalState: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={rows.slice(0, 2)}
      pagination={{
        mode: "server",
        defaultPageSize: 2,
        pageSizeOptions: [2],
        totalRows: rows.length,
      }}
    >
      <PaginationStateProbe />
      <DataGrid.Table />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("cell", { name: "Person 1" })).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 2" })).toBeInTheDocument();
    expect(
      canvas.getByText("Server mode · Page 1 of 3 · 2 rows"),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    expect(canvas.getByRole("cell", { name: "Person 1" })).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 2" })).toBeInTheDocument();
    expect(
      canvas.getByText("Server mode · Page 2 of 3 · 2 rows"),
    ).toBeInTheDocument();
  },
};

export const ServerModeUsesUnknownTotalState: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={rows.slice(0, 2)}
      pagination={{
        mode: "server",
        defaultPageSize: 2,
        pageSizeOptions: [2],
        hasNextPage: true,
      }}
    >
      <PaginationStateProbe />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText("Server mode · Page 1 of unknown · 2 rows"),
    ).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    expect(
      canvas.getByText("Server mode · Page 2 of unknown · 2 rows"),
    ).toBeInTheDocument();
  },
};

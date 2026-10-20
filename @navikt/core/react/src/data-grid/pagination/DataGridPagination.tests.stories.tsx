import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, within } from "storybook/test";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid.Pagination> = {
  title: "ds-react/DataGrid/Pagination/tests",
  component: DataGrid.Pagination,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid.Pagination>;

type Row = { id: number; name: string };

const ROWS: Row[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
];

const getRowId = (row: Row) => String(row.id);

export const TestKnownTotal: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(10, 20)}
      getRowId={getRowId}
      pagination={{ defaultPage: 1, totalRows: ROWS.length }}
    >
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Viser 11–20 av 25 rader")).toBeInTheDocument();
  },
};

export const TestUnknownTotal: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={{ hasNextPage: true }}
    >
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Viser rad 1–10")).toBeInTheDocument();
    expect(canvas.queryByText(/ av /)).not.toBeInTheDocument();
  },
};

export const TestZeroRows: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={[]}
      getRowId={getRowId}
      pagination={{ totalRows: 0 }}
    >
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Ingen rader")).toBeInTheDocument();
  },
};

export const TestCustomLayout: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={ROWS.slice(0, 10)}
      getRowId={getRowId}
      pagination={{ totalRows: ROWS.length }}
    >
      <DataGrid.Pagination data-testid="custom-bar">
        <span>Egendefinert innhold</span>
      </DataGrid.Pagination>
      <DataGrid.Table />
      <DataGrid.Pagination data-testid="summary-bar">
        <DataGrid.Pagination.Summary />
      </DataGrid.Pagination>
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const customBar = within(canvas.getByTestId("custom-bar"));
    const summaryBar = within(canvas.getByTestId("summary-bar"));

    expect(customBar.getByText("Egendefinert innhold")).toBeInTheDocument();
    expect(customBar.queryByText(/Viser/)).not.toBeInTheDocument();
    expect(summaryBar.getByText("Viser 1–10 av 25 rader")).toBeInTheDocument();
    expect(canvas.getAllByText(/Viser/)).toHaveLength(1);
  },
};

export const TestWithoutPaginationProp: Story = {
  render: () => (
    <DataGrid columns={columns} data={ROWS.slice(0, 5)} getRowId={getRowId}>
      <DataGrid.Table />
      <DataGrid.Pagination data-testid="bar" />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.queryByTestId("bar")).not.toBeInTheDocument();
  },
};

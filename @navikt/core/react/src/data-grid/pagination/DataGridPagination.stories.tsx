import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid.Pagination> = {
  title: "ds-react/DataGrid/Pagination",
  component: DataGrid.Pagination,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid.Pagination>;

type Row = { id: number; name: string; role: string };

const ROWS: Row[] = Array.from({ length: 137 }, (_, i) => ({
  id: i + 1,
  name: `Person ${i + 1}`,
  role: ["Utvikler", "Designer", "Leder"][i % 3],
}));

const columns: DataGrid.Columns<Row> = [
  { id: "id", header: "Id", bodyCell: (row) => row.id, align: "right" },
  { id: "name", header: "Navn", bodyCell: (row) => row.name },
  { id: "role", header: "Rolle", bodyCell: (row) => row.role },
];

function PagedGrid({
  children,
  defaultPage = 0,
  defaultPageSize = 10,
  style,
}: {
  children: React.ReactNode;
  defaultPage?: number;
  defaultPageSize?: number;
  style?: React.CSSProperties;
}) {
  const [page, setPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const pageRows = ROWS.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <DataGrid
      columns={columns}
      data={pageRows}
      getRowId={(row) => String(row.id)}
      style={style}
      pagination={{
        page,
        onPageChange: setPage,
        pageSize,
        onPageSizeChange: setPageSize,
        totalRows: ROWS.length,
      }}
    >
      {children}
    </DataGrid>
  );
}

export const BelowTable: Story = {
  render: () => (
    <PagedGrid>
      <DataGrid.Table />
      <DataGrid.Pagination />
    </PagedGrid>
  ),
};

export const AboveTable: Story = {
  render: () => (
    <PagedGrid>
      <DataGrid.Pagination />
      <DataGrid.Table />
    </PagedGrid>
  ),
};

export const PageNumberWidth: Story = {
  render: () => (
    <PagedGrid defaultPage={8}>
      <DataGrid.Table />
      <DataGrid.Pagination />
    </PagedGrid>
  ),
};

export const CustomLayout: Story = {
  render: () => (
    <PagedGrid>
      <DataGrid.Pagination>
        <DataGrid.Pagination.Summary />
        <DataGrid.Pagination.Navigation />
      </DataGrid.Pagination>
      <DataGrid.Table />
    </PagedGrid>
  ),
};

export const AboveAndBelowTable: Story = {
  render: () => (
    <PagedGrid>
      <DataGrid.Pagination />
      <DataGrid.Table />
      <DataGrid.Pagination />
    </PagedGrid>
  ),
};

export const StickyWithPageScroll: Story = {
  render: () => (
    <PagedGrid defaultPageSize={100}>
      <DataGrid.Table />
      <DataGrid.Pagination sticky />
    </PagedGrid>
  ),
};

/** The bar stays visible without `sticky` because the table scrolls internally. */
export const FixedHeight: Story = {
  render: () => (
    <div style={{ display: "flex", height: "400px" }}>
      <PagedGrid defaultPageSize={50}>
        <DataGrid.Table />
        <DataGrid.Pagination />
      </PagedGrid>
    </div>
  ),
};

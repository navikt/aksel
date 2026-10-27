import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { DataGrid } from "../root/DataGridRoot";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination",
  component: DataGrid,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

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

const sortableColumns: DataGrid.Columns<Row> = columns.map((column) => ({
  ...column,
  isSortable: column.id === "id",
}));

function PagedGrid({
  paginationAbove = false,
  defaultPageSize = 10,
}: {
  paginationAbove?: boolean;
  defaultPageSize?: number;
}) {
  return (
    <DataGrid
      columns={columns}
      data={ROWS}
      getRowId={(row) => String(row.id)}
      pagination={{ defaultPageSize }}
    >
      {paginationAbove && <DataGrid.Pagination />}
      <DataGrid.Table />
      <DataGrid.Pagination />
    </DataGrid>
  );
}

export const BelowTable: Story = {
  render: () => <PagedGrid />,
};

export const AboveAndBelowTable: Story = {
  render: () => <PagedGrid paginationAbove />,
};

export const PageScroll: Story = {
  render: () => <PagedGrid defaultPageSize={100} />,
};

/** The bar stays visible because the table scrolls internally. */
export const FixedHeight: Story = {
  render: () => (
    <div style={{ display: "flex", height: "400px" }}>
      <PagedGrid defaultPageSize={50} />
    </div>
  ),
};

export const ClientSideLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <>
        <button type="button" onClick={() => setIsLoading((value) => !value)}>
          {isLoading ? "Complete load" : "Reload data"}
        </button>
        <DataGrid
          columns={columns}
          data={isLoading ? [] : ROWS}
          getRowId={(row) => String(row.id)}
          isLoading={isLoading}
          pagination={{ defaultPage: 2 }}
        >
          <DataGrid.Table />
          <DataGrid.Pagination />
        </DataGrid>
      </>
    );
  },
};

export const ServerSide: Story = {
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    return (
      <DataGrid
        columns={columns}
        data={ROWS.slice(page * pageSize, (page + 1) * pageSize)}
        getRowId={(row) => String(row.id)}
        pagination={{
          mode: "server",
          page,
          onPageChange: setPage,
          pageSize,
          onPageSizeChange: setPageSize,
          totalRows: ROWS.length,
        }}
      >
        <DataGrid.Table />
        <DataGrid.Pagination />
      </DataGrid>
    );
  },
};

export const ResetPageOnSort: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The consumer sorts the full dataset; DataGrid slices the current page. An accepted sort change resets to the first page and scrolls the table to the top. For filtering, call setPage(0) in the filter-change handler.",
      },
    },
  },
  render: () => {
    const [sort, setSort] = useState<DataGrid.Table.SortEntry[]>([]);
    const direction = sort[0]?.direction;
    const sortedRows = [...ROWS].sort((a, b) =>
      direction === "desc" ? b.id - a.id : a.id - b.id,
    );

    return (
      <DataGrid
        columns={sortableColumns}
        data={sortedRows}
        getRowId={(row) => String(row.id)}
        pagination={{ defaultPageSize: 10 }}
      >
        <DataGrid.Table
          sorting={{
            sortOrder: sort,
            onSortOrderChange: setSort,
            allowMultiSort: false,
          }}
        />
        <DataGrid.Pagination />
      </DataGrid>
    );
  },
};

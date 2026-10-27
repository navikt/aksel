import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import { DataGrid } from "../root/DataGridRoot";
import { DataGridPagination } from "./index";

const meta: Meta<typeof DataGridPagination> = {
  title: "ds-react/DataGrid/Pagination",
  component: DataGridPagination,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataGridPagination>;

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
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const pageRows = ROWS.slice(page * pageSize, (page + 1) * pageSize);
  const pagination: DataGridPagination.Props = {
    data: pageRows,
    page,
    onPageChange: setPage,
    pageSize,
    onPageSizeChange: setPageSize,
    totalRows: ROWS.length,
  };

  return (
    <DataGrid
      columns={columns}
      data={pageRows}
      getRowId={(row) => String(row.id)}
    >
      {paginationAbove && (
        <DataGridPagination {...pagination} announcePageChanges={false} />
      )}
      <DataGrid.Table />
      <DataGridPagination {...pagination} />
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

export const ResetPageOnSort: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pagination only manages display and state; the consumer sorts the full dataset before slicing the current page. Controlled pagination lets onSortChange call setPage(0) alongside setSort. Pass this handler to sorting.onSortOrderChange. For filtering, call setPage(0) in the filter-change handler as well, then filter and sort before slicing; use the filtered row count as totalRows. Neither sorting nor filtering resets the page automatically. Scrolling is consumer-owned. When the document owns scrolling, scroll the table into view in onPageChange with tableRef.current?.scrollIntoView({ block: "start", behavior: "instant" }).',
      },
    },
  },
  render: () => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState<DataGrid.Table.SortEntry[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
    const direction = sort[0]?.direction;
    const sortedRows = [...ROWS].sort((a, b) =>
      direction === "desc" ? b.id - a.id : a.id - b.id,
    );
    const pageRows = sortedRows.slice(page * pageSize, (page + 1) * pageSize);
    const onPageChange = (nextPage: number) => {
      setPage(nextPage);
      tableRef.current?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    };
    const onSortChange = (nextSort: DataGrid.Table.SortEntry[]) => {
      setSort(nextSort);
      setPage(0);
    };

    return (
      <DataGrid
        columns={sortableColumns}
        data={pageRows}
        getRowId={(row) => String(row.id)}
      >
        <DataGrid.Table
          ref={tableRef}
          sorting={{
            sortOrder: sort,
            onSortOrderChange: onSortChange,
            allowMultiSort: false,
          }}
        />
        <DataGridPagination
          data={pageRows}
          page={page}
          onPageChange={onPageChange}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          totalRows={ROWS.length}
        />
      </DataGrid>
    );
  },
};

export const Standalone: Story = {
  render: () => (
    <DataGridPagination data={ROWS.slice(0, 10)} totalRows={ROWS.length} />
  ),
};

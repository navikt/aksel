import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
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

const sortableColumns: DataGrid.Columns<Row> = columns.map((column) => ({
  ...column,
  isSortable: column.id === "id",
}));

function PagedGrid({
  children,
  defaultPageSize = 10,
}: {
  children: React.ReactNode;
  defaultPageSize?: number;
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const pageRows = ROWS.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <DataGrid
      columns={columns}
      data={pageRows}
      getRowId={(row) => String(row.id)}
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

export const ResetPageOnSort: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Pagination only manages display and state; the consumer sorts the full dataset before slicing the current page. Controlled pagination lets onSortChange call setPage(0) alongside setSort. Pass this handler to sorting.onSortOrderChange. For filtering, call setPage(0) in the filter-change handler as well, then filter and sort before slicing; use the filtered row count as totalRows. Neither sorting nor filtering resets the page automatically. When the document owns scrolling, scroll the table into view in the controlled onPageChange callback with tableRef.current?.scrollIntoView({ block: "start", behavior: "instant" }); DataGrid only resets its internal table scroller.',
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
        pagination={{
          page,
          onPageChange,
          pageSize,
          onPageSizeChange: setPageSize,
          totalRows: ROWS.length,
        }}
      >
        <DataGrid.Table
          ref={tableRef}
          sorting={{
            sortOrder: sort,
            onSortOrderChange: onSortChange,
            allowMultiSort: false,
          }}
        />
        <DataGrid.Pagination />
      </DataGrid>
    );
  },
};

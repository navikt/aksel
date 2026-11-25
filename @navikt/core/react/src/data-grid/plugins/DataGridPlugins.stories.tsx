import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { DataGrid } from "..";
import { Pagination } from "../../pagination";
import { HStack, VStack } from "../../primitives/stack";
import { Detail } from "../../typography";
import type { DataGridPlugin } from "./dataGridPlugins";

type InvoiceRow = {
  id: string;
  invoiceNumber: string;
  category: string;
  status: string;
  amount: string;
};

const DEMO_ROWS: InvoiceRow[] = [
  {
    id: "1",
    invoiceNumber: "INV-2026-001",
    category: "Cloud Hosting",
    status: "Paid",
    amount: "12 400 kr",
  },
  {
    id: "2",
    invoiceNumber: "INV-2026-002",
    category: "Software License",
    status: "Pending",
    amount: "4 850 kr",
  },
  {
    id: "3",
    invoiceNumber: "INV-2026-003",
    category: "Office Supplies",
    status: "Paid",
    amount: "1 290 kr",
  },
  {
    id: "4",
    invoiceNumber: "INV-2026-004",
    category: "Security Audit",
    status: "Overdue",
    amount: "28 000 kr",
  },
  {
    id: "5",
    invoiceNumber: "INV-2026-005",
    category: "Hardware",
    status: "Paid",
    amount: "19 990 kr",
  },
  {
    id: "6",
    invoiceNumber: "INV-2026-006",
    category: "Training",
    status: "Pending",
    amount: "7 500 kr",
  },
  {
    id: "7",
    invoiceNumber: "INV-2026-007",
    category: "Domain Renewal",
    status: "Paid",
    amount: "640 kr",
  },
  {
    id: "8",
    invoiceNumber: "INV-2026-008",
    category: "Monitoring",
    status: "Pending",
    amount: "3 200 kr",
  },
];

const DEMO_COLUMNS: DataGrid.Columns<InvoiceRow> = [
  {
    id: "invoiceNumber",
    header: "Invoice",
    isRowHeader: true,
    bodyCell: (row) => row.invoiceNumber,
  },
  { id: "category", header: "Category", bodyCell: (row) => row.category },
  { id: "status", header: "Status", bodyCell: (row) => row.status },
  { id: "amount", header: "Amount", bodyCell: (row) => row.amount },
];

/**
 * Example first-party plugin hook.
 * The consumer owns pagination state; the hook returns a memoized `DataGridPlugin`
 * that wraps the table with Aksel's `<Pagination />`.
 */
function useDummyPaginationPlugin({
  page,
  pageSize,
  totalItems,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (nextPage: number) => void;
}): DataGridPlugin {
  return useMemo(() => {
    const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
    const start = (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, totalItems);

    return {
      transformTableContext: (children) => (
        <VStack gap="space-12" data-plugin="pagination">
          {children}
          <HStack align="center" justify="space-between" gap="space-16" wrap>
            <Detail>
              Showing {start}–{end} of {totalItems}
            </Detail>
            <Pagination
              page={page}
              count={pageCount}
              onPageChange={onPageChange}
              size="small"
            />
          </HStack>
        </VStack>
      ),
    };
  }, [page, pageSize, totalItems, onPageChange]);
}

const meta: Meta = {
  title: "ds-react/DataGrid/Plugins",
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

/**
 * Shows the intended consumer API for a first-party plugin hook:
 * state stays in consumer code, the hook returns a memoized `DataGridPlugin`,
 * and `DataGrid` renders it through `plugins={{ pagination }}`.
 */
export const PaginationPlugin: Story = {
  render: function PaginationPluginDemo() {
    const [page, setPage] = useState(1);
    const pageSize = 3;

    const paginationPlugin = useDummyPaginationPlugin({
      page,
      pageSize,
      totalItems: DEMO_ROWS.length,
      onPageChange: setPage,
    });

    const pageRows = useMemo(
      () => DEMO_ROWS.slice((page - 1) * pageSize, page * pageSize),
      [page],
    );

    return (
      <DataGrid
        columns={DEMO_COLUMNS}
        data={pageRows}
        getRowId={(row) => row.id}
        plugins={{ pagination: paginationPlugin }}
      >
        <DataGrid.Table />
      </DataGrid>
    );
  },
};

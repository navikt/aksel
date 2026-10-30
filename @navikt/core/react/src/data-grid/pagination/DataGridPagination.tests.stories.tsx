import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import type { SortEntry } from "../../data/table/root/DataGridTable.types";
import { DataGrid } from "../root/DataGridRoot";
import { useDataGridRootPaginationContext } from "../root/DataGridRoot.context";

const meta: Meta<typeof DataGrid> = {
  title: "ds-react/DataGrid/Pagination/tests",
  component: DataGrid,
  parameters: {
    layout: "padded",
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataGrid>;
type Row = { id: number; name: string };

const getRowId = (row: Row) => String(row.id);

const rows: Row[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name },
];

const sortableColumns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name, isSortable: true },
];

function LoadingClientGrid({ controlled = false }: { controlled?: boolean }) {
  const [data, setData] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [correctionCount, setCorrectionCount] = useState(0);

  return (
    <>
      <output aria-label="Page corrections">{correctionCount}</output>
      <button
        type="button"
        onClick={() => {
          setData(rows);
          setIsLoading(false);
        }}
      >
        Complete load
      </button>
      <button
        type="button"
        onClick={() => {
          setData([]);
          setIsLoading(true);
        }}
      >
        Reload
      </button>
      <button
        type="button"
        onClick={() => {
          setData(rows.slice(0, 3));
          setIsLoading(false);
        }}
      >
        Complete smaller load
      </button>
      <DataGrid
        columns={columns}
        data={data}
        getRowId={getRowId}
        isLoading={isLoading}
        pagination={{
          page: controlled ? page : undefined,
          defaultPage: 2,
          defaultPageSize: 2,
          pageSizeOptions: [2],
          onPageChange: (nextPage) => {
            setPage(nextPage);
            setCorrectionCount((count) => count + 1);
          },
        }}
      >
        <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
      </DataGrid>
    </>
  );
}

const testLoadingPreservesPage: Story["play"] = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const corrections = canvas.getByRole("status", {
    name: "Page corrections",
  });
  const completeLoad = canvas.getByRole("button", { name: "Complete load" });
  const reload = canvas.getByRole("button", { name: "Reload" });

  expect(corrections).toHaveTextContent("0");
  await userEvent.click(completeLoad);
  expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
  expect(canvas.getByRole("cell", { name: "Person 5" })).toBeInTheDocument();

  await userEvent.click(reload);
  expect(corrections).toHaveTextContent("0");
  await userEvent.click(completeLoad);
  expect(canvas.getByText("Side 3 av 3")).toBeInTheDocument();
  expect(corrections).toHaveTextContent("0");

  await userEvent.click(reload);
  await userEvent.click(
    canvas.getByRole("button", { name: "Complete smaller load" }),
  );
  expect(await canvas.findByText("Side 2 av 2")).toBeInTheDocument();
  expect(canvas.getByRole("cell", { name: "Person 3" })).toBeInTheDocument();
  expect(corrections).toHaveTextContent("1");
};

export const LoadingPreservesUncontrolledPage: Story = {
  render: () => <LoadingClientGrid />,
  play: testLoadingPreservesPage,
};

export const LoadingPreservesControlledPage: Story = {
  render: () => <LoadingClientGrid controlled />,
  play: testLoadingPreservesPage,
};

const manyRows: Row[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `Person ${String(index + 1).padStart(2, "0")}`,
}));

function ResetControls({
  onSortProgrammatically,
}: {
  onSortProgrammatically: () => void;
}) {
  const { page, pageSize, setPage, setPageSize } =
    useDataGridRootPaginationContext();

  return (
    <div>
      <p>{`Page ${page + 1} · ${pageSize} rows`}</p>
      <button type="button" onClick={() => setPage(page + 1)}>
        Next page
      </button>
      <button type="button" onClick={() => setPageSize(10)}>
        Ten rows
      </button>
      <button type="button" onClick={onSortProgrammatically}>
        Sort programmatically
      </button>
    </div>
  );
}

function ResetGrid({ acceptSort }: { acceptSort: boolean }) {
  const [sortOrder, setSortOrder] = useState<SortEntry[]>([]);

  return (
    <div style={{ display: "flex", height: 360 }}>
      <DataGrid
        columns={sortableColumns}
        data={manyRows}
        getRowId={(row) => String(row.id)}
        pagination={{ defaultPageSize: 20, pageSizeOptions: [10, 20] }}
      >
        <ResetControls
          onSortProgrammatically={() =>
            setSortOrder([{ columnId: "name", direction: "desc" }])
          }
        />
        <DataGrid.Table
          aria-label="Personer"
          sorting={{
            sortOrder,
            onSortOrderChange: (next) => {
              if (acceptSort) {
                setSortOrder(next);
              }
            },
          }}
        />
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

function scrollDown(wrapper: HTMLElement) {
  wrapper.scrollTop = 150;
  expect(wrapper.scrollTop).toBeGreaterThan(0);
}

export const ResetsPageAndTableScroll: Story = {
  render: () => <ResetGrid acceptSort />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getScrollWrapper(canvasElement);
    const view = canvasElement.ownerDocument.defaultView ?? window;
    const windowScrollY = view.scrollY;

    scrollDown(wrapper);
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    expect(canvas.getByText("Page 2 · 20 rows")).toBeInTheDocument();
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));

    scrollDown(wrapper);
    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expect(canvas.getByText("Page 1 · 20 rows")).toBeInTheDocument();
    expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));

    scrollDown(wrapper);
    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expect(canvas.getByText("Page 1 · 20 rows")).toBeInTheDocument();
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    scrollDown(wrapper);
    await userEvent.click(canvas.getByRole("button", { name: "Ten rows" }));
    expect(canvas.getByText("Page 1 · 10 rows")).toBeInTheDocument();
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));

    expect(view.scrollY).toBe(windowScrollY);
  },
};

export const RejectedSortDoesNotReset: Story = {
  render: () => <ResetGrid acceptSort={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = getScrollWrapper(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    scrollDown(wrapper);
    const scrollTop = wrapper.scrollTop;

    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expect(canvas.getByText("Page 2 · 20 rows")).toBeInTheDocument();
    expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "none",
    );
    expect(wrapper.scrollTop).toBe(scrollTop);

    await userEvent.click(
      canvas.getByRole("button", { name: "Sort programmatically" }),
    );
    expect(canvas.getByText("Page 1 · 20 rows")).toBeInTheDocument();
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));
  },
};

function ServerResetGrid() {
  const [sortOrder, setSortOrder] = useState<SortEntry[]>([]);

  return (
    <DataGrid
      columns={sortableColumns}
      data={manyRows.slice(0, 20)}
      getRowId={getRowId}
      pagination={{
        mode: "server",
        defaultPageSize: 20,
        pageSizeOptions: [10, 20],
        totalRows: manyRows.length,
      }}
    >
      <DataGrid.Table
        aria-label="Personer"
        sorting={{ sortOrder, onSortOrderChange: setSortOrder }}
        bottomContent={<DataGrid.Pagination />}
      />
    </DataGrid>
  );
}

export const ServerSortDoesNotResetPage: Story = {
  render: () => <ServerResetGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Side 1 av 3")).toBeInTheDocument();
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 01" })).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 20" })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expect(canvas.getByText("Side 2 av 3")).toBeInTheDocument();
  },
};

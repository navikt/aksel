import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import type { SortEntry } from "../../data/table/root/DataGridTable.types";
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

export const ContextBoundBarsShareStateAndAnnounceOnce: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={rows}
      pagination={{ defaultPageSize: 2, pageSizeOptions: [2] }}
    >
      <DataGrid.Pagination>
        <DataGrid.Pagination.Navigation aria-label="Top results navigation" />
      </DataGrid.Pagination>
      <DataGrid.Table />
      <DataGrid.Pagination>
        <DataGrid.Pagination.Navigation aria-label="Bottom results navigation" />
      </DataGrid.Pagination>
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const top = canvas.getByRole("navigation", {
      name: "Top results navigation",
    });
    const bottom = canvas.getByRole("navigation", {
      name: "Bottom results navigation",
    });
    const liveRegions = canvasElement.querySelectorAll(
      ".aksel-data-grid > .aksel-sr-only[aria-live='polite']",
    );

    expect(liveRegions).toHaveLength(1);
    expect(within(top).getByText("Side 1 av 3")).toBeInTheDocument();
    expect(within(bottom).getByText("Side 1 av 3")).toBeInTheDocument();

    await userEvent.click(
      within(top).getByRole("button", { name: "Neste side" }),
    );
    expect(within(top).getByText("Side 2 av 3")).toBeInTheDocument();
    expect(within(bottom).getByText("Side 2 av 3")).toBeInTheDocument();
    await waitFor(() =>
      expect(liveRegions[0].textContent).toContain("Side 2 av 3"),
    );
  },
};

class RenderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <p role="alert">{this.state.error.message}</p>;
    }

    return this.props.children;
  }
}

export const RequiresRootPagination: Story = {
  render: () => (
    <RenderErrorBoundary>
      <DataGrid columns={columns} data={rows}>
        <DataGrid.Pagination />
      </DataGrid>
    </RenderErrorBoundary>
  ),
  play: async ({ canvasElement }) => {
    expect(within(canvasElement).getByRole("alert")).toHaveTextContent(
      "DataGrid.Pagination must be used within a <DataGrid pagination={...}>",
    );
  },
};

const manyRows: Row[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `Person ${String(index + 1).padStart(2, "0")}`,
}));

const sortableColumns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name, isSortable: true },
];

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

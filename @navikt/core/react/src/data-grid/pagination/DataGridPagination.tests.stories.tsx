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

function expectPage(
  canvas: ReturnType<typeof within>,
  page: number,
  pageCount: number,
) {
  expect(canvas.getByRole("textbox", { name: "Gå til side" })).toHaveValue(
    String(page),
  );
  expect(canvas.getByText(`av ${pageCount}`)).toBeInTheDocument();
}

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
  expectPage(canvas, 3, 3);
  expect(canvas.getByRole("cell", { name: "Person 5" })).toBeInTheDocument();

  await userEvent.click(reload);
  expect(corrections).toHaveTextContent("0");
  await userEvent.click(completeLoad);
  expectPage(canvas, 3, 3);
  expect(corrections).toHaveTextContent("0");

  await userEvent.click(reload);
  await userEvent.click(
    canvas.getByRole("button", { name: "Complete smaller load" }),
  );
  await waitFor(() => expectPage(canvas, 2, 2));
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

export const ShiftJumpsToFirstAndLastPage: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={manyRows}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 20, pageSizeOptions: [20] }}
    >
      <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const previous = canvas.getByRole("button", { name: "Forrige side" });
    const next = canvas.getByRole("button", { name: "Neste side" });

    expectPage(canvas, 1, 3);

    /* Shift elsewhere on the page does not change the buttons */
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Neste side");
    expect(previous).toHaveAccessibleName("Forrige side");

    await user.hover(next);
    expect(next).toHaveAccessibleName("Siste side");
    expect(previous).toHaveAccessibleName("Forrige side");
    await user.click(next);
    expectPage(canvas, 3, 3);

    await user.hover(previous);
    expect(previous).toHaveAccessibleName("Første side");
    await user.click(previous);
    expectPage(canvas, 1, 3);
    /* Next lost both hover and focus */
    expect(next).toHaveAccessibleName("Neste side");
    await user.keyboard("{/Shift}");
    expect(previous).toHaveAccessibleName("Forrige side");

    await user.click(next);
    expectPage(canvas, 2, 3);

    /* Keyboard: Shift on the focused button previews the jump */
    await user.unhover(next);
    expect(next).toHaveFocus();
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Siste side");
    await user.keyboard("{/Shift}");
    expect(next).toHaveAccessibleName("Neste side");
  },
};

export const ShiftWithUnknownTotalGoesToNextPage: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={manyRows.slice(0, 20)}
      getRowId={getRowId}
      pagination={{
        mode: "server",
        defaultPageSize: 20,
        pageSizeOptions: [20],
        hasNextPage: true,
      }}
    >
      <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    expect(
      canvas.getByRole("button", { name: /Rad 1–20.*Rader per side: 20/ }),
    ).toBeInTheDocument();
    expect(canvas.getByText("Side 1")).toBeInTheDocument();
    expect(
      canvas.queryByRole("textbox", { name: "Gå til side" }),
    ).not.toBeInTheDocument();
    await user.keyboard("{Shift>}");
    expect(
      canvas.queryByRole("button", { name: "Siste side" }),
    ).not.toBeInTheDocument();
    await user.click(canvas.getByRole("button", { name: "Neste side" }));
    expect(canvas.getByText("Side 2")).toBeInTheDocument();
    await user.keyboard("{/Shift}");
  },
};

export const TypedPageJumpsToPage: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={manyRows}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 20, pageSizeOptions: [20] }}
    >
      <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    const input = canvas.getByRole("textbox", { name: "Gå til side" });

    await user.click(input);
    await user.keyboard("2{Enter}");
    expectPage(canvas, 2, 3);
    expect(canvas.getByRole("cell", { name: "Person 21" })).toBeInTheDocument();

    await user.clear(input);
    await user.keyboard("99{Enter}");
    expectPage(canvas, 3, 3);

    await user.clear(input);
    await user.keyboard("0{Enter}");
    expectPage(canvas, 1, 3);

    await user.clear(input);
    await user.keyboard("a2b");
    expect(input).toHaveValue("2");
    await user.keyboard("{Escape}");
    expectPage(canvas, 1, 3);

    await user.clear(input);
    await user.keyboard("3");
    await user.tab();
    expectPage(canvas, 1, 3);

    await user.clear(input);
    await user.keyboard("{Enter}");
    expectPage(canvas, 1, 3);
  },
};

export const ChangesPageSize: Story = {
  render: () => (
    <DataGrid
      columns={columns}
      data={manyRows}
      getRowId={getRowId}
      pagination={{ defaultPageSize: 20, pageSizeOptions: [10, 20] }}
    >
      <DataGrid.Table bottomContent={<DataGrid.Pagination />} />
    </DataGrid>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const user = userEvent.setup();

    expect(
      canvas.getByRole("button", {
        name: /Rad 1–20 av 60.*Rader per side: 20/,
      }),
    ).toBeInTheDocument();

    await user.click(canvas.getByRole("button", { name: "Neste side" }));
    const rowsTrigger = canvas.getByRole("button", {
      name: /Rad 21–40 av 60.*Rader per side: 20/,
    });

    await user.click(rowsTrigger);
    expect(
      body.getByRole("menuitemradio", { name: "20 per side" }),
    ).toBeChecked();
    await user.click(body.getByRole("menuitemradio", { name: "10 per side" }));

    expectPage(canvas, 1, 6);
    expect(
      canvas.getByRole("button", {
        name: /Rad 1–10 av 60.*Rader per side: 10/,
      }),
    ).toBeInTheDocument();
  },
};

export const ServerSortDoesNotResetPage: Story = {
  render: () => <ServerResetGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expectPage(canvas, 1, 3);
    await userEvent.click(canvas.getByRole("button", { name: "Neste side" }));
    expectPage(canvas, 2, 3);
    expect(canvas.getByRole("cell", { name: "Person 01" })).toBeInTheDocument();
    expect(canvas.getByRole("cell", { name: "Person 20" })).toBeInTheDocument();

    await userEvent.click(canvas.getByRole("button", { name: "Name" }));
    expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    expectPage(canvas, 2, 3);
  },
};

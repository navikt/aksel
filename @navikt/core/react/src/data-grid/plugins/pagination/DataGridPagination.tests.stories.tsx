import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test";
import { DataGrid } from "../../root/DataGridRoot";
import type { UseDataGridPaginationConfig } from "./DataGridPagination.types";
import { paginateData } from "./helpers/paginateData";
import { useDataGridPagination } from "./useDataGridPagination";

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

const manyRows: Row[] = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: `Person ${String(index + 1).padStart(2, "0")}`,
}));

const columns: DataGrid.Columns<Row> = [
  { id: "name", header: "Name", bodyCell: (row) => row.name },
];

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

function ClientPaginationHarness() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pageChangeCount, setPageChangeCount] = useState(0);

  const pagination = useDataGridPagination({
    page,
    onPageChange: (nextPage) => {
      setPageChangeCount((c) => c + 1);
      setPage(nextPage);
    },
    pageSize,
    onPageSizeChange: (nextSize) => {
      setPageSize(nextSize);
      setPage(1);
    },
    pageSizeOptions: [10, 20],
    totalRows: manyRows.length,
  });

  const pageRows = useMemo(
    () => paginateData(manyRows, page, pageSize),
    [page, pageSize],
  );

  return (
    <>
      <output data-testid="page-change-count">{pageChangeCount}</output>
      <DataGrid
        columns={columns}
        data={pageRows}
        getRowId={getRowId}
        plugins={{ pagination }}
      >
        <DataGrid.Table aria-label="Personer" />
      </DataGrid>
    </>
  );
}

export const ClientPaginationFlow: Story = {
  render: () => <ClientPaginationHarness />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const user = userEvent.setup();
    const previous = canvas.getByRole("button", { name: "Forrige side" });
    const next = canvas.getByRole("button", { name: "Neste side" });
    const input = canvas.getByRole("textbox", { name: "Gå til side" });
    const liveRegion = canvasElement.querySelector<HTMLElement>(
      '.aksel-sr-only[aria-live="polite"]',
    );

    expectPage(canvas, 1, 3);

    /* Shift elsewhere does not preview jump; Shift+hover/focus previews & jumps */
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Neste side");
    await user.hover(next);
    expect(next).toHaveAccessibleName("Siste side");
    expect(previous).toHaveAccessibleName("Forrige side");
    await user.click(next);
    expectPage(canvas, 3, 3);
    await waitFor(() =>
      expect(liveRegion).toHaveTextContent("Fra 41 til 60 av 60"),
    );

    await user.hover(previous);
    expect(previous).toHaveAccessibleName("Første side");
    await user.click(previous);
    expectPage(canvas, 1, 3);
    await user.keyboard("{/Shift}");

    await user.click(next);
    expectPage(canvas, 2, 3);
    await user.unhover(next);
    expect(next).toHaveFocus();
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Siste side");
    await user.keyboard("{/Shift}");
    expect(next).toHaveAccessibleName("Neste side");

    /* Shift+Tab previews the same jump as keyboard activation */
    await user.clear(input);
    await user.keyboard("3{Enter}{Shift>}{Tab}");
    expect(previous).toHaveFocus();
    expect(previous).toHaveAccessibleName("Første side");
    await user.keyboard("{Enter}");
    expectPage(canvas, 1, 3);
    await user.keyboard("{/Shift}");
    expect(previous).toHaveAccessibleName("Forrige side");

    await user.tab();
    await user.tab();
    expect(next).toHaveFocus();
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Siste side");
    /* Releasing one Shift while the other is held keeps the modifier active */
    await fireEvent.keyUp(next, {
      key: "Shift",
      code: "ShiftLeft",
      shiftKey: true,
    });
    expect(next).toHaveAccessibleName("Siste side");
    await user.keyboard(" ");
    expectPage(canvas, 3, 3);
    await user.keyboard("{/Shift}");

    /* Typed page: Enter submit, clamping, non-digit strip, Escape discard, blur commit */
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
    expectPage(canvas, 3, 3);
    expect(canvas.getByRole("cell", { name: "Person 41" })).toBeInTheDocument();

    /* Page-size ActionMenu calls only onPageSizeChange (not onPageChange) and announces */
    const countBeforeSizeChange = Number(
      canvas.getByTestId("page-change-count").textContent,
    );
    await user.click(
      canvas.getByRole("button", {
        name: "Fra 41 til 60 av 60, velg antall rader per side, 20 valgt",
      }),
    );
    expect(
      body.getByRole("menuitemradio", { name: "20 per side" }),
    ).toBeChecked();
    await user.click(body.getByRole("menuitemradio", { name: "10 per side" }));

    expectPage(canvas, 1, 6);
    expect(Number(canvas.getByTestId("page-change-count").textContent)).toBe(
      countBeforeSizeChange,
    );
    expect(
      canvas.getByRole("button", {
        name: "Fra 1 til 10 av 60, velg antall rader per side, 10 valgt",
      }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(liveRegion).toHaveTextContent("Fra 1 til 10 av 60"),
    );
  },
};

function ServerUnknownTotalGrid() {
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pagination = useDataGridPagination({
    page,
    onPageChange: setPage,
    pageSize: 20,
    allowPageSizeChange: false,
    hasNextPage: true,
  });

  return (
    <>
      <button type="button" onClick={() => setIsLoading((prev) => !prev)}>
        Toggle loading
      </button>
      <DataGrid
        columns={columns}
        data={isLoading ? [] : manyRows.slice(0, 20)}
        getRowId={getRowId}
        isLoading={isLoading}
        plugins={{ pagination }}
      >
        <DataGrid.Table aria-label="Personer" />
      </DataGrid>
    </>
  );
}

export const ServerAndUnknownTotal: Story = {
  render: () => <ServerUnknownTotalGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();

    /* Plain summary text when allowPageSizeChange is false; no page textbox when total is unknown */
    expect(canvas.getByText("Fra 1–20")).toBeInTheDocument();
    expect(
      canvas.queryByRole("button", { name: /rader per side/i }),
    ).not.toBeInTheDocument();
    expect(
      canvas.queryByRole("textbox", { name: "Gå til side" }),
    ).not.toBeInTheDocument();
    expect(canvas.getByText("Side 1")).toBeInTheDocument();

    /* Shift+click with unknown total steps +1 instead of jumping to last */
    const next = canvas.getByRole("button", { name: "Neste side" });
    await user.hover(next);
    await user.keyboard("{Shift>}");
    expect(next).toHaveAccessibleName("Neste side");
    await user.click(next);
    await user.keyboard("{/Shift}");
    expect(canvas.getByText("Side 2")).toBeInTheDocument();
    expect(
      canvas.getByText("Fra 21–40", { selector: "span" }),
    ).toBeInTheDocument();

    /* Loading preserves summary and aria-disables navigation buttons */
    await user.click(canvas.getByRole("button", { name: "Toggle loading" }));
    expect(
      canvas.getByText("Fra 21–40", { selector: "span" }),
    ).toBeInTheDocument();
    expect(next).toHaveAttribute("aria-disabled", "true");
    await user.click(next);
    expect(canvas.getByText("Side 2")).toBeInTheDocument();
  },
};

function PositionScrollAutoHideGrid() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [rowCount, setRowCount] = useState(60);
  const [position, setPosition] =
    useState<UseDataGridPaginationConfig["position"]>("both");
  const [align, setAlign] =
    useState<UseDataGridPaginationConfig["align"]>("start");

  const rows = useMemo(() => manyRows.slice(0, rowCount), [rowCount]);
  const pagination = useDataGridPagination({
    page,
    onPageChange: setPage,
    pageSize,
    onPageSizeChange: (nextSize) => {
      setPageSize(nextSize);
      setPage(1);
    },
    pageSizeOptions: [10, 20, 50],
    totalRows: rows.length,
    position,
    align,
  });

  const pageRows = useMemo(
    () => paginateData(rows, page, pageSize),
    [rows, page, pageSize],
  );

  return (
    <>
      <button type="button" onClick={() => setRowCount(15)}>
        Set 15 rows
      </button>
      <button type="button" onClick={() => setRowCount(5)}>
        Set 5 rows
      </button>
      <button type="button" onClick={() => setRowCount(0)}>
        Set 0 rows
      </button>
      <button type="button" onClick={() => setPosition("none")}>
        Hide position
      </button>
      <button type="button" onClick={() => setAlign("start")}>
        start align
      </button>
      <div style={{ display: "flex", height: 360 }}>
        <DataGrid
          columns={columns}
          data={pageRows}
          getRowId={getRowId}
          plugins={{ pagination }}
        >
          <DataGrid.Table aria-label="Personer" />
        </DataGrid>
      </div>
    </>
  );
}

export const PositionScrollAndAutoHide: Story = {
  render: () => <PositionScrollAutoHideGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const user = userEvent.setup();
    const wrapper = canvasElement.querySelector<HTMLElement>(
      ".aksel-data-table__scroll-wrapper",
    );
    if (!wrapper) {
      throw new Error("Table scroll wrapper not found");
    }

    /* position="both" renders two distinct navigation landmarks */
    const topNav = canvas.getByRole("navigation", {
      name: "Sidenavigering (øverst)",
    });
    const bottomNav = canvas.getByRole("navigation", {
      name: "Sidenavigering (nederst)",
    });
    expect(topNav).toBeInTheDocument();
    expect(bottomNav).toBeInTheDocument();

    /* Page change scrolls table container back to top */
    wrapper.scrollTop = 150;
    expect(wrapper.scrollTop).toBeGreaterThan(0);
    await user.click(
      within(bottomNav).getByRole("button", { name: "Neste side" }),
    );
    expect(
      within(bottomNav).getByRole("textbox", { name: "Gå til side" }),
    ).toHaveValue("2");
    await waitFor(() => expect(wrapper.scrollTop).toBe(0));

    /* Safe single-page auto-hide: 15 rows with pageSize 20 (min option 10) keeps bars visible */
    await user.click(canvas.getByRole("button", { name: "Set 15 rows" }));
    await waitFor(() =>
      expect(
        canvas.getByRole("navigation", { name: "Sidenavigering (nederst)" }),
      ).toBeInTheDocument(),
    );

    /* User can still switch down to 10 per page without being locked out */
    const bottomBar = bottomNav.parentElement;
    if (!bottomBar) {
      throw new Error("Expected bottom pagination bar container");
    }
    await user.click(
      within(bottomBar).getByRole("button", {
        name: /velg antall rader per side/i,
      }),
    );
    await user.click(body.getByRole("menuitemradio", { name: "10 per side" }));
    expect(
      within(bottomNav).getByRole("textbox", { name: "Gå til side" }),
    ).toHaveValue("1");

    /* 5 rows (<= min option 10) and 0 rows auto-hide cleanly */
    await user.click(canvas.getByRole("button", { name: "Set 5 rows" }));
    expect(canvas.queryByRole("navigation")).not.toBeInTheDocument();

    await user.click(canvas.getByRole("button", { name: "Set 0 rows" }));
    expect(canvas.queryByRole("navigation")).not.toBeInTheDocument();
  },
};

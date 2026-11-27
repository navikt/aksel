import { fireEvent, render, screen } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { DataGrid } from "../../root/DataGridRoot";
import type { UseDataGridPaginationConfig } from "./DataGridPagination.types";
import { useOptionalDataGridPaginationContext } from "./context/DataGridPagination.context";
import { paginateData } from "./helpers/paginateData";
import { useDataGridPagination } from "./useDataGridPagination";

type TestRow = { id: string; name: string };

const TEST_COLUMNS: DataGrid.Columns<TestRow> = [
  {
    id: "name",
    header: "Name",
    isRowHeader: true,
    bodyCell: (row) => row.name,
  },
];

const makeRows = (count: number): TestRow[] =>
  Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `Row ${i + 1}`,
  }));

function PaginationContextProbe({ testId = "probe" }: { testId?: string }) {
  const ctx = useOptionalDataGridPaginationContext();
  return (
    <div data-testid={testId}>
      {ctx
        ? `page=${ctx.page},pageCount=${ctx.pageCount ?? "unknown"},from=${ctx.from},to=${ctx.to},total=${ctx.totalRows ?? "unknown"},size=${ctx.pageSize}`
        : "none"}
    </div>
  );
}

describe("useDataGridPagination", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("propagates controlled state updates even with a stable children element", () => {
    const stableChild = <PaginationContextProbe />;
    const allRows = makeRows(25);

    function Harness({ page }: { page: number }) {
      const pagination = useDataGridPagination({
        page,
        onPageChange: () => {},
        pageSize: 10,
        totalRows: allRows.length,
      });

      return (
        <DataGrid
          columns={TEST_COLUMNS}
          data={paginateData(allRows, page, 10)}
          getRowId={(r) => r.id}
          plugins={{ pagination }}
        >
          {stableChild}
        </DataGrid>
      );
    }

    const { rerender } = render(<Harness page={1} />);
    expect(screen.getByTestId("probe").textContent).toBe(
      "page=1,pageCount=3,from=1,to=10,total=25,size=10",
    );

    rerender(<Harness page={2} />);
    expect(screen.getByTestId("probe").textContent).toBe(
      "page=2,pageCount=3,from=11,to=20,total=25,size=10",
    );
  });

  test("freezes summary and visibility during loading, then clamps once when totalRows shrinks", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const onPageChange = vi.fn();

    function Harness({
      page,
      data,
      totalRows,
      isLoading,
    }: {
      page: number;
      data: TestRow[];
      totalRows: number;
      isLoading: boolean;
    }) {
      const pagination = useDataGridPagination({
        page,
        onPageChange,
        pageSize: 2,
        pageSizeOptions: [2],
        totalRows,
      });

      return (
        <DataGrid
          columns={TEST_COLUMNS}
          data={data}
          getRowId={(r) => r.id}
          isLoading={isLoading}
          plugins={{ pagination }}
        >
          <PaginationContextProbe />
          <DataGrid.Table />
        </DataGrid>
      );
    }

    const { rerender } = render(
      <Harness page={3} data={makeRows(1)} totalRows={5} isLoading={false} />,
    );
    expect(screen.getByTestId("probe").textContent).toBe(
      "page=3,pageCount=3,from=5,to=5,total=5,size=2",
    );
    expect(screen.getByRole("navigation")).toBeTruthy();

    /* While loading with empty rows, summary and bar visibility stay frozen and no clamp fires */
    rerender(<Harness page={3} data={[]} totalRows={0} isLoading />);
    expect(screen.getByTestId("probe").textContent).toContain(
      "from=5,to=5,total=5,size=2",
    );
    expect(screen.getByRole("navigation")).toBeTruthy();
    expect(onPageChange).not.toHaveBeenCalled();

    /* Settling with fewer rows clamps once and warns */
    rerender(
      <Harness page={3} data={makeRows(1)} totalRows={3} isLoading={false} />,
    );
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(warnSpy).toHaveBeenCalledWith(
      "[Aksel]",
      expect.stringContaining("controlled page 3 is out of range"),
    );

    /* Re-rendering with the same out-of-range page does not fire a duplicate clamp */
    rerender(
      <Harness page={3} data={makeRows(1)} totalRows={3} isLoading={false} />,
    );
    expect(onPageChange).toHaveBeenCalledTimes(1);
  });

  test("preserves requested page when initial non-loading totalRows is 0 before rows arrive", () => {
    const onPageChange = vi.fn();

    function Harness({
      totalRows,
      data,
    }: {
      totalRows: number;
      data: TestRow[];
    }) {
      const pagination = useDataGridPagination({
        page: 3,
        onPageChange,
        pageSize: 2,
        totalRows,
      });

      return (
        <DataGrid
          columns={TEST_COLUMNS}
          data={data}
          getRowId={(r) => r.id}
          plugins={{ pagination }}
        >
          <PaginationContextProbe />
        </DataGrid>
      );
    }

    const { rerender } = render(<Harness totalRows={0} data={[]} />);
    expect(onPageChange).not.toHaveBeenCalled();

    rerender(<Harness totalRows={8} data={makeRows(2)} />);
    expect(screen.getByTestId("probe").textContent).toBe(
      "page=3,pageCount=4,from=5,to=6,total=8,size=2",
    );
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test("emits dev warnings for invalid pageSizeOptions, missing pageSize, and negative totalRows", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    function Harness(props: UseDataGridPaginationConfig) {
      const pagination = useDataGridPagination(props);
      return (
        <DataGrid columns={TEST_COLUMNS} data={[]} plugins={{ pagination }}>
          <div />
        </DataGrid>
      );
    }

    render(
      <Harness
        page={1}
        onPageChange={() => {}}
        pageSize={15}
        onPageSizeChange={() => {}}
        pageSizeOptions={[10, 10, -5]}
        totalRows={-1}
      />,
    );

    const messages = warnSpy.mock.calls.map((args) => args.join(" "));
    expect(messages.some((m) => m.includes("unique values"))).toBe(true);
    expect(messages.some((m) => m.includes("positive integers"))).toBe(true);
    expect(
      messages.some((m) => m.includes("missing from `pageSizeOptions`")),
    ).toBe(true);
    expect(messages.some((m) => m.includes("must not be negative"))).toBe(true);
  });

  test("isolates nested non-paginated DataGrid from outer pagination context", () => {
    function Harness() {
      const pagination = useDataGridPagination({
        page: 1,
        onPageChange: () => {},
        pageSize: 10,
        totalRows: 30,
      });

      return (
        <DataGrid
          columns={TEST_COLUMNS}
          data={makeRows(10)}
          plugins={{ pagination }}
        >
          <PaginationContextProbe testId="outer" />
          <DataGrid columns={TEST_COLUMNS} data={makeRows(2)}>
            <PaginationContextProbe testId="inner" />
            <DataGrid.Table aria-label="Inner" />
          </DataGrid>
        </DataGrid>
      );
    }

    render(<Harness />);
    expect(screen.getByTestId("outer").textContent).toContain("page=1");
    expect(screen.getByTestId("inner").textContent).toBe("none");
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  test("does not remount children when bar visibility or position changes", () => {
    const onMount = vi.fn();

    function MountTracker() {
      useEffect(() => {
        onMount();
      }, []);
      return <div data-testid="tracked" />;
    }

    function Harness() {
      const [position, setPosition] =
        useState<UseDataGridPaginationConfig["position"]>("below");
      const [totalRows, setTotalRows] = useState(30);

      const pagination = useDataGridPagination({
        page: 1,
        onPageChange: () => {},
        pageSize: 10,
        totalRows,
        position,
      });

      return (
        <>
          <button type="button" onClick={() => setPosition("both")}>
            Both
          </button>
          <button type="button" onClick={() => setPosition("none")}>
            None
          </button>
          <button type="button" onClick={() => setTotalRows(5)}>
            Single page
          </button>
          <DataGrid
            columns={TEST_COLUMNS}
            data={makeRows(5)}
            plugins={{ pagination }}
          >
            <MountTracker />
          </DataGrid>
        </>
      );
    }

    render(<Harness />);
    expect(onMount).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole("button", { name: "Both" }));
    fireEvent.click(screen.getByRole("button", { name: "None" }));
    fireEvent.click(screen.getByRole("button", { name: "Single page" }));

    expect(onMount).toHaveBeenCalledTimes(1);
  });

  test("renders pagination bars around DataGrid.Table instead of outside sibling toolbar/footer", () => {
    const allRows = makeRows(30);

    function Harness() {
      const pagination = useDataGridPagination({
        page: 1,
        onPageChange: () => {},
        pageSize: 10,
        totalRows: allRows.length,
        position: "both",
      });

      return (
        <DataGrid
          columns={TEST_COLUMNS}
          data={paginateData(allRows, 1, 10)}
          getRowId={(r) => r.id}
          plugins={{ pagination }}
        >
          <div data-testid="toolbar">Toolbar</div>
          <DataGrid.Table aria-label="Personer" />
          <div data-testid="footer">Footer</div>
        </DataGrid>
      );
    }

    render(<Harness />);

    const toolbar = screen.getByTestId("toolbar");
    const topNav = screen.getByRole("navigation", {
      name: "Sidenavigering (øverst)",
    });
    const table = screen.getByRole("table", { name: "Personer" });
    const bottomNav = screen.getByRole("navigation", {
      name: "Sidenavigering (nederst)",
    });
    const footer = screen.getByTestId("footer");

    /* Order: toolbar -> top pagination -> table -> bottom pagination -> footer */
    expect(toolbar.compareDocumentPosition(topNav)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(topNav.compareDocumentPosition(table)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(table.compareDocumentPosition(bottomNav)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(bottomNav.compareDocumentPosition(footer)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});

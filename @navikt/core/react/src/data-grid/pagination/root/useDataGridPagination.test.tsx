import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import {
  type DataGridPaginationRows,
  useDataGridPagination,
} from "./useDataGridPagination";

describe("useDataGridPagination", () => {
  test("preserves uncontrolled page and summary across loading, then clamps once when rows shrink", () => {
    const onPageChange = vi.fn();

    const { result, rerender } = renderHook(
      ({ rowCount, isLoading }: { rowCount: number; isLoading: boolean }) =>
        useDataGridPagination({
          pagination: {
            defaultPage: 2,
            defaultPageSize: 2,
            pageSizeOptions: [2],
            onPageChange,
          },
          rows: { mode: "client", rowCount },
          isLoading,
        }),
      { initialProps: { rowCount: 0, isLoading: true } },
    );

    expect(onPageChange).not.toHaveBeenCalled();

    rerender({ rowCount: 5, isLoading: false });
    expect(result.current.state).toMatchObject({
      page: 2,
      pageCount: 3,
      from: 5,
      to: 5,
      totalRows: 5,
    });
    expect(onPageChange).not.toHaveBeenCalled();

    /* Reloading with empty rows keeps previous summary and does not clamp */
    rerender({ rowCount: 0, isLoading: true });
    expect(result.current.state).toMatchObject({
      from: 5,
      to: 5,
      totalRows: 5,
    });
    expect(onPageChange).not.toHaveBeenCalled();

    /* Completing load with fewer rows clamps once without setting announce target */
    rerender({ rowCount: 3, isLoading: false });
    expect(result.current.state).toMatchObject({
      page: 1,
      pageCount: 2,
      from: 3,
      to: 3,
      totalRows: 3,
    });
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(result.current.announceTargetRef.current).toBeNull();
  });

  test("preserves controlled server page and summary while fetching, and warns once when out of range", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const onPageChange = vi.fn();

    const { result, rerender } = renderHook(
      ({
        page,
        pageRowCount,
        totalRows,
        isLoading,
      }: {
        page: number;
        pageRowCount: number;
        totalRows: number;
        isLoading: boolean;
      }) =>
        useDataGridPagination({
          pagination: {
            page,
            defaultPageSize: 2,
            pageSizeOptions: [2],
            onPageChange,
          },
          rows: { mode: "server", pageRowCount, totalRows },
          isLoading,
        }),
      {
        initialProps: {
          page: 2,
          pageRowCount: 1,
          totalRows: 5,
          isLoading: false,
        },
      },
    );

    expect(result.current.state).toMatchObject({
      page: 2,
      from: 5,
      to: 5,
      totalRows: 5,
    });

    /* Navigating to previous page while fetching empty data keeps previous summary */
    act(() => result.current.state.setPage(1));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(result.current.announceTargetRef.current).toEqual({
      page: 1,
      pageSize: 2,
    });

    rerender({ page: 1, pageRowCount: 0, totalRows: 5, isLoading: true });
    expect(result.current.state).toMatchObject({
      page: 1,
      from: 5,
      to: 5,
      totalRows: 5,
    });

    rerender({ page: 1, pageRowCount: 2, totalRows: 5, isLoading: false });
    expect(result.current.state).toMatchObject({
      page: 1,
      from: 3,
      to: 4,
      totalRows: 5,
    });

    /* Shrinking totalRows below controlled page warns and requests clamped page once */
    onPageChange.mockClear();
    rerender({ page: 2, pageRowCount: 0, totalRows: 3, isLoading: false });
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(warnSpy).toHaveBeenCalledWith(
      "[Aksel]",
      expect.stringContaining("controlled page 2 is out of range"),
    );

    warnSpy.mockRestore();
  });

  test("preserves page when initial non-loading data is empty before rows arrive", () => {
    const onPageChange = vi.fn();

    const { result, rerender } = renderHook(
      ({ rows }: { rows: DataGridPaginationRows }) =>
        useDataGridPagination({
          pagination: {
            page: 3,
            defaultPageSize: 2,
            pageSizeOptions: [2],
            onPageChange,
          },
          rows,
          isLoading: false,
        }),
      { initialProps: { rows: { mode: "client", rowCount: 0 } } },
    );

    expect(result.current.state).toMatchObject({
      page: 0,
      pageCount: 1,
      from: 0,
      to: 0,
    });
    expect(onPageChange).not.toHaveBeenCalled();

    rerender({ rows: { mode: "client", rowCount: 8 } });
    expect(result.current.state).toMatchObject({
      page: 3,
      pageCount: 4,
      from: 7,
      to: 8,
    });
    expect(onPageChange).not.toHaveBeenCalled();
  });
});

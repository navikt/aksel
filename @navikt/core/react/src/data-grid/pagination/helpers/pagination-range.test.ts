import { describe, expect, test } from "vitest";
import { getPaginationRange } from "./pagination-range";

describe("getPaginationRange", () => {
  test("calculates the range and page count for a known total", () => {
    expect(
      getPaginationRange({
        page: 1,
        pageSize: 10,
        mode: "server",
        pageRowCount: 10,
        totalRows: 25,
      }),
    ).toEqual({
      page: 1,
      pageCount: 3,
      from: 11,
      to: 20,
      startIndex: 10,
      endIndex: 20,
      canPrevious: true,
      canNext: true,
    });
  });

  test("uses hasNextPage when the total is unknown", () => {
    expect(
      getPaginationRange({
        page: 2,
        pageSize: 10,
        mode: "server",
        pageRowCount: 4,
        hasNextPage: false,
      }),
    ).toEqual({
      page: 2,
      pageCount: undefined,
      from: 21,
      to: 24,
      startIndex: 20,
      endIndex: 24,
      canPrevious: true,
      canNext: false,
    });
  });

  test("returns one page and an empty range for zero known rows", () => {
    expect(
      getPaginationRange({
        page: 0,
        pageSize: 10,
        mode: "server",
        pageRowCount: 0,
        totalRows: 0,
      }),
    ).toEqual({
      page: 0,
      pageCount: 1,
      from: 0,
      to: 0,
      startIndex: 0,
      endIndex: 0,
      canPrevious: false,
      canNext: false,
    });
  });

  test("returns an empty range for an unknown-total page without data", () => {
    expect(
      getPaginationRange({
        page: 3,
        pageSize: 10,
        mode: "server",
        pageRowCount: 0,
        hasNextPage: true,
      }),
    ).toEqual({
      page: 3,
      pageCount: undefined,
      from: 0,
      to: 0,
      startIndex: 30,
      endIndex: 30,
      canPrevious: true,
      canNext: true,
    });
  });

  test("clamps negative unknown-total pages to zero", () => {
    expect(
      getPaginationRange({
        page: -1,
        pageSize: 10,
        mode: "server",
        pageRowCount: 3,
        hasNextPage: true,
      }),
    ).toEqual({
      page: 0,
      pageCount: undefined,
      from: 1,
      to: 3,
      startIndex: 0,
      endIndex: 3,
      canPrevious: false,
      canNext: true,
    });
  });

  test("limits the range on the last partial page", () => {
    expect(
      getPaginationRange({
        page: 2,
        pageSize: 10,
        mode: "server",
        pageRowCount: 5,
        totalRows: 25,
      }),
    ).toEqual({
      page: 2,
      pageCount: 3,
      from: 21,
      to: 25,
      startIndex: 20,
      endIndex: 25,
      canPrevious: true,
      canNext: false,
    });
  });

  test("clamps an out-of-range page before calculating the range", () => {
    expect(
      getPaginationRange({
        page: 4,
        pageSize: 10,
        mode: "server",
        pageRowCount: 2,
        totalRows: 22,
      }),
    ).toEqual({
      page: 2,
      pageCount: 3,
      from: 21,
      to: 22,
      startIndex: 20,
      endIndex: 22,
      canPrevious: true,
      canNext: false,
    });
  });

  test("ends the slice at the known total when the page reports extra rows", () => {
    expect(
      getPaginationRange({
        mode: "server",
        page: 2,
        pageSize: 10,
        pageRowCount: 10,
        totalRows: 25,
      }),
    ).toMatchObject({ from: 21, to: 25, startIndex: 20, endIndex: 25 });
  });

  describe("client mode", () => {
    test("derives the page slice from the total row count", () => {
      expect(
        getPaginationRange({
          mode: "client",
          page: 2,
          pageSize: 10,
          rowCount: 25,
        }),
      ).toEqual({
        page: 2,
        pageCount: 3,
        from: 21,
        to: 25,
        startIndex: 20,
        endIndex: 25,
        canPrevious: true,
        canNext: false,
      });
    });

    test("clamps the page when rows shrink", () => {
      expect(
        getPaginationRange({
          mode: "client",
          page: 4,
          pageSize: 10,
          rowCount: 12,
        }),
      ).toMatchObject({
        page: 1,
        from: 11,
        to: 12,
        startIndex: 10,
        endIndex: 12,
      });
    });

    test("returns an empty first page without rows", () => {
      expect(
        getPaginationRange({
          mode: "client",
          page: 3,
          pageSize: 10,
          rowCount: 0,
        }),
      ).toMatchObject({
        page: 0,
        pageCount: 1,
        from: 0,
        to: 0,
        startIndex: 0,
        endIndex: 0,
        canNext: false,
      });
    });
  });
});

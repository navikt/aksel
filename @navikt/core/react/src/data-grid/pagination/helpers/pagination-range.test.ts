import { describe, expect, test } from "vitest";
import { getPaginationRange } from "./pagination-range";

describe("getPaginationRange", () => {
  test("calculates the range and page count for a known total", () => {
    expect(
      getPaginationRange({
        page: 1,
        pageSize: 10,
        data: Array.from({ length: 10 }),
        totalRows: 25,
      }),
    ).toEqual({
      page: 1,
      pageCount: 3,
      from: 11,
      to: 20,
      canPrevious: true,
      canNext: true,
    });
  });

  test("uses hasNextPage when the total is unknown", () => {
    expect(
      getPaginationRange({
        page: 2,
        pageSize: 10,
        data: Array.from({ length: 4 }),
        hasNextPage: false,
      }),
    ).toEqual({
      page: 2,
      pageCount: undefined,
      from: 21,
      to: 24,
      canPrevious: true,
      canNext: false,
    });
  });

  test("returns one page and an empty range for zero known rows", () => {
    expect(
      getPaginationRange({
        page: 0,
        pageSize: 10,
        data: [],
        totalRows: 0,
      }),
    ).toEqual({
      page: 0,
      pageCount: 1,
      from: 0,
      to: 0,
      canPrevious: false,
      canNext: false,
    });
  });

  test("returns an empty range for an unknown-total page without data", () => {
    expect(
      getPaginationRange({
        page: 3,
        pageSize: 10,
        data: [],
        hasNextPage: true,
      }),
    ).toEqual({
      page: 3,
      pageCount: undefined,
      from: 0,
      to: 0,
      canPrevious: true,
      canNext: true,
    });
  });

  test("clamps negative unknown-total pages to zero", () => {
    expect(
      getPaginationRange({
        page: -1,
        pageSize: 10,
        data: Array.from({ length: 3 }),
        hasNextPage: true,
      }),
    ).toEqual({
      page: 0,
      pageCount: undefined,
      from: 1,
      to: 3,
      canPrevious: false,
      canNext: true,
    });
  });

  test("limits the range on the last partial page", () => {
    expect(
      getPaginationRange({
        page: 2,
        pageSize: 10,
        data: Array.from({ length: 5 }),
        totalRows: 25,
      }),
    ).toEqual({
      page: 2,
      pageCount: 3,
      from: 21,
      to: 25,
      canPrevious: true,
      canNext: false,
    });
  });

  test("clamps an out-of-range page before calculating the range", () => {
    expect(
      getPaginationRange({
        page: 4,
        pageSize: 10,
        data: Array.from({ length: 2 }),
        totalRows: 22,
      }),
    ).toEqual({
      page: 2,
      pageCount: 3,
      from: 21,
      to: 22,
      canPrevious: true,
      canNext: false,
    });
  });
});

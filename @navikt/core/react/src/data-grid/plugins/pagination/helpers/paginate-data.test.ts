import { describe, expect, test } from "vitest";
import { paginateData } from "./paginate-data";

const ROWS = Array.from({ length: 25 }, (_, i) => i + 1);

describe("paginateData", () => {
  test("slices rows for 1-based pages and partial last page", () => {
    expect(paginateData(ROWS, 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(paginateData(ROWS, 2, 10)).toEqual([
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
    expect(paginateData(ROWS, 3, 10)).toEqual([21, 22, 23, 24, 25]);
  });

  test("returns an empty array for empty data or out-of-range page", () => {
    expect(paginateData([], 1, 10)).toEqual([]);
    expect(paginateData(ROWS, 4, 10)).toEqual([]);
  });

  test("sanitizes zero, negative, fractional, and non-finite page values", () => {
    expect(paginateData(ROWS, 0, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(paginateData(ROWS, -2, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(paginateData(ROWS, Number.NaN, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(paginateData(ROWS, Number.POSITIVE_INFINITY, 5)).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(paginateData(ROWS, Number.NEGATIVE_INFINITY, 5)).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(paginateData(ROWS, 2.9, 5)).toEqual([6, 7, 8, 9, 10]);
  });

  test("sanitizes zero, negative, fractional, and non-finite pageSize values", () => {
    const firstTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(paginateData(ROWS, 1, 0)).toEqual(firstTen);
    expect(paginateData(ROWS, 1, 0.5)).toEqual(firstTen);
    expect(paginateData(ROWS, 2, -5)).toEqual([
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ]);
    expect(paginateData(ROWS, 1, 3.8)).toEqual([1, 2, 3]);
    expect(paginateData(ROWS, 1, Number.NaN)).toEqual(firstTen);
    expect(paginateData(ROWS, 1, Number.POSITIVE_INFINITY)).toEqual(firstTen);
    expect(paginateData(ROWS, 1, Number.NEGATIVE_INFINITY)).toEqual(firstTen);
  });
});

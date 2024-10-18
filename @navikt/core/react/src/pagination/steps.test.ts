import { describe, expect, test } from "vitest";
import { getSteps } from "./Pagination";

describe("getSteps", () => {
  test("lists all pages when count is <= 7", () => {
    const count = 5;
    expect(getSteps({ page: 1, count })).toEqual(
      Array.from({ length: count }, (_, i) => i + 1),
    );
  });

  test("has an end ellipsis when count >= 8", () => {
    const count = 8;
    const page = 3;
    expect(
      getSteps({
        page,
        count,
      }),
    ).toEqual([1, 2, 3, 4, 5, "ellipsis", count]);
  });

  test("has a start ellipsis when count - page >= 3", () => {
    const count = 8;
    const page = 5;
    expect(
      getSteps({
        page,
        count,
      }),
    ).toEqual([
      1,
      "ellipsis",
      count - 4,
      count - 3,
      count - 2,
      count - 1,
      count,
    ]);
  });

  test("has start & end ellipsis when count is high", () => {
    const count = 9;
    const page = 5;
    expect(
      getSteps({
        page,
        count,
      }),
    ).toEqual([1, "ellipsis", page - 1, page, page + 1, "ellipsis", count]);
  });

  test("can have a reduced siblingCount", () => {
    const count = 7;
    const page = 4;
    expect(
      getSteps({
        page,
        count,
        siblingCount: 0,
      }),
    ).toEqual([1, "ellipsis", page, "ellipsis", count]);
  });

  test("can have an increased siblingCount", () => {
    const count = 11;
    const page = 6;
    expect(
      getSteps({
        page,
        count,
        siblingCount: 2,
      }),
    ).toEqual([
      1,
      "ellipsis",
      page - 2,
      page - 1,
      page,
      page + 1,
      page + 2,
      "ellipsis",
      count,
    ]);
  });

  test("can have an reduced boundaryCount", () => {
    const count = 7;
    const page = 4;
    expect(
      getSteps({
        page,
        count,
        boundaryCount: 0,
      }),
    ).toEqual(["ellipsis", page - 1, page, page + 1, "ellipsis"]);
  });

  test("can have an increased boundaryCount", () => {
    const count = 11;
    const page = 6;
    expect(
      getSteps({
        page,
        count,
        boundaryCount: 2,
      }),
    ).toEqual([
      1,
      2,
      "ellipsis",
      page - 1,
      page,
      page + 1,
      "ellipsis",
      count - 1,
      count,
    ]);
  });
});

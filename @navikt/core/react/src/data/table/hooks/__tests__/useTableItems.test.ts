import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useTableItems } from "../useTableItems";

type TestRow = {
  id: string;
  name: string;
  subRows?: TestRow[];
};

type FallbackTestRow = {
  label: string;
  subRows?: FallbackTestRow[];
};

const plainRows: TestRow[] = [
  { id: "a", name: "Alpha" },
  { id: "b", name: "Beta" },
];

const nestedRows: TestRow[] = [
  {
    id: "a",
    name: "Alpha",
    subRows: [
      { id: "a1", name: "Alpha child 1" },
      {
        id: "a2",
        name: "Alpha child 2",
        subRows: [{ id: "a2a", name: "Alpha grandchild" }],
      },
    ],
  },
  {
    id: "b",
    name: "Beta",
    subRows: [{ id: "b1", name: "Beta child 1" }],
  },
];

const fallbackRows: FallbackTestRow[] = [
  {
    label: "Parent",
    subRows: [{ label: "Child" }],
  },
];

const getSubRows = (row: TestRow) => row.subRows ?? [];

const getVisibleIds = (rows: TestRow[]) => rows.map((row) => row.id);

describe("useTableItems", () => {
  test("builds row details for plain rows without nesting", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: plainRows,
        getRowId: (row) => row.id,
      }),
    );

    expect(getVisibleIds(result.current.items)).toEqual(["a", "b"]);
    expect(result.current.itemDetails.get(plainRows[0])).toMatchObject({
      id: "a",
      level: 0,
      parent: null,
      children: [],
    });
    expect(result.current.itemDetails.get(plainRows[1])).toMatchObject({
      id: "b",
      level: 0,
      parent: null,
      children: [],
    });
  });

  test("shows direct child rows when a parent row is expanded", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: nestedRows,
        getRowId: (row) => row.id,
        getSubRows,
        defaultExpandedSubRowIds: ["a"],
      }),
    );

    expect(getVisibleIds(result.current.items)).toEqual(["a", "a1", "a2", "b"]);
  });

  test("uses the same fallback root id to reveal child rows when getRowId is omitted", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: fallbackRows,
        getSubRows: (row) => row.subRows ?? [],
        defaultExpandedSubRowIds: [0],
      }),
    );

    expect(result.current.items.map((row) => row.label)).toEqual([
      "Parent",
      "Child",
    ]);
  });

  test("updates visible rows in depth-first order for controlled expanded ids", () => {
    const { result, rerender } = renderHook(
      ({ expandedIds }) =>
        useTableItems({
          items: nestedRows,
          getRowId: (row) => row.id,
          getSubRows,
          expandedSubRowIds: expandedIds,
        }),
      {
        initialProps: { expandedIds: [] as (string | number)[] },
      },
    );

    expect(getVisibleIds(result.current.items)).toEqual(["a", "b"]);

    rerender({ expandedIds: ["a", "a2", "b"] });

    expect(getVisibleIds(result.current.items)).toEqual([
      "a",
      "a1",
      "a2",
      "a2a",
      "b",
      "b1",
    ]);
  });
});

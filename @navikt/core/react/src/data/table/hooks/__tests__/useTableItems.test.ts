import { renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import type { TableRowEntryId } from "../../root/DataGridTable.types";
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

const duplicatedRowObject: TestRow = {
  id: "shared",
  name: "Shared",
  subRows: [{ id: "shared-child", name: "Child" }],
};

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
    expect(result.current.itemDetails.get("a")).toMatchObject({
      id: "a",
      rowData: plainRows[0],
      level: 0,
      parentId: null,
      children: [],
    });
    expect(result.current.itemDetails.get("b")).toMatchObject({
      id: "b",
      rowData: plainRows[1],
      level: 0,
      parentId: null,
      children: [],
    });
  });

  test("shows direct child rows when a parent row is expanded", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: nestedRows,
        getRowId: (row) => row.id,
        subRows: {
          getRows: getSubRows,
          defaultExpandedRowIds: ["a"],
        },
      }),
    );

    expect(getVisibleIds(result.current.items)).toEqual(["a", "a1", "a2", "b"]);
  });

  test("collects direct child row ids even when nested rows are collapsed", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: nestedRows,
        getRowId: (row) => row.id,
        subRows: { getRows: getSubRows },
      }),
    );

    expect(result.current.childRowIdsById.get("a")).toEqual(["a1", "a2"]);
    expect(result.current.childRowIdsById.get("a2")).toEqual(["a2a"]);
    expect(result.current.childRowIdsById.get("b")).toEqual(["b1"]);
  });

  test("uses unique fallback ids to reveal child rows when getRowId is omitted", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: fallbackRows,
        subRows: {
          getRows: (row: any) => row.subRows ?? [],
          defaultExpandedRowIds: ["0"],
        },
      }),
    );

    expect(result.current.items.map((row) => row.label)).toEqual([
      "Parent",
      "Child",
    ]);
    expect(result.current.childRowIdsById.get("0")).toEqual(["0.0"]);
  });

  test("updates visible rows in depth-first order for controlled expanded ids", () => {
    const { result, rerender } = renderHook(
      ({ expandedIds }) =>
        useTableItems({
          items: nestedRows,
          getRowId: (row) => row.id,
          subRows: {
            getRows: getSubRows,
            expandedRowIds: expandedIds,
          },
        }),
      {
        initialProps: { expandedIds: [] as TableRowEntryId[] },
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

  test("tracks duplicated row objects by row id instead of object identity", () => {
    const { result } = renderHook(() =>
      useTableItems({
        items: [duplicatedRowObject, duplicatedRowObject],
        subRows: {
          getRows: getSubRows,
          defaultExpandedRowIds: ["0"],
        },
      }),
    );

    expect(result.current.visibleRowIds).toEqual(["0", "0.0", "1"]);
    expect(getVisibleIds(result.current.items)).toEqual([
      "shared",
      "shared-child",
      "shared",
    ]);
    expect(result.current.itemDetails.get("0")).toMatchObject({
      id: "0",
      rowData: duplicatedRowObject,
      parentId: null,
      children: ["0.0"],
    });
    expect(result.current.itemDetails.get("1")).toMatchObject({
      id: "1",
      rowData: duplicatedRowObject,
      parentId: null,
      children: ["1.0"],
    });
  });
});

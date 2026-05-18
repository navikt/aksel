import { describe, expect, test } from "vitest";
import type { TableRowEntryId } from "../../root/DataGridTable.types";
import type { ItemDetail } from "../collectTableRowEntries";
import { mutateRowSelection } from "./selection.utils";

function makeItemDetails<T>(
  entries: { id: TableRowEntryId; rowData: T }[],
): Map<TableRowEntryId, ItemDetail<T>> {
  return new Map(
    entries.map(({ id, rowData }) => [
      id,
      { id, rowData, level: 0, parentId: null, children: [] },
    ]),
  );
}

describe("mutateRowSelection", () => {
  test("adds rowId to set when checked", () => {
    const set = new Set<TableRowEntryId>();
    const itemDetails = makeItemDetails([{ id: "a", rowData: {} }]);
    const changed = mutateRowSelection({
      selectedRowIds: set,
      rowId: "a",
      checked: true,
      childRowIdsById: new Map(),
      itemDetails,
    });
    expect(set.has("a")).toBe(true);
    expect(changed).toBe(true);
  });

  test("removes rowId from set when unchecked", () => {
    const set = new Set<TableRowEntryId>(["a"]);
    const itemDetails = makeItemDetails([{ id: "a", rowData: {} }]);
    const changed = mutateRowSelection({
      selectedRowIds: set,
      rowId: "a",
      checked: false,
      childRowIdsById: new Map(),
      itemDetails,
    });
    expect(set.has("a")).toBe(false);
    expect(changed).toBe(true);
  });

  test("returns false and does not mutate when row is already in desired state", () => {
    const set = new Set<TableRowEntryId>(["a"]);
    const itemDetails = makeItemDetails([{ id: "a", rowData: {} }]);
    const changed = mutateRowSelection({
      selectedRowIds: set,
      rowId: "a",
      checked: true,
      childRowIdsById: new Map(),
      itemDetails,
    });
    expect(set.size).toBe(1);
    expect(changed).toBe(false);
  });

  test("recursively selects all children", () => {
    const set = new Set<TableRowEntryId>();
    const itemDetails = makeItemDetails([
      { id: "parent", rowData: {} },
      { id: "child1", rowData: {} },
      { id: "child2", rowData: {} },
    ]);
    const childRowIdsById = new Map<TableRowEntryId, TableRowEntryId[]>([
      ["parent", ["child1", "child2"]],
    ]);
    mutateRowSelection({
      selectedRowIds: set,
      rowId: "parent",
      checked: true,
      childRowIdsById,
      itemDetails,
    });
    expect(set).toEqual(new Set(["parent", "child1", "child2"]));
  });

  test("recursively deselects all children", () => {
    const set = new Set<TableRowEntryId>(["parent", "child1", "child2"]);
    const itemDetails = makeItemDetails([
      { id: "parent", rowData: {} },
      { id: "child1", rowData: {} },
      { id: "child2", rowData: {} },
    ]);
    const childRowIdsById = new Map<TableRowEntryId, TableRowEntryId[]>([
      ["parent", ["child1", "child2"]],
    ]);
    mutateRowSelection({
      selectedRowIds: set,
      rowId: "parent",
      checked: false,
      childRowIdsById,
      itemDetails,
    });
    expect(set.size).toBe(0);
  });

  test("handles deeply nested children", () => {
    const set = new Set<TableRowEntryId>();
    const itemDetails = makeItemDetails([
      { id: "a", rowData: {} },
      { id: "a1", rowData: {} },
      { id: "a1a", rowData: {} },
    ]);
    const childRowIdsById = new Map<TableRowEntryId, TableRowEntryId[]>([
      ["a", ["a1"]],
      ["a1", ["a1a"]],
    ]);
    mutateRowSelection({
      selectedRowIds: set,
      rowId: "a",
      checked: true,
      childRowIdsById,
      itemDetails,
    });
    expect(set).toEqual(new Set(["a", "a1", "a1a"]));
  });

  test("skips disabled rows and their children", () => {
    const set = new Set<TableRowEntryId>();
    const itemDetails = makeItemDetails([
      { id: "parent", rowData: { disabled: false } },
      { id: "child1", rowData: { disabled: true } },
      { id: "child1a", rowData: { disabled: false } },
      { id: "child2", rowData: { disabled: false } },
    ]);
    const childRowIdsById = new Map<TableRowEntryId, TableRowEntryId[]>([
      ["parent", ["child1", "child2"]],
      ["child1", ["child1a"]],
    ]);
    mutateRowSelection({
      selectedRowIds: set,
      rowId: "parent",
      checked: true,
      childRowIdsById,
      itemDetails,
      enableRowSelection: ({ row }) => !row.disabled,
    });
    expect(set.has("parent")).toBe(true);
    expect(set.has("child1")).toBe(false);
    expect(set.has("child1a")).toBe(true);
    expect(set.has("child2")).toBe(true);
  });

  test("returns false when all matching rows were already disabled", () => {
    const set = new Set<TableRowEntryId>();
    const itemDetails = makeItemDetails([{ id: "a", rowData: {} }]);
    const changed = mutateRowSelection({
      selectedRowIds: set,
      rowId: "a",
      checked: true,
      childRowIdsById: new Map(),
      itemDetails,
      enableRowSelection: false,
    });
    expect(set.size).toBe(0);
    expect(changed).toBe(false);
  });
});

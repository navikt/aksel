import { describe, expect, test } from "vitest";
import { SelectionSubtreeHelper } from "./SelectionSubtreeHelper";

const childRowIdsById = new Map<string | number, (string | number)[]>([
  ["a", ["a1", "a2"]],
  ["a1", []],
  ["a2", ["a2a"]],
  ["a2a", []],
  ["b", []],
]);

describe("SelectionSubtreeHelper", () => {
  test("returns selectable subtree keys without duplicates", () => {
    const helper = new SelectionSubtreeHelper({
      childRowIdsById,
      disabledKeysSet: new Set(["a2"]),
      selectedKeysSet: new Set(),
    });

    expect(helper.getSelectableKeys(["a", "a1"])).toEqual(["a", "a1", "a2a"]);
  });

  test("returns cached subtree selection stats", () => {
    const helper = new SelectionSubtreeHelper({
      childRowIdsById,
      disabledKeysSet: new Set(["a2"]),
      selectedKeysSet: new Set(["a", "a1", "a2a"]),
    });

    const firstStats = helper.getSelectionStats("a");
    const secondStats = helper.getSelectionStats("a");

    expect(firstStats).toEqual({ selectableCount: 3, selectedCount: 3 });
    expect(secondStats).toBe(firstStats);
    expect(helper.isFullySelected("a")).toBe(true);
  });

  test("handles deep trees iteratively", () => {
    const depth = 12000;
    const deepChildRowIdsById = new Map<string | number, (string | number)[]>();
    const selectedKeysSet = new Set<string | number>();

    for (let index = 0; index < depth; index++) {
      const key = `node-${index}`;
      const childKey = `node-${index + 1}`;

      deepChildRowIdsById.set(key, index === depth - 1 ? [] : [childKey]);

      if (index % 2 === 0) {
        selectedKeysSet.add(key);
      }
    }

    const helper = new SelectionSubtreeHelper({
      childRowIdsById: deepChildRowIdsById,
      disabledKeysSet: new Set(),
      selectedKeysSet,
    });

    expect(helper.getSelectableKeys(["node-0"])).toHaveLength(depth);
    expect(helper.getSelectionStats("node-0")).toEqual({
      selectableCount: depth,
      selectedCount: Math.ceil(depth / 2),
    });
  });
});

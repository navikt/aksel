import { describe, expect, test } from "vitest";
import { getValidRenderArray } from "../valid-array";

describe("getValidRenderArray", () => {
  test("returns null for undefined input", () => {
    expect(getValidRenderArray(undefined)).toBeNull();
  });

  test("returns null for null input", () => {
    expect(getValidRenderArray(null)).toBeNull();
  });

  test("returns null for empty array", () => {
    expect(getValidRenderArray([])).toBeNull();
  });

  test("returns null for array with only null values", () => {
    expect(getValidRenderArray([null, null])).toBeNull();
  });

  test("returns null for array with only undefined values", () => {
    expect(getValidRenderArray([undefined, undefined])).toBeNull();
  });

  test("returns null for array with mixed nullish values", () => {
    expect(getValidRenderArray([null, undefined, null])).toBeNull();
  });

  test("returns valid items from array with strings", () => {
    expect(getValidRenderArray(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  });

  test("returns valid items from array with numbers", () => {
    expect(getValidRenderArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("filters out null values from mixed array", () => {
    expect(getValidRenderArray(["a", null, "b"])).toEqual(["a", "b"]);
  });

  test("filters out undefined values from mixed array", () => {
    expect(getValidRenderArray([1, undefined, 2])).toEqual([1, 2]);
  });

  test("filters out both null and undefined from mixed array", () => {
    expect(getValidRenderArray(["x", null, "y", undefined, "z"])).toEqual([
      "x",
      "y",
      "z",
    ]);
  });

  test("preserves falsy but valid values like 0 and empty string", () => {
    expect(getValidRenderArray([0, "", false, null])).toEqual([0, "", false]);
  });

  test("works with object arrays", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    expect(getValidRenderArray([obj1, null, obj2])).toEqual([obj1, obj2]);
  });

  test("returns single item array when only one valid item exists", () => {
    expect(getValidRenderArray([null, "only", undefined])).toEqual(["only"]);
  });
});

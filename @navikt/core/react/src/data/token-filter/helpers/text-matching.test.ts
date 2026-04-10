import { describe, expect, test } from "vitest";
import { matchesFilterText } from "./text-matching";

describe("matchesFilterText", () => {
  describe("basic matching", () => {
    test("returns true for empty filter text", () => {
      expect(matchesFilterText(["hello", "world"], "")).toBe(true);
    });

    test("returns true for whitespace-only filter text", () => {
      expect(matchesFilterText(["hello", "world"], "   ")).toBe(true);
    });

    test("returns true when single word matches", () => {
      expect(matchesFilterText(["hello", "world"], "hello")).toBe(true);
    });

    test("returns true when match is case-insensitive", () => {
      expect(matchesFilterText(["Hello World"], "hello")).toBe(true);
      expect(matchesFilterText(["hello world"], "HELLO")).toBe(true);
    });

    test("returns true when partial match exists", () => {
      expect(matchesFilterText(["testing"], "test")).toBe(true);
    });

    test("returns false when no match exists", () => {
      expect(matchesFilterText(["hello", "world"], "foo")).toBe(false);
    });
  });

  describe("multi-word matching", () => {
    test("returns true when all words match across fields", () => {
      expect(matchesFilterText(["hello", "world"], "hello world")).toBe(true);
    });

    test("returns true when all words match in single field", () => {
      expect(matchesFilterText(["hello world"], "hello world")).toBe(true);
    });

    test("returns true when words match in any order", () => {
      expect(matchesFilterText(["world hello"], "hello world")).toBe(true);
    });

    test("returns false when not all words match", () => {
      expect(matchesFilterText(["hello"], "hello world")).toBe(false);
    });

    test("handles multiple spaces in filter text", () => {
      expect(matchesFilterText(["hello world"], "hello  world")).toBe(true);
    });
  });

  describe("null/undefined handling", () => {
    test("returns false for null searchFieldValues", () => {
      expect(matchesFilterText(null as any, "test")).toBe(false);
    });

    test("returns false for undefined searchFieldValues", () => {
      expect(matchesFilterText(undefined as any, "test")).toBe(false);
    });

    test("returns true for null filterText", () => {
      expect(matchesFilterText(["test"], null as any)).toBe(true);
    });

    test("returns true for undefined filterText", () => {
      expect(matchesFilterText(["test"], undefined as any)).toBe(true);
    });

    test("filters out null values in searchFieldValues", () => {
      expect(matchesFilterText(["hello", null as any, "world"], "world")).toBe(
        true,
      );
    });

    test("filters out undefined values in searchFieldValues", () => {
      expect(
        matchesFilterText(["hello", undefined as any, "world"], "world"),
      ).toBe(true);
    });

    test("returns false when all searchFieldValues are null/undefined", () => {
      expect(matchesFilterText([null as any, undefined as any], "test")).toBe(
        false,
      );
    });
  });

  describe("edge cases", () => {
    test("returns true for empty searchFieldValues with empty filter", () => {
      expect(matchesFilterText([], "")).toBe(true);
    });

    test("returns false for empty searchFieldValues with non-empty filter", () => {
      expect(matchesFilterText([], "test")).toBe(false);
    });

    test("handles special characters in filter text", () => {
      expect(matchesFilterText(["test-value"], "test-value")).toBe(true);
      expect(matchesFilterText(["test.value"], "test.value")).toBe(true);
    });

    test("handles numbers in filter text", () => {
      expect(matchesFilterText(["version 123"], "123")).toBe(true);
    });

    test("handles unicode characters", () => {
      expect(matchesFilterText(["café"], "café")).toBe(true);
      expect(matchesFilterText(["🎉 party"], "party")).toBe(true);
    });

    test("trims whitespace from filter text", () => {
      expect(matchesFilterText(["hello"], "  hello  ")).toBe(true);
    });

    test("handles array with single empty string", () => {
      expect(matchesFilterText([""], "test")).toBe(false);
    });

    test("matches when filter is substring of field", () => {
      expect(matchesFilterText(["prefix-test-suffix"], "test")).toBe(true);
    });
  });
});

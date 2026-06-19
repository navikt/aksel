import { describe, expect, test } from "vitest";
import { searchTokens } from "./search-tokens.js";

describe("searchTokens", () => {
  test("returns first `limit` tokens when no query", () => {
    const results = searchTokens(undefined, 5);

    expect(results).toHaveLength(5);
    expect(results[0]).toHaveProperty("name");
    expect(results[0]).toHaveProperty("category");
  });

  test("returns lightweight summary shape only", () => {
    const [first] = searchTokens(undefined, 1);

    expect(first).toHaveProperty("name");
    expect(first).toHaveProperty("comment");
    expect(first).toHaveProperty("category");
    expect(first).toHaveProperty("type");
    expect(first).not.toHaveProperty("rawValue");
    expect(first).not.toHaveProperty("jsValue");
  });

  test("respects the limit when filtering", () => {
    const results = searchTokens("bg", 3);

    expect(results.length).toBeLessThanOrEqual(3);
  });

  test("fuzzy-matches token names", () => {
    const results = searchTokens("shadow", 10);

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((t) => t.name.toLowerCase().includes("shadow"))).toBe(
      true,
    );
  });
});

import { describe, expect, test } from "vitest";
import { createNodeCache } from "./node-cache.js";

describe("createNodeCache", () => {
  test("should stop caching instead of throwing when maxKeys is reached", () => {
    const { cacheGet, cacheSet } = createNodeCache("test", 60, 2);

    expect(cacheSet("a", "1")).toBe(true);
    expect(cacheSet("b", "2")).toBe(true);
    expect(cacheSet("c", "3")).toBe(false);

    expect(cacheGet("a")).toBe("1");
    expect(cacheGet("c")).toBeUndefined();
  });
});

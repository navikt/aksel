import { describe, expect, test } from "vitest";
import { searchIcons } from "./search-icons.js";

describe("searchIcons", () => {
  test("fuzzy-matches icon names/keywords", () => {
    const results = searchIcons("house");

    expect(results.length).toBeGreaterThan(0);
    expect(results[0]).toHaveProperty("id");
    expect(results[0]).toHaveProperty("name");
  });

  test("returns ranked results (best match first)", () => {
    const results = searchIcons("house");
    const names = results.map((icon) => icon.name.toLowerCase());

    expect(names.some((name) => name.includes("house"))).toBe(true);
  });

  test("returns empty for gibberish", () => {
    expect(searchIcons("zzzqqxnonexistent")).toEqual([]);
  });
});

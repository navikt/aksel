import { describe, expect, test } from "vitest";
import { getAvailableVersions, searchMigrations } from "./search-migrations.js";

describe("searchMigrations", () => {
  test("returns all migrations when no query", () => {
    const all = searchMigrations();

    expect(all.length).toBeGreaterThan(0);
    expect(all[0]).toHaveProperty("name");
    expect(all[0]).toHaveProperty("description");
    expect(all[0]).toHaveProperty("version");
  });

  test("filters to exact version for version-shaped queries", () => {
    const v8 = searchMigrations("v8");

    expect(v8.length).toBeGreaterThan(0);
    expect(v8.every((m) => m.version === "v8")).toBe(true);
  });

  test("normalizes bare numbers to version keys", () => {
    const withV = searchMigrations("v8");
    const withoutV = searchMigrations("8");

    expect(withoutV).toEqual(withV);
  });

  test("does not fuzzy-fall-back for unknown versions", () => {
    expect(searchMigrations("v99")).toEqual([]);
  });

  test("fuzzy-matches codemod names/descriptions", () => {
    const results = searchMigrations("box");

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.some(
        (m) =>
          m.name.toLowerCase().includes("box") ||
          m.description.toLowerCase().includes("box"),
      ),
    ).toBe(true);
  });

  test("getAvailableVersions returns version keys", () => {
    const versions = getAvailableVersions();

    expect(versions.length).toBeGreaterThan(0);
    expect(versions).toContain("v8");
  });
});

import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import {
  getMigrationNames,
  getMigrationPath,
  getVersionKeys,
  migrationStringOverride,
} from "../migrations";

describe("migrations", () => {
  const values = getMigrationNames();
  const paths = values.map((x) => getMigrationPath(x));

  paths.forEach((x) => {
    const checkPath = path.join(
      process.cwd(),
      "dist/codemod",
      `transforms/${x}.js`,
    );
    test(`Check transform-path: ${checkPath}`, () => {
      expect(fs.existsSync(checkPath)).toBeTruthy();
    });
  });

  test("No duplicate migration names", () => {
    expect(new Set(values).size).toEqual(values.length);
  });

  test("No overrides", () => {
    const overrideValues = new Set<string>();
    Object.values(migrationStringOverride).forEach((overrides) => {
      overrides.forEach((override) => {
        overrideValues.add(override.value);
      });
    });

    expect(values.filter((x) => overrideValues.has(x))).toEqual([]);
  });

  test("No global overrides", () => {
    const versionNames = getVersionKeys();

    expect(values.filter((x) => versionNames.includes(x))).toEqual([]);
  });
});

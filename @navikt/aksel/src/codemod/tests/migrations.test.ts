import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { getMigrationNames, getMigrationPath } from "../migrations";

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
});

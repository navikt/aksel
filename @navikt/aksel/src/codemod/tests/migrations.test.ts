import fs from "fs";
import path from "path";
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

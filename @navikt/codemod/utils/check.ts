import fs from "node:fs";
import path from "node:path";

import prettier from "prettier";

const applyTransform = require("jscodeshift/dist/testUtils").applyTransform;

interface TestT {
  fixture: string;
  migration: string;
  extension?: "js" | "scss" | "less" | "css";
  options?: { [option: string]: any };
}

export function check(
  dirName: string,
  { fixture, migration, extension = "js", options = {} }: TestT
) {
  describe(migration, () => {
    it(fixture, async () => {
      const fixtureDir = path.join(dirName);
      const inputPath = path.join(fixtureDir, `${fixture}.input.${extension}`);
      const parser = extension;
      const source = fs.readFileSync(inputPath, "utf8");
      const expected = fs.readFileSync(
        path.join(fixtureDir, `${fixture}.output.${extension}`),
        "utf8"
      );
      // Assumes transform is one level up from tests directory
      const module = await import(path.join(dirName, "..", migration));
      const output = applyTransform({ ...module, parser: "tsx" }, options, {
        source,
      });

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(prettier.format(output, { parser })).toBe(
        prettier.format(expected, { parser })
      );
    });
  });
}

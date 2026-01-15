import { applyTransform } from "jscodeshift/dist/testUtils";
import fs from "node:fs";
import path from "node:path";
// eslint-disable-next-line import/default
import prettier from "prettier";
import { describe, expect, test } from "vitest";

interface TestT {
  fixture: string;
  migration: string;
  extension?: "js" | "scss" | "less" | "css";
  options?: { [option: string]: any };
}

interface ScenarioT {
  migration: string;
  scenarios: Record<string, { input: string; output: string }>;
  extension?: "js" | "scss" | "less" | "css";
  options?: { [option: string]: any };
}

export function check(
  dirName: string,
  { fixture, migration, extension = "js", options = {} }: TestT,
) {
  describe(migration, () => {
    test(fixture, async () => {
      const fixtureDir = path.join(dirName);
      const inputPath = path.join(fixtureDir, `${fixture}.input.${extension}`);
      const parser = extension;
      const source = fs.readFileSync(inputPath, "utf8");
      const expected = fs.readFileSync(
        path.join(fixtureDir, `${fixture}.output.${extension}`),
        "utf8",
      );
      // Assumes transform is one level up from tests directory
      const module = await import(path.join(dirName, "..", migration));
      const output = applyTransform({ ...module, parser: "tsx" }, options, {
        source,
      });

      // Format output and expected with prettier for white spaces and line breaks consistency
      expect(
        await prettier.format(output, {
          parser: parser === "js" ? "typescript" : parser,
        }),
      ).toBe(
        await prettier.format(expected, {
          parser: parser === "js" ? "typescript" : parser,
        }),
      );
    });
  });
}

export function checkScenarios(
  dirName: string,
  { migration, scenarios, extension = "js", options = {} }: ScenarioT,
) {
  describe(migration, () => {
    const parser = extension;
    for (const [name, { input, output: expected }] of Object.entries(
      scenarios,
    )) {
      test(name, async () => {
        const module = await import(path.join(dirName, "..", migration));
        const output = applyTransform({ ...module, parser: "tsx" }, options, {
          source: input,
        });

        expect(
          await prettier.format(output, {
            parser: parser === "js" ? "typescript" : parser,
          }),
        ).toBe(
          await prettier.format(expected, {
            parser: parser === "js" ? "typescript" : parser,
          }),
        );
      });
    }
  });
}

export function checkMoveVariantToDataColor(
  dirName: string,
  {
    migration,
    config,
  }: {
    migration: string;
    config: {
      component: string;
      prop: string;
      changes: Record<string, { replacement?: string; color: string }>;
    };
  },
) {
  const scenarios: Record<string, { input: string; output: string }> = {};

  for (const [variant, change] of Object.entries(config.changes)) {
    const input = `import { ${config.component} } from "@navikt/ds-react";
<${config.component} ${config.prop}="${variant}">Text</${config.component}>;`;

    let outputAttrs = `data-color="${change.color}"`;

    if (change.replacement) {
      outputAttrs += ` ${config.prop}="${change.replacement}"`;
    }

    const output = `import { ${config.component} } from "@navikt/ds-react";
<${config.component} ${outputAttrs}>Text</${config.component}>;`;

    scenarios[`should migrate ${variant}`] = { input, output };
  }

  checkScenarios(dirName, { migration, scenarios });
}

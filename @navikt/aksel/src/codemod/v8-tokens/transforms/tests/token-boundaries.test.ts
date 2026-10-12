/* @ts-expect-error No avaliable types for testUtils */
import { applyTransform } from "jscodeshift/dist/testUtils";
import { describe, expect, test } from "vitest";
import * as jsTransform from "../v8-tokens-js";
import lessTransform from "../v8-tokens-less";
import scssTransform from "../v8-tokens-scss";

/*
 * Fixture tests are compared after Prettier, which hides whitespace bugs.
 * These tests compare the exact output.
 */
const runJs = (source: string) =>
  applyTransform({ ...jsTransform, parser: "tsx" }, {}, { source });

const runStyle = (
  transformer: typeof scssTransform | typeof lessTransform,
  source: string,
) => transformer({ path: "test", source });

describe("v8-tokens-js keeps boundaries intact", () => {
  const importLine = `import { ASurfaceDefault } from "@navikt/ds-tokens/dist/tokens";\n`;
  const expectedImport = `import { BgDefault } from "@navikt/ds-tokens/js";\n`;

  test.each([
    ["return ASurfaceDefault;", "return BgDefault;"],
    ["const a = ASurfaceDefault;", "const a = BgDefault;"],
    ["const a = [ASurfaceDefault];", "const a = [BgDefault];"],
    ["const a = {...ASurfaceDefault};", "const a = {...BgDefault};"],
    // biome-ignore lint/suspicious/noTemplateCurlyInString: Testing token inside template literal
    ["const a = `${ASurfaceDefault}`;", "const a = `${BgDefault}`;"],
  ])("%s", (input, output) => {
    expect(runJs(`${importLine}\n${input}`)).toBe(
      `${expectedImport}\n${output}`,
    );
  });

  test("does not replace inside longer identifiers", () => {
    expect(
      runJs(
        `${importLine}\nconst a = [MyASurfaceDefault, ASurfaceDefault2, $ASurfaceDefault];`,
      ),
    ).toBe(
      `${expectedImport}\nconst a = [MyASurfaceDefault, ASurfaceDefault2, $ASurfaceDefault];`,
    );
  });

  test("replaces aliased imports without touching similar names", () => {
    expect(
      runJs(
        `import { ASurfaceDefault as surf } from "@navikt/ds-tokens/dist/tokens";\n\nconst a = [surf, surface, mysurf];`,
      ),
    ).toBe(`${expectedImport}\nconst a = [BgDefault, surface, mysurf];`);
  });
});

describe("v8-tokens-scss keeps whitespace", () => {
  test.each([
    ["margin: 0 $a-spacing-4;", "margin: 0 $ax-space-16;"],
    ["color: $a-text-default;", "color: $ax-text-neutral;"],
    ["color:$a-text-default;", "color:$ax-text-neutral;"],
    ["$a-text-default", "$ax-text-neutral"],
    ["\n\t$a-text-default", "\n\t$ax-text-neutral"],
    ["color: common.$a-text-default;", "color: common.$ax-text-neutral;"],
    [
      "padding: $a-spacing-4 $a-spacing-4;",
      "padding: $ax-space-16 $ax-space-16;",
    ],
  ])("%s", (input, output) => {
    expect(runStyle(scssTransform, input)).toBe(output);
  });
});

describe("v8-tokens-less keeps whitespace", () => {
  test.each([
    ["margin: 0 @a-spacing-4;", "margin: 0 @ax-space-16;"],
    ["color: @a-text-default;", "color: @ax-text-neutral;"],
    ["color:@a-text-default;", "color:@ax-text-neutral;"],
    [
      "padding: @a-spacing-4 @a-spacing-4;",
      "padding: @ax-space-16 @ax-space-16;",
    ],
  ])("%s", (input, output) => {
    expect(runStyle(lessTransform, input)).toBe(output);
  });
});

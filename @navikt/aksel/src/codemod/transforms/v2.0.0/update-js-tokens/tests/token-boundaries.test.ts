/* @ts-expect-error No avaliable types for testUtils */
import { applyTransform } from "jscodeshift/dist/testUtils";
import { describe, expect, test } from "vitest";
import * as transform from "../update-js-tokens";

const run = (source: string) =>
  applyTransform({ ...transform, parser: "tsx" }, {}, { source });

describe("update-js-tokens keeps boundaries intact", () => {
  test("does not replace inside longer identifiers", () => {
    expect(
      run(
        `import { NavdsGlobalColorGray100 } from "@navikt/ds-tokens/dist/tokens";\n\nconst a = [NavdsGlobalColorGray100, MyNavdsGlobalColorGray100, NavdsGlobalColorGray1000];`,
      ),
    ).toBe(
      `import { AGray100 } from "@navikt/ds-tokens/dist/tokens";\n\nconst a = [AGray100, MyNavdsGlobalColorGray100, NavdsGlobalColorGray1000];`,
    );
  });

  test("does not replace similar names when aliased", () => {
    expect(
      run(
        `import { NavdsGlobalColorGray100 as gray } from "@navikt/ds-tokens/dist/tokens";\n\nconst a = [gray, grayish, mygray];`,
      ),
    ).toBe(
      `import { AGray100 } from "@navikt/ds-tokens/dist/tokens";\n\nconst a = [AGray100, grayish, mygray];`,
    );
  });
});

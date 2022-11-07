import { getCssRoot, getGlobalTokenValue, readCss } from "../handle-css";
import { rootData } from "./mockdata";

describe("Handling css", () => {
  test("Reads CSS from node_modules", () => {
    expect(() => readCss()).not.toThrow();
  });

  test("Get string output from css", () => {
    expect(typeof readCss()).toEqual("object");
  });

  test("Validate css root", () => {
    const data = getCssRoot(readCss());
    expect(data.type).toEqual("rule");
    expect(data.selectors.length).toEqual(2);
    expect(data.selectors[0]).toEqual(":root");
    expect(data.selectors[1]).toEqual(":host");

    /* Rough estimate for number of tokens */
    expect(data.declarations.length).toBeGreaterThan(170);
  });

  describe("Validate GlobalToken fetcher", () => {
    test("Gets correct global-token for lvl1", () => {
      expect(
        getGlobalTokenValue("var(--navds-semantic-color-text)", rootData)
      ).toEqual("rgba(38, 38, 38, 1)");
    });

    test("Gets correct global-token for lvl2", () => {
      expect(
        getGlobalTokenValue("var(--navds-semantic-color-text-muted)", rootData)
      ).toEqual("rgba(112, 112, 112, 1)");
    });

    test("Gets correct global-token non-conventional token (shadows, border etc)", () => {
      expect(
        getGlobalTokenValue(
          "0 0 0 3px var(--navds-semantic-color-text-muted)",
          rootData
        )
      ).toEqual("0 0 0 3px rgba(112, 112, 112, 1)");
    });
  });
});

export {};

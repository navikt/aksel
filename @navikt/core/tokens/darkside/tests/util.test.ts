import { describe, expect, test } from "vitest";
import { mergeConfigs, tokensWithPrefix } from "../util";

describe("Validate token utilities", () => {
  test(`tokensWithPrefix`, () => {
    expect(tokensWithPrefix({ b: "c", d: "f" })).toEqual({
      a: { b: "c", d: "f" },
    });
  });

  test(`mergeConfigs`, () => {
    const config1 = { a: { b: 2, c: 3 } };
    const config2 = { d: 5, f: 6, a: { d: 7, f: 8 } };
    const config3 = { a: { g: 9, h: { a: -1, b: -2 } } };
    const result = mergeConfigs([config1, config2, config3]);
    expect(result).toEqual({
      a: { b: 2, c: 3, d: 7, f: 8, g: 9, h: { a: -1, b: -2 } },
      d: 5,
      f: 6,
    });
  });
});

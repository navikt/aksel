import { describe, expect, test } from "vitest";
import { translateToken } from "../translate-token";

const tokens = [
  {
    name: "--navds-global-color-red-100",
    scss: "$navds-global-color-red-100",
    less: "@navds-global-color-red-100",
    js: "NavdsGlobalColorRed100",
  },
  {
    name: "--ax-accent-200",
    scss: "$ax-accent-200",
    less: "@ax-accent-200",
    js: "ABlue100",
  },
];

describe("Translating tokens to correct format", () => {
  test("To scss", () => {
    tokens.forEach((x) =>
      expect(translateToken(x.name, "scss")).toEqual(x.scss),
    );
  });
  test("To less", () => {
    tokens.forEach((x) =>
      expect(translateToken(x.name, "less")).toEqual(x.less),
    );
  });
  test("To js", () => {
    tokens.forEach((x) => expect(translateToken(x.name, "js")).toEqual(x.js));
  });
});

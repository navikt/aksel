import { translateToken } from "../translate-token";

export {};

jest.autoMockOff();

const tokens = [
  {
    name: "--navds-global-color-red-100",
    scss: "$navds-global-color-red-100",
    less: "@navds-global-color-red-100",
    js: "NavdsGlobalColorRed100",
  },
  {
    name: "--a-blue-100",
    scss: "$a-blue-100",
    less: "@a-blue-100",
    js: "ABlue100",
  },
];

describe("Translating tokens to correct format", () => {
  test("To scss", () => {
    tokens.forEach((x) =>
      expect(translateToken(x.name, "scss")).toEqual(x.scss)
    );
  });
  test("To less", () => {
    tokens.forEach((x) =>
      expect(translateToken(x.name, "less")).toEqual(x.less)
    );
  });
  test("To js", () => {
    tokens.forEach((x) => expect(translateToken(x.name, "js")).toEqual(x.js));
  });
});

import { getColors } from "../colors";

describe("Check correct parsing of tailwind tokens", () => {
  test("Check getColors function", () => {
    expect(
      getColors({
        "shadow-focus-inverted": "0 0 0 3px var(--a-border-focus-inverted)",
        "z-index-focus": 10,
        "blue-300": "rgba(102, 165, 244, 1)",
        "surface-action": "rgba(0, 103, 197, 1)",
        transparent: "rgba(255, 255, 255, 0)",
      })
    ).toEqual({
      "blue-300": "rgba(102, 165, 244, 1)",
      "surface-action": "rgba(0, 103, 197, 1)",
      transparent: "rgba(255, 255, 255, 0)",
    });
  });
});

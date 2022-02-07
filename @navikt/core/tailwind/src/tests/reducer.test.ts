import Reducer from "../reducer";

describe("Check correct parsing of tailind tokens", () => {
  test("Check reducer function", () => {
    expect(
      Reducer(
        {
          "shadow-focus-inverted":
            "0 0 0 3px var(navds-semantic-color-focus-inverted)",
          "z-index-focus": 10,
          "global-color-blue-300": "rgba(102, 165, 244, 1)",
          "semantic-color-interaction-primary":
            "var(--navds-gloab-color-blue-300)",
        },
        ["shadow"]
      )
    ).toEqual({
      "focus-inverted": "0 0 0 3px var(navds-semantic-color-focus-inverted)",
    });
  });
  test("Check reducer function with multiple keys", () => {
    expect(
      Reducer(
        {
          "shadow-focus-inverted":
            "0 0 0 3px var(navds-semantic-color-focus-inverted)",
          "z-index-focus": 10,
          "global-color-transparent": "rgba(255, 255, 255, 0)",
          "global-color-white": "rgba(255, 255, 255, 1)",
          "semantic-color-border-inverted": "var(navds-global-color-gray-200)",
          "semantic-color-border-muted": "var(navds-global-color-gray-400)",
        },
        ["global-color", "semantic-color"]
      )
    ).toEqual({
      transparent: "rgba(255, 255, 255, 0)",
      white: "rgba(255, 255, 255, 1)",
      "border-inverted": "var(navds-global-color-gray-200)",
      "border-muted": "var(navds-global-color-gray-400)",
    });
  });
});

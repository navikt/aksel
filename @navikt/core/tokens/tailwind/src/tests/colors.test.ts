import Colors from "../colors";

describe("Check correct parsing of tailind Colors", () => {
  test("Filter and format colors", () => {
    expect(
      Colors({
        "shadow-focus-inverted":
          "0 0 0 3px var(navds-semantic-color-focus-inverted)",
        "z-index-focus": 10,
        "global-color-blue-300": "rgba(102, 165, 244, 1)",
        "semantic-color-interaction-primary":
          "var(--navds-gloab-color-blue-300)",
      })
    ).toEqual({
      "blue-300": "rgba(102, 165, 244, 1)",
      "interaction-primary": "var(--navds-gloab-color-blue-300)",
    });
  });
});

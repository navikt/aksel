import Reducer from "../reducer";

describe("Check correct parsing of tailwind tokens", () => {
  test("Check reducer function", () => {
    expect(
      Reducer(
        {
          "shadow-focus-inverted": "0 0 0 3px var(--a-border-focus-inverted)",
          "z-index-focus": 10,
          "blue-300": "rgba(102, 165, 244, 1)",
          "surface-action": "var(--a-blue-300)",
        },
        ["shadow"]
      )
    ).toEqual({
      "focus-inverted": "0 0 0 3px var(--a-border-focus-inverted)",
    });
  });
});

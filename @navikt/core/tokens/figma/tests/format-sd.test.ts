import formatToStyledDictionary from "../format-sd";

describe("Check conversion to Styled-dictionary format", () => {
  test("Converting colors", () => {
    const before = {
      "navds-global-color-red-500": "rgba(1,1,1,1)",
      "navds-global-color-red-400": "rgba(1,2,1,1)",
      "navds-global-color-red-300": "rgba(1,3,1,1)",
      "navds-semantic-color-danger": "navds-global-color-red-400",
      "navds-semantic-color-danger-hover": "navds-global-color-red-300",
    };

    const after = {
      "navds-global-color-red-500": { value: "rgba(1,1,1,1)" },
      "navds-global-color-red-400": { value: "rgba(1,2,1,1)" },
      "navds-global-color-red-300": { value: "rgba(1,3,1,1)" },
      "navds-semantic-color-danger": {
        value: "{navds-global-color-red-400.value}",
      },
      "navds-semantic-color-danger-hover": {
        value: "{navds-global-color-red-300.value}",
      },
    };

    expect(JSON.stringify(formatToStyledDictionary(before, "color"))).toBe(
      JSON.stringify(after)
    );
  });

  test("Converting spacing", () => {
    const before = {
      "navds-spacing-1": "0.25rem",
      "navds-spacing-2": "0.5rem",
      "navds-spacing-3": "0.75rem",
      "navds-spacing-4": "1rem",
    };

    const after = {
      "navds-spacing-1": { value: "0.25rem" },
      "navds-spacing-2": { value: "0.5rem" },
      "navds-spacing-3": { value: "0.75rem" },
      "navds-spacing-4": { value: "1rem" },
    };

    expect(JSON.stringify(formatToStyledDictionary(before, "spacing"))).toBe(
      JSON.stringify(after)
    );
  });
});

import formatToStyledDictionary from "../format-sd";

describe("Check conversion to Styled-dictionary format", () => {
  test("Converting colors", () => {
    expect(
      JSON.stringify(
        formatToStyledDictionary(
          {
            "navds-global-color-red-500": "rgba(1,1,1,1)",
            "navds-global-color-red-400": "rgba(1,2,1,1)",
            "navds-global-color-red-300": "rgba(1,3,1,1)",
            "navds-semantic-color-danger": "navds-global-color-red-400",
            "navds-semantic-color-danger-hover": "navds-global-color-red-300",
          },
          "color"
        )
      )
    ).toBe(
      JSON.stringify({
        navds: {
          global: {
            color: {
              red: {
                "500": { value: "rgba(1,1,1,1)" },
                "400": { value: "rgba(1,2,1,1)" },
                "300": { value: "rgba(1,3,1,1)" },
              },
            },
          },
          semantic: {
            color: {
              danger: {
                value: "{navds.global.color.red.400.value}",
                hover: {
                  value: "{navds.global.color.red.300.value}",
                },
              },
            },
          },
        },
      })
    );
  });

  test("Converting spacing", () => {
    expect(
      JSON.stringify(
        formatToStyledDictionary(
          {
            "navds-spacing-1": "0.25rem",
            "navds-spacing-2": "0.5rem",
            "navds-spacing-3": "0.75rem",
            "navds-spacing-4": "1rem",
          },
          "spacing"
        )
      )
    ).toBe(
      JSON.stringify({
        navds: {
          spacing: {
            "1": { value: "0.25rem" },
            "2": { value: "0.5rem" },
            "3": { value: "0.75rem" },
            "4": { value: "1rem" },
          },
        },
      })
    );
  });
});

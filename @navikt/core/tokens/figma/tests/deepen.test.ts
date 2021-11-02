import deepen from "../deepen";

describe("Check deepen parsing of key name", () => {
  test("Convert spacing", () => {
    expect(
      deepen({
        "navds-spacing-1": { value: "0.25rem" },
        "navds-spacing-2": { value: "0.50rem" },
        "navds-spacing-3": { value: "0.75rem" },
      })
    ).toEqual({
      navds: {
        spacing: {
          "1": { value: "0.25rem" },
          "2": { value: "0.50rem" },
          "3": { value: "0.75rem" },
        },
      },
    });
  });

  test("Convert colors", () => {
    expect(
      deepen({
        "navds-global-color-red-100": { value: "rbga(0,1,0,0)" },
        "navds-global-color-green-100": { value: "rbga(0,4,0,0)" },
        "navds-global-color-green-200": { value: "rbga(0,5,0,0)" },
        "navds-semantic-color-border": { value: "rbga(0,10,0,0)" },
        "navds-semantic-color-background": { value: "rbga(0,11,0,0)" },
      })
    ).toEqual({
      navds: {
        global: {
          color: {
            red: {
              "100": { value: "rbga(0,1,0,0)" },
            },
            green: {
              "100": { value: "rbga(0,4,0,0)" },
              "200": { value: "rbga(0,5,0,0)" },
            },
          },
        },
        semantic: {
          color: {
            border: { value: "rbga(0,10,0,0)" },
            background: { value: "rbga(0,11,0,0)" },
          },
        },
      },
    });
  });
});

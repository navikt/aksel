import deepen from "../deepenJson";

describe("Check deepen parsing of key name", () => {
  test("Convert spacing", () => {
    const before = {
      "navds-spacing-1": { value: "0.25rem" },
      "navds-spacing-2": { value: "0.50rem" },
      "navds-spacing-3": { value: "0.75rem" },
      "navds-spacing-4": { value: "1rem" },
    };

    const after = {
      navds: {
        spacing: {
          "1": { value: "0.25rem" },
          "2": { value: "0.50rem" },
          "3": { value: "0.75rem" },
          "4": { value: "1rem" },
        },
      },
    };
    expect(JSON.stringify(deepen(before))).toBe(JSON.stringify(after));
  });

  test("Convert colors", () => {
    const before = {
      "navds-global-color-red-100": { value: "rbga(0,1,0,0)" },
      "navds-global-color-red-200": { value: "rbga(0,2,0,0)" },
      "navds-global-color-red-300": { value: "rbga(0,3,0,0)" },
      "navds-global-color-green-100": { value: "rbga(0,4,0,0)" },
      "navds-global-color-green-200": { value: "rbga(0,5,0,0)" },
      "navds-global-color-green-300": { value: "rbga(0,6,0,0)" },
      "navds-global-color-blue-100": { value: "rbga(0,7,0,0)" },
      "navds-global-color-blue-200": { value: "rbga(0,8,0,0)" },
      "navds-global-color-blue-300": { value: "rbga(0,9,0,0)" },
      "navds-semantic-color-border": { value: "rbga(0,10,0,0)" },
      "navds-semantic-color-background": { value: "rbga(0,11,0,0)" },
      "navds-semantic-color-canvas": { value: "rbga(0,12,0,0)" },
    };

    const after = {
      navds: {
        global: {
          color: {
            red: {
              "100": { value: "rbga(0,1,0,0)" },
              "200": { value: "rbga(0,2,0,0)" },
              "300": { value: "rbga(0,3,0,0)" },
            },
            green: {
              "100": { value: "rbga(0,4,0,0)" },
              "200": { value: "rbga(0,5,0,0)" },
              "300": { value: "rbga(0,6,0,0)" },
            },
            blue: {
              "100": { value: "rbga(0,7,0,0)" },
              "200": { value: "rbga(0,8,0,0)" },
              "300": { value: "rbga(0,9,0,0)" },
            },
          },
        },
        semantic: {
          color: {
            border: { value: "rbga(0,10,0,0)" },
            background: { value: "rbga(0,11,0,0)" },
            canvas: { value: "rbga(0,12,0,0)" },
          },
        },
      },
    };
    expect(JSON.stringify(deepen(before))).toBe(JSON.stringify(after));
  });
});

import formatToStyledDictionary from "../format-sd";

test("Check converting of colors to styled-dictionary format", () => {
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

  expect(JSON.stringify(formatToStyledDictionary(before))).toBe(
    JSON.stringify(after)
  );
});

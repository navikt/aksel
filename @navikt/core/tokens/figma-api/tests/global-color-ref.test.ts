import globalColorRefs from "../global-color-ref";

test("Global color refs", () => {
  let colors = [
    { name: "navds-global-color-red-400", color: "#D05C4A" },
    { name: "navds-global-color-red-500", color: "#BA3A26" },
    { name: "navds-semantic-color-error", color: "#D05C4A" },
    { name: "navds-semantic-color-hover", color: "#BA3A26" },
    { name: "navds-semantic-color-noref", color: "#AAAAAA" },
  ];

  let parsedColors = [
    { name: "navds-global-color-red-400", color: "#D05C4A" },
    { name: "navds-global-color-red-500", color: "#BA3A26" },
    { name: "navds-semantic-color-error", color: "navds-global-color-red-400" },
    { name: "navds-semantic-color-hover", color: "navds-global-color-red-500" },
    { name: "navds-semantic-color-noref", color: "#AAAAAA" },
  ];

  const newColors = globalColorRefs(colors);

  expect(JSON.stringify(newColors, null, 2)).toBe(
    JSON.stringify(parsedColors, null, 2)
  );
});

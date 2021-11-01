import parseName from "../parse-name";

test("parse-name", () => {
  new Map([
    ["Global/blue-500", "navds-global-color-blue-500"],
    ["Global/red-100", "navds-global-color-red-100"],
    [
      "Semantic/Interaction/primary-hover",
      "navds-semantic-color-interaction-primary-hover",
    ],
  ]).forEach((value, key) => expect(parseName(key)).toBe(value));
});

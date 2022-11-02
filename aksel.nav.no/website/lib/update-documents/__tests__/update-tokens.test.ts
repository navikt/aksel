import { generateTokens } from "../tokens/update-tokens";
import { rootData } from "./mockdata";

const output = [
  { title: "global-color-gray-900", token: "rgba(38, 38, 38, 1)" },
  { title: "global-color-gray-600", token: "rgba(112, 112, 112, 1)" },
  {
    title: "semantic-color-text",
    token: "var(--navds-global-color-gray-900)",
    raw: "rgba(38, 38, 38, 1)",
    parent: "--navds-global-color-gray-900",
  },
  {
    title: "semantic-color-text-muted",
    token: "var(--navds-global-color-gray-600)",
    raw: "rgba(112, 112, 112, 1)",
    parent: "--navds-global-color-gray-600",
  },
  {
    title: "semantic-color-text-test",
    token: "var(--navds-semantic-color-text-muted)",
    raw: "rgba(112, 112, 112, 1)",
    parent: "--navds-semantic-color-text-muted",
  },
  {
    title: "shadow-focus",
    token: "0 0 0 3px var(--navds-semantic-color-text-muted)",
    raw: "0 0 0 3px rgba(112, 112, 112, 1)",
  },
];

describe("Update tokens", () => {
  test("Generates correct output", () => {
    const result = generateTokens(rootData);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(output));
  });
});

export {};

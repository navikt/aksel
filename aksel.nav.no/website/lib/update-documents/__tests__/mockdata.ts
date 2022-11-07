/* Partial snippet from css-root */
export const rootData = {
  type: "rule",
  selectors: [":root"],
  declarations: [
    {
      type: "declaration",
      property: "--navds-global-color-gray-900",
      value: "rgba(38, 38, 38, 1)",
      position: null,
    },
    {
      type: "declaration",
      property: "--navds-global-color-gray-600",
      value: "rgba(112, 112, 112, 1)",
      position: null,
    },
    {
      type: "declaration",
      property: "--navds-semantic-color-text",
      value: "var(--navds-global-color-gray-900)",
      position: null,
    },
    {
      type: "declaration",
      property: "--navds-semantic-color-text-muted",
      value: "var(--navds-global-color-gray-600)",
      position: null,
    },
    {
      type: "declaration",
      property: "--navds-semantic-color-text-test",
      value: "var(--navds-semantic-color-text-muted)",
      position: null,
    },
    {
      type: "declaration",
      property: "--navds-shadow-focus",
      value: "0 0 0 3px var(--navds-semantic-color-text-muted)",
      position: null,
    },
  ],
  position: null,
};

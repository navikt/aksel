import _ from "lodash";

export const colorThemeModes = ["light", "dark"] as const;
export type ColorThemeMode = (typeof colorThemeModes)[number];

export const TokenTypes = {
  GLOBAL_COLOR: "global-color",
  COLOR: "color",
  GLOBAL_SPACING: "global-spacing",
  GLOBAL_RADIUS: "global-radius",
} as const;

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export const globalColorRoles = [
  "neutral",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "brandOne",
  "brandTwo",
  "brandThree",
  "dataOne",
  "dataTwo",
  "dataThree",
] as const;

export type GlobalColorRoles = (typeof globalColorRoles)[number];

export type GlobaColorScale<T extends GlobalColorRoles> = {
  [key in T]: GlobalColorVariable;
};

export const globalColorScales = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "1000",
] as const;

export type GlobalColorScale = (typeof globalColorScales)[number];

export type GlobalColorVariable = Record<
  GlobalColorScale,
  { value: string; type: "global-color"; comment?: string; group: string }
>;

export type GlobalColorVariableWith000 = Record<
  GlobalColorScale | "000",
  { value: string; type: "global-color"; comment?: string; group: string }
>;

export const tokensWithPrefix = (
  input: Record<string, any>,
): Record<"a", any> => {
  return { a: input };
};

export const mergeConfigs = (configs: any[]): Record<string, any> => {
  return configs.reduce((acc, config) => _.merge(acc, config), {});
};

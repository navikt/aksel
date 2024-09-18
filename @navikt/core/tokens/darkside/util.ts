import _ from "lodash";

export const colorThemes = ["light", "dark"] as const;
export type ColorTheme = (typeof colorThemes)[number];

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

export const tokensWithPrefix = (
  input: Record<string, any>,
): Record<"a", any> => {
  return { a: input };
};

export const mergeConfigs = (configs: any[]): Record<string, any> => {
  return configs.reduce((acc, config) => _.merge(acc, config), {});
};

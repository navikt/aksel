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

export const tokenTypes = {
  color: "color",
  "global-color": "global-color",
  "global-radius": "global-radius",
  "global-spacing": "global-spacing",
} as const;

export type TokenTypes = (typeof tokenTypes)[keyof typeof tokenTypes];

export type StyleDictionaryToken<T extends TokenTypes> = {
  value: string;
  type: T;
  group?: string;
  comment?: string;
};

export type StyleDictionaryTokenConfig<T extends TokenTypes> = {
  [key: string]: StyleDictionaryToken<T> | StyleDictionaryTokenConfig<T>;
};

export type GlobalColorVariable = Record<
  GlobalColorScale,
  StyleDictionaryToken<"global-color">
>;

export const tokensWithPrefix = <T>(input: T): Record<"a", T> => {
  return { a: input };
};

export const mergeConfigs = (
  configs: StyleDictionaryTokenConfig<TokenTypes>[],
): StyleDictionaryTokenConfig<TokenTypes> => {
  return configs.reduce((acc, config) => _.merge(acc, config), {});
};

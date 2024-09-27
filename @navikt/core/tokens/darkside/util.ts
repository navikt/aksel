import { CssColor } from "@adobe/leonardo-contrast-colors";
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

export type TokenTypes =
  | "color"
  | "global-color"
  | "global-radius"
  | "global-spacing";

export type SemanticTokenGroups = "background" | "border" | "text" | "contrast";
type SemanticTokenGroupsWithRoles = Exclude<SemanticTokenGroups, "contrast">;

export type TokenGroup =
  | GlobalColorRoles
  | SemanticTokenGroups
  | `${SemanticTokenGroupsWithRoles}.${GlobalColorRoles}`;

export type GlobalColorConfig = Record<
  GlobalColorRoles,
  { colorKeys: CssColor[]; ratios: number[]; smooth: boolean }
>;

export type StyleDictionaryToken<T extends TokenTypes> = {
  value: string;
  type: T;
  group?: TokenGroup;
  comment?: string;
};

export type StyleDictionaryTokenConfig<T extends TokenTypes> = {
  [key: string]: Record<string, StyleDictionaryToken<T>>;
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

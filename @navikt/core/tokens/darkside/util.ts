import _ from "lodash";

type GlobalColorEntryT = {
  value: string;
  type: "global-color";
  group: GlobalColorRoles;
};

export type GlobalConfigT = Record<
  GlobalColorRoles,
  Record<GlobalColorScale, GlobalColorEntryT> & {
    "000"?: GlobalColorEntryT;
    "100A"?: GlobalColorEntryT;
    "200A"?: GlobalColorEntryT;
    "300A"?: GlobalColorEntryT;
    "400A"?: GlobalColorEntryT;
  }
>;

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

type GlobalColorScale =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "1000";

export type TokenTypes =
  | "color"
  | "shadow"
  | "global-color"
  | "global-radius"
  | "global-spacing"
  | "global-breakpoints"
  | "global-font";

export type SemanticTokenGroups = "background" | "border" | "text";

export type TokenGroup =
  | GlobalColorRoles
  | SemanticTokenGroups
  | `${SemanticTokenGroups}.${GlobalColorRoles}`;

export type StyleDictionaryToken<T extends TokenTypes> = {
  /**
   * Token value
   * @example "#000000"
   * @example "1px"
   * @example "{a.neutral.100.value}"
   */
  value: string;
  /**
   * Token type
   */
  type: T;
  /**
   * Group the token belongs to. Used for auto-documentation and categorization in Figma.
   */
  group?: TokenGroup;
  /**
   * Optional comment for the token. Will be included in the generated documentation and in Figma.
   */
  comment?: string;
  /**
   * Optional extra scopes for the token.
   * Token will include all default scopes based on `type`, and any extra specified here.
   */
  scopes?: VariableScope[];
  /**
   * In some cases, we want to hide tokens from the Figma plugin.
   * Currently only relevant for shadow-tokens.
   */
  figmaIgnore?: boolean;
};

export type StyleDictionaryTokenConfig<T extends TokenTypes> = {
  [key: string]: Record<string, StyleDictionaryToken<T>>;
};

export const tokensWithPrefix = <T>(input: T): Record<"ax", T> => {
  return { ax: input };
};

export const mergeConfigs = (
  configs: StyleDictionaryTokenConfig<TokenTypes>[],
): StyleDictionaryTokenConfig<TokenTypes> => {
  return configs.reduce((acc, config) => _.merge(acc, config), {});
};

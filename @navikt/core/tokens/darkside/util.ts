import merge from "lodash.merge";
import AccentScale from "./tokens/global/accent";
import NeutralScale from "./tokens/global/neutral";
import { radiusTokenConfig } from "./tokens/radius";
import { semanticTokenConfig } from "./tokens/semantic";
import { semanticTokensForAllRoles } from "./tokens/semantic-roles";
import { spacingTokenConfig } from "./tokens/spacing";

export const colorThemeModes = ["light", "dark"] as const;
export type ColorThemeMode = (typeof colorThemeModes)[number];

export const TokenTypes = {
  GLOBAL_COLOR: "global-color",
  COLOR: "color",
  GLOBAL_SPACING: "global-spacing",
  GLOBAL_RADIUS: "global-radius",
} as const;

export type TokenType = (typeof TokenTypes)[keyof typeof TokenTypes];

export const globalColorRoles = ["neutral", "accent"] as const;

export type GlobalColorRoles = (typeof globalColorRoles)[number];

export type GlobaColorScale<T extends GlobalColorRoles> = {
  [key in T]: GlobalColorVariable;
};

type GlobalColorScale =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type GlobalColorVariable = Record<
  GlobalColorScale,
  { value: string; type: "global-color"; comment?: string; group: string }
>;

export const tokensWithPrefix = (input: any) => {
  return { a: { ...input } };
};

export const completeGlobalScale = (mode: ColorThemeMode) => {
  const mapping = {
    accent: AccentScale,
    neutral: NeutralScale,
  };

  return globalColorRoles.reduce((acc, role) => {
    return { ...acc, ...mapping[role](mode) };
  }, {});
};

/**
 * Collection of configs for:
 * - Global lightmode colors
 * - Semantic tokens for each color-role
 * - Semantic tokens for standalone colors
 */
export const lightModeTokens = () => {
  const configs = [
    semanticTokensForAllRoles(),
    semanticTokenConfig(),
    completeGlobalScale("light"),
  ];
  return tokensWithPrefix(
    configs.reduce((acc, config) => merge(acc, config), {}),
  );
};

/**
 * Collection of configs for:
 * - Global darkmode colors
 */
export const darkModeTokens = () => {
  const configs = [completeGlobalScale("dark")];

  return tokensWithPrefix(
    configs.reduce((acc, config) => merge(acc, config), {}),
  );
};

/**
 * Collection of configs for:
 * - Spacing
 * - Radius
 */
export const scaleTokens = () => {
  const configs = [spacingTokenConfig, radiusTokenConfig];

  return tokensWithPrefix(
    configs.reduce((acc, config) => merge(acc, config), {}),
  );
};

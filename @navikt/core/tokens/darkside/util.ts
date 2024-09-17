import merge from "lodash.merge";
import AccentScale from "./tokens/global/accent";
import BrandOneScale from "./tokens/global/brand-one";
import BrandThreeScale from "./tokens/global/brand-three";
import BrandTwoScale from "./tokens/global/brand-two";
import DangerScale from "./tokens/global/danger";
import DataOneScale from "./tokens/global/data-one";
import DataThreeScale from "./tokens/global/data-three";
import DataTwoScale from "./tokens/global/data-two";
import InfoScale from "./tokens/global/info";
import NeutralScale from "./tokens/global/neutral";
import SuccessScale from "./tokens/global/success";
import WarningScale from "./tokens/global/warning";
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

export const completeGlobalScale = (
  mode: ColorThemeMode,
): Record<string, GlobalColorVariable> => {
  const mapping = {
    /* Core */
    accent: AccentScale,
    neutral: NeutralScale,
    /* Status */
    info: InfoScale,
    success: SuccessScale,
    warning: WarningScale,
    danger: DangerScale,
    /* Brand */
    brandOne: BrandOneScale,
    brandTwo: BrandTwoScale,
    brandThree: BrandThreeScale,
    /* Data */
    dataOne: DataOneScale,
    dataTwo: DataTwoScale,
    dataThree: DataThreeScale,
  };

  return globalColorRoles.reduce((acc, role) => {
    return { ...acc, ...mapping[role](mode) };
  }, {});
};

export const mergeConfigs = (configs: any[]): Record<string, any> => {
  return configs.reduce((acc, config) => merge(acc, config), {});
};

/**
 * Collection of configs for:
 * - Global lightmode colors
 * - Semantic tokens for each color-role
 * - Semantic tokens for standalone colors
 */
export const lightModeTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([
      semanticTokensForAllRoles(),
      semanticTokenConfig(),
      completeGlobalScale("light"),
    ]),
  );
};

/**
 * Collection of configs for:
 * - Global darkmode colors
 */
export const darkModeTokens = () => {
  return tokensWithPrefix(mergeConfigs([completeGlobalScale("dark")]));
};

/**
 * Collection of configs for:
 * - Spacing
 * - Radius
 */
export const scaleTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([spacingTokenConfig, radiusTokenConfig]),
  );
};

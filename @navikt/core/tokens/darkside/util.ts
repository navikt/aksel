import merge from "lodash.merge";
import AccentScale from "./tokens/global/accent";
import NeutralScale from "./tokens/global/neutral";
import { radiusTokenConfig } from "./tokens/radius";
import { spacingTokenConfig } from "./tokens/spacing";
import {
  tokenConfigForRole,
  tokenConfigForUniqueTokens,
} from "./tokens/token-configs";

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

/**
 * We need to deep merge the token config for each role to get the complete token config for all roles.
 */
export const tokensForAllRoles = () =>
  globalColorRoles.reduce(
    (acc, role) => merge(acc, tokenConfigForRole(role)),
    {},
  );

export const getGlobalColorScale = (
  role: GlobalColorRoles,
  mode: ColorThemeMode,
) => {
  const mapping = {
    accent: AccentScale,
    neutral: NeutralScale,
  };

  return mapping[role](mode);
};

export const completeGlobalLightScale = () => {
  return globalColorRoles.reduce((acc, role) => {
    return { ...acc, ...getGlobalColorScale(role, "light") };
  }, {});
};

export const completeGlobalDarkScale = () => {
  return globalColorRoles.reduce((acc, role) => {
    return { ...acc, ...getGlobalColorScale(role, "dark") };
  }, {});
};

export const lightModeTokens = () => {
  const configs = [
    tokensForAllRoles(),
    tokenConfigForUniqueTokens(),
    completeGlobalLightScale(),
  ];
  return tokensWithPrefix(
    configs.reduce((acc, config) => merge(acc, config), {}),
  );
};

export const darkModeTokens = () => {
  const configs = [completeGlobalDarkScale()];

  return tokensWithPrefix(
    configs.reduce((acc, config) => merge(acc, config), {}),
  );
};

export const scaleTokens = () => {
  const configs = [spacingTokenConfig, radiusTokenConfig];

  return tokensWithPrefix(
    configs.reduce((acc, config) => merge(acc, config), {}),
  );
};

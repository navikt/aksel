import { mergeConfigs, tokensWithPrefix } from "./tokens.util";
import { breakpointTokenConfig } from "./tokens/breakpoint";
import {
  globalDarkTokens,
  globalLightTokens,
} from "./tokens/colors/global.tokens";
import { semanticTokensForAllRoles } from "./tokens/colors/semantic-role.tokens";
import { semanticRootTokens } from "./tokens/colors/semantic-root.tokens";
import { fontTokenConfig } from "./tokens/font";
import { opacityTokenConfig } from "./tokens/opacity";
import { radiusTokenConfig } from "./tokens/radius";
import { shadowTokenConfig } from "./tokens/shadow";
import { spaceTokenConfig } from "./tokens/space";

export const lightModeTokens = (withSemanticRoles = true) => {
  const config = [
    shadowTokenConfig("light"),
    opacityTokenConfig("light"),
    withSemanticRoles ? semanticTokensForAllRoles() : {},
    semanticRootTokens("light"),
    globalLightTokens,
  ];

  return tokensWithPrefix(mergeConfigs(config));
};

export const darkModeTokens = (withSemanticRoles = true) => {
  const config = [
    shadowTokenConfig("dark"),
    opacityTokenConfig("dark"),
    withSemanticRoles ? semanticTokensForAllRoles() : {},
    semanticRootTokens("dark"),
    globalDarkTokens,
  ];

  return tokensWithPrefix(mergeConfigs(config));
};

export const semanticRoleTokensWithGlobalReference = () => {
  const config = [globalLightTokens, semanticTokensForAllRoles()];

  return tokensWithPrefix(mergeConfigs(config));
};

/**
 * We deliberately extract space and border-radius tokens from other "root" tokens like breakline, font etc
 * so we can use the fuction for creating Figma-variables
 */
export const scaleTokens = () => {
  const config = [spaceTokenConfig, radiusTokenConfig];

  return tokensWithPrefix(mergeConfigs(config));
};

export const rootTokens = () => {
  const config = [scaleTokens().ax, breakpointTokenConfig, fontTokenConfig];

  return tokensWithPrefix(mergeConfigs(config));
};

export const allTokens = () => {
  const config = [
    lightModeTokens().ax,
    scaleTokens().ax,
    breakpointTokenConfig,
    fontTokenConfig,
  ];

  return tokensWithPrefix(mergeConfigs(config));
};

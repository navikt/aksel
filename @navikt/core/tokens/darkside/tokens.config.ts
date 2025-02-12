import { mergeConfigs, tokensWithPrefix } from "./tokens.util";
import { radiusTokenConfig } from "./tokens/border-radius";
import { breakpointTokenConfig } from "./tokens/breakpoint";
import {
  globalDarkTokens,
  globalLightTokens,
} from "./tokens/colors/global.tokens";
import { semanticTokensForAllRoles } from "./tokens/colors/semantic-role.tokens";
import { semanticRootTokens } from "./tokens/colors/semantic-root.tokens";
import { fontTokenConfig } from "./tokens/font";
import { opacityTokenConfig } from "./tokens/opacity";
import { shadowTokenConfig } from "./tokens/shadow";
import { spaceTokenConfig } from "./tokens/space";

export const lightModeTokens = () => {
  const configs = [
    shadowTokenConfig("light"),
    opacityTokenConfig("light"),
    semanticTokensForAllRoles(),
    semanticRootTokens("light"),
    globalLightTokens,
  ];

  return tokensWithPrefix(mergeConfigs(configs));
};

export const darkModeTokens = () => {
  const configs = [
    shadowTokenConfig("dark"),
    opacityTokenConfig("dark"),
    semanticTokensForAllRoles(),
    semanticRootTokens("dark"),
    globalDarkTokens,
  ];

  return tokensWithPrefix(mergeConfigs(configs));
};

/**
 * We deliberately extract space and border-radius tokens from other "root" tokens like breakline, font etc
 * so we can use the fuction for creating Figma-variables
 */
export const scaleTokens = () => {
  const configs = [spaceTokenConfig, radiusTokenConfig];

  return tokensWithPrefix(mergeConfigs(configs));
};

export const rootTokens = () => {
  const configs = [scaleTokens().ax, breakpointTokenConfig, fontTokenConfig];

  return tokensWithPrefix(mergeConfigs(configs));
};

export const allTokens = () => {
  const configs = [
    lightModeTokens().ax,
    scaleTokens().ax,
    breakpointTokenConfig,
    fontTokenConfig,
  ];

  return tokensWithPrefix(mergeConfigs(configs));
};

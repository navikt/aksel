import _ from "lodash";
import {
  StyleDictionaryTokenConfig,
  TokenTypes,
  tokensWithPrefix,
} from "./tokens.util";
import { breakpointsTokenConfig } from "./tokens/breakpoints";
import { fontTokenConfig } from "./tokens/font";
import {
  globalColorDarkModeConfig,
  globalColorLightModeConfig,
} from "./tokens/global";
import { opacityTokenConfig } from "./tokens/opacity";
import { radiusTokenConfig } from "./tokens/radius";
import { semanticTokenConfig } from "./tokens/semantic";
import { semanticTokensForAllRolesConfig } from "./tokens/semantic-roles";
import { shadowTokenConfig } from "./tokens/shadow";
import { spaceTokenConfig } from "./tokens/space";
import { textContrastTokenConfig } from "./tokens/text-contrast";

const mergeConfigs = (
  configs: StyleDictionaryTokenConfig<TokenTypes>[],
): StyleDictionaryTokenConfig<TokenTypes> => {
  return configs.reduce((acc, config) => _.merge(acc, config), {});
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
      shadowTokenConfig("light"),
      opacityTokenConfig("light"),
      semanticTokensForAllRolesConfig(),
      textContrastTokenConfig,
      semanticTokenConfig("light"),
      globalColorLightModeConfig,
    ]),
  );
};

/**
 * Collection of configs for:
 * - Global darkmode colors
 */
export const darkModeTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([
      shadowTokenConfig("dark"),
      opacityTokenConfig("dark"),
      semanticTokensForAllRolesConfig(),
      textContrastTokenConfig,
      semanticTokenConfig("dark"),
      globalColorDarkModeConfig,
    ]),
  );
};

/**
 * Collection of configs for:
 * - Space
 * - Radius
 */
export const scaleTokens = () => {
  return tokensWithPrefix(mergeConfigs([spaceTokenConfig, radiusTokenConfig]));
};

export const rootTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([scaleTokens().ax, breakpointsTokenConfig, fontTokenConfig]),
  );
};

export const allTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([
      lightModeTokens().ax,
      scaleTokens().ax,
      breakpointsTokenConfig,
      fontTokenConfig,
    ]),
  );
};

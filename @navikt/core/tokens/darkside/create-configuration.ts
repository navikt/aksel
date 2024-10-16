import {
  globalColorDarkModeConfig,
  globalColorLightModeConfig,
} from "./tokens/global";
import { radiusTokenConfig } from "./tokens/radius";
import { semanticTokenConfig } from "./tokens/semantic";
import { semanticTokensForAllRolesConfig } from "./tokens/semantic-roles";
import { spacingTokenConfig } from "./tokens/spacing";
import { textContrastTokenConfig } from "./tokens/text-contrast";
import { mergeConfigs, tokensWithPrefix } from "./util";

/**
 * Collection of configs for:
 * - Global lightmode colors
 * - Semantic tokens for each color-role
 * - Semantic tokens for standalone colors
 */
export const lightModeTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([
      semanticTokensForAllRolesConfig("light"),
      textContrastTokenConfig(),
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
      semanticTokensForAllRolesConfig("dark"),
      textContrastTokenConfig(),
      semanticTokenConfig("dark"),
      globalColorDarkModeConfig,
    ]),
  );
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

export const allTokens = () => {
  return tokensWithPrefix(mergeConfigs([lightModeTokens().a, scaleTokens().a]));
};

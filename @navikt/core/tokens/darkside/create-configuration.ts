import { getGlobalScaleForColor } from "./leonardo";
import { contrastTokenConfig } from "./tokens/contrast";
import { neutralTokenConfig } from "./tokens/neutral";
import { radiusTokenConfig } from "./tokens/radius";
import { semanticTokenConfig } from "./tokens/semantic";
import { semanticTokensForAllRolesConfig } from "./tokens/semantic-roles";
import { spacingTokenConfig } from "./tokens/spacing";
import {
  ColorTheme,
  GlobalColorVariable,
  globalColorRoles,
  mergeConfigs,
  tokensWithPrefix,
} from "./util";

export const globalScale = (
  theme: ColorTheme,
): Record<string, GlobalColorVariable> => {
  return globalColorRoles.reduce(
    (acc, role) => {
      acc[role] = getGlobalScaleForColor(role, theme);
      return acc;
    },
    {} as Record<string, GlobalColorVariable>,
  );
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
      semanticTokensForAllRolesConfig(),
      contrastTokenConfig(),
      semanticTokenConfig(),
      neutralTokenConfig("light"),
      globalScale("light"),
    ]),
  );
};

/**
 * Collection of configs for:
 * - Global darkmode colors
 */
export const darkModeTokens = () => {
  return tokensWithPrefix(
    mergeConfigs([globalScale("dark"), neutralTokenConfig("dark")]),
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

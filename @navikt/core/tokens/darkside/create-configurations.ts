import { contrastTokenConfig } from "./tokens/contrast";
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
import {
  ColorThemeMode,
  GlobalColorVariable,
  globalColorRoles,
  mergeConfigs,
  tokensWithPrefix,
} from "./util";

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
      contrastTokenConfig(),
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

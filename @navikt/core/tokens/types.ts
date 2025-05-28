export type {
  AkselColorThemes,
  AkselColors,
  AkselMainColors,
  AkselStatusColors,
  AkselBrandColors,
  AkselMetaColors,
};

/* --------------------------------- Themes --------------------------------- */
type AkselColorThemes = "light" | "dark";

/* ------------------------------ Main colors ----------------------------- */
type AkselMainColors = "neutral" | "accent";

/* ------------------------------ Status colors ----------------------------- */
type AkselStatusColors = "info" | "success" | "warning" | "danger";

/* ------------------------------ Brand colors ------------------------------ */
type AkselBrandColors = "brand-magenta" | "brand-beige" | "brand-blue";

/* ------------------------------ Meta colors ------------------------------ */
type AkselMetaColors = "meta-purple" | "meta-lime";

/* ------------------------------- All colors ------------------------------- */
type AkselColors =
  | AkselMainColors
  | AkselStatusColors
  | AkselBrandColors
  | AkselMetaColors;

export type SemanticColorRoles = AkselColors;

export type GlobalColorScale =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "1000"
  | "000"
  | "100A"
  | "200A"
  | "300A"
  | "400A";

export type GlobalColorKeys =
  | `${Extract<AkselColors, "neutral">}-${Extract<GlobalColorScale, "000">}`
  | `${AkselColors}-${Exclude<GlobalColorScale, "000">}`;

/* ----------------------------- Semantic tokens ---------------------------- */

export type StaticDefaultBgKeys =
  | "default"
  | "input"
  | "raised"
  | "sunken"
  | "overlay";

export type StaticBgKeys =
  | `${SemanticColorRoles}-soft`
  | `${SemanticColorRoles}-softA`
  | `${SemanticColorRoles}-moderate`
  | `${SemanticColorRoles}-moderateA`
  | `${SemanticColorRoles}-strong`;

export type StatefulBgKeys =
  | `${SemanticColorRoles}-moderate-hover`
  | `${SemanticColorRoles}-moderate-hoverA`
  | `${SemanticColorRoles}-moderate-pressed`
  | `${SemanticColorRoles}-moderate-pressedA`
  | `${SemanticColorRoles}-strong-hover`
  | `${SemanticColorRoles}-strong-pressed`;

export type DefaultTextColorKeys = "logo";

export type TextColorKeys =
  | SemanticColorRoles
  | `${SemanticColorRoles}-subtle`
  | `${SemanticColorRoles}-decoration`
  | `${SemanticColorRoles}-contrast`;

export type BorderColorKeys = "focus";

export type BorderColorWithRoleKeys =
  | SemanticColorRoles
  | `${SemanticColorRoles}-subtle`
  | `${SemanticColorRoles}-subtleA`
  | `${SemanticColorRoles}-strong`;

export const spaceInPixels = [
  0, 1, 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96,
  128,
] as const;

export type SpaceKeys = `space-${(typeof spaceInPixels)[number]}`;

export type ShadowKeys = "dialog";

export type BorderRadiusKeys = "2" | "4" | "8" | "12" | "full";

export type BreakPointKeys =
  | "xs"
  | "sm"
  | "sm-down"
  | "md"
  | "md-down"
  | "lg"
  | "lg-down"
  | "xl"
  | "xl-down"
  | "2xl"
  | "2xl-down";

/* Typo-tokens */
export type FontFamilyKeys = "family";

export type FontSizeKeys =
  | "size-heading-2xlarge"
  | "size-heading-xlarge"
  | "size-heading-large"
  | "size-heading-medium"
  | "size-heading-small"
  | "size-heading-xsmall"
  | "size-xlarge"
  | "size-large"
  | "size-medium"
  | "size-small";

export type FontLineHeightKeys =
  | "line-height-heading-2xlarge"
  | "line-height-heading-xlarge"
  | "line-height-heading-large"
  | "line-height-heading-medium"
  | "line-height-heading-small"
  | "line-height-heading-xsmall"
  | "line-height-xlarge"
  | "line-height-large"
  | "line-height-medium";

export type FontWeightKeys = "weight-bold" | "weight-regular";

/* Legacy tokens */
export type LegacyBorderRadiusKeys =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "full";

export type LegacyShadowKeys =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";

export type LegacyBgColorKeys = "bg-default" | "bg-subtle";

export type LegacySurfaceColorKeys =
  | "surface-default"
  | "surface-selected"
  | "surface-subtle"
  | "surface-transparent"
  | "surface-backdrop"
  | "surface-inverted"
  | "surface-action-subtle"
  | "surface-action-selected"
  | "surface-action"
  | "surface-neutral-subtle"
  | "surface-neutral-moderate"
  | "surface-neutral-selected"
  | "surface-neutral"
  | "surface-success-subtle"
  | "surface-success-moderate"
  | "surface-success"
  | "surface-danger-subtle"
  | "surface-danger-moderate"
  | "surface-danger"
  | "surface-warning-subtle"
  | "surface-warning-moderate"
  | "surface-warning"
  | "surface-info-subtle"
  | "surface-info-moderate"
  | "surface-info"
  | "surface-alt-1-subtle"
  | "surface-alt-1-moderate"
  | "surface-alt-1"
  | "surface-alt-2-subtle"
  | "surface-alt-2-moderate"
  | "surface-alt-2"
  | "surface-alt-3-subtle"
  | "surface-alt-3-moderate"
  | "surface-alt-3-strong"
  | "surface-alt-3";

export type LegacyBorderColorKeys =
  | "border-default"
  | "border-strong"
  | "border-divider"
  | "border-subtle"
  | "border-action-selected"
  | "border-action-hover"
  | "border-action"
  | "border-selected"
  | "border-success"
  | "border-danger"
  | "border-warning"
  | "border-info"
  | "border-focus-on-inverted"
  | "border-focus"
  | "border-on-inverted"
  | "border-on-inverted-subtle"
  | "border-alt-1"
  | "border-alt-2"
  | "border-alt-3";

export type LegacySpacingKeys =
  | "0"
  | "05"
  | "1"
  | "1-alt"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "14"
  | "16"
  | "18"
  | "20"
  | "24"
  | "32";

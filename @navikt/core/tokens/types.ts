import { spaceInPixels } from "./internal-types";

/* --------------------------------- Themes --------------------------------- */
type AkselColorThemes = "light" | "dark";

/* ------------------------------ Main colors ----------------------------- */
type AkselMainColorTokens = "neutral" | "accent";

/* ------------------------------ Status colors ----------------------------- */
type AkselStatusColorTokens = "info" | "success" | "warning" | "danger";

/* ------------------------------ Brand colors ------------------------------ */
type AkselBrandColorTokens = "brand-magenta" | "brand-beige" | "brand-blue";

/* ------------------------------ Meta colors ------------------------------ */
type AkselMetaColorTokens = "meta-purple" | "meta-lime";

/* ------------------------------- All colors ------------------------------- */
type AkselColorTokens =
  | AkselMainColorTokens
  | AkselStatusColorTokens
  | AkselBrandColorTokens
  | AkselMetaColorTokens;

export type {
  AkselColorThemes,
  AkselColorTokens,
  AkselMainColorTokens,
  AkselStatusColorTokens,
  AkselBrandColorTokens,
  AkselMetaColorTokens,
};

/* --------------------------- Backgrounds tokens --------------------------- */
type AkselBaseBackgroundTokens =
  | "default"
  | "input"
  | "raised"
  | "sunken"
  | "overlay";

type AkselColoredStaticBackgroundTokens =
  | `${AkselColorTokens}-soft`
  | `${AkselColorTokens}-softA`
  | `${AkselColorTokens}-moderate`
  | `${AkselColorTokens}-moderateA`
  | `${AkselColorTokens}-strong`;

type AkselColoredStatefulBackgroundTokens =
  | `${AkselColorTokens}-moderate-hover`
  | `${AkselColorTokens}-moderate-hoverA`
  | `${AkselColorTokens}-moderate-pressed`
  | `${AkselColorTokens}-moderate-pressedA`
  | `${AkselColorTokens}-strong-hover`
  | `${AkselColorTokens}-strong-pressed`;

export type {
  AkselBaseBackgroundTokens,
  AkselColoredStaticBackgroundTokens,
  AkselColoredStatefulBackgroundTokens,
};

/* ------------------------------- Text tokens ------------------------------ */
type AkselBaseTextTokens = "logo";

type AkselColoredTextTokens =
  | AkselColorTokens
  | `${AkselColorTokens}-subtle`
  | `${AkselColorTokens}-decoration`
  | `${AkselColorTokens}-contrast`;

export type { AkselBaseTextTokens, AkselColoredTextTokens };

/* ------------------------------ Border tokens ----------------------------- */
type AkselBaseBorderTokens = "focus";

type AkselColoredBorderTokens =
  | AkselColorTokens
  | `${AkselColorTokens}-subtle`
  | `${AkselColorTokens}-subtleA`
  | `${AkselColorTokens}-strong`;

export type { AkselBaseBorderTokens, AkselColoredBorderTokens };

/* ------------------------------ Space tokens ------------------------------ */
type AkselSpaceTokens = `space-${(typeof spaceInPixels)[number]}`;

export type { AkselSpaceTokens };

/* ------------------------------ Shadow tokens ----------------------------- */
type AkselShadowTokens = "dialog";

export type { AkselShadowTokens };

/* ------------------------------ Border Radius tokens --------------------- */
type AkselBorderRadiusTokens = "2" | "4" | "8" | "12" | "full";

export type { AkselBorderRadiusTokens };

/* ------------------------------ Breakpoints tokens ------------------------ */
type AkselBreakpointTokens =
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

export type { AkselBreakpointTokens };

/* ------------------------------ Legacy tokens ----------------------------- */
type AkselLegacyBorderRadiusTokens =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "full";

type AkselLegacyShadowTokens =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";

type AkselLegacyBackgroundColorTokens = "bg-default" | "bg-subtle";

type AkselLegacySurfaceColorTokens =
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

type AkselLegacyBorderColorTokens =
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

type AkselLegacySpacingTokens =
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

export type {
  AkselLegacyBorderRadiusTokens,
  AkselLegacyShadowTokens,
  AkselLegacyBackgroundColorTokens,
  AkselLegacySurfaceColorTokens,
  AkselLegacyBorderColorTokens,
  AkselLegacySpacingTokens,
};

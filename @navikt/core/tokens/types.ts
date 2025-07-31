/* --------------------------------- Themes --------------------------------- */
type AkselColorTheme = "light" | "dark";

/* ------------------------------ Main colors ----------------------------- */
type AkselMainColorRole = "neutral" | "accent";

/* ------------------------------ Status colors ----------------------------- */
type AkselStatusColorRole = "info" | "success" | "warning" | "danger";

/* ------------------------------ Brand colors ------------------------------ */
type AkselBrandColorRole = "brand-magenta" | "brand-beige" | "brand-blue";

/* ------------------------------ Meta colors ------------------------------ */
type AkselMetaColorRole = "meta-purple" | "meta-lime";

/* ------------------------------- All colors ------------------------------- */
type AkselColorRole =
  | AkselMainColorRole
  | AkselStatusColorRole
  | AkselBrandColorRole
  | AkselMetaColorRole;

export type {
  AkselColorTheme,
  AkselColorRole,
  AkselMainColorRole,
  AkselStatusColorRole,
  AkselBrandColorRole,
  AkselMetaColorRole,
};

/* --------------------------- Backgrounds tokens --------------------------- */
type AkselRootBackgroundToken =
  | "default"
  | "input"
  | "raised"
  | "sunken"
  | "overlay";

type AkselColoredStatelessBackgroundToken =
  | `${AkselColorRole}-soft`
  | `${AkselColorRole}-softA`
  | `${AkselColorRole}-moderate`
  | `${AkselColorRole}-moderateA`
  | `${AkselColorRole}-strong`;

type AkselColoredStatefulBackgroundToken =
  | `${AkselColorRole}-moderate-hover`
  | `${AkselColorRole}-moderate-hoverA`
  | `${AkselColorRole}-moderate-pressed`
  | `${AkselColorRole}-moderate-pressedA`
  | `${AkselColorRole}-strong-hover`
  | `${AkselColorRole}-strong-pressed`;

export type {
  AkselRootBackgroundToken,
  AkselColoredStatelessBackgroundToken,
  AkselColoredStatefulBackgroundToken,
};

/* ------------------------------- Text tokens ------------------------------ */
type AkselRootTextToken = "logo";

type AkselColoredTextToken =
  | AkselColoredStatefulBackgroundToken
  | `${AkselColoredStatefulBackgroundToken}-subtle`
  | `${AkselColoredStatefulBackgroundToken}-decoration`
  | `${AkselColoredStatefulBackgroundToken}-contrast`;

export type { AkselRootTextToken, AkselColoredTextToken };

/* ------------------------------ Border tokens ----------------------------- */
type AkselRootBorderToken = "focus";

type AkselColoredBorderToken =
  | AkselColorRole
  | `${AkselColorRole}-subtle`
  | `${AkselColorRole}-subtleA`
  | `${AkselColorRole}-strong`;

export type { AkselRootBorderToken, AkselColoredBorderToken };

/* ------------------------------ Space tokens ------------------------------ */
type AkselSpaceToken =
  | "space-0"
  | "space-1"
  | "space-2"
  | "space-4"
  | "space-6"
  | "space-8"
  | "space-12"
  | "space-16"
  | "space-20"
  | "space-24"
  | "space-28"
  | "space-32"
  | "space-36"
  | "space-40"
  | "space-44"
  | "space-48"
  | "space-56"
  | "space-64"
  | "space-72"
  | "space-80"
  | "space-96"
  | "space-128";

export type { AkselSpaceToken };

/* ------------------------------ Shadow tokens ----------------------------- */
type AkselShadowToken = "dialog";

export type { AkselShadowToken };

/* ------------------------------ Border Radius tokens --------------------- */
type AkselBorderRadiusToken = "2" | "4" | "8" | "12" | "full";

export type { AkselBorderRadiusToken };

/* ------------------------------ Breakpoints tokens ------------------------ */
type AkselBreakpointToken =
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

export type { AkselBreakpointToken };

/* ------------------------------ Legacy tokens ----------------------------- */
type AkselLegacyBorderRadiusToken =
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "full";

type AkselLegacyShadowToken =
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge";

type AkselLegacyBackgroundColorToken = "bg-default" | "bg-subtle";

type AkselLegacySurfaceColorToken =
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

type AkselLegacyBorderColorToken =
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

type AkselLegacySpacingToken =
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
  AkselLegacyBorderRadiusToken,
  AkselLegacyShadowToken,
  AkselLegacyBackgroundColorToken,
  AkselLegacySurfaceColorToken,
  AkselLegacyBorderColorToken,
  AkselLegacySpacingToken,
};

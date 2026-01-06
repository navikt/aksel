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

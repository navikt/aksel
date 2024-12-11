export type ColorTheme = "light" | "dark";

export type ColorRoles =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "brand-magenta"
  | "brand-beige"
  | "brand-blue"
  | "meta-purple"
  | "meta-lime";

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
  | `${Extract<ColorRoles, "neutral">}-${Extract<GlobalColorScale, "000">}`
  | `${ColorRoles}-${Exclude<GlobalColorScale, "000">}`;

/* Semantic tokens */

export type DefaultBgKeys =
  | "default"
  | "input"
  | "raised"
  | "sunken"
  | "overlay";

export type StaticBgKeys =
  | ColorRoles
  | `${ColorRoles}-moderate`
  | `${ColorRoles}-moderateA`
  | `${ColorRoles}-strong`
  | `${ColorRoles}-raised`;

export type StateFullBgKeys =
  | `${ColorRoles}-hover`
  | `${ColorRoles}-hoverA`
  | `${ColorRoles}-moderate-hover`
  | `${ColorRoles}-moderate-hoverA`
  | `${ColorRoles}-moderate-pressed`
  | `${ColorRoles}-moderate-pressedA`
  | `${ColorRoles}-strong-hover`
  | `${ColorRoles}-strong-pressed`
  | `${ColorRoles}-raised-hover`;

export type DefaultTextColorKeys = "default" | "subtle" | "icon" | "logo";

export type TextColorKeys =
  | ColorRoles
  | `${ColorRoles}-strong`
  | `${ColorRoles}-icon`
  | `${ColorRoles}-contrast`;

export type BorderColorKeys =
  | "default"
  | "subtle"
  | "subtleA"
  | "strong"
  | "focus";

export type BorderColorWithRoleKeys =
  | ColorRoles
  | `${ColorRoles}-subtle`
  | `${ColorRoles}-subtleA`
  | `${ColorRoles}-strong`;

export type SpacingKeys =
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

export type ShadowKeys = "dialog";

export type BorderRadiusKeys = "small" | "medium" | "large" | "xlarge" | "full";

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

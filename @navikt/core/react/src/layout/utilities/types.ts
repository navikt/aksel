/* Darkside tokens */
import { semanticTokenConfig } from "@navikt/ds-tokens/darkside/tokens/semantic";
import { StaticBgKeys } from "@navikt/ds-tokens/darkside/tokens/semantic-roles";
import { shadowTokenConfig } from "@navikt/ds-tokens/darkside/tokens/shadow";

/* Old */
import borderRadii from "@navikt/ds-tokens/src/border.json";
import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import borderColors from "@navikt/ds-tokens/src/colors-border.json";
import surfaceColors from "@navikt/ds-tokens/src/colors-surface.json";
import shadows from "@navikt/ds-tokens/src/shadow.json";
import Spacing from "@navikt/ds-tokens/src/spacing.json";

export type BackgroundColorToken = keyof typeof bgColors.a;
export type SurfaceColorToken = keyof typeof surfaceColors.a;
export type BorderColorToken = keyof typeof borderColors.a;
export type BorderRadiiToken =
  | keyof (typeof borderRadii.a)["border-radius"]
  | "0";
export type ShadowToken = keyof typeof shadows.a.shadow;

export type BreakpointsAlias = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type SpacingScale = keyof (typeof Spacing)["a"]["spacing"];

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;

/**
 * Darkside tokens
 */
export type SemanticShadowTokens = keyof ReturnType<
  typeof shadowTokenConfig
>["shadow"];

export type SemanticStaticBgDarkside = keyof ReturnType<
  typeof semanticTokenConfig
>["bg"];

export type SemanticRoleBgDarkside = StaticBgKeys;

export type SemanticStaticBorderDarkside = keyof ReturnType<
  typeof semanticTokenConfig
>["border"];

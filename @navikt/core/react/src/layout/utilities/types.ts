/* Old */
import bgColors from "@navikt/ds-tokens/src/colors-bg.json";
import borderColors from "@navikt/ds-tokens/src/colors-border.json";
import surfaceColors from "@navikt/ds-tokens/src/colors-surface.json";
import { LegacyShadowKeys, SpacingKeys } from "@navikt/ds-tokens/types";

export type BackgroundColorToken = keyof typeof bgColors.a;
export type SurfaceColorToken = keyof typeof surfaceColors.a;
export type BorderColorToken = keyof typeof borderColors.a;
export type ShadowToken = LegacyShadowKeys;

export type BreakpointsAlias = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type SpacingScale = SpacingKeys;

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;

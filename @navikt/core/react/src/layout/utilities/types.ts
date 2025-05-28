import type {
  AkselBorderRadiusTokens,
  AkselBreakpointTokens,
  AkselLegacyBackgroundColorTokens,
  AkselLegacyBorderColorTokens,
  AkselLegacyBorderRadiusTokens,
  AkselLegacyShadowTokens,
  AkselLegacySpacingTokens,
  AkselLegacySurfaceColorTokens,
  AkselSpaceTokens,
} from "@navikt/ds-tokens/types";

export type BackgroundColorToken = AkselLegacyBackgroundColorTokens;
export type SurfaceColorToken = AkselLegacySurfaceColorTokens;
export type BorderColorToken = AkselLegacyBorderColorTokens;
export type ShadowToken = AkselLegacyShadowTokens;

export type BreakpointsAlias = Extract<
  AkselBreakpointTokens,
  "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
>;

export type SpacingScale = AkselLegacySpacingTokens | AkselSpaceTokens;
export type BorderRadiusScale =
  | AkselLegacyBorderRadiusTokens
  | AkselBorderRadiusTokens;

export type SpaceDelimitedAttribute<T extends string> =
  | T
  | `${T} ${T}`
  | `${T} ${T} ${T}`
  | `${T} ${T} ${T} ${T}`;
type FixedResponsiveT<T> = {
  [Breakpoint in BreakpointsAlias]?: T;
};

export type ResponsiveProp<T> = T | FixedResponsiveT<T>;

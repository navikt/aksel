export const colorThemeModes = ["light", "dark"] as const;
export type ColorThemeMode = (typeof colorThemeModes)[number];

export const globalColorRoles = ["neutral", "accent"] as const;

export type GlobalColorRoles = (typeof globalColorRoles)[number];

export type GlobalScaleWithObjectNesting<T extends GlobalColorRoles> = {
  [key in T]: GlobalColorVariable;
};

type GlobalColorScale =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type GlobalColorVariable = Record<
  GlobalColorScale,
  { value: string; type: "global-color"; comment?: string; group: string }
>;

export const tokensWithPrefix = (input: any) => {
  return { a: { ...input } };
};

export type FigmaTokenTypes = "color" | "spacing" | "radius";

export interface FigmaPreparedToken {
  name: string;
  type: FigmaTokenTypes;
  value: string;
  alias?: string;
  comment?: string;
  group: string;
  code: {
    web: string;
  };
}

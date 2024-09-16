import merge from "lodash.merge";
import { tokenConfigForRole } from "./tokens/token-configs";

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

export const tokensForAllRoles = () =>
  globalColorRoles.reduce(
    (acc, role) => merge(acc, tokenConfigForRole(role)),
    {},
  );

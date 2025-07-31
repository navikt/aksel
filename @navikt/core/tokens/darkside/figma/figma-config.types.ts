import { type StyleDictionaryToken, type TokenTypes } from "../tokens.util";

export type FigmaToken = Omit<StyleDictionaryToken<TokenTypes>, "value"> & {
  name: string;
  alias?: string;
  code: Variable["codeSyntax"];
  value: string | number;
  figmaType: VariableResolvedDataType;
  scopes: VariableScope[];
};

export type FigmaConfigEntry = {
  name: string;
  hideFromPublishing: boolean;
  tokens: FigmaToken[];
};

export type FigmaTokenConfig = {
  version: string;
  timestamp: string;
  colors: { light: ColorThemeEntry; dark: ColorThemeEntry };
  radius: FigmaConfigEntry;
  space: FigmaConfigEntry;
};

type ColorThemeEntry = {
  name: "light" | "dark";
  global: FigmaConfigEntry;
  semantic: FigmaConfigEntry;
};

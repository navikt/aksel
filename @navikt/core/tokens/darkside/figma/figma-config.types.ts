import { StyleDictionaryToken, TokenTypes } from "../util";

export type FigmaToken = Omit<StyleDictionaryToken<TokenTypes>, "value"> & {
  name: string;
  alias?: string;
  code: {
    web: string;
  };
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
  spacing: FigmaConfigEntry;
};

type ColorThemeEntry = {
  name: "light" | "dark";
  global: FigmaConfigEntry;
  semantic: FigmaConfigEntry;
};

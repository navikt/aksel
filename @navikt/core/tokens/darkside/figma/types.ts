import { StyleDictionaryToken, TokenTypes } from "../util";

export type FigmaToken = Omit<StyleDictionaryToken<TokenTypes>, "value"> & {
  name: string;
  alias: string;
  code: {
    web: string;
  };
  value: string | number | { r: number; g: number; b: number; a: number };
};

type FigmaConfigEntry = {
  name: string;
  hideFromPublishing: boolean;
  token: FigmaToken[];
};

export type FigmaTokenConfig = {
  globalLight: FigmaConfigEntry;
  globalDark: FigmaConfigEntry;
  semanticColors: FigmaConfigEntry;
  radius: FigmaConfigEntry;
  spacing: FigmaConfigEntry;
};

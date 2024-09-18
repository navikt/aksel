import { StyleDictionaryToken, TokenTypes } from "../util";

export type FigmaToken = StyleDictionaryToken<TokenTypes> & {
  name: string;
  alias: string;
  code: {
    web: string;
  };
};

type FigmaConfigEntry = {
  collection: string;
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

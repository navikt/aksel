import { StyleDictionaryToken, TokenTypes } from "../util";

export type FigmaToken = Omit<StyleDictionaryToken<TokenTypes>, "value"> & {
  name: string;
  alias?: string;
  code: {
    web: string;
  };
  value: VariableValue;
  figmaType: VariableResolvedDataType;
  scopes: VariableScope[];
};

type FigmaConfigEntry = {
  name: string;
  hideFromPublishing: boolean;
  token: FigmaToken[];
};

export type FigmaTokenConfig = {
  version: string;
  date: string;
  globalLight: FigmaConfigEntry;
  globalDark: FigmaConfigEntry;
  semanticColors: FigmaConfigEntry;
  radius: FigmaConfigEntry;
  spacing: FigmaConfigEntry;
};

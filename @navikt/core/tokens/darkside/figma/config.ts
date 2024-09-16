import { FigmaPreparedToken } from "../tokens/util";

type FigmaConfigEntry = {
  collection: string;
  hideFromPublishing: boolean;
  token: FigmaPreparedToken[];
};

export type FigmaTokenConfig = {
  globalLight: FigmaConfigEntry;
  globalDark: FigmaConfigEntry;
  semanticColors: FigmaConfigEntry;
  radius: FigmaConfigEntry;
  spacing: FigmaConfigEntry;
};

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

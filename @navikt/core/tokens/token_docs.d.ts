export type TokenDocT = {
  name: string;
  value: string;
  rawValue: string;
  jsValue: string;
  cssValue: string;
  scssValue: string;
  lessValue: string;
  comment?: string;
  type: string;
  rawType: string;
  group?: string;
  category: string;
  categoryTitle: string;
  role?: string;
  modifier: string;
};

export declare const tokens: TokenDocT[];

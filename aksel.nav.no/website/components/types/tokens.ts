export type TokenForDocumentationT = {
  name: string;
  jsValue: string;
  lessValue: string;
  scssValue: string;
  cssValue: string;
  rawValue: string;
  comment?: string;
  type: string;
  rawType: string;
  group?: string;
  category: string;
  role?: string;
  modifier: string;
  attributes?: {
    [key: string]: any;
  };
};

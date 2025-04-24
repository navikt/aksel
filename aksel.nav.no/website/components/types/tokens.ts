export type TokenForDocumentationT = {
  name: string;
  value: string;
  jsValue: string;
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

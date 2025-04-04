export type TokenForDocumentationT = {
  name: string;
  value: string;
  rawValue: string;
  type: string;
  category: string;
  group?: string;
  modifier?: string;
  role?: string;
  description?: string;
  attributes?: {
    [key: string]: any;
  };
};

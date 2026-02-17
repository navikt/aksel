type QueryFilterOperator =
  | "<"
  | "<="
  | ">"
  | ">="
  | ":"
  | "!:"
  | "="
  | "!="
  | "^"
  | "!^"
  | (string & {});

type QueryFilterOperation = "and" | "or";

type QueryFilterToken = {
  propertyKey: string;
  operator: QueryFilterOperator;
  value: any;
};

type QueryFilterQuery = {
  tokens: QueryFilterToken[];
  operation: QueryFilterOperation;
};

type QueryFilteringOptions = {
  propertyKey: string;
  value: any;
}[];

type QueryFilteringProperty = {
  key: string;
  propertyLabel: string;
};

type QueryFilteringProperties = QueryFilteringProperty[];

export type {
  QueryFilterOperator,
  QueryFilterQuery,
  QueryFilteringOptions,
  QueryFilteringProperty,
  QueryFilterOperation,
  QueryFilteringProperties,
};

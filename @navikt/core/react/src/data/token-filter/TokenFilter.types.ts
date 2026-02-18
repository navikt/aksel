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

type QueryFilteringOption = {
  propertyKey: string;
  value: any;
  label?: string;
  tags?: string[];
  filteringTags?: string[];
  disabled?: boolean;
};

type QueryFilteringOptions = QueryFilteringOption[];

type QueryFilteringOptionGroup = {
  label: string;
  options: QueryFilteringOptions;
};

type QueryFilteringScopedOperator =
  | string
  | { operator: string; tokenType: "single" | "multiple" };

type QueryFilteringProperty = {
  key: string;
  propertyLabel: string;
  groupValuesLabel?: string;
  group?: string;
  operators?: QueryFilteringScopedOperator[];
};

type QueryFilteringProperties = QueryFilteringProperty[];

type ParsedProperty = {
  propertyKey: string;
  propertyLabel: string;
  groupValuesLabel: string;
  propertyGroup: string;
  operators: QueryFilteringScopedOperator[];
  externalProperty: QueryFilteringProperty;
};

type ParsedOption = {
  property: ParsedProperty | null;
  value: any;
  label: string;
  tags: string[];
  filteringTags: string[];
};

export type {
  QueryFilterOperator,
  QueryFilterQuery,
  QueryFilteringOptions,
  QueryFilteringProperty,
  QueryFilterOperation,
  QueryFilteringProperties,
  ParsedProperty,
  ParsedOption,
  QueryFilteringOption,
  QueryFilteringOptionGroup,
};

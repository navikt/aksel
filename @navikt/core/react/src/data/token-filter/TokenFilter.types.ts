/* External API */
type OperatorT =
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

type OperationT = "and" | "or";

type ExternalToken = {
  propertyKey: string;
  operator: OperatorT;
  value: string;
};

type ExternalQuery = {
  tokens: ExternalToken[];
  operation: OperationT;
};

type ExternalPropertyDefinition = {
  propertyKey: string;
  value: string;
  label?: string;
  tags?: string[];
  disabled?: boolean;
};

type ExternalPropertyDefinitions = ExternalPropertyDefinition[];

type ExternalPropertyGroup = {
  label: string;
  options: ExternalPropertyDefinitions;
};

type ExternalPropertyOperator =
  | string
  | { operator: string; type: "single" | "multiple" };

type ExternalProperty = {
  key: string;
  label: string;
  groupLabel?: string;
  group?: string;
  operators?: ExternalPropertyOperator[];
};

type ExternalProperties = ExternalProperty[];

export type {
  ExternalProperties,
  ExternalPropertyDefinition,
  ExternalPropertyDefinitions,
  ExternalPropertyGroup,
  ExternalQuery,
  ExternalToken,
  OperationT,
  OperatorT,
};

/* Internal API */
type InternalPropertyDefinition = {
  key: string;
  label: string;
  groupLabel: string;
  group: string;
  operators: ExternalPropertyOperator[];
  externalProperty: ExternalProperty;
};

type InternalPropertyOption = {
  property: InternalPropertyDefinition | null;
  value: string;
  label: string;
  tags: string[];
};

type InternalParsedTextState =
  | {
      /** User has typed property + complete operator + value (e.g., "Status != active") */
      step: "property";
      property: InternalPropertyDefinition;
      operator: OperatorT;
      value: string;
    }
  | {
      /** User is typing the operator after property (e.g., "Status !") */
      step: "operator";
      property: InternalPropertyDefinition;
      operatorPrefix: string;
    }
  | {
      /** No property match; treat as free-text search */
      step: "free-text";
      value: string;
      operator?: OperatorT;
    };

export type {
  InternalPropertyDefinition,
  InternalPropertyOption,
  InternalParsedTextState,
};

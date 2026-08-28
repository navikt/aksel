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
  /**
   * Key of the property being filtered on.
   * Omitted for free-text tokens, where the value applies to all properties.
   */
  propertyKey?: string;
  operator: OperatorT;
  /**
   * A list of values when the operator is configured as `multiple`, a single value otherwise.
   */
  value: string | string[];
};

type ExternalQuery = {
  tokens: ExternalToken[];
  operation: OperationT;
};

type ExternalPropertyOption = {
  propertyKey: string;
  value: string;
  label?: string;
  tags?: string[];
  disabled?: boolean;
};

type ExternalPropertyOptions = ExternalPropertyOption[];

type ExternalPropertyGroup = {
  label: string;
  options: ExternalPropertyOptions;
};

type ExternalPropertyDefinition = {
  key: string;
  label: string;
  groupLabel?: string;
  group?: string;
  operators?: ExternalPropertyOperator[];
};

type ExternalPropertyDefinitions = ExternalPropertyDefinition[];

/**
 * - `single`: the operator matches a single value, either free-text or one of the predefined options.
 * - `multiple`: the operator only matches predefined options, and several can be selected at once.
 *
 * @default "single"
 */
type OperatorTypeT = "single" | "multiple";

type ExternalPropertyOperator =
  string | { operator: string; type: OperatorTypeT };

export type {
  ExternalPropertyOperator,
  ExternalPropertyOption,
  ExternalPropertyOptions,
  ExternalPropertyDefinition,
  ExternalPropertyDefinitions,
  ExternalPropertyGroup,
  ExternalQuery,
  ExternalToken,
  OperationT,
  OperatorT,
  OperatorTypeT,
};

/* Internal API */
type InternalPropertyDefinition = {
  key: string;
  label: string;
  groupLabel: string;
  group: string;
  operators: ExternalPropertyOperator[];
  externalProperty: ExternalPropertyDefinition;
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
      /**
       * Values already committed for a `multiple` operator (e.g., "Status = active, pending, ").
       * Only set when the operator is configured as `multiple`.
       */
      selectedValues?: string[];
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

import type { ParsedProperty, QueryFilterOperator } from "../TokenFilter.types";

type ParsedText =
  | {
      /** User has typed property + complete operator + value (e.g., "Status != active") */
      step: "property";
      property: ParsedProperty;
      operator: QueryFilterOperator;
      value: string;
    }
  | {
      /** User is typing the operator after property (e.g., "Status !") */
      step: "operator";
      property: ParsedProperty;
      operatorPrefix: string;
    }
  | {
      /** No property match; treat as free-text search */
      step: "free-text";
      value: string;
    };

/**
 * Parse user input text to extract property, operator, and value components.
 * Handles partial input (e.g., user typing "Status !" to complete the operator).
 */
function parseQueryText(
  filteringText: string,
  filteringProperties: ParsedProperty[],
): ParsedText {
  const property = matchFilteringProperty(filteringProperties, filteringText);
  if (!property) {
    return {
      step: "free-text",
      value: filteringText,
    };
  }

  const textWithoutProperty = filteringText
    .substring(property.propertyLabel.length)
    .trimStart();

  const operator = matchOperator(QUERY_OPERATORS, textWithoutProperty);

  if (operator) {
    return {
      step: "property",
      property,
      operator,
      value: textWithoutProperty.substring(operator.length).trimStart(),
    };
  }

  const operatorPrefix = matchOperatorPrefix(
    QUERY_OPERATORS,
    textWithoutProperty,
  );

  if (operatorPrefix !== null) {
    return { step: "operator", property, operatorPrefix };
  }

  return {
    step: "free-text",
    value: filteringText,
  };
}

/**
 * Operators ordered by specificity (longest/most specific first)
 * This ensures longer operators like ">=" and "<=" are matched
 * before shorter ones like ">" and "<"
 */
const QUERY_OPERATORS: QueryFilterOperator[] = [
  ">=",
  "<=",
  "!=",
  "!:",
  "!^",
  "=",
  ":",
  "^",
  ">",
  "<",
];

/**
 * Match a property from the input text by longest property label.
 * Case-insensitive matching.
 */
function matchFilteringProperty(
  filteringProperties: ParsedProperty[],
  text: string,
): ParsedProperty | undefined {
  const sortedProperties = [...filteringProperties].sort(
    (a, b) => b.propertyLabel.length - a.propertyLabel.length,
  );
  return sortedProperties.find((prop) =>
    text.toLowerCase().startsWith(prop.propertyLabel.toLowerCase()),
  );
}

/**
 * Check if the input text is a valid prefix of any allowed operator.
 * Returns the prefix if valid, null otherwise.
 */
function matchOperatorPrefix(
  allowedOperators: QueryFilterOperator[],
  filteringText: string,
): string | null {
  const trimmedText = filteringText.trim();

  if (trimmedText.length === 0) {
    return "";
  }

  const isValidPrefix = allowedOperators.some((operator) =>
    operator.toLowerCase().startsWith(trimmedText.toLowerCase()),
  );

  return isValidPrefix ? trimmedText : null;
}

/**
 * Match an operator from the input text.
 * Operators are already sorted by specificity, so no re-sorting needed.
 */
function matchOperator(
  allowedOperators: QueryFilterOperator[],
  text: string,
): QueryFilterOperator | undefined {
  return allowedOperators.find((operator) =>
    text.toLowerCase().startsWith(operator.toLowerCase()),
  );
}

export { QUERY_OPERATORS, parseQueryText };
export type { ParsedText };

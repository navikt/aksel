import type { ParsedProperty, QueryFilterOperator } from "../TokenFilter.types";
import {
  QUERY_OPERATORS,
  matchFilteringProperty,
  matchOperator,
  matchOperatorPrefix,
} from "./operators";

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
      operator?: QueryFilterOperator;
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
    const freeTextOperator = matchOperator(QUERY_OPERATORS, filteringText);
    if (freeTextOperator) {
      return {
        step: "free-text",
        operator: freeTextOperator,
        value: filteringText.substring(freeTextOperator.length).trimStart(),
      };
    }

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

export { parseQueryText };
export type { ParsedText };

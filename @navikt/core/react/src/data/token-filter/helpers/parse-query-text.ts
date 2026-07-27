import type {
  InternalParsedTextState,
  InternalPropertyDefinition,
} from "../TokenFilter.types";
import {
  QUERY_OPERATORS,
  getValidOperatorsForProperty,
  matchFilteringProperty,
  matchOperator,
  matchOperatorPrefix,
  sortOperatorsBySpecificity,
} from "./operators";

/**
 * Parse user input text to extract property, operator, and value components.
 * Handles partial input (e.g., user typing "Status !" to complete the operator).
 */
function parseQueryText(
  filteringText: string,
  filteringProperties: InternalPropertyDefinition[],
): InternalParsedTextState {
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
    .substring(property.label.length)
    .trimStart();

  /* Only operators the property allows should be parsed as operators */
  const allowedOperators = sortOperatorsBySpecificity(
    getValidOperatorsForProperty(property),
  );

  const operator = matchOperator(allowedOperators, textWithoutProperty);

  if (operator) {
    return {
      step: "property",
      property,
      operator,
      value: textWithoutProperty.substring(operator.length).trimStart(),
    };
  }

  const operatorPrefix = matchOperatorPrefix(
    allowedOperators,
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

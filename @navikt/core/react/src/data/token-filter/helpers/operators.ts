import type { ParsedProperty, QueryFilterOperator } from "../TokenFilter.types";

/**
 * Operators ordered by specificity (longest/most specific first)
 * This ensures longer operators like ">=" and "<=" are matched
 * before shorter ones like ">" and "<"
 */
const Operators: Record<QueryFilterOperator, null> = {
  ">=": null,
  "<=": null,
  "!=": null,
  "!:": null,
  "!^": null,
  "=": null,
  ":": null,
  "^": null,
  ">": null,
  "<": null,
};

const QUERY_OPERATORS: QueryFilterOperator[] = Object.keys(Operators);

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

/**
 * Match a property from the input text by longest property label.
 *
 * properties: [{ propertyLabel: "Instance" }, { propertyLabel: "Instance ID" }]
 * text = "Instance ID:"
 *
 * Result: { propertyLabel: "Instance ID" }
 */
function matchFilteringProperty(
  filteringProperties: ParsedProperty[],
  text: string,
): ParsedProperty | undefined {
  const lowerText = text.toLowerCase();
  let bestMatch: ParsedProperty | undefined;

  for (const prop of filteringProperties) {
    if (lowerText.startsWith(prop.propertyLabel.toLowerCase())) {
      if (
        !bestMatch ||
        prop.propertyLabel.length > bestMatch.propertyLabel.length
      ) {
        bestMatch = prop;
      }
    }
  }

  return bestMatch;
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

export {
  QUERY_OPERATORS,
  matchOperator,
  matchFilteringProperty,
  matchOperatorPrefix,
};

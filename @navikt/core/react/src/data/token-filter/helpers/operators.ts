import type {
  InternalPropertyDefinition,
  OperatorT,
} from "../TokenFilter.types";

/**
 * Operators ordered by specificity (longest/most specific first)
 * This ensures longer operators like ">=" and "<=" are matched
 * before shorter ones like ">" and "<"
 */
const Operators: Record<OperatorT, null> = {
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

const QUERY_OPERATORS: OperatorT[] = Object.keys(Operators);

/**
 * Match an operator from the input text.
 * Operators are already sorted by specificity, so no re-sorting needed.
 */
function matchOperator(
  allowedOperators: OperatorT[],
  text: string,
): OperatorT | undefined {
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
  filteringProperties: InternalPropertyDefinition[],
  text: string,
): InternalPropertyDefinition | undefined {
  const lowerText = text.toLowerCase();
  let bestMatch: InternalPropertyDefinition | undefined;

  for (const prop of filteringProperties) {
    if (lowerText.startsWith(prop.label.toLowerCase())) {
      if (!bestMatch || prop.label.length > bestMatch.label.length) {
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
  allowedOperators: OperatorT[],
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
  matchFilteringProperty,
  matchOperator,
  matchOperatorPrefix,
  QUERY_OPERATORS,
};

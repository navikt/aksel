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
    /* An empty label would match every input, so it is never a valid match */
    if (!prop.label) {
      continue;
    }

    if (lowerText.startsWith(prop.label.toLowerCase())) {
      if (!bestMatch || prop.label.length > bestMatch.label.length) {
        bestMatch = prop;
      }
    }
  }

  return bestMatch;
}

/**
 * Returns the valid operators for a given property, in the order they were configured.
 * If none are configured, falls back to all available operators.
 *
 * `ExternalPropertyOperator` can be a simple string (e.g., "=")
 * or an object with operator and type (e.g., { operator: ":", type: "single" }).
 * This function normalizes both formats, drops unknown operators and removes duplicates.
 *
 * TODO: We omit passing the `type` for now since it's not currently used in the UI. But will be needed for single/multi-selection.
 */
function getValidOperatorsForProperty(
  property: InternalPropertyDefinition,
): OperatorT[] {
  const { operators } = property;

  /* If no operators configured, return all available operators */
  if (!operators || operators.length === 0) {
    return QUERY_OPERATORS;
  }

  const seen = new Set<OperatorT>();
  const validOperators: OperatorT[] = [];

  for (const configuredOperator of operators) {
    const operator =
      typeof configuredOperator === "string"
        ? configuredOperator
        : configuredOperator.operator;

    if (!QUERY_OPERATORS.includes(operator) || seen.has(operator)) {
      continue;
    }

    seen.add(operator);
    validOperators.push(operator);
  }

  return validOperators;
}

/**
 * Sorts operators so the most specific (longest) is matched first.
 * Prevents "<" from matching before "<=" when a property configures both.
 */
function sortOperatorsBySpecificity(operators: OperatorT[]): OperatorT[] {
  return [...operators].sort((a, b) => b.length - a.length);
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
  getValidOperatorsForProperty,
  matchFilteringProperty,
  matchOperator,
  matchOperatorPrefix,
  sortOperatorsBySpecificity,
  QUERY_OPERATORS,
};

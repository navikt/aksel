import type { QueryFilterOperator } from "../TokenFilter.types";

/**
 * Human-readable labels for query filter operators.
 * Used for displaying operator descriptions in autocomplete suggestions.
 * TODO: Support i18n
 */
const OPERATOR_LABELS: Record<QueryFilterOperator, string> = {
  ":": "contains",
  "!:": "does not contain",
  "=": "is",
  "!=": "is not",
  "^": "starts with",
  "!^": "does not start with",
  ">=": "is greater than or equal to",
  "<=": "is less than or equal to",
  ">": "is greater than",
  "<": "is less than",
};

/**
 * Builds a query string from property label, operator, and value.
 * Only includes non-empty parts, joined by spaces.
 * @returns Space-joined query string
 *
 * @example
 * buildQueryString("Status", "=", "active") // "Status = active"
 * buildQueryString("Status", "=", "") // "Status ="
 * buildQueryString("Status", "", "") // "Status"
 * buildQueryString("", "", "") // ""
 */
function buildQueryString(
  propertyLabel: string,
  operator: string,
  value: string,
): string {
  const parts = [propertyLabel, operator, value].filter(Boolean);
  return parts.join(" ");
}

export { buildQueryString, OPERATOR_LABELS };

import type { ExternalToken, OperatorT } from "../TokenFilter.types";

/**
 * Human-readable labels for query filter operators.
 * Used for displaying operator descriptions in autocomplete suggestions.
 * TODO: Support i18n
 */
const OPERATOR_LABELS: Record<OperatorT, string> = {
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

/**
 * Builds the query string for an operator of type `multiple`.
 * Values are comma-separated and always end with a separator so the user can keep typing.
 *
 * @example
 * buildMultiSelectQuery("Status", "=", ["active"]) // "Status = active, "
 * buildMultiSelectQuery("Status", "=", []) // "Status = "
 */
function buildMultiSelectQuery(
  propertyLabel: string,
  operator: string,
  values: string[],
): string {
  const query = buildQueryString(propertyLabel, operator, values.join(", "));
  return values.length > 0 ? `${query}, ` : `${query} `;
}

/**
 * Stable identity for a token, used for de-duplication and as a React key.
 */
function getTokenId(token: ExternalToken): string {
  const values = Array.isArray(token.value) ? token.value : [token.value];
  return `${token.propertyKey ?? ""}|${token.operator}|${values.join(",")}`;
}

export { buildMultiSelectQuery, buildQueryString, getTokenId, OPERATOR_LABELS };

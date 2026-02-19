import type { AutoCompleteOption, OptionGroup } from "../AutoSuggest.types";
import type {
  ParsedOption,
  ParsedProperty,
  QueryFilterOperator,
} from "../TokenFilter.types";
import { createGroups } from "./grouping";
import { QUERY_OPERATORS } from "./operators";
import { type ParsedText } from "./parse-query-text";
import { OPERATOR_LABELS, buildQueryString } from "./query-builder";
import { matchesFilterText } from "./text-matching";

/**
 * Generates "options" to be used as autosuggest-ottion based on the current query state.
 *
 * The query parser recognizes three states:
 * - "property": User has selected/matched a property and operator ("Status = active")
 * - "operator": User has matched a property but is typing the operator ("Status" or "Status !")
 * - "free-text": User is typing freely without a property match (e.g., "act" or "!: test")
 *
 * @returns
 * - value: The canonical query string representation for the current state.
 *   Used by the UI to determine cursor position and input replacement.
 * - options: Grouped suggestions to display (properties, operators, or values).
 */
type AutoCompleteResult = {
  value: string;
  options: OptionGroup<AutoCompleteOption>[];
};

function generateAutoCompleteOptions(
  queryState: ParsedText,
  filteringProperties: ParsedProperty[] = [],
  filteringOptions: ParsedOption[] = [],
): AutoCompleteResult {
  /* State: Property and operator are matched, suggest values */
  if (queryState.step === "property") {
    const filterText = queryState.value || "";

    return {
      value: queryState.value,
      options: createValueSuggestions(
        filteringOptions,
        queryState.operator,
        filterText,
        queryState.property,
      ),
    };
  }

  /* State: Property matched, but operator is incomplete */
  if (queryState.step === "operator") {
    const operators = filterOperatorsByPrefix(
      getValidOperatorsForProperty(queryState.property),
      queryState.operatorPrefix,
    );

    const partialQuery = buildQueryString(
      queryState.property.propertyLabel,
      queryState.operatorPrefix,
      "",
    );

    /**
     * Edge case: User typed an invalid operator prefix that doesn't match any operators.
     * This can happen when typing characters that don't start any valid operator.
     * Return empty suggestions gracefully - the UI will show "no results".
     *
     * TODO: When per-property operator configuration is implemented,
     * this could also occur when a property restricts which operators are valid.
     */
    if (operators.length === 0) {
      return {
        value: partialQuery,
        options: [],
      };
    }

    return {
      value: partialQuery,
      options: generateOperatorSuggestions(
        queryState.property,
        queryState.operatorPrefix,
      ),
    };
  }

  /*
   * Edge case: Input starts with operator but has no value yet (user typed just "!=")
   * Wait for value before showing suggestions
   */
  if (!queryState.value && queryState.operator) {
    return {
      value: "",
      options: [],
    };
  }

  /* Empty input: Show all properties */
  if (!queryState.value) {
    return {
      value: "",
      options: generatePropertySuggestions(filteringProperties),
    };
  }

  /*
   * Free-text search: Show matching values across all properties
   * Use the detected operator if input started with one (e.g., "!= test"), otherwise default to "="
   */
  return {
    value: queryState.value,
    options: createValueSuggestions(
      filteringOptions,
      queryState.operator ?? "=",
      queryState.value,
    ),
  };
}

/**
 * Returns the valid operators for a given property.
 * Extracts operators from the property's custom operator configuration.
 * If none are configured, falls back to all available operators.
 *
 * The QueryFilteringScopedOperator can be a simple string (e.g., "=")
 * or an object with operator and tokenType (e.g., { operator: ":", tokenType: "single" }).
 * This function normalizes both formats and returns just the operator strings.
 *
 * @returns Array of valid operators for the property
 *
 * TODO: We omit passing the tokenType for now since it's not currently used in the UI. But will be needed for single/multi-selection.
 */
function getValidOperatorsForProperty(
  property: ParsedProperty,
): QueryFilterOperator[] {
  const { operators } = property;

  /* If no operators configured, return all available operators */
  if (!operators || operators.length === 0) {
    return QUERY_OPERATORS;
  }

  /*
   * Extract operator strings from QueryFilteringScopedOperator format
   * Handle both simple strings and objects with operator property
   */
  const operatorStrings = operators.map((op) =>
    typeof op === "string" ? op : op.operator,
  );

  /* Filter to only valid QUERY_OPERATORS to ensure type safety */
  return operatorStrings.filter((op) =>
    QUERY_OPERATORS.includes(op as QueryFilterOperator),
  ) as QueryFilterOperator[];
}

/**
 * Filters the list of operators based on the provided prefix.
 * If the prefix is empty, all operators are returned.
 */
function filterOperatorsByPrefix(
  operators: QueryFilterOperator[],
  prefix: string,
): QueryFilterOperator[] {
  if (!prefix) {
    return operators;
  }

  return operators.filter((operator) => operator.startsWith(prefix));
}

function generatePropertySuggestions(
  filteringProperties: ParsedProperty[] = [],
  filterText = "",
): OptionGroup<AutoCompleteOption>[] {
  const filteredProperties: ParsedProperty[] = [];

  for (const property of filteringProperties) {
    if (!property) {
      continue;
    }

    if (
      matchesFilterText(
        [
          property.propertyLabel,
          property.groupValuesLabel,
          property.propertyGroup,
        ].filter(Boolean),
        filterText,
      )
    ) {
      filteredProperties.push(property);
    }
  }

  const groups = createGroups(
    filteredProperties,
    (property) => property.propertyGroup,
    "Properties",
  );

  /**
   * TODO: Unify data better here
   * - descrition etc
   */
  return groups.map((group) => ({
    label: group.label,
    options: group.options.map((property) => ({
      value: buildQueryString(property.propertyLabel, "", ""),
      label: property.propertyLabel,
    })),
  }));
}

function generateOperatorSuggestions(
  property: ParsedProperty,
  operatorPrefix = "",
): OptionGroup<AutoCompleteOption>[] {
  const operators = filterOperatorsByPrefix(
    getValidOperatorsForProperty(property),
    operatorPrefix,
  );

  if (operators.length === 0) {
    return [];
  }

  return [
    {
      label: "Operators",
      options: operators.map((operator) => ({
        value: buildQueryString(property.propertyLabel, operator, ""),
        label: buildQueryString(property.propertyLabel, operator, ""),
        description: OPERATOR_LABELS[operator] ?? "",
      })),
    },
  ];
}

/**
 * Creates value suggestions for autocomplete.
 * When scopedProperty is provided, only shows values for that property (single group).
 * When scopedProperty is omitted, searches across all properties (multiple groups).
 */
function createValueSuggestions(
  filteringOptions: ParsedOption[] = [],
  operator: QueryFilterOperator,
  filterText = "",
  scopedProperty?: ParsedProperty,
): OptionGroup<AutoCompleteOption>[] {
  const groups: Record<string, OptionGroup<AutoCompleteOption>> = {};

  for (const option of filteringOptions) {
    if (!option?.property) {
      continue;
    }

    /* If scoped to a property, filter to only that property's options */
    if (scopedProperty && option.property !== scopedProperty) {
      continue;
    }

    /* Build search fields */
    const searchFields = [
      option.label,
      ...(option.tags ?? []),
      ...(option.filteringTags ?? []),
    ];

    if (!scopedProperty) {
      searchFields.push(option.property.propertyLabel);
    }

    const matches = matchesFilterText(searchFields.filter(Boolean), filterText);

    if (!matches) {
      continue;
    }

    const groupLabel = option.property.groupValuesLabel || "Values";

    if (!groups[groupLabel]) {
      groups[groupLabel] = {
        label: groupLabel,
        options: [],
      };
    }

    groups[groupLabel].options.push({
      value: buildQueryString(
        option.property.propertyLabel,
        operator,
        option.value,
      ),
      label: option.label,
      tags: option.tags,
      filteringTags: option.filteringTags,
    });
  }

  return Object.values(groups).filter((group) => group.options.length > 0);
}

export { generateAutoCompleteOptions };

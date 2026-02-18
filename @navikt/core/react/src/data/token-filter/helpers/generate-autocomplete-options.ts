import type { AutoCompleteOption, OptionGroup } from "../AutoSuggest.types";
import type {
  ParsedOption,
  ParsedProperty,
  QueryFilterOperator,
} from "../TokenFilter.types";
import { createGroups } from "./grouping";
import { type ParsedText, QUERY_OPERATORS } from "./parse-query-text";
import { OPERATOR_LABELS, buildQueryString } from "./query-builder";
import { matchesFilterText } from "./text-matching";

/**
 * Returns the valid operators for a given property.
 * Currently returns all operators for all properties.
 *
 * TODO: Implement per-property operator configuration.
 * This will allow properties to restrict which operators are valid.
 * For example, a boolean property might only support "=" and "!=",
 * while a text property supports ":", "!:", "^", etc.
 *
 * @returns Array of valid operators for the property
 */
function getValidOperatorsForProperty(
  /* TODO: Will be implemented when each property can configure operator per instance */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _property: ParsedProperty,
): QueryFilterOperator[] {
  return QUERY_OPERATORS;
}

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
): OptionGroup<ParsedProperty>[] {
  const filteredProperties = filteringProperties.filter((property) => {
    if (!property) {
      return false;
    }

    return matchesFilterText(
      [
        property.propertyLabel,
        property.groupValuesLabel,
        property.propertyGroup,
      ].filter(Boolean),
      filterText,
    );
  });

  return createGroups(
    filteredProperties,
    (property) => property.propertyGroup,
    "Properties",
  );
}

function generateOperatorSuggestions(
  property: ParsedProperty,
  operatorPrefix = "",
  filterText = "",
): OptionGroup<AutoCompleteOption>[] {
  const operators = filterOperatorsByPrefix(
    getValidOperatorsForProperty(property),
    operatorPrefix,
  ).filter((operator) =>
    matchesFilterText(
      [operator, OPERATOR_LABELS[operator] ?? ""].filter(Boolean),
      filterText,
    ),
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

    // If scoped to a property, filter to only that property's options
    if (scopedProperty && option.property !== scopedProperty) {
      continue;
    }

    // Build search fields
    const searchFields = [
      option.label,
      ...(option.tags ?? []),
      ...(option.filteringTags ?? []),
    ];

    // For free-text search (no scoped property), also search property label
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

function generateValueSuggestions(
  filteringOptions: ParsedOption[] = [],
  property: ParsedProperty,
  operator: QueryFilterOperator,
  filterText = "",
): OptionGroup<AutoCompleteOption>[] {
  return createValueSuggestions(
    filteringOptions,
    operator,
    filterText,
    property,
  );
}

function generateFreeTextValueSuggestions(
  filteringOptions: ParsedOption[] = [],
  operator: QueryFilterOperator,
  filterText = "",
): OptionGroup<AutoCompleteOption>[] {
  return createValueSuggestions(filteringOptions, operator, filterText);
}

/**
 * Generates autocomplete suggestions based on the current query state.
 *
 * The query parser recognizes three states:
 * - "property": User has selected/matched a property and operator (e.g., "Status = active")
 * - "operator": User has matched a property but is typing the operator (e.g., "Status !")
 * - "free-text": User is typing freely without a property match (e.g., "act" or "!:test")
 *
 * Returns an object with:
 * - value: The canonical query string representation for the current state.
 *   Used by the UI to determine cursor position and input replacement.
 * - options: Grouped suggestions to display (properties, operators, or values).
 *
 * @param queryState - Parsed query state from parseQueryText
 * @param filteringProperties - Available properties for filtering (defaults to empty array)
 * @param filteringOptions - Available values for filtering (defaults to empty array)
 * @returns Object containing the query value and suggestion groups
 */
function generateAutoCompleteOptions(
  queryState: ParsedText,
  filteringProperties: ParsedProperty[] = [],
  filteringOptions: ParsedOption[] = [],
) {
  /* State: Property and operator are matched, suggest values */
  if (queryState.step === "property") {
    const filterText = queryState.value || "";

    return {
      value: queryState.value,
      options: generateValueSuggestions(
        filteringOptions,
        queryState.property,
        queryState.operator,
        filterText,
      ),
    };
  }

  // State: Property matched, but operator is incomplete
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

  // State: Free-text mode (no property match)

  // Edge case: Input starts with operator but has no value yet (e.g., user typed just "!=")
  // Don't show suggestions - wait for them to type a value
  if (!queryState.value && queryState.operator) {
    return {
      value: "",
      options: [],
    };
  }

  // Empty input: Show all properties
  if (!queryState.value) {
    return {
      value: "",
      options: generatePropertySuggestions(filteringProperties),
    };
  }

  // Free-text search: Show matching values across all properties
  // Use the detected operator if input started with one (e.g., "!=test"), otherwise default to "="
  return {
    value: queryState.value,
    options: generateFreeTextValueSuggestions(
      filteringOptions,
      queryState.operator ?? "=",
      queryState.value,
    ),
  };
}

export { generateAutoCompleteOptions, QUERY_OPERATORS };

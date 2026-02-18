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
): OptionGroup<ParsedProperty>[] {
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

  return createGroups(
    filteredProperties,
    (property) => property.propertyGroup,
    "Properties",
  );
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

import type {
  ParsedOption,
  ParsedProperty,
  QueryFilterOperator,
} from "../TokenFilter.types";
import { createGroups } from "./grouping";
import { type ParsedText, QUERY_OPERATORS } from "./parse-query-text";
import { OPERATOR_LABELS, buildQueryString } from "./query-builder";
import { matchesFilterText } from "./text-matching";

interface OptionGroup<T> {
  label: string;
  options: T[];
}

interface AutoCompleteOption {
  value: string;
  label: string;
  tags?: string[];
  filteringTags?: string[];
  description?: string;
}

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

function generateAutoCompleteOptions(
  queryState: ParsedText,
  filteringProperties: ParsedProperty[] = [],
  filteringOptions: ParsedOption[] = [],
) {
  /* State: Property AND operator exists */
  if (queryState.step === "property") {
    /* State: Just property AND operator exists. No value */
    if (!queryState.value) {
      return {
        value: queryState.value,
        options: generateValueSuggestions(
          filteringOptions,
          queryState.property,
          queryState.operator,
        ),
      };
    }

    /* State: Propery AND operator AND value */
    return {
      value: queryState.value,
      options: generateValueSuggestions(
        filteringOptions,
        queryState.property,
        queryState.operator,
        queryState.value,
      ),
    };
  }

  /* State: Propery, but no complete operator */
  if (queryState.step === "operator") {
    const operators = filterOperatorsByPrefix(
      getValidOperatorsForProperty(queryState.property),
      queryState.operatorPrefix,
    );

    if (operators.length === 0) {
      throw new Error("Detected unhandles state. Implement edgecase");

      //return {
      //  value: buildQueryString(
      //    queryState.property.propertyLabel,
      //    queryState.operatorPrefix,
      //    "",
      //  ),
      //  options: [] as OptionGroup<AutoCompleteOption | ParsedProperty>[],
      //};
    }

    return {
      value: buildQueryString(
        queryState.property.propertyLabel,
        queryState.operatorPrefix,
        "",
      ),
      options: generateOperatorSuggestions(
        queryState.property,
        queryState.operatorPrefix,
      ),
    };
  }

  /* State: Input starts with operator, but no value yet */
  if (!queryState.value && queryState.operator) {
    return {
      value: "",
      options: [],
    };
  }

  /* State: Empty input */
  if (!queryState.value) {
    return {
      value: queryState.value,
      options: generatePropertySuggestions(filteringProperties),
    };
  }

  /**
   * State: Free-text writing without match on property
   * - If input starts with operator, show value suggestions based on operator
   * - Otherwise, show properties and values matching free-text
   */
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

export type { AutoCompleteOption, OptionGroup };

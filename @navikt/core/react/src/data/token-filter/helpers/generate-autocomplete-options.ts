import type { AutoCompleteOption, OptionGroup } from "../AutoSuggest.types";
import type {
  InternalParsedTextState,
  InternalPropertyDefinition,
  InternalPropertyOption,
  OperatorT,
} from "../TokenFilter.types";
import { createGroups } from "./grouping";
import { getOperatorType, getValidOperatorsForProperty } from "./operators";
import { OPERATOR_LABELS, buildQueryString } from "./query-builder";
import { matchesFilterText } from "./text-matching";

/**
 * Generates "options" to be used as autosuggest-options based on the current query state.
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
  queryState: InternalParsedTextState,
  filteringProperties: InternalPropertyDefinition[] = [],
  filteringOptions: InternalPropertyOption[] = [],
): AutoCompleteResult {
  /* State: Property and operator are matched, suggest values */
  if (queryState.step === "property") {
    const filterText = queryState.value || "";
    const isMultiSelect =
      getOperatorType(queryState.property, queryState.operator) === "multiple";

    const valueSuggestions = createValueSuggestions(
      filteringOptions,
      queryState.operator,
      filterText,
      queryState.property,
      isMultiSelect ? (queryState.selectedValues ?? []) : null,
    );

    /* Operators of type "multiple" only accept known values, so no free-form suggestion */
    if (isMultiSelect) {
      return {
        value: filterText,
        options: valueSuggestions,
      };
    }

    const customQuery = buildQueryString(
      queryState.property.label,
      queryState.operator,
      filterText,
    );

    return {
      value: queryState.value,
      options: withCustomSuggestion(
        valueSuggestions,
        filterText ? { value: customQuery, label: customQuery } : null,
      ),
    };
  }

  /* State: Property matched, but operator is incomplete */
  if (queryState.step === "operator") {
    const partialQuery = buildQueryString(
      queryState.property.label,
      queryState.operatorPrefix,
      "",
    );

    /**
     * Edge case: User typed an invalid operator prefix that doesn't match any operators.
     * This can happen when typing characters that don't start any valid operator.
     * `generateOperatorSuggestions` returns an empty list, and only the free-text suggestion is shown.
     */
    return {
      value: partialQuery,
      options: withCustomSuggestion(
        generateOperatorSuggestions(
          queryState.property,
          queryState.operatorPrefix,
        ),
        createFreeTextSuggestion(partialQuery),
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
    options: withCustomSuggestion(
      [
        ...generatePropertySuggestions(filteringProperties, queryState.value),
        ...createValueSuggestions(
          filteringOptions,
          queryState.operator ?? "=",
          queryState.value,
        ),
      ],
      createFreeTextSuggestion(
        buildQueryString("", queryState.operator ?? "", queryState.value),
        queryState.value,
      ),
    ),
  };
}

/**
 * Suggestion that turns the typed text into a free-text token.
 * Shown while the input hasn't matched both a property and an operator.
 */
function createFreeTextSuggestion(
  value: string,
  label: string = value,
): AutoCompleteOption {
  return {
    value,
    /* TODO: Support i18n */
    label,
    freeText: true,
  };
}

/**
 * Prepends a suggestion for the text the user typed, so any value can be used
 * even when it doesn't match a predefined option.
 *
 * The suggestion is rendered without a group label, and is skipped when an
 * existing suggestion already produces the exact same query string.
 */
function withCustomSuggestion(
  groups: OptionGroup<AutoCompleteOption>[],
  customOption: AutoCompleteOption | null,
): OptionGroup<AutoCompleteOption>[] {
  if (!customOption) {
    return groups;
  }

  const isDuplicate = groups.some((group) =>
    group.options.some((option) => option.value === customOption.value),
  );

  if (isDuplicate) {
    return groups;
  }

  return [{ label: "", options: [customOption] }, ...groups];
}

/**
 * Filters the list of operators based on the provided prefix.
 * If the prefix is empty, all operators are returned.
 */
function filterOperatorsByPrefix(
  operators: OperatorT[],
  prefix: string,
): OperatorT[] {
  if (!prefix) {
    return operators;
  }

  return operators.filter((operator) => operator.startsWith(prefix));
}

function generatePropertySuggestions(
  filteringProperties: InternalPropertyDefinition[] = [],
  filterText = "",
): OptionGroup<AutoCompleteOption>[] {
  const filteredProperties: InternalPropertyDefinition[] = [];

  for (const property of filteringProperties) {
    if (!property) {
      continue;
    }

    if (
      matchesFilterText(
        [property.label, property.groupLabel, property.group].filter(Boolean),
        filterText,
      )
    ) {
      filteredProperties.push(property);
    }
  }

  const groups = createGroups(
    filteredProperties,
    (property) => property.group,
    "Properties",
  );

  return groups.map((group) => ({
    label: group.label,
    options: group.options.map((property) => ({
      value: buildQueryString(property.label, "", ""),
      label: property.label,
    })),
  }));
}

function generateOperatorSuggestions(
  property: InternalPropertyDefinition,
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
        value: buildQueryString(property.label, operator, ""),
        label: buildQueryString(property.label, operator, ""),
        description: OPERATOR_LABELS[operator] ?? "",
      })),
    },
  ];
}

/**
 * Creates value suggestions for autocomplete.
 * When scopedProperty is provided, only shows values for that property (single group).
 * When scopedProperty is omitted, searches across all properties (multiple groups).
 * When multiSelectValues is provided, options are rendered as toggleable checkboxes.
 * TODO: This could potentially contain an unlimited number of options if there are many values across properties.
 * May need virtualization/async or other filtering mechanism.
 */

function createValueSuggestions(
  filteringOptions: InternalPropertyOption[] = [],
  operator: OperatorT,
  filterText = "",
  scopedProperty?: InternalPropertyDefinition,
  multiSelectValues: string[] | null = null,
): OptionGroup<AutoCompleteOption>[] {
  const groups: Record<string, OptionGroup<AutoCompleteOption>> = {};

  for (const option of filteringOptions) {
    if (!option?.property) {
      continue;
    }

    /* If scoped to a property, filter to only that property's options */
    if (scopedProperty && option.property.key !== scopedProperty.key) {
      continue;
    }

    /* Don't suggest values with an operator the property doesn't support */
    if (!getValidOperatorsForProperty(option.property).includes(operator)) {
      continue;
    }

    /* Build search fields */
    const searchFields = [option.label, ...(option.tags ?? [])];

    if (!scopedProperty) {
      searchFields.push(option.property.label);
    }

    const matches = matchesFilterText(searchFields.filter(Boolean), filterText);

    if (!matches) {
      continue;
    }

    const groupLabel = option.property.groupLabel || "Values";

    if (!groups[groupLabel]) {
      groups[groupLabel] = {
        label: groupLabel,
        options: [],
      };
    }

    const query = buildQueryString(
      option.property.label,
      operator,
      option.value,
    );

    groups[groupLabel].options.push({
      /* Stays stable while toggling, so virtual focus survives a multi-select */
      value: query,
      label: multiSelectValues ? option.label : query,
      tags: option.tags,
      ...(multiSelectValues && {
        multiSelect: {
          value: option.value,
          selected: multiSelectValues.includes(option.value),
        },
      }),
    });
  }

  return Object.values(groups).filter((group) => group.options.length > 0);
}

export { generateAutoCompleteOptions };

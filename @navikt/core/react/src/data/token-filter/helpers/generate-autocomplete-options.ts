import type { ParsedOption, ParsedProperty } from "../TokenFilter.types";
import { type ParsedText, QUERY_OPERATORS } from "./parse-query-text";

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

function buildQueryString(
  propertyLabel: string,
  operator: string,
  value: string,
): string {
  const parts = [propertyLabel, operator, value].filter(Boolean);
  return parts.join(" ");
}

/* TODO: i18n */
const OPERATOR_LABELS: Record<string, string> = {
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
 * Grouping option for autocomplete suggestions structures:
 *
 * Step: "free-text" + empty value:
 * - Group: "Properties" with all properties.
 *
 * Step: "free-text" with non-empty value:
 * - Group: "Properties". All properties including the filter text in label or description or tags. String match.
 * - Group: "Values". All "property = value" combinations where either the property label or value label or description or tags include the filter text. String match.
 * - - Ignore all other operators than "=" for value suggestions.
 *
 * Step: "property" + empty value:
 * - Group: "Operators". All operators valid for the selected property.
 *
 * Step: "property" + non-empty value:
 * - Group: "Operators". All operators valid for the selected property with string match. Only relevant for multi letter operators like "!="
 *
 * Step: "operator" + empty value:
 * - Group: "<Property> values". All values valid for the selected property and operator. String match on value label, description and tags.
 *
 * Step: "operator" + non-empty value:
 * - Group: "<Property> values". All values valid for the selected property and operator with string match. String match on value label, description and tags.
 *
 *
 * TODO:
 * - Handle custom groups
 * - Multi vs single-select: Allow operators for each options where user can define type to be enum: { operator: "=", tokenType: "enum" }. Enum-type options allow selecting multiple values, i.e state = ("active", "pending"))
 */

/**
 * TODO: Update based on instructions above.
 */
function generateAutoCompleteOptions(
  queryState: ParsedText,
  filteringProperties: ParsedProperty[] = [],
  filteringOptions: ParsedOption[] = [],
) {
  if (queryState.step === "property") {
    if (!queryState.property) {
      return {
        value: queryState.value,
        options: [],
      };
    }
    const { propertyLabel, groupValuesLabel } = queryState.property;
    const options = filteringOptions.filter(
      (o) => o.property === queryState.property,
    );

    return {
      value: queryState.value,
      options: [
        {
          label: groupValuesLabel,
          options: options.map(({ label, value, tags, filteringTags }) => ({
            value: buildQueryString(propertyLabel, queryState.operator, value),
            label,
            tags,
            filteringTags,
          })),
        },
      ],
    };
  }
  if (queryState.step === "operator") {
    return {
      value: buildQueryString(
        queryState.property.propertyLabel,
        queryState.operatorPrefix,
        "",
      ),
      options: [
        ...generatePropertySuggestions(filteringProperties),
        {
          options: QUERY_OPERATORS.map((value) => ({
            value: buildQueryString(
              queryState.property.propertyLabel,
              value,
              "",
            ),
            label: buildQueryString(
              queryState.property.propertyLabel,
              value,
              "",
            ),
            description: OPERATOR_LABELS[value] ?? "",
          })),
          /* TODO: i18n */
          label: "Operator",
        },
      ],
    };
  }

  const needsValueSuggestions = !!queryState.value;
  const needsPropertySuggestions = !(
    queryState.step === "free-text" && queryState.operator === "!:"
  );

  return {
    value: queryState.value,
    options: [
      ...(needsPropertySuggestions
        ? generatePropertySuggestions(filteringProperties)
        : []),
      ...(needsValueSuggestions
        ? generateAllValueSuggestions(filteringOptions)
        : []),
    ],
  };
}

function createAutoCompleteOption(
  propertyLabel: string,
  operator: string,
  value: string,
  label: string,
  tags?: string[],
  filteringTags?: string[],
): AutoCompleteOption {
  return {
    value: buildQueryString(propertyLabel, operator, value),
    label: buildQueryString(propertyLabel, operator, label),
    tags,
    filteringTags,
  };
}

function generateAllValueSuggestions(
  filteringOptions: ParsedOption[] = [],
): OptionGroup<AutoCompleteOption>[] {
  const groups: Record<string, OptionGroup<AutoCompleteOption>> = {};

  for (const option of filteringOptions) {
    if (!option || !option.property) {
      continue;
    }

    const groupLabel = option.property.groupValuesLabel || "Values";

    if (!groups[groupLabel]) {
      groups[groupLabel] = {
        label: groupLabel,
        options: [],
      };
    }

    const { label, value, tags, filteringTags, property } = option;
    const options = QUERY_OPERATORS.map((operator) =>
      createAutoCompleteOption(
        property.propertyLabel,
        operator,
        value,
        label,
        tags,
        filteringTags,
      ),
    );

    groups[groupLabel].options.push(...options);
  }

  return Object.values(groups);
}

function generatePropertySuggestions(
  filteringProperties: ParsedProperty[] = [],
): OptionGroup<ParsedProperty>[] {
  const defaultGroup: OptionGroup<ParsedProperty> = {
    label: "Properties",
    options: [],
  };
  const customGroups: Record<string, OptionGroup<ParsedProperty>> = {};

  for (const property of filteringProperties) {
    if (!property) {
      continue;
    }
    const groupLabel = property.propertyGroup?.trim();

    if (groupLabel) {
      if (!customGroups[groupLabel]) {
        customGroups[groupLabel] = {
          label: groupLabel,
          options: [],
        };
      }
      customGroups[groupLabel].options.push(property);
      continue;
    }

    defaultGroup.options.push(property);
  }

  const groups: OptionGroup<ParsedProperty>[] = [
    ...Object.values(customGroups),
  ];

  if (defaultGroup.options.length > 0) {
    groups.push(defaultGroup);
  }

  return groups;
}

export { generateAutoCompleteOptions };

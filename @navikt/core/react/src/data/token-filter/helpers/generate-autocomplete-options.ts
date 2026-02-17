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
  propertyLabel: string = "",
  operator: string = "",
  value: string = "",
): string {
  return `${propertyLabel} ${operator} ${value}`;
}

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
      ).trim(),
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
            ).trim(),
            description: humanReadableOperator(value),
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
  propertyLabel: string = "",
  operator: string = "",
  value: string = "",
  label: string = "",
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

/* TODO: i18n */
function humanReadableOperator(operator: string | undefined): string {
  if (!operator) {
    return "";
  }
  switch (operator) {
    case ":":
      return "contains";
    case "!:": {
      return "does not contain";
    }
    case "=": {
      return "is";
    }
    case "!=": {
      return "is not";
    }
    case "^": {
      return "starts with";
    }
    case "!^": {
      return "does not start with";
    }
    case ">=": {
      return "is greater than or equal to";
    }
    case "<=": {
      return "is less than or equal to";
    }
    case ">": {
      return "is greater than";
    }
    case "<": {
      return "is less than";
    }
    default:
      return "";
  }
}

export { generateAutoCompleteOptions };

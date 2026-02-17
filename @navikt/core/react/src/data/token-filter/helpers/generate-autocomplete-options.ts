import type { ParsedOption, ParsedProperty } from "../TokenFilter.types";
import { type ParsedText, QUERY_OPERATORS } from "./parse-query-text";

function generateAutoCompleteOptions(
  queryState: ParsedText,
  filteringProperties: ParsedProperty[],
  filteringOptions: ParsedOption[],
) {
  if (queryState.step === "property") {
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
            value: propertyLabel + " " + queryState.operator + " " + value,
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
      filterText:
        queryState.property.propertyLabel + " " + queryState.operatorPrefix,
      options: [
        ...generatePropertySuggestions(filteringProperties),
        {
          options: QUERY_OPERATORS.map((value) => ({
            value: queryState.property.propertyLabel + " " + value + " ",
            label: queryState.property.propertyLabel + " " + value,
            description: humanReadableOperator(value),
          })),
          /* TODO: i18n */
          label: "Operator",
        },
      ],
    };
  } else if (queryState.step === "free-text") {
    const needsValueSuggestions = !!queryState.value;
    const needsPropertySuggestions = true; /* !(queryState.step === 'free-text' && queryState.operator === '!:'); */
    return {
      filterText: queryState.value,
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

  return [];
}

interface OptionGroup<T> {
  label: string;
  options: T[];
}

function generateAllValueSuggestions<T>(filteringOptions: ParsedOption[]) {
  const groups: Record<string, OptionGroup<ParsedOption>> = {};

  for (const option of filteringOptions) {
    if (!option.property) {
      continue;
    }

    const groupLabel = option.property.groupValuesLabel || "Values";

    if (!groups[groupLabel]) {
      groups[groupLabel] = {
        label: groupLabel,
        options: [],
      };
    }

    groups[groupLabel].options.push(option);
  }

  const result: OptionGroup<any>[] = [];

  for (const group of Object.values(groups)) {
    result.push({
      label: group.label,
      options: group.options.flatMap(
        ({ label, value, tags, filteringTags, property }) =>
          property
            ? QUERY_OPERATORS.map((operator) => ({
                value: property.propertyLabel + " " + operator + " " + value,
                label: property.propertyLabel + " " + operator + " " + label,
                tags,
                filteringTags,
              }))
            : [],
      ),
    });
  }

  return result as OptionGroup<T>[];
}

function generatePropertySuggestions<T>(filteringProperties: ParsedProperty[]) {
  const defaultGroup: OptionGroup<ParsedProperty> = {
    label: "Properties",
    options: [],
  };
  const customGroups: Record<string, OptionGroup<ParsedProperty>> = {};

  for (const property of filteringProperties) {
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

  return groups as OptionGroup<T>[];
}

/* TODO: i18n */
function humanReadableOperator(operator: string) {
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

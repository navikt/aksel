import React, { forwardRef, useState } from "react";
import { Popover } from "../../popover";
import { cl } from "../../utils/helpers";
import { AutoSuggest } from "./AutoSuggest";
import type {
  ParsedOption,
  ParsedProperty,
  QueryFilterQuery,
  QueryFilteringOptions,
  QueryFilteringProperties,
} from "./TokenFilter.types";
import { generateAutoCompleteOptions } from "./helpers/generate-autocomplete-options";
import { parseQueryText } from "./helpers/parse-query-text";

type TokenFilterProps = {
  query: QueryFilterQuery;
  onChange: (newQuery: QueryFilterQuery) => void;
  className?: string;
  filteringOptions: QueryFilteringOptions;
  filteringProperties: QueryFilteringProperties;
};

export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  ({ query, className, filteringProperties, filteringOptions }, ref) => {
    const [inputAnchor, setInputAnchor] = useState<HTMLInputElement | null>(
      null,
    );

    const [filterText, setFilterText] = useState<string>("");
    const { properties, options } = derrivedFilterState(
      filteringProperties,
      filteringOptions,
    );

    const queryState = parseQueryText(filterText, properties);

    const autoCompleteOptions = generateAutoCompleteOptions(
      queryState,
      properties,
      options,
    );

    const handleSelectOption = (value: string) => {
      setFilterText(value);
      setCustomOpen(false);
    };

    const [customOpen, setCustomOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={cl("aksel-property-filter", className)}
        role="search"
      >
        <input
          type="text"
          className="aksel-property-filter__input"
          placeholder="Type to filter..."
          ref={setInputAnchor}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          onFocus={() => setCustomOpen(true)}
        />
        <Popover
          anchorEl={inputAnchor}
          open={customOpen}
          onClose={() => {
            setFilterText("");
            setCustomOpen(false);
          }}
        >
          <AutoSuggest
            options={autoCompleteOptions.options}
            onSelect={handleSelectOption}
          />
        </Popover>
        {query.tokens.map((token, index) => {
          return (
            <div key={index} className="aksel-property-filter__token">
              <strong>{token.propertyKey}</strong> {token.operator}{" "}
            </div>
          );
        })}
        <ul>
          {filteringProperties.map((prop) => (
            <li key={prop.key}>{prop.propertyLabel}</li>
          ))}
        </ul>
        {/* <pre>{JSON.stringify(queryState, null, 2)}</pre> */}
        <pre>{JSON.stringify(autoCompleteOptions, null, 2)}</pre>
      </div>
    );
  },
);

function derrivedFilterState(
  filteringProperties: QueryFilteringProperties,
  filteringOptions: QueryFilteringOptions,
  /* query: QueryFilterQuery */
): {
  properties: ParsedProperty[];
  options: ParsedOption[];
} {
  const propertyMap = new Map<string, any>();

  for (const property of filteringProperties) {
    propertyMap.set(property.key, {
      propertyKey: property.key,
      propertyLabel: property?.propertyLabel ?? "",
      groupValuesLabel: property?.groupValuesLabel ?? "",
      propertyGroup: property?.group,
      operators: property?.operators ?? [],
      /* defaultOperator: property?.defaultOperator ?? '=', */
      externalProperty: property,
    });
  }

  const internalOptions = filteringOptions.map((option) => ({
    property: propertyMap.get(option.propertyKey) ?? null,
    value: option.value,
    label: option.label ?? option.value ?? "",
    tags: option.tags ?? [],
    filteringTags: option.filteringTags ?? [],
  }));

  return { properties: [...propertyMap.values()], options: internalOptions };
}

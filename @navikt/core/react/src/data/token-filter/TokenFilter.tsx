import React, { forwardRef, useState } from "react";
import { Popover } from "../../popover";
import { HStack } from "../../primitives/stack";
import { cl } from "../../utils/helpers";
import { AutoSuggest } from "./AutoSuggest";
import type {
  ParsedOption,
  ParsedProperty,
  QueryFilterOperation,
  QueryFilterQuery,
  QueryFilterToken,
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

/**
 * TODO:
 * - Implement onChange handler to update query state when user selects an autocomplete option.
 * - Handle token rendering and editing (e.g., show tokens for matched properties/operators/values, allow deleting tokens).
 */
export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  (
    { query, className, filteringProperties, filteringOptions, onChange },
    ref,
  ) => {
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

    const [customOpen, setCustomOpen] = useState(false);

    const { addToken } = createActionHandlers({
      query,
      onChange,
    });

    const createToken = (newText: string) => {
      const newQueryState = parseQueryText(newText, properties);

      let newToken: QueryFilterToken | null = null;

      switch (newQueryState.step) {
        case "property": {
          if (newQueryState.value === "") {
            return;
          }
          newToken = {
            propertyKey: newQueryState.property.propertyKey,
            operator: newQueryState.operator,
            value: newQueryState.value,
          };
          break;
        }
        case "free-text": {
          break;
        }
        case "operator": {
          break;
        }
      }
      if (newToken) {
        addToken(newToken);
        setFilterText("");
        setCustomOpen(false);
      }
    };

    const handleSelectOption = (value: string) => {
      setFilterText(value);
      createToken(value);
    };

    const isValid = queryState.step === "property" && queryState.value !== "";

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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createToken(filterText);
            }
          }}
          style={{
            outline: isValid ? "1px solid green" : "1px solid transparent",
          }}
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
        <HStack marginBlock="space-8" gap="space-8">
          {query.tokens.map((token, index) => {
            return (
              <React.Fragment
                key={`${token.propertyKey}-${token.operator}-${token.value}-${index}`}
              >
                <button key={index}>
                  {`${token.propertyKey} ${token.operator} ${token.value}`}
                </button>
                {index < query.tokens.length - 1 && (
                  <span>{query.operation}</span>
                )}
              </React.Fragment>
            );
          })}
        </HStack>
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
  }));

  return { properties: [...propertyMap.values()], options: internalOptions };
}

function createActionHandlers({
  query,
  onChange,
}: {
  query: QueryFilterQuery;
  onChange: (newQuery: QueryFilterQuery) => void;
}) {
  const handleChange = (newQuery: QueryFilterQuery) => {
    onChange(newQuery);
  };

  const addToken = (token: QueryFilterToken) => {
    handleChange({ ...query, tokens: [...query.tokens, token] });
  };

  const updateToken = (updateIndex: number, updatedToken: QueryFilterToken) => {
    handleChange({
      ...query,
      tokens: query.tokens.map((token, index) =>
        index === updateIndex ? updatedToken : token,
      ),
    });
  };

  const updateOperation = (operation: QueryFilterOperation) => {
    handleChange({ ...query, operation });
  };

  const removeToken = (removeIndex: number) => {
    handleChange({
      ...query,
      tokens: query.tokens.filter((_, index) => index !== removeIndex),
    });
  };

  const removeAllTokens = () => {
    handleChange({ ...query, tokens: [] });
  };

  return {
    addToken,
    updateToken,
    updateOperation,
    removeToken,
    removeAllTokens,
  };
}

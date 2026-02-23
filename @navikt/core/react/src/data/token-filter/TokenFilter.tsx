import React, { forwardRef, useState } from "react";
import { Popover } from "../../popover";
import { HStack } from "../../primitives/stack";
import { cl } from "../../utils/helpers";
import { AutoSuggest } from "./AutoSuggest";
import type {
  ExternalProperties,
  ExternalPropertyDefinitions,
  ExternalQuery,
  ExternalToken,
  InternalPropertyDefinition,
  InternalPropertyOption,
  OperationT,
} from "./TokenFilter.types";
import { generateAutoCompleteOptions } from "./helpers/generate-autocomplete-options";
import { parseQueryText } from "./helpers/parse-query-text";

type TokenFilterProps = {
  query: ExternalQuery;
  onChange: (newQuery: ExternalQuery) => void;
  className?: string;
  propertyDefinitions: ExternalPropertyDefinitions;
  propertyOptions: ExternalProperties;
};

/**
 * TODO:
 * - Implement onChange handler to update query state when user selects an autocomplete option.
 * - Handle token rendering and editing (e.g., show tokens for matched properties/operators/values, allow deleting tokens).
 */
export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  (
    { query, className, propertyDefinitions, propertyOptions, onChange },
    ref,
  ) => {
    const [inputAnchor, setInputAnchor] = useState<HTMLInputElement | null>(
      null,
    );
    const [filterText, setFilterText] = useState<string>("");

    const { parsedPropertyDefinitions, parsedPropertyOptions } =
      derrivedFilterState(propertyDefinitions, propertyOptions);

    const queryState = parseQueryText(filterText, parsedPropertyDefinitions);

    const autoCompleteOptions = generateAutoCompleteOptions(
      queryState,
      parsedPropertyDefinitions,
      parsedPropertyOptions,
    );

    const [customOpen, setCustomOpen] = useState(false);

    const { addToken } = createActionHandlers({
      query,
      onChange,
    });

    const createToken = (newText: string) => {
      const newQueryState = parseQueryText(newText, parsedPropertyDefinitions);

      let newToken: ExternalToken | null = null;

      switch (newQueryState.step) {
        case "property": {
          if (newQueryState.value === "") {
            return;
          }
          newToken = {
            propertyKey: newQueryState.property.key,
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
          {propertyOptions.map((prop) => (
            <li key={prop.key}>{prop.label}</li>
          ))}
        </ul>
        {/* <pre>{JSON.stringify(queryState, null, 2)}</pre> */}
        <pre>{JSON.stringify(autoCompleteOptions, null, 2)}</pre>
      </div>
    );
  },
);

function derrivedFilterState(
  propertyDefinitions: ExternalPropertyDefinitions,
  propteryOptions: ExternalProperties,
): {
  parsedPropertyDefinitions: InternalPropertyDefinition[];
  parsedPropertyOptions: InternalPropertyOption[];
} {
  const propertyMap = new Map<string, any>();

  for (const property of propteryOptions) {
    propertyMap.set(property.key, {
      propertyKey: property.key,
      propertyLabel: property?.label ?? "",
      groupValuesLabel: property?.groupLabel ?? "",
      propertyGroup: property?.group,
      operators: property?.operators ?? [],
      /* defaultOperator: property?.defaultOperator ?? '=', */
      externalProperty: property,
    });
  }

  const internalOptions = propertyDefinitions.map((option) => ({
    property: propertyMap.get(option.propertyKey) ?? null,
    value: option.value,
    label: option.label ?? option.value ?? "",
    tags: option.tags ?? [],
  }));

  return {
    parsedPropertyDefinitions: [...propertyMap.values()],
    parsedPropertyOptions: internalOptions,
  };
}

function createActionHandlers({
  query,
  onChange,
}: {
  query: ExternalQuery;
  onChange: (newQuery: ExternalQuery) => void;
}) {
  const handleChange = (newQuery: ExternalQuery) => {
    onChange(newQuery);
  };

  const addToken = (token: ExternalToken) => {
    handleChange({ ...query, tokens: [...query.tokens, token] });
  };

  const updateToken = (updateIndex: number, updatedToken: ExternalToken) => {
    handleChange({
      ...query,
      tokens: query.tokens.map((token, index) =>
        index === updateIndex ? updatedToken : token,
      ),
    });
  };

  const updateOperation = (operation: OperationT) => {
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

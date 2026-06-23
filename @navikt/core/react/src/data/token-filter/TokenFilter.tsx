import React, { forwardRef, useState } from "react";
import { cl } from "../../utils/helpers";
import { AutoSuggest } from "./AutoSuggest";
import { AutoCompleteOption } from "./AutoSuggest.types";
import { TokenFilterChips } from "./FilterChip";
import type {
  ExternalOptions,
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
  options: ExternalOptions;
};

/*
 * TODO:
 * - Implement onChange handler to update query state when user selects an autocomplete option.
 * - Handle token rendering and editing (e.g., show tokens for matched properties/operators/values, allow deleting tokens).
 * - Writing "stance" still shows status and hostname options
 */
export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  ({ query, className, propertyDefinitions, options, onChange }, ref) => {
    const [filterText, setFilterText] = useState<string>("");
    const [open, setOpen] = useState(false);

    const { parsedPropertyDefinitions, parsedPropertyOptions } =
      derrivedFilterState(propertyDefinitions, options);

    const queryState = parseQueryText(filterText, parsedPropertyDefinitions);

    const autoCompleteOptions = generateAutoCompleteOptions(
      queryState,
      parsedPropertyDefinitions,
      parsedPropertyOptions,
    );

    const { addToken, removeToken, updateOperation } = createActionHandlers({
      query,
      onChange,
    });

    const createToken = (newText: string): boolean => {
      const newQueryState = parseQueryText(newText, parsedPropertyDefinitions);

      let newToken: ExternalToken | null = null;

      switch (newQueryState.step) {
        case "property": {
          if (newQueryState.value === "") {
            return false;
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
        return true;
      }
      return false;
    };

    const handleSelectOption = (option: AutoCompleteOption) => {
      const newQueryState = parseQueryText(
        option.value,
        parsedPropertyDefinitions,
      );

      if (
        (newQueryState.step === "property" && newQueryState.value === "") ||
        newQueryState.step === "operator"
      ) {
        /* Add space after for better formatting */
        /* TODO: Handle this scenario better */
        setFilterText(`${option.value} `);
        return false;
      }
      setFilterText(option.value);
      return createToken(option.value);
    };

    return (
      <div
        ref={ref}
        className={cl("aksel-property-filter", className)}
        role="search"
      >
        <AutoSuggest
          onSelect={handleSelectOption}
          options={autoCompleteOptions.options}
          value={filterText}
          onChange={setFilterText}
          open={open}
          setOpen={setOpen}
        />
        <TokenFilterChips
          tokens={query.tokens}
          removeToken={removeToken}
          updateOperation={updateOperation}
          operation={query.operation}
        />
      </div>
    );
  },
);

function derrivedFilterState(
  propertyDefinitions: ExternalPropertyDefinitions,
  propteryOptions: ExternalOptions,
): {
  parsedPropertyDefinitions: InternalPropertyDefinition[];
  parsedPropertyOptions: InternalPropertyOption[];
} {
  const propertyMap = new Map<string, InternalPropertyDefinition>();

  for (const property of propertyDefinitions) {
    propertyMap.set(property.key, {
      key: property.key,
      label: property?.label ?? "",
      groupLabel: property?.groupLabel ?? "",
      group: property?.group ?? "",
      operators: property?.operators ?? [],
      externalProperty: property,
    });
  }

  const internalOptions: InternalPropertyOption[] = [];

  for (const option of propteryOptions) {
    internalOptions.push({
      property: propertyMap.get(option.propertyKey) ?? null,
      value: option.value,
      label: option.label ?? option.value ?? "",
      tags: option.tags ?? [],
    });
  }

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

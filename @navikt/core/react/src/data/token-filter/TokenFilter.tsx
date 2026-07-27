import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { cl } from "../../utils/helpers";
import { AutoSuggest } from "./AutoSuggest";
import type { AutoCompleteOption } from "./AutoSuggest.types";
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
 * - Handle token editing (e.g. change operator/value on an existing token).
 * - Support free-text tokens.
 */
export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  ({ query, className, propertyDefinitions, options, onChange }, ref) => {
    const [filterText, setFilterText] = useState<string>("");
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { propertyMap, parsedPropertyDefinitions, parsedPropertyOptions } =
      useMemo(
        () => deriveFilterState(propertyDefinitions, options),
        [propertyDefinitions, options],
      );

    const autoCompleteOptions = useMemo(
      () =>
        generateAutoCompleteOptions(
          parseQueryText(filterText, parsedPropertyDefinitions),
          parsedPropertyDefinitions,
          parsedPropertyOptions,
        ),
      [filterText, parsedPropertyDefinitions, parsedPropertyOptions],
    );

    const { addToken, removeToken, updateOperation } = useMemo(
      () => createActionHandlers({ query, onChange }),
      [query, onChange],
    );

    const createToken = useCallback(
      (newText: string): boolean => {
        const newQueryState = parseQueryText(
          newText,
          parsedPropertyDefinitions,
        );

        if (newQueryState.step !== "property" || newQueryState.value === "") {
          return false;
        }

        addToken({
          propertyKey: newQueryState.property.key,
          operator: newQueryState.operator,
          value: newQueryState.value,
        });
        setFilterText("");
        return true;
      },
      [addToken, parsedPropertyDefinitions],
    );

    const handleSelectOption = useCallback(
      (option: AutoCompleteOption) => {
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

        return createToken(option.value);
      },
      [createToken, parsedPropertyDefinitions],
    );

    const handleRemoveToken = useCallback(
      (index: number) => {
        removeToken(index);
        /* The removed chip owned focus, so move it somewhere predictable */
        /* TODO: Should we stop popup from showing in this case? */
        inputRef.current?.focus();
      },
      [removeToken],
    );

    const formatToken = useCallback(
      (token: ExternalToken) => {
        const propertyLabel =
          propertyMap.get(token.propertyKey)?.label || token.propertyKey;

        const valueLabel =
          parsedPropertyOptions.find(
            (option) =>
              option.property?.key === token.propertyKey &&
              option.value === token.value,
          )?.label || token.value;

        return `${propertyLabel} ${token.operator} ${valueLabel}`;
      },
      [propertyMap, parsedPropertyOptions],
    );

    return (
      // biome-ignore lint/a11y/useSemanticElements: search-tag is too new (baseline 2023)
      <div
        ref={ref}
        className={cl("aksel-property-filter", className)}
        role="search"
      >
        <AutoSuggest
          ref={inputRef}
          onSelect={handleSelectOption}
          options={autoCompleteOptions.options}
          value={filterText}
          onChange={setFilterText}
          onSubmit={createToken}
          open={open}
          setOpen={setOpen}
        />
        <TokenFilterChips
          tokens={query.tokens}
          removeToken={handleRemoveToken}
          updateOperation={updateOperation}
          operation={query.operation}
          formatToken={formatToken}
        />
      </div>
    );
  },
);

function deriveFilterState(
  propertyDefinitions: ExternalPropertyDefinitions,
  propertyOptions: ExternalOptions,
): {
  propertyMap: Map<string, InternalPropertyDefinition>;
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

  for (const option of propertyOptions) {
    internalOptions.push({
      property: propertyMap.get(option.propertyKey) ?? null,
      value: option.value,
      label: option.label ?? option.value ?? "",
      tags: option.tags ?? [],
    });
  }

  return {
    propertyMap,
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
    const alreadyExists = query.tokens.some(
      (existing) =>
        existing.propertyKey === token.propertyKey &&
        existing.operator === token.operator &&
        existing.value === token.value,
    );

    if (alreadyExists) {
      return;
    }

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

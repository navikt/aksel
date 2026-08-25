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
  ExternalPropertyDefinitions,
  ExternalPropertyOptions,
  ExternalQuery,
  ExternalToken,
  InternalPropertyDefinition,
  InternalPropertyOption,
  OperationT,
  OperatorT,
} from "./TokenFilter.types";
import { generateAutoCompleteOptions } from "./helpers/generate-autocomplete-options";
import { getOperatorType } from "./helpers/operators";
import { parseQueryText } from "./helpers/parse-query-text";
import { buildMultiSelectQuery, getTokenId } from "./helpers/query-builder";

type TokenFilterProps = {
  query: ExternalQuery;
  onChange: (newQuery: ExternalQuery) => void;
  className?: string;
  /**
   * The properties users can filter on, e.g. "Status" or "Region".
   */
  propertyDefinitions: ExternalPropertyDefinitions;
  /**
   * The selectable values for each property, linked through `propertyKey`.
   */
  propertyOptions: ExternalPropertyOptions;
};

/*
 * TODO:
 * - Handle token editing (e.g. change operator/value on an existing token).
 * - Support free-text tokens.
 */
export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  (
    { query, className, propertyDefinitions, propertyOptions, onChange },
    ref,
  ) => {
    const [filterText, setFilterText] = useState<string>("");
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { propertyMap, parsedPropertyDefinitions, parsedPropertyOptions } =
      useMemo(
        () => deriveFilterState(propertyDefinitions, propertyOptions),
        [propertyDefinitions, propertyOptions],
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
      (newText: string, freeText = false): boolean => {
        const newQueryState = parseQueryText(
          newText,
          /* Free-text input must not be re-interpreted as a property query */
          freeText ? [] : parsedPropertyDefinitions,
        );

        if (newQueryState.step === "operator") {
          return false;
        }

        if (
          newQueryState.step === "property" &&
          getOperatorType(newQueryState.property, newQueryState.operator) ===
            "multiple"
        ) {
          /* A "multiple" operator only accepts values that exist as options */
          const values = getKnownValues(
            parsedPropertyOptions,
            newQueryState.property.key,
            newQueryState.selectedValues ?? [],
          );

          if (values.length === 0) {
            return false;
          }

          addToken({
            propertyKey: newQueryState.property.key,
            operator: newQueryState.operator,
            value: values,
          });
          setFilterText("");
          return true;
        }

        if (newQueryState.value === "") {
          return false;
        }

        addToken(
          newQueryState.step === "property"
            ? {
                propertyKey: newQueryState.property.key,
                operator: newQueryState.operator,
                value: newQueryState.value,
              }
            : {
                /* Free-text tokens apply to all properties */
                operator: newQueryState.operator ?? ":",
                value: newQueryState.value,
              },
        );
        setFilterText("");
        return true;
      },
      [addToken, parsedPropertyDefinitions, parsedPropertyOptions],
    );

    const handleSelectOption = useCallback(
      (option: AutoCompleteOption) => {
        if (option.freeText) {
          return createToken(option.value, true);
        }

        const newQueryState = parseQueryText(
          filterText,
          parsedPropertyDefinitions,
        );

        if (option.multiSelect && newQueryState.step === "property") {
          /* Toggling keeps the popup open so several values can be picked */
          setFilterText(
            toggleMultiSelectValue(
              parsedPropertyOptions,
              newQueryState.property,
              newQueryState.operator,
              newQueryState.selectedValues ?? [],
              option.multiSelect.value,
            ),
          );
          return false;
        }

        const optionQueryState = parseQueryText(
          option.value,
          parsedPropertyDefinitions,
        );

        if (
          (optionQueryState.step === "property" &&
            optionQueryState.value === "") ||
          optionQueryState.step === "operator"
        ) {
          /* Add space after for better formatting */
          /* TODO: Handle this scenario better */
          setFilterText(`${option.value} `);
          return false;
        }

        return createToken(option.value);
      },
      [
        createToken,
        filterText,
        parsedPropertyDefinitions,
        parsedPropertyOptions,
      ],
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
        const values = Array.isArray(token.value) ? token.value : [token.value];

        if (!token.propertyKey) {
          return values.join(", ");
        }

        const propertyLabel =
          propertyMap.get(token.propertyKey)?.label || token.propertyKey;

        const valueLabels = values.map(
          (value) =>
            parsedPropertyOptions.find(
              (option) =>
                option.property?.key === token.propertyKey &&
                option.value === value,
            )?.label || value,
        );

        return `${propertyLabel} ${token.operator} ${valueLabels.join(", ")}`;
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
          highlightText={autoCompleteOptions.value}
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
  propertyOptions: ExternalPropertyOptions,
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

/**
 * Keeps only the values that exist as options for the property, in the order they were typed.
 * Used to discard partially typed values for operators of type "multiple".
 */
function getKnownValues(
  propertyOptions: InternalPropertyOption[],
  propertyKey: string,
  values: string[],
): string[] {
  const knownValues = new Set(
    propertyOptions
      .filter((option) => option.property?.key === propertyKey)
      .map((option) => option.value),
  );

  return values.filter((value) => knownValues.has(value));
}

/**
 * Adds or removes a value from a "multiple" operator query, and returns the new query text.
 */
function toggleMultiSelectValue(
  propertyOptions: InternalPropertyOption[],
  property: InternalPropertyDefinition,
  operator: OperatorT,
  selectedValues: string[],
  toggledValue: string,
): string {
  const values = getKnownValues(propertyOptions, property.key, selectedValues);

  return buildMultiSelectQuery(
    property.label,
    operator,
    values.includes(toggledValue)
      ? values.filter((value) => value !== toggledValue)
      : [...values, toggledValue],
  );
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
    const tokenId = getTokenId(token);
    const alreadyExists = query.tokens.some(
      (existing) => getTokenId(existing) === tokenId,
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

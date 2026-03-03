import React, { forwardRef, useState } from "react";
import { Popover } from "../../popover";
import { HStack } from "../../primitives/stack";
import { ListboxGroup } from "../../utils/components/Listbox/group/ListboxGroup";
import { ListboxItem } from "../../utils/components/Listbox/item/ListboxItem";
import Listbox from "../../utils/components/Listbox/root/ListboxRoot";
import { cl } from "../../utils/helpers";
import { AutoCompleteOption } from "./AutoSuggest.types";
// import { AutoSuggest } from "./AutoSuggest";
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

/**
 * TODO:
 * - Implement onChange handler to update query state when user selects an autocomplete option.
 * - Handle token rendering and editing (e.g., show tokens for matched properties/operators/values, allow deleting tokens).
 */
export const TokenFilter = forwardRef<HTMLDivElement, TokenFilterProps>(
  ({ query, className, propertyDefinitions, options, onChange }, ref) => {
    const [inputAnchor, setInputAnchor] = useState<HTMLInputElement | null>(
      null,
    );
    const [filterText, setFilterText] = useState<string>("");
    const [virtuallyFocusedItemValue, setVirtuallyFocusedItemValue] =
      useState("");

    const { parsedPropertyDefinitions, parsedPropertyOptions } =
      derrivedFilterState(propertyDefinitions, options);

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

    const handleSelectOption = (option: AutoCompleteOption) => {
      setFilterText(option.value);
      createToken(option.value);
    };

    const isValid = queryState.step === "property" && queryState.value !== "";

    return (
      <div
        ref={ref}
        className={cl("aksel-property-filter", className)}
        role="search"
      >
        <Listbox setVirtuallyFocusedItemValue={setVirtuallyFocusedItemValue}>
          <Listbox.InputSlot>
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
          </Listbox.InputSlot>
          <Popover
            anchorEl={inputAnchor}
            open={customOpen}
            onClose={() => {
              setFilterText("");
              setCustomOpen(false);
            }}
          >
            {/* <AutoSuggest
            options={autoCompleteOptions.options}
            onSelect={handleSelectOption}
          /> */}
            <Listbox.List
              virtuallyFocusedItemValue={virtuallyFocusedItemValue}
              setVirtuallyFocusedItemValue={setVirtuallyFocusedItemValue}
              items={autoCompleteOptions.options.map((option) => ({
                label: option.label,
                id: option.label,
                items: option.options,
              }))}
              onToggleItem={handleSelectOption}
              style={{ maxHeight: "350px" }}
            >
              {autoCompleteOptions.options.map((group) => (
                <ListboxGroup
                  key={group.label}
                  group={{ label: group.label, id: group.label, items: [] }}
                  childrenProp={false}
                >
                  {group.options.map((item) => (
                    <ListboxItem
                      key={item.value}
                      item={item}
                      onToggleItem={handleSelectOption}
                      isSelected={false}
                      hasVirtualFocus={virtuallyFocusedItemValue === item.value}
                      textToHighlight=""
                    >
                      <span>{item.label}</span>
                      {item.description && <em> {item.description}</em>}
                      {item.tags && item.tags.length > 0 && (
                        <div>
                          {item.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </ListboxItem>
                  ))}
                </ListboxGroup>
              ))}
            </Listbox.List>
          </Popover>
        </Listbox>

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
          {options.map((prop) => (
            <li key={prop.value}>{prop.label}</li>
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

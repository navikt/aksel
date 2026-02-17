import React, { forwardRef, useMemo } from "react";
import { cl } from "../../utils/helpers";
import type {
  QueryFilteringOption,
  QueryFilteringOptionGroup,
} from "./TokenFilter.types";

interface AutoSuggestOption {
  value: string;
  label: string;
  tags?: string[];
  filteringTags?: string[];
  description?: string;
}

interface AutoSuggestGroup {
  label: string;
  options: AutoSuggestOption[];
}

interface AutoSuggestProps {
  options: AutoSuggestGroup[];
  value: string;
  filterText: string;
  onSelect: (value: string) => void;
  className?: string;
}

const AutoSuggest = forwardRef<HTMLDivElement, AutoSuggestProps>(
  ({ options, value, filterText, onSelect, className }, ref) => {
    console.info({ options, value, filterText });
    /* const highlightedText = filterText === undefined ? value : filterText; */
    /* const filterValue = (value || "").toLowerCase();

    const filteredGroups = options
      .map((group) => ({
        ...group,
        options: group.options.filter((option) => {
          const searchableText = [
            option.label,
            option.description,
            ...(option.filteringTags ?? []),
            ...(option.tags ?? []),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return searchableText.includes(filterValue);
        }),
      }))
      .filter((group) => group.options.length > 0); */

    const { items } = useAutosuggestItems({ options, filterValue: filterText });

    console.info({ items });

    return (
      <div ref={ref} className={cl("aksel-auto-suggest", className)}>
        {options.map((group) => (
          <div key={group.label} className="aksel-auto-suggest__group">
            <div className="aksel-auto-suggest__group-label">{group.label}</div>
            <ul className="aksel-auto-suggest__list">
              {group.options.map((option) => (
                <li key={option.value} className="aksel-auto-suggest__item">
                  <button
                    type="button"
                    className="aksel-auto-suggest__button"
                    onClick={() => onSelect(option.value)}
                  >
                    <span className="aksel-auto-suggest__label">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="aksel-auto-suggest__description">
                        {option.description}
                      </span>
                    )}
                    {option.tags && option.tags.length > 0 && (
                      <div className="aksel-auto-suggest__tags">
                        {option.tags.map((tag) => (
                          <span key={tag} className="aksel-auto-suggest__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  },
);

function useAutosuggestItems({ options, filterValue }) {
  const { items } = useMemo(() => createItems(options), [options]);

  const filteredItems = useMemo(() => {
    const localFilteredItems = items;
    if (filterValue) {
      localFilteredItems.unshift({
        value: filterValue,
        type: "use-entered",
        label: `Use "${filterValue}"`,
        option: { value: filterValue },
      });
    }
    return localFilteredItems;
  }, [items, filterValue]);

  return { items: filteredItems };
}

/* TODO: Need to split autosuggest types and filter types */
type AutoSuggestItem = {
  type?: "parent" | "child" | "use-entered";
  option: QueryFilteringOption | QueryFilteringOptionGroup | { value: string };
  parent?: QueryFilteringOptionGroup;
  disabled?: boolean;
  value?: string;
  label?: string;
};

function createItems(
  options: (QueryFilteringOption | QueryFilteringOptionGroup)[],
) {
  const items: AutoSuggestItem[] = [];
  const itemToGroup = new WeakMap<AutoSuggestItem, AutoSuggestItem>();

  for (const option of options) {
    if (isGroup(option)) {
      for (const item of flattenGroup(option, itemToGroup)) {
        items.push(item);
      }
    } else {
      items.push({ ...option, option });
    }
  }

  return { items };
}

function flattenGroup(
  group: QueryFilteringOptionGroup,
  map: WeakMap<AutoSuggestItem, AutoSuggestItem>,
) {
  const { options, ...rest } = group;

  const groupItem: AutoSuggestItem = { ...rest, type: "parent", option: group };

  const items: AutoSuggestItem[] = [groupItem];

  for (const option of options) {
    const childOption: AutoSuggestItem = {
      ...option,
      type: "child",
      disabled: option.disabled ?? false,
      option,
      parent: group,
    };

    items.push(childOption);

    map.set(childOption, groupItem);
  }

  return items;
}

function isGroup(
  optionOrGroup: QueryFilteringOption | QueryFilteringOptionGroup,
): optionOrGroup is QueryFilteringOptionGroup {
  return "options" in optionOrGroup;
}

export { AutoSuggest };

import React from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { ComboboxOption } from "../types";
import AddNewOption from "./AddNewOption";
import FilteredOptionsGroup from "./FilteredOptionsGroup";
import FilteredOptionsItem from "./FilteredOptionsItem";
import LoadingMessage from "./LoadingMessage";
import MaxSelectedMessage from "./MaxSelectedMessage";
import NoSearchHitsMessage from "./NoSearchHitsMessage";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const FilteredOptions = () => {
  const { cn } = useRenameCSS();
  const {
    inputProps: { id },
  } = useInputContext();

  const {
    allowNewValues,
    isLoading,
    isListOpen,
    filteredOptions,
    setFilteredOptionsRef,
    isMouseLastUsedInputDevice,
    isValueNew,
  } = useFilteredOptionsContext();

  const { maxSelected, isMultiSelect } = useSelectedOptionsContext();

  const shouldRenderNonSelectables =
    (isMultiSelect && maxSelected.limit) || // Render maxSelected message
    isLoading || // Render loading message
    (!isLoading && filteredOptions.length === 0 && !allowNewValues); // Render no hits message

  const shouldRenderFilteredOptionsList =
    (allowNewValues && isValueNew && !maxSelected.isLimitReached) || // Render add new option
    filteredOptions.length > 0; // Render filtered options

  const groups = filteredOptions.reduce(
    (_groups: string[], option: ComboboxOption): string[] => {
      if (option.group && !_groups.includes(option.group)) {
        return [..._groups, option.group];
      }
      return _groups;
    },
    [],
  );

  return (
    <div
      className={cn("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
        "navds-combobox__list--with-hover": isMouseLastUsedInputDevice,
      })}
      id={filteredOptionsUtil.getFilteredOptionsId(id)}
      tabIndex={-1}
    >
      {shouldRenderNonSelectables && (
        <div
          className={cn("navds-combobox__list_non-selectables")}
          role="status"
        >
          {isMultiSelect && maxSelected.limit && <MaxSelectedMessage />}
          {isLoading && <LoadingMessage />}
          {!isLoading && filteredOptions.length === 0 && !allowNewValues && (
            <NoSearchHitsMessage />
          )}
        </div>
      )}

      {shouldRenderFilteredOptionsList && (
        /* biome-ignore lint/a11y/useFocusableInteractive: Interaction is not handeled by listbox itself. */
        <ul
          ref={setFilteredOptionsRef}
          role="listbox"
          className={cn("navds-combobox__list-options")}
        >
          {isValueNew && !maxSelected.isLimitReached && allowNewValues && (
            <AddNewOption />
          )}
          {groups.length > 0 &&
            groups.map((group) => (
              <FilteredOptionsGroup
                key={group}
                group={group}
                options={filteredOptions.filter(
                  (option) => option.group === group,
                )}
              />
            ))}
          {groups.length === 0 &&
            filteredOptions.map((option) => (
              <FilteredOptionsItem key={option.value} option={option} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredOptions;

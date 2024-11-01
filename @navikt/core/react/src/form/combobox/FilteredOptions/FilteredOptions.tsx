import cl from "clsx";
import React from "react";
import { Detail } from "../../../typography";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { ComboboxOption } from "../types";
import AddNewOption from "./AddNewOption";
import FilteredOptionsItem from "./FilteredOptionsItem";
import LoadingMessage from "./LoadingMessage";
import MaxSelectedMessage from "./MaxSelectedMessage";
import NoSearchHitsMessage from "./NoSearchHitsMessage";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const FilteredOptions = () => {
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
  const { maxSelected } = useSelectedOptionsContext();

  const shouldRenderNonSelectables =
    maxSelected?.isLimitReached || // Render maxSelected message
    isLoading || // Render loading message
    (!isLoading && filteredOptions.length === 0 && !allowNewValues); // Render no hits message

  const shouldRenderFilteredOptionsList =
    (allowNewValues && isValueNew && !maxSelected?.isLimitReached) || // Render add new option
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
      className={cl("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
        "navds-combobox__list--with-hover": isMouseLastUsedInputDevice,
      })}
      id={filteredOptionsUtil.getFilteredOptionsId(id)}
      tabIndex={-1}
    >
      {shouldRenderNonSelectables && (
        <div className="navds-combobox__list_non-selectables" role="status">
          {maxSelected?.isLimitReached && <MaxSelectedMessage />}
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
          className="navds-combobox__list-options"
        >
          {isValueNew && !maxSelected?.isLimitReached && allowNewValues && (
            <AddNewOption />
          )}
          {groups.length > 0 &&
            groups.map((group) => (
              <div
                role="group"
                className="navds-combobox__list__group"
                key={group}
                aria-labelledby={`group-${group}`}
              >
                <Detail
                  id={`group-${group}`}
                  className="navds-combobox__list__group__heading"
                  data-no-focus="true"
                  weight="semibold"
                >
                  {group}
                </Detail>
                {filteredOptions
                  .filter((option) => option.group === group)
                  .map((option) => (
                    <FilteredOptionsItem key={option.value} option={option} />
                  ))}
              </div>
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

import React from "react";
import { Floating } from "../../../overlays/floating/Floating";
import { useRenameCSS } from "../../../theme/Theme";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import AddNewOption from "./AddNewOption";
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

  return (
    <Floating.Content
      className={cn("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
        "navds-combobox__list--with-hover": isMouseLastUsedInputDevice,
      })}
      id={filteredOptionsUtil.getFilteredOptionsId(id)}
      tabIndex={-1}
      sideOffset={8}
      side="bottom"
      avoidCollisions={false}
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
          {filteredOptions.map((option) => (
            <FilteredOptionsItem key={option.value} option={option} />
          ))}
        </ul>
      )}
    </Floating.Content>
  );
};

export default FilteredOptions;

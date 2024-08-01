import cl from "clsx";
import React from "react";
import { Loader } from "../../../loader";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import AddNewOption from "./AddNewOption";
import FilteredOptionsItem from "./FilteredOptionsItem";
import MaxSelectedMessage from "./MaxSelectedMessage";
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
          {isLoading && (
            <div
              className="navds-combobox__list-item--loading"
              id={filteredOptionsUtil.getIsLoadingId(id)}
            >
              <Loader title="Søker..." />
            </div>
          )}
          {!isLoading && filteredOptions.length === 0 && !allowNewValues && (
            <div
              className="navds-combobox__list-item--no-options"
              id={filteredOptionsUtil.getNoHitsId(id)}
            >
              Ingen søketreff
            </div>
          )}
        </div>
      )}

      {shouldRenderFilteredOptionsList && (
        <ul
          ref={setFilteredOptionsRef}
          role="listbox"
          className="navds-combobox__list-options"
        >
          {isValueNew && !maxSelected?.isLimitReached && allowNewValues && (
            <AddNewOption />
          )}
          {filteredOptions.map((option) => (
            <FilteredOptionsItem key={option.value} option={option} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredOptions;

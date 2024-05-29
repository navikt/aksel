import cl from "clsx";
import React from "react";
import { CheckmarkIcon, PlusIcon } from "@navikt/aksel-icons";
import { Loader } from "../../../loader";
import { BodyShort, Label } from "../../../typography";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { isInList, toComboboxOption } from "../combobox-utils";
import { ComboboxOption } from "../types";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const FilteredOptions = () => {
  const {
    inputProps: { id },
    size,
    value,
  } = useInputContext();
  const {
    allowNewValues,
    isLoading,
    isListOpen,
    filteredOptions,
    setFilteredOptionsRef,
    isMouseLastUsedInputDevice,
    setIsMouseLastUsedInputDevice,
    isValueNew,
    toggleIsListOpen,
    activeDecendantId,
    virtualFocus,
  } = useFilteredOptionsContext();
  const { isMultiSelect, selectedOptions, toggleOption, maxSelected } =
    useSelectedOptionsContext();

  const isDisabled = (option: ComboboxOption) =>
    maxSelected?.isLimitReached && !isInList(option.value, selectedOptions);

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
          {maxSelected?.isLimitReached && (
            <div
              className="navds-combobox__list-item--max-selected"
              id={filteredOptionsUtil.getMaxSelectedOptionsId(id)}
            >
              {maxSelected.message ??
                `${selectedOptions.length} av ${maxSelected.limit} er valgt.`}
            </div>
          )}
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
            <li
              tabIndex={-1}
              onMouseMove={() => {
                if (
                  activeDecendantId !==
                  filteredOptionsUtil.getAddNewOptionId(id)
                ) {
                  virtualFocus.moveFocusToElement(
                    filteredOptionsUtil.getAddNewOptionId(id),
                  );
                  setIsMouseLastUsedInputDevice(true);
                }
              }}
              onPointerUp={(event) => {
                toggleOption(toComboboxOption(value), event);
                if (!isMultiSelect && !isInList(value, selectedOptions))
                  toggleIsListOpen(false);
              }}
              id={filteredOptionsUtil.getAddNewOptionId(id)}
              className={cl(
                "navds-combobox__list-item navds-combobox__list-item--new-option",
                {
                  "navds-combobox__list-item--new-option--focus":
                    activeDecendantId ===
                    filteredOptionsUtil.getAddNewOptionId(id),
                },
              )}
              role="option"
              aria-selected={false}
            >
              <PlusIcon aria-hidden />
              <BodyShort size={size}>
                Legg til{" "}
                <Label as="span" size={size}>
                  &#8220;{value}&#8221;
                </Label>
              </BodyShort>
            </li>
          )}
          {filteredOptions.map((option) => (
            <li
              className={cl("navds-combobox__list-item", {
                "navds-combobox__list-item--focus":
                  activeDecendantId ===
                  filteredOptionsUtil.getOptionId(id, option.label),
                "navds-combobox__list-item--selected": isInList(
                  option.value,
                  selectedOptions,
                ),
              })}
              data-no-focus={isDisabled(option) || undefined}
              id={filteredOptionsUtil.getOptionId(id, option.label)}
              key={option.label}
              tabIndex={-1}
              onMouseMove={() => {
                if (
                  activeDecendantId !==
                  filteredOptionsUtil.getOptionId(id, option.label)
                ) {
                  virtualFocus.moveFocusToElement(
                    filteredOptionsUtil.getOptionId(id, option.label),
                  );
                  setIsMouseLastUsedInputDevice(true);
                }
              }}
              onPointerUp={(event) => {
                if (isDisabled(option)) {
                  return;
                }
                toggleOption(option, event);
                if (
                  !isMultiSelect &&
                  !isInList(option.value, selectedOptions)
                ) {
                  toggleIsListOpen(false);
                }
              }}
              role="option"
              aria-selected={isInList(option.value, selectedOptions)}
              aria-disabled={isDisabled(option) || undefined}
            >
              <BodyShort size={size}>{option.label}</BodyShort>
              {isInList(option.value, selectedOptions) && <CheckmarkIcon />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilteredOptions;

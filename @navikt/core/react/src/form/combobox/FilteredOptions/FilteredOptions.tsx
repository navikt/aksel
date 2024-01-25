import cl from "clsx";
import React from "react";
import { CheckmarkIcon, PlusIcon } from "@navikt/aksel-icons";
import { Loader } from "../../../loader";
import { BodyShort, Label } from "../../../typography";
import { useInputContext } from "../Input/inputContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
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

  const isDisabled = (option) =>
    maxSelected?.isLimitReached && !selectedOptions.includes(option);

  return (
    <div
      className={cl("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
        "navds-combobox__list--with-hover": isMouseLastUsedInputDevice,
      })}
      id={filteredOptionsUtil.getFilteredOptionsId(id)}
      tabIndex={-1}
    >
      <div className="navds-combobox__list_non-selectables" role="status">
        {maxSelected?.isLimitReached && (
          <div
            className="navds-combobox__list-item navds-combobox__list-item--max-selected"
            id={filteredOptionsUtil.getMaxSelectedOptionsId(id)}
          >
            {maxSelected.message ??
              `${selectedOptions.length} av ${maxSelected.limit} er valgt.`}
          </div>
        )}
        {isLoading && (
          <div
            className="navds-combobox__list-item navds-combobox__list-item--loading"
            id={filteredOptionsUtil.getIsLoadingId(id)}
          >
            <Loader title="Søker..." />
          </div>
        )}
        {!isLoading && filteredOptions.length === 0 && (
          <div
            className="navds-combobox__list-item navds-combobox__list-item--no-options"
            id={filteredOptionsUtil.getNoHitsId(id)}
          >
            Ingen søketreff
          </div>
        )}
      </div>

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
                activeDecendantId !== filteredOptionsUtil.getAddNewOptionId(id)
              ) {
                virtualFocus.moveFocusToElement(
                  filteredOptionsUtil.getAddNewOptionId(id),
                );
                setIsMouseLastUsedInputDevice(true);
              }
            }}
            onPointerUp={(event) => {
              toggleOption(value, event);
              if (!isMultiSelect && !selectedOptions.includes(value))
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
                filteredOptionsUtil.getOptionId(id, option),
              "navds-combobox__list-item--selected":
                selectedOptions.includes(option),
            })}
            data-no-focus={isDisabled(option) || undefined}
            id={filteredOptionsUtil.getOptionId(id, option)}
            key={option}
            tabIndex={-1}
            onMouseMove={() => {
              if (
                activeDecendantId !==
                filteredOptionsUtil.getOptionId(id, option)
              ) {
                virtualFocus.moveFocusToElement(
                  filteredOptionsUtil.getOptionId(id, option),
                );
                setIsMouseLastUsedInputDevice(true);
              }
            }}
            onPointerUp={(event) => {
              if (isDisabled(option)) {
                return;
              }
              toggleOption(option, event);
              if (!isMultiSelect && !selectedOptions.includes(option))
                toggleIsListOpen(false);
            }}
            role="option"
            aria-selected={selectedOptions.includes(option)}
            aria-disabled={isDisabled(option) || undefined}
          >
            <BodyShort size={size}>{option}</BodyShort>
            {selectedOptions.includes(option) && <CheckmarkIcon />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredOptions;

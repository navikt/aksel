import React from "react";
import cl from "clsx";
import { CheckmarkIcon, PlusIcon } from "@navikt/aksel-icons";
import { useFilteredOptionsContext } from "./filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "../Input/inputContext";
import { Loader } from "../../../loader";
import { BodyShort, Label } from "../../../typography";
import filteredOptionsUtil from "./filtered-options-util";

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
  const {
    canSelectMoreOptions,
    isMultiSelect,
    selectedOptions,
    toggleOption,
    maxSelectedOptions,
  } = useSelectedOptionsContext();

  const isDisabled = (option) =>
    !canSelectMoreOptions && !selectedOptions.includes(option);

  return (
    <ul
      ref={setFilteredOptionsRef}
      className={cl("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
        "navds-combobox__list--with-hover": isMouseLastUsedInputDevice,
      })}
      id={filteredOptionsUtil.getFilteredOptionsId(id)}
      role="listbox"
      tabIndex={-1}
    >
      {!canSelectMoreOptions && (
        <li
          className="navds-combobox__list-item navds-combobox__list-item__max-selected"
          role="option"
          aria-selected={false}
          id={`${id}-max-selected`}
          data-no-focus="true"
        >
          {`${selectedOptions.length} av ${maxSelectedOptions} er valgt.`}
        </li>
      )}
      {isLoading && (
        <li
          className="navds-combobox__list-item navds-combobox__list-item__loading"
          role="option"
          aria-selected={false}
          id={filteredOptionsUtil.getIsLoadingId(id)}
          data-no-focus="true"
        >
          <Loader aria-label="Søker..." />
        </li>
      )}
      {isValueNew && canSelectMoreOptions && allowNewValues && (
        <li
          tabIndex={-1}
          onMouseMove={() => {
            if (
              activeDecendantId !== filteredOptionsUtil.getAddNewOptionId(id)
            ) {
              virtualFocus.moveFocusToElement(
                filteredOptionsUtil.getAddNewOptionId(id)
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
            "navds-combobox__list-item navds-combobox__list-item__new-option",
            {
              "navds-combobox__list-item__new-option--focus":
                activeDecendantId === filteredOptionsUtil.getAddNewOptionId(id),
            }
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
      {!isLoading && filteredOptions.length === 0 && (
        <li
          className="navds-combobox__list-item navds-combobox__list-item__no-options"
          role="option"
          aria-selected={false}
          id={filteredOptionsUtil.getNoHitsId(id)}
          data-no-focus="true"
        >
          Ingen søketreff
        </li>
      )}
      {filteredOptions.map((option) => (
        <li
          className={cl("navds-combobox__list-item", {
            "navds-combobox__list-item--focus":
              activeDecendantId === filteredOptionsUtil.getOptionId(id, option),
            "navds-combobox__list-item--selected":
              selectedOptions.includes(option),
          })}
          data-no-focus={isDisabled(option) || undefined}
          id={filteredOptionsUtil.getOptionId(id, option)}
          key={option}
          tabIndex={-1}
          onMouseMove={() => {
            if (
              activeDecendantId !== filteredOptionsUtil.getOptionId(id, option)
            ) {
              virtualFocus.moveFocusToElement(
                filteredOptionsUtil.getOptionId(id, option)
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
        >
          <BodyShort size={size}>{option}</BodyShort>
          {selectedOptions.includes(option) && <CheckmarkIcon />}
        </li>
      ))}
    </ul>
  );
};

export default FilteredOptions;

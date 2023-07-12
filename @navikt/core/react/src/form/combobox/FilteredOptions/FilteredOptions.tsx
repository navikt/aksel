import React from "react";
import cl from "clsx";
import { BodyShort, Label, Loader } from "../../..";
import { CheckmarkIcon, PlusIcon } from "@navikt/aksel-icons";
import { useFilteredOptionsContext } from "./filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "../Input/inputContext";

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
    filteredOptionsIndex,
    filteredOptionsRef,
    isValueNew,
    toggleIsListOpen,
  } = useFilteredOptionsContext();
  const { isMultiSelect, selectedOptions, toggleOption } =
    useSelectedOptionsContext();

  return (
    <ul
      ref={filteredOptionsRef}
      className={cl("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
      })}
      id={`${id}-filtered-options`}
      role="listbox"
    >
      {isLoading && (
        <li
          className="navds-combobox__list-item--loading"
          role="option"
          aria-selected={false}
          id={`${id}-is-loading`}
        >
          <Loader aria-label="Søker..." />
        </li>
      )}
      {isValueNew && allowNewValues && (
        <li
          tabIndex={-1}
          onPointerUp={(event) => toggleOption(value, event)}
          id={`${id}-combobox-new-option`}
          className={cl("navds-combobox__list-item__new-option", {
            "navds-combobox__list-item__new-option--focus":
              filteredOptionsIndex === -1,
          })}
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
          className="navds-combobox__list-item__no-options"
          role="option"
          aria-selected={false}
          id={`${id}-no-hits`}
        >
          Ingen søketreff
        </li>
      )}
      {filteredOptions.map((option, index) => (
        <li
          className={cl("navds-combobox__list-item", {
            "navds-combobox__list-item--focus": index === filteredOptionsIndex,
            "navds-combobox__list-item--selected":
              selectedOptions.includes(option),
          })}
          id={`${id}-option-${option.replace(" ", "-")}`}
          key={option}
          tabIndex={-1}
          onPointerUp={(event) => {
            toggleOption(option, event);
            if (!isMultiSelect) {
              toggleIsListOpen(false);
            }
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

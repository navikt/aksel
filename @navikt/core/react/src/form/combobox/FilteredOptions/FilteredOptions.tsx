import React from "react";
import cl from "clsx";
import { BodyShort, Label, Loader } from "../../..";
import { PlusIcon } from "@navikt/aksel-icons";
import CheckIcon from "./CheckIcon";
import { useFilteredOptionsContext } from "./filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "../Input/inputContext";

const FilteredOptions = () => {
  const {
    inputProps: { id },
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
  } = useFilteredOptionsContext();
  const { selectedOptions, toggleOption } = useSelectedOptionsContext();

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
          className="navds-combobox__list-item navds-combobox__list-item--loading"
          role="option"
          aria-selected={false}
          id={`${id}-is-loading`}
        >
          <Loader />
        </li>
      )}
      {!isLoading && filteredOptions.length === 0 && (
        <li
          className="navds-combobox__list-item navds-combobox__list-item--loading"
          role="option"
          aria-selected={false}
          id={`${id}-no-hits`}
        >
          Ingen søketreff
        </li>
      )}
      {isValueNew && allowNewValues && (
        <li
          tabIndex={-1}
          onClick={() => toggleOption(value)}
          id={`${id}-combobox-new-option`}
          className={cl("navds-combobox__list-item__new-option", {
            "navds-combobox__list-item__new-option--focus":
              filteredOptionsIndex === -1,
          })}
          role="option"
          aria-selected={
            !selectedOptions.includes(value)
          } /* TODO: Should this attribute ever be true? Can the add-button have the selected state? */
        >
          <PlusIcon />
          <BodyShort size="medium">
            Legg til <Label as="span">&#8220;{value}&#8221;</Label>
          </BodyShort>
        </li>
      )}
      {filteredOptions.map((o, i) => (
        <li
          className={cl("navds-combobox__list-item", {
            "navds-combobox__list-item--focus": i === filteredOptionsIndex,
            "navds-combobox__list-item--selected": selectedOptions.includes(o),
          })}
          id={`${id}-option-${o.replace(" ", "-")}`}
          key={o}
          tabIndex={-1}
          onClick={() => toggleOption(o)}
          role="option"
          aria-selected={selectedOptions.includes(o)}
        >
          <BodyShort size="medium">{o}</BodyShort>
          {selectedOptions.includes(o) && <CheckIcon />}
        </li>
      ))}
    </ul>
  );
};

export default FilteredOptions;

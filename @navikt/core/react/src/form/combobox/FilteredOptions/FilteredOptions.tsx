import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyShort, Label } from "../../..";
import { Add } from "@navikt/ds-icons";
import CheckIcon from "./CheckIcon";
import { useFilteredOptionsContext } from "./filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";

interface FilteredOptionsProps {
  id: string;
  toggleOption: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  focusInput: () => void;
  ref: React.RefObject<HTMLUListElement>;
  value: string;
  addCustomOption: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const FilteredOptions = forwardRef<HTMLUListElement, FilteredOptionsProps>(
  ({ id, toggleOption, value, addCustomOption }, ref) => {
    const {
      isListOpen,
      filteredOptions,
      filteredOptionsIndex,
      filteredOptionsRef,
      isValueNew,
    } = useFilteredOptionsContext();
    const { selectedOptions } = useSelectedOptionsContext();

    return (
      <ul
        ref={filteredOptionsRef}
        className={cl("navds-combobox__list", {
          "navds-combobox__list--closed": !isListOpen,
        })}
        id={`${id}-filtered-options`}
        role="listbox"
      >
        {isValueNew && (
          <li
            tabIndex={-1}
            onClick={(e) => {
              addCustomOption(e);
            }}
            id={`${id}-combobox-new-option`}
            className="navds-combobox__list-item navds-combobox__list-item__new-option"
            role="option"
            aria-selected={
              !selectedOptions.includes(value)
            } /* TODO: Should this attribute ever be true? Can the add-button have the selected state? */
          >
            <Add />
            <BodyShort size="medium">
              Legg til <Label as="span">&#8220;{value}&#8221;</Label>
            </BodyShort>
          </li>
        )}
        {filteredOptions.map((o, i) => (
          <li
            className={cl("navds-combobox__list-item", {
              "navds-combobox__list-item--focus": i === filteredOptionsIndex,
              "navds-combobox__list-item--selected":
                selectedOptions.includes(o),
            })}
            id={`${id}-option-${o}`}
            key={o}
            tabIndex={-1}
            onClick={(e) => {
              toggleOption(e);
            }}
            role="option"
            aria-selected={selectedOptions.includes(o)}
          >
            <BodyShort size="medium">{o}</BodyShort>
            {selectedOptions.includes(o) && <CheckIcon />}
          </li>
        ))}
      </ul>
    );
  }
);

export default FilteredOptions;

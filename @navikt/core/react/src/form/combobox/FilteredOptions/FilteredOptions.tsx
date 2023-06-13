import React, { forwardRef } from "react";
import cl from "clsx";
import { BodyShort, Label, Loader } from "../../..";
import { PlusIcon } from "@navikt/aksel-icons";
import CheckIcon from "./CheckIcon";
import { useFilteredOptionsContext } from "./filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "../Input/inputContext";

interface FilteredOptionsProps {
  id: string;
  toggleOption: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  focusInput: () => void;
  ref: React.RefObject<HTMLUListElement>;
  singleSelect?: boolean;
}

const FilteredOptions = forwardRef<HTMLUListElement, FilteredOptionsProps>(
  ({ toggleOption, singleSelect }, ref) => {
    const {
      inputProps: { id },
      value,
    } = useInputContext();
    const {
      isLoading,
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
        {isLoading && (
          <li
            className="navds-combobox__list-item navds-combobox__list-item--loading"
            role="option"
            aria-selected={false}
          >
            <Loader />
          </li>
        )}
        {isValueNew && !singleSelect && (
          <li
            tabIndex={-1}
            onClick={(e) => {
              toggleOption(e);
            }}
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
              "navds-combobox__list-item--selected":
                selectedOptions.includes(o),
            })}
            id={`${id}-option-${o.replace(" ", "-")}`}
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

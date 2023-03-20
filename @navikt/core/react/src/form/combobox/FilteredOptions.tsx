import React, { forwardRef, useMemo } from "react";
import cl from "clsx";
import { BodyShort, Label } from "../..";
import { Add } from "@navikt/ds-icons";
import CheckIcon from "./CheckIcon";

const normalizeText = (text: string) =>
  typeof text === "string" ? text.toLowerCase().trim() : "";

interface FilteredOptionsProps {
  id: string;
  filteredOptions: string[];
  filteredOptionsIndex: number;
  selectedOptions: string[];
  toggleOption: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  focusInput: () => void;
  isInternalListOpen: boolean | null;
  ref: React.RefObject<HTMLUListElement>;
  value: string;
  addNewOption: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  justAddedOptions: string[];
}

const FilteredOptions = forwardRef<HTMLUListElement, FilteredOptionsProps>(
  (
    {
      id,
      filteredOptions,
      filteredOptionsIndex,
      selectedOptions,
      toggleOption,
      isInternalListOpen,
      value,
      addNewOption,
      justAddedOptions,
    },
    ref
  ) => {
    const isValueNew = useMemo(() => {
      return (
        Boolean(value) &&
        !filteredOptions?.find(
          (option) => normalizeText(option) === normalizeText(value)
        )
      );
    }, [value, filteredOptions]);

    const options = useMemo(() => {
      return [...justAddedOptions, ...filteredOptions];
    }, [justAddedOptions, filteredOptions]);

    return (
      <ul
        ref={ref}
        className={cl("navds-combobox__list", {
          "navds-combobox__list--closed": !isInternalListOpen,
        })}
        id={`${id}-filtered-options`}
        role="listbox"
      >
        {isValueNew && (
          <li
            tabIndex={-1}
            onClick={(e) => {
              addNewOption(e);
            }}
            id={`${id}-combobox-new-option`}
            className="navds-combobox__list-item navds-combobox__list-item__new-option"
            role="option"
            aria-selected={!selectedOptions.includes(value)}
          >
            <Add />
            <BodyShort size="medium">
              Legg til <Label as="span">&#8220;{value}&#8221;</Label>
            </BodyShort>
          </li>
        )}
        {options.map((o, i) => (
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

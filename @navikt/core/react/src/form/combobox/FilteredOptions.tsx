import React, { forwardRef, useMemo } from "react";
import cl from "clsx";
import { BodyShort, Label } from "../..";
import { Add } from "@navikt/ds-icons";
import CheckIcon from "./CheckIcon";

const normalizeText = (text: string) =>
  typeof text === "string" ? text.toLowerCase().trim() : "";

interface FilteredOptionsProps {
  id: string;
  internalValue: string;
  filteredOptions: string[];
  filteredOptionsIndex: number;
  selectedOptions: string[];
  toggleOption: (textContent: string, isNew?: boolean) => void;
  focusInput: () => void;
  isInternalListOpen: boolean | null;
  ref: React.RefObject<HTMLUListElement>;
}

const FilteredOptions = forwardRef<HTMLUListElement, FilteredOptionsProps>(
  (
    {
      id,
      internalValue,
      filteredOptions,
      filteredOptionsIndex,
      selectedOptions,
      toggleOption,
      focusInput,
      isInternalListOpen,
    },
    ref
  ) => {
    const isInternalValueNew = useMemo(() => {
      return (
        Boolean(internalValue) &&
        !filteredOptions?.find(
          (option) => normalizeText(option) === normalizeText(internalValue)
        )
      );
    }, [internalValue, filteredOptions]);

    return (
      <ul
        ref={ref}
        className={cl("navds-combobox__list", {
          "navds-combobox__list--closed": !isInternalListOpen,
        })}
        id={`${id}-filtered-options`}
        role="listbox"
      >
        {isInternalValueNew && (
          <li
            tabIndex={-1}
            onClick={(e) => {
              toggleOption(internalValue, true);
              focusInput();
            }}
            id={`${id}-combobox-new-option`}
            className="navds-combobox__list-item navds-combobox__list-item__new-option"
            role="option"
            aria-selected={!selectedOptions.includes(internalValue)}
          >
            <Add />
            <BodyShort size="medium">
              Legg til <Label as="span">&#8220;{internalValue}&#8221;</Label>
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
              const target = e.target as HTMLLIElement;
              toggleOption(target.textContent ?? "");
              focusInput();
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

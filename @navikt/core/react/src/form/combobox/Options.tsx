import React from "react";
import cl from "clsx";
import { BodyShort, Label } from "../..";
import { Add } from "@navikt/ds-icons";
import CheckIcon from "./CheckIcon";

interface OptionsProps {
  id: string;
  internalValue: string;
  isInternalValueNew: boolean;
  filteredOptions: string[];
  filteredOptionsIndex: number;
  selectedOptions: string[];
  toggleOption: (textContent: string, isNew?: boolean) => void;
  focusInput: () => void;
  isInternalListOpen: boolean | null;
}

const Options: React.FC<OptionsProps> = ({
  id,
  internalValue,
  isInternalValueNew,
  filteredOptions,
  filteredOptionsIndex,
  selectedOptions,
  toggleOption,
  focusInput,
  isInternalListOpen,
}) => {
  return (
    <ul
      className={cl("navds-combobox__list", {
        "navds-combobox__list--closed": !isInternalListOpen,
      })}
      id={`${id}-options`}
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
            "navds-combobox__list-item--selected": selectedOptions.includes(o),
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
};

export default Options;

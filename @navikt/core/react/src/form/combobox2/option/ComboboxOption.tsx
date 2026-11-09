import React from "react";
import { CheckmarkHeavyIcon } from "@navikt/aksel-icons";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import type { ComboboxListProps } from "../list/ComboboxList";
import type { ComboboxOptionData } from "../root/ComboboxRoot";
import { highlightSubstring } from "./highlightSubstring";

export interface ComboboxOptionProps<T extends ComboboxOptionData> {
  option: T;
  onToggleOption: (option: T, isSelected: boolean) => void;
  isSelected: boolean;
  hasVirtualFocus: boolean;
  highlightText: string;
  children?: React.ReactNode | ComboboxListProps<T>["children"];
}

function ComboboxOptionComponent<T extends ComboboxOptionData>({
  option,
  onToggleOption,
  isSelected,
  hasVirtualFocus,
  highlightText,
  children,
}: ComboboxOptionProps<T>) {
  //console.log("Rendering option", option.value);

  return (
    <Listbox.Option
      className="aksel-combobox2__option"
      id={option.value}
      onClick={() => onToggleOption(option, !isSelected)}
      aria-selected={isSelected}
      hasVirtualFocus={hasVirtualFocus}
    >
      <div className="aksel-combobox2__option-checkmark" aria-hidden>
        {isSelected && <CheckmarkHeavyIcon aria-hidden />}
      </div>
      <div
        className="aksel-combobox2__option-label"
        //data-nowrap={!children || typeof children === "string"}
      >
        {typeof children === "function"
          ? children(option)
          : (children ??
            (highlightText
              ? highlightSubstring(option.label, highlightText)
              : option.label))}
      </div>
    </Listbox.Option>
  );
}

export const ComboboxOption = React.memo(
  ComboboxOptionComponent,
) as typeof ComboboxOptionComponent;

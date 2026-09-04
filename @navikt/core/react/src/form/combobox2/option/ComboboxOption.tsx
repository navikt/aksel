import React from "react";
import { CheckmarkHeavyIcon } from "@navikt/aksel-icons";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import type { ComboboxListProps } from "../list/ComboboxList";
import type { ComboboxOptionData } from "../root/ComboboxRoot";

export interface ComboboxOptionProps<T extends ComboboxOptionData> {
  option: T;
  onToggleOption: (option: T, isSelected: boolean) => void;
  isSelected: boolean;
  hasVirtualFocus: boolean;
  filterString: string;
  children?: React.ReactNode | ComboboxListProps<T>["children"];
}

function ComboboxOptionComponent<T extends ComboboxOptionData>({
  option,
  onToggleOption,
  isSelected,
  hasVirtualFocus,
  filterString,
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
            (filterString
              ? highlightSubstring(option.label, filterString)
              : option.label))}
      </div>
    </Listbox.Option>
  );
}

const highlightSubstring = (text: string, substring: string) => {
  const indexOfHighlightedText = text
    .toLocaleLowerCase()
    .indexOf(substring.toLocaleLowerCase());
  if (indexOfHighlightedText === -1) {
    // This can happen if the consumer has implemented their own filtering logic
    return text;
  }
  const start = text.substring(0, indexOfHighlightedText);
  const highlight = text.substring(
    indexOfHighlightedText,
    indexOfHighlightedText + substring.length,
  );
  const end = text.substring(indexOfHighlightedText + substring.length);
  return (
    // Aria-label is used to fix testing-library wrongly evaluating the accessible name of the option when highlighting text
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Doesn't matter if aria-label doesn't work
    <span aria-label={text}>
      {start}
      {highlight && <mark>{highlight}</mark>}
      {end}
    </span>
  );
};

export const ComboboxOption = React.memo(
  ComboboxOptionComponent,
) as typeof ComboboxOptionComponent;

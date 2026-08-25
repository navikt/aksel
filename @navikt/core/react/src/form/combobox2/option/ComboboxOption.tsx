import React from "react";
import { CheckmarkHeavyIcon } from "@navikt/aksel-icons";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import type { ComboboxListProps } from "../list/ComboboxList";
import type { ComboboxItemData } from "../root/ComboboxRoot";

export interface ComboboxItemProps<T extends ComboboxItemData> {
  item: T;
  onToggleItem: (item: T, isSelected: boolean) => void;
  isSelected: boolean;
  hasVirtualFocus: boolean;
  filterString: string;
  children?: React.ReactNode | ComboboxListProps<T>["children"];
}

function ComboboxItemComponent<T extends ComboboxItemData>({
  item,
  onToggleItem,
  isSelected,
  hasVirtualFocus,
  filterString,
  children,
}: ComboboxItemProps<T>) {
  //console.log("Rendering item", item.value);

  return (
    <Listbox.Option
      className="aksel-combobox2__item"
      id={item.value}
      onClick={() => onToggleItem(item, !isSelected)}
      aria-selected={isSelected}
      hasVirtualFocus={hasVirtualFocus}
    >
      <div className="aksel-combobox2__item-checkmark" aria-hidden>
        {isSelected && <CheckmarkHeavyIcon aria-hidden />}
      </div>
      <div>
        {typeof children === "function"
          ? children(item)
          : (children ??
            (filterString
              ? highlightSubstring(item.label, filterString)
              : item.label))}
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

export const ComboboxItem = React.memo(
  ComboboxItemComponent,
) as typeof ComboboxItemComponent;

import React from "react";
import type { ListboxItemData } from "../list/ListboxList";

export interface ListboxItemProps<T extends ListboxItemData> {
  item: T;
  onToggleItem: (item: T, isSelected: boolean) => void;
  isSelected: boolean;
  hasVirtualFocus: boolean;
  textToHighlight: string;
  children?: React.ReactNode;
}

function ListboxItemComponent<T extends ListboxItemData>({
  item,
  onToggleItem,
  isSelected,
  hasVirtualFocus,
  textToHighlight,
  children,
}: ListboxItemProps<T>) {
  //console.log("Rendering item", item.value);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className="aksel-listbox__item"
      role="option"
      tabIndex={-1}
      aria-selected={isSelected}
      onClick={() => onToggleItem(item, !isSelected)}
      data-value={item.value}
      data-virtual-focus={hasVirtualFocus}
      id={hasVirtualFocus ? "aksel-listbox__item-active" : undefined}
    >
      <div className="aksel-listbox__item-checkmark" aria-hidden>
        ✓
      </div>
      <div>
        {children ??
          (textToHighlight
            ? highlightSubstring(item.label, textToHighlight)
            : item.label)}
      </div>
    </div>
  );
}

const highlightSubstring = (text: string, substring: string) => {
  const indexOfHighlightedText = text
    .toLocaleLowerCase()
    .indexOf(substring.toLocaleLowerCase());
  if (indexOfHighlightedText === -1) {
    // This can happen if the consumer has implemented their own filtering logic
    return [text, "", ""];
  }
  const start = text.substring(0, indexOfHighlightedText);
  const highlight = text.substring(
    indexOfHighlightedText,
    indexOfHighlightedText + substring.length,
  );
  const end = text.substring(indexOfHighlightedText + substring.length);
  return (
    // Aria-label is used to fix testing-library wrongly evaluating the accessible name of the option when highlighting text
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: Doesn't matter if it doesn't work
    <span aria-label={text}>
      {start}
      {highlight && <mark>{highlight}</mark>}
      {end}
    </span>
  );
};

export const ListboxItem = React.memo(
  ListboxItemComponent,
) as typeof ListboxItemComponent;

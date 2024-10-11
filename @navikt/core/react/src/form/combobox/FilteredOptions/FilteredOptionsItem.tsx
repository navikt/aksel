import cl from "clsx";
import React from "react";
import { CheckmarkIcon } from "@navikt/aksel-icons";
import { BodyShort } from "../../../typography";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { isInList } from "../combobox-utils";
import { ComboboxOption } from "../types";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const useTextHighlight = (text: string, searchTerm: string) => {
  const indexOfHighlightedText = text
    .toLowerCase()
    .indexOf(searchTerm.toLowerCase());
  const start = text.substring(0, indexOfHighlightedText);
  const highlight = text.substring(
    indexOfHighlightedText,
    indexOfHighlightedText + searchTerm.length,
  );
  const end = text.substring(indexOfHighlightedText + searchTerm.length);
  return [start, highlight, end];
};

const FilteredOptionsItem = ({ option }: { option: ComboboxOption }) => {
  const {
    inputProps: { id },
    size,
    searchTerm,
  } = useInputContext();
  const {
    setIsMouseLastUsedInputDevice,
    toggleIsListOpen,
    activeDecendantId,
    virtualFocus,
  } = useFilteredOptionsContext();
  const { isMultiSelect, maxSelected, selectedOptions, toggleOption } =
    useSelectedOptionsContext();
  const [start, highlight, end] = useTextHighlight(option.label, searchTerm);

  const isDisabled = (_option: ComboboxOption) =>
    maxSelected?.isLimitReached && !isInList(_option.value, selectedOptions);

  return (
    <li
      className={cl("navds-combobox__list-item", {
        "navds-combobox__list-item--focus":
          activeDecendantId ===
          filteredOptionsUtil.getOptionId(id, option.label),
        "navds-combobox__list-item--selected": isInList(
          option.value,
          selectedOptions,
        ),
      })}
      data-no-focus={isDisabled(option) || undefined}
      id={filteredOptionsUtil.getOptionId(id, option.label)}
      key={option.label}
      tabIndex={-1}
      onMouseMove={() => {
        if (
          activeDecendantId !==
          filteredOptionsUtil.getOptionId(id, option.label)
        ) {
          virtualFocus.moveFocusToElement(
            filteredOptionsUtil.getOptionId(id, option.label),
          );
          setIsMouseLastUsedInputDevice(true);
        }
      }}
      onPointerUp={(event) => {
        if (isDisabled(option)) {
          return;
        }
        toggleOption(option, event);
        if (!isMultiSelect && !isInList(option.value, selectedOptions)) {
          toggleIsListOpen(false);
        }
      }}
      role="option"
      aria-selected={isInList(option.value, selectedOptions)}
      aria-disabled={isDisabled(option) || undefined}
    >
      <BodyShort size={size}>
        {start}
        {highlight && (
          <mark style={{ backgroundColor: "transparent", fontWeight: "bold" }}>
            {highlight}
          </mark>
        )}
        {end}
      </BodyShort>
      {isInList(option.value, selectedOptions) && <CheckmarkIcon />}
    </li>
  );
};

export default FilteredOptionsItem;

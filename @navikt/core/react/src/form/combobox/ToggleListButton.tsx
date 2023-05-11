import React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@navikt/aksel-icons";

import { useFilteredOptionsContext } from "./FilteredOptions/filteredOptionsContext";

interface ToggleListButtonProps {
  toggleListButtonLabel?: string;
}

export const ToggleListButton: React.FC<ToggleListButtonProps> = ({
  toggleListButtonLabel,
}) => {
  const { isListOpen, toggleIsListOpen } = useFilteredOptionsContext();
  return (
    <button
      type="button"
      onMouseDown={() => toggleIsListOpen()}
      onKeyDown={({ key }) => key === "Enter" && toggleIsListOpen()}
      className="navds-combobox__button-toggle-list"
      aria-expanded={isListOpen}
      tabIndex={-1}
    >
      <span className="navds-sr-only">
        {toggleListButtonLabel ?? "Alternativer"}
      </span>
      {isListOpen ? (
        <ChevronUpIcon aria-hidden />
      ) : (
        <ChevronDownIcon aria-hidden />
      )}
    </button>
  );
};

export default ToggleListButton;

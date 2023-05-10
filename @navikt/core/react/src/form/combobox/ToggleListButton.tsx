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
    >
      <span className="navds-sr-only">
        {toggleListButtonLabel
          ? toggleListButtonLabel
          : isListOpen
          ? "Lukk"
          : "Åpne"}
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

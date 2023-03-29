import React from "react";
import { Collapse, Expand } from "@navikt/ds-icons";

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
      {isListOpen ? <Collapse aria-hidden /> : <Expand aria-hidden />}
    </button>
  );
};

export default ToggleListButton;

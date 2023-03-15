import React from "react";
import { Collapse, Expand } from "@navikt/ds-icons";

interface ToggleListButtonProps {
  isInternalListOpen: boolean | null;
  setInternalListOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
  toggleListButtonLabel?: string;
}

export const ToggleListButton: React.FC<ToggleListButtonProps> = ({
  isInternalListOpen,
  setInternalListOpen,
  toggleListButtonLabel,
}) => {
  return (
    <button
      type="button"
      onClick={() => setInternalListOpen(!isInternalListOpen)}
      className="navds-combobox__button-toggle-list"
    >
      <span className="navds-sr-only">
        {toggleListButtonLabel
          ? toggleListButtonLabel
          : isInternalListOpen
          ? "Lukk"
          : "Åpne"}
      </span>
      {isInternalListOpen ? (
        <Collapse aria-hidden width="20" height="20" />
      ) : (
        <Expand aria-hidden width="20" height="20" />
      )}
    </button>
  );
};

export default ToggleListButton;

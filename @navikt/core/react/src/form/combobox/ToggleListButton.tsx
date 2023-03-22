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
      onMouseDown={() => {
        setInternalListOpen(!isInternalListOpen);
        console.log("toggleListButton mousedown");
      }}
      className="navds-combobox__button-toggle-list"
    >
      <span className="navds-sr-only">
        {toggleListButtonLabel
          ? toggleListButtonLabel
          : isInternalListOpen
          ? "Lukk"
          : "Åpne"}
      </span>
      {isInternalListOpen ? <Collapse aria-hidden /> : <Expand aria-hidden />}
    </button>
  );
};

export default ToggleListButton;

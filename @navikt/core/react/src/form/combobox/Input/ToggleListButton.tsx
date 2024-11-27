import React, { forwardRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./Input.context";

interface ToggleListButtonProps {
  toggleListButtonLabel?: string;
}

export const ToggleListButton = forwardRef<
  HTMLButtonElement,
  ToggleListButtonProps
>(({ toggleListButtonLabel }, ref) => {
  const { isListOpen, toggleIsListOpen } = useFilteredOptionsContext();
  const { focusInput } = useInputContext();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        toggleIsListOpen();
        focusInput();
      }}
      className="navds-combobox__button-toggle-list"
      aria-expanded={isListOpen}
      tabIndex={-1}
      aria-hidden
      title={toggleListButtonLabel}
    >
      {isListOpen ? (
        <ChevronUpIcon aria-hidden />
      ) : (
        <ChevronDownIcon aria-hidden />
      )}
    </button>
  );
});

export default ToggleListButton;

import React, { forwardRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./Input.context";

export const ToggleListButton = forwardRef<HTMLDivElement>((_, ref) => {
  const { isListOpen, toggleIsListOpen } = useFilteredOptionsContext();
  const { focusInput } = useInputContext();

  return (
    <div
      ref={ref}
      onClick={() => {
        toggleIsListOpen();
        focusInput();
      }}
      className="navds-combobox__button-toggle-list"
      aria-hidden
    >
      {isListOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </div>
  );
});

export default ToggleListButton;

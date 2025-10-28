import React, { forwardRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { useRenameCSS } from "../../../theme/Theme";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./Input.context";

export const ToggleListButton = forwardRef<HTMLDivElement>((_, ref) => {
  const { cn } = useRenameCSS();
  const { isListOpen, toggleIsListOpen } = useFilteredOptionsContext();
  const { focusInput } = useInputContext();

  return (
    <div
      ref={ref}
      onClick={(event) => {
        event.stopPropagation();
        toggleIsListOpen();
        focusInput();
      }}
      className={cn("navds-combobox__button-toggle-list")}
      aria-hidden
    >
      {isListOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </div>
  );
});

export default ToggleListButton;

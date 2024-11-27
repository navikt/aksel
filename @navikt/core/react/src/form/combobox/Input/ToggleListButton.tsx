import React, { forwardRef } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@navikt/aksel-icons";
import { useI18n } from "../../../util/i18n/i18n.context";
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
  const translate = useI18n(
    "Combobox",
    toggleListButtonLabel ? { options: toggleListButtonLabel } : undefined,
  );

  return (
    <button
      ref={ref}
      type="button"
      onPointerUp={() => {
        toggleIsListOpen();
        focusInput();
      }}
      onKeyDown={({ key }) => key === "Enter" && toggleIsListOpen()}
      className="navds-combobox__button-toggle-list"
      aria-expanded={isListOpen}
      tabIndex={-1}
      aria-hidden
      title={translate("options")}
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

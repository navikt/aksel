import { omit } from "../../..";
import { useFormField } from "../../useFormField";
import React, { useCallback } from "react";
import cl from "clsx";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "./inputContext";
import { useCustomOptionsContext } from "../customOptionsContext";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";

const Input = ({
  handleAddCustomOption,
  ref,
  handleClear,
  toggleOption,
  inputClassName,
  ...rest
}) => {
  const {
    inputProps: { id, ...inputProps },
    size = "medium",
  } = useFormField(rest, "comboboxfield");
  const { selectedOptions, removeSelectedOption } = useSelectedOptionsContext();
  const { customOptions, removeCustomOption } = useCustomOptionsContext();
  const { value, onChange } = useInputContext();
  const {
    toggleIsListOpen,
    isListOpen,
    filteredOptions,
    filteredOptionsIndex,
    moveFocusUp,
    moveFocusDown,
  } = useFilteredOptionsContext();

  const handleKeyUp = (e) => {
    e.preventDefault();
    switch (e.key) {
      case "Escape":
        handleClear({ trigger: e.key, event: e });
        toggleIsListOpen(false);
        break;
      case "Enter":
        console.log(
          "bool v, filtops",
          Boolean(value),
          filteredOptions.includes(value),
          `value ${value}`
        );
        e.preventDefault();
        toggleOption(e);
        if (value && !filteredOptions.includes(value)) handleAddCustomOption(e);
        break;
      default:
        break;
    }
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Backspace" && value === "") {
        const lastSelectedOption = selectedOptions[selectedOptions.length - 1];
        if (customOptions.includes(lastSelectedOption))
          removeCustomOption({ value: lastSelectedOption });
        removeSelectedOption(lastSelectedOption);
      } else if (e.key === "ArrowDown") {
        // Check that cursor position is at the end of the input field,
        // so we don't interfere with text editing
        if (e.target.selectionStart === value.length) {
          e.preventDefault();
          moveFocusDown();
        }
      } else if (e.key === "ArrowUp") {
        // Check that the FilteredOptions list is open and has virtual focus.
        // Otherwise ignore keystrokes, so it doesn't interfere with text editing
        if (isListOpen && filteredOptionsIndex !== null) {
          e.preventDefault();
          moveFocusUp();
        }
      }
    },
    [
      value,
      selectedOptions,
      customOptions,
      removeCustomOption,
      removeSelectedOption,
      moveFocusDown,
      isListOpen,
      filteredOptionsIndex,
      moveFocusUp,
    ]
  );

  function getActiveDescendantId() {
    if (filteredOptionsIndex === null) {
      return undefined;
    } else if (filteredOptionsIndex === -1) {
      return `${id}-combobox-new-option`;
    } else {
      return `${id}-option-${filteredOptions[filteredOptionsIndex]}`;
    }
  }

  return (
    <input
      ref={ref}
      {...omit(rest, ["error", "errorId", "size"])}
      {...inputProps}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="search"
      role="combobox"
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}
      aria-controls={isListOpen ? id : ""}
      aria-expanded={!!isListOpen}
      autoComplete="off"
      aria-autocomplete="list"
      aria-owns={`${id}-options`}
      aria-activedescendant={getActiveDescendantId()}
      className={cl(
        inputClassName,
        "navds-combobox__input",
        "navds-body-short",
        `navds-body-${size}`
      )}
    />
  );
};

export default Input;

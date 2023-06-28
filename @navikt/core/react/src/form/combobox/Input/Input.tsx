import { omit } from "../../..";
import React, { useCallback, forwardRef, InputHTMLAttributes } from "react";
import cl from "clsx";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useCustomOptionsContext } from "../customOptionsContext";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./inputContext";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  ref: React.Ref<HTMLInputElement>;
  handleClear: (e) => void;
  toggleOption: (e) => void;
  inputClassName?: string;
  errorId?: string;
  value?: string;
  error?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { handleClear, toggleOption, inputClassName, error, errorId, ...rest },
    ref
  ) => {
    const { inputProps, onChange, size, value } = useInputContext();
    const { selectedOptions, removeSelectedOption } =
      useSelectedOptionsContext();
    const { customOptions, removeCustomOption } = useCustomOptionsContext();
    const {
      activeDecendantId,
      toggleIsListOpen,
      isListOpen,
      filteredOptionsIndex,
      moveFocusUp,
      moveFocusDown,
      ariaDescribedBy,
      moveFocusToInput,
      moveFocusToEnd,
      shouldAutocomplete,
    } = useFilteredOptionsContext();

    const handleKeyUp = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "Escape":
          handleClear({ trigger: e.key, event: e });
          toggleIsListOpen(false);
          break;
        case "Enter":
          e.preventDefault();
          toggleOption(e);
          break;
        case "Home":
          moveFocusToInput();
          break;
        case "End":
          moveFocusToEnd();
          break;
        default:
          break;
      }
    };

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Backspace") {
          if (value === "") {
            const lastSelectedOption =
              selectedOptions[selectedOptions.length - 1];
            if (customOptions.includes(lastSelectedOption)) {
              removeCustomOption({ value: lastSelectedOption });
            }
            removeSelectedOption(lastSelectedOption);
          }
        } else if (e.key === "ArrowDown") {
          // Check that cursor position is at the end of the input field,
          // so we don't interfere with text editing
          if (e.target.selectionStart === value?.length) {
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

    const onBlur = () => {
      toggleIsListOpen(false);
    };

    return (
      <input
        {...rest}
        {...omit(inputProps, ["aria-invalid"])}
        ref={ref}
        value={value}
        onChange={onChange}
        type="text"
        role="combobox"
        onBlur={onBlur}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        aria-controls={`${inputProps.id}-filtered-options`}
        aria-expanded={!!isListOpen}
        autoComplete="off"
        aria-autocomplete={shouldAutocomplete ? "both" : "list"}
        aria-activedescendant={activeDecendantId}
        aria-describedby={ariaDescribedBy}
        className={cl(
          inputClassName,
          "navds-combobox__input",
          "navds-body-short",
          `navds-body-${size}`
        )}
      />
    );
  }
);

export default Input;

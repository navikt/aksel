import { omit } from "../../..";
import React, {
  useCallback,
  forwardRef,
  InputHTMLAttributes,
  ChangeEvent,
} from "react";
import cl from "clsx";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./inputContext";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  ref: React.Ref<HTMLInputElement>;
  inputClassName?: string;
  errorId?: string;
  value?: string;
  error?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputClassName, error, errorId, ...rest }, ref) => {
    const { clearInput, inputProps, onChange, size, value } = useInputContext();
    const { selectedOptions, removeSelectedOption, toggleOption } =
      useSelectedOptionsContext();
    const {
      activeDecendantId,
      allowNewValues,
      currentOption,
      filteredOptions,
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

    const onEnter = useCallback(
      (event: React.KeyboardEvent) => {
        if (currentOption) {
          event.preventDefault();
          // Selecting a value from the dropdown / FilteredOptions
          toggleOption(currentOption, event);
          clearInput(event);
        } else if (shouldAutocomplete && selectedOptions.includes(value)) {
          event.preventDefault();
          // Trying to set the same value that is already set, so just clearing the input
          clearInput(event);
        } else if ((allowNewValues || shouldAutocomplete) && value !== "") {
          event.preventDefault();
          // Autocompleting or adding a new value
          toggleOption(value, event);
          clearInput(event);
        }
      },
      [
        allowNewValues,
        clearInput,
        currentOption,
        selectedOptions,
        shouldAutocomplete,
        toggleOption,
        value,
      ]
    );

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      switch (e.key) {
        case "Escape":
          clearInput(e);
          toggleIsListOpen(false);
          break;
        case "Enter":
        case "Accept":
          onEnter(e);
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
        removeSelectedOption,
        moveFocusDown,
        isListOpen,
        filteredOptionsIndex,
        moveFocusUp,
      ]
    );

    const onChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue && newValue !== "") {
          toggleIsListOpen(true);
        } else if (filteredOptions.length === 0) {
          toggleIsListOpen(false);
        }
        onChange(event);
      },
      [filteredOptions.length, onChange, toggleIsListOpen]
    );

    return (
      <input
        {...rest}
        {...omit(inputProps, ["aria-invalid"])}
        ref={ref}
        value={value}
        onChange={onChangeHandler}
        type="text"
        role="combobox"
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
        enterKeyHint="enter"
      />
    );
  }
);

export default Input;

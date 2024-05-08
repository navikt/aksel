import cl from "clsx";
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
} from "react";
import { omit } from "../../../util";
import filteredOptionsUtil from "../FilteredOptions/filtered-options-util";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "./Input.context";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  ref: React.Ref<HTMLInputElement>;
  inputClassName?: string;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputClassName, ...rest }, ref) => {
    const { clearInput, inputProps, onChange, size, value } = useInputContext();
    const {
      selectedOptions,
      removeSelectedOption,
      toggleOption,
      isMultiSelect,
    } = useSelectedOptionsContext();
    const {
      activeDecendantId,
      allowNewValues,
      currentOption,
      filteredOptions,
      isValueNew,
      toggleIsListOpen,
      isListOpen,
      ariaDescribedBy,
      setIsMouseLastUsedInputDevice,
      shouldAutocomplete,
      virtualFocus,
    } = useFilteredOptionsContext();

    const onEnter = useCallback(
      (event: React.KeyboardEvent) => {
        const isTextInSelectedOptions = (text: string) =>
          selectedOptions.some(
            (option) =>
              option.label.toLocaleLowerCase() === text.toLocaleLowerCase(),
          );

        if (currentOption) {
          event.preventDefault();
          // Selecting a value from the dropdown / FilteredOptions
          toggleOption(currentOption, event);
          if (!isMultiSelect && !isTextInSelectedOptions(currentOption.label)) {
            toggleIsListOpen(false);
          }
        } else if (shouldAutocomplete && isTextInSelectedOptions(value)) {
          event.preventDefault();
          // Trying to set the same value that is already set, so just clearing the input
          clearInput(event);
        } else if ((allowNewValues || shouldAutocomplete) && value !== "") {
          event.preventDefault();
          // Autocompleting or adding a new value
          const selectedValue =
            allowNewValues && isValueNew
              ? { label: value, value }
              : filteredOptions[0];
          toggleOption(selectedValue, event);
          if (
            !isMultiSelect &&
            !isTextInSelectedOptions(
              filteredOptions[0].label || selectedValue.label,
            )
          ) {
            toggleIsListOpen(false);
          }
        }
      },
      [
        allowNewValues,
        clearInput,
        currentOption,
        filteredOptions,
        isMultiSelect,
        isValueNew,
        selectedOptions,
        shouldAutocomplete,
        toggleIsListOpen,
        toggleOption,
        value,
      ],
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
          toggleIsListOpen(false);
          virtualFocus.moveFocusToTop();
          break;
        case "End":
          toggleIsListOpen(true);
          virtualFocus.moveFocusToBottom();
          break;
        default:
          break;
      }
    };

    const handleKeyDown = useCallback(
      (e) => {
        setIsMouseLastUsedInputDevice(false);
        if (e.key === "Backspace") {
          if (value === "") {
            const lastSelectedOption =
              selectedOptions[selectedOptions.length - 1];
            if (lastSelectedOption) {
              removeSelectedOption(lastSelectedOption);
            }
          }
        } else if (e.key === "Enter" || e.key === "Accept") {
          if (activeDecendantId || value) {
            e.preventDefault();
          }
        } else if (e.key === "ArrowDown") {
          // Check that cursor position is at the end of the input field,
          // so we don't interfere with text editing
          if (e.target.selectionStart === value?.length) {
            e.preventDefault();
            if (virtualFocus.activeElement === null || !isListOpen) {
              toggleIsListOpen(true);
            }
            virtualFocus.moveFocusDown();
          }
        } else if (e.key === "ArrowUp") {
          // Check that the FilteredOptions list is open and has virtual focus.
          // Otherwise ignore keystrokes, so it doesn't interfere with text editing
          if (isListOpen && activeDecendantId) {
            e.preventDefault();
            if (virtualFocus.isFocusOnTheTop()) {
              toggleIsListOpen(false);
            }
            virtualFocus.moveFocusUp();
          }
        }
      },
      [
        value,
        selectedOptions,
        removeSelectedOption,
        isListOpen,
        activeDecendantId,
        setIsMouseLastUsedInputDevice,
        toggleIsListOpen,
        virtualFocus,
      ],
    );

    const onChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue && newValue !== "") {
          toggleIsListOpen(true);
        } else if (filteredOptions.length === 0) {
          toggleIsListOpen(false);
        }
        virtualFocus.moveFocusToTop();
        onChange(event);
      },
      [filteredOptions.length, virtualFocus, onChange, toggleIsListOpen],
    );

    return (
      <input
        {...rest}
        {...omit(inputProps, ["aria-invalid"])}
        ref={ref}
        value={value}
        onBlur={() => virtualFocus.moveFocusToTop()}
        onChange={onChangeHandler}
        type="text"
        role="combobox"
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        aria-controls={filteredOptionsUtil.getFilteredOptionsId(inputProps.id)}
        aria-expanded={!!isListOpen}
        autoComplete="off"
        aria-autocomplete={shouldAutocomplete ? "both" : "list"}
        aria-activedescendant={activeDecendantId}
        aria-describedby={ariaDescribedBy}
        aria-invalid={inputProps["aria-invalid"]}
        className={cl(
          inputClassName,
          "navds-combobox__input",
          "navds-body-short",
          `navds-body-short--${size}`,
        )}
      />
    );
  },
);

export default Input;

import cl from "clsx";
import React, {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { omit } from "../../../util";
import { useMergeRefs } from "../../../util/hooks";
import filteredOptionsUtil from "../FilteredOptions/filtered-options-util";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "./Input.context";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "disabled"> {
  ref: React.Ref<HTMLInputElement>;
  inputClassName?: string;
  shouldShowSelectedOptions?: boolean;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputClassName, shouldShowSelectedOptions, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const mergedRefs = useMergeRefs(ref, internalRef);
    const {
      clearInput,
      inputProps,
      onChange,
      size,
      value,
      searchTerm,
      setValue,
    } = useInputContext();
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
        } else if (isTextInSelectedOptions(value)) {
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

          if (!selectedValue) {
            return;
          }

          toggleOption(selectedValue, event);
          if (!isMultiSelect && !isTextInSelectedOptions(selectedValue.label)) {
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
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        setIsMouseLastUsedInputDevice(false);
        if (e.key === "Backspace") {
          if (value === "" && shouldShowSelectedOptions) {
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
        } else if (e.key === "Escape") {
          if (isListOpen || value) {
            e.preventDefault(); // Prevents closing an encasing Modal, as Combobox reacts on keyup.
            clearInput(e);
            toggleIsListOpen(false);
          }
        } else if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
          /**
           * In case user has an active selection and 'completes' the selection with ArrowLeft or ArrowRight
           * we need to make sure to update the filter.
           */
          if (value !== "" && value !== searchTerm) {
            onChange(value);
          }
        } else if (e.key === "ArrowDown") {
          // Reset the value to the search term to cancel autocomplete
          // if the user moves focus down to the FilteredOptions
          if (value !== searchTerm) {
            setValue(searchTerm);
          }
          if (virtualFocus.activeElement === null || !isListOpen) {
            toggleIsListOpen(true);
          }
          virtualFocus.moveFocusDown();
        } else if (e.key === "ArrowUp") {
          if (value !== "" && value !== searchTerm) {
            onChange(value);
          }
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
        clearInput,
        toggleIsListOpen,
        onChange,
        virtualFocus,
        setValue,
        searchTerm,
        shouldShowSelectedOptions,
      ],
    );

    const onChangeHandler = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue && newValue !== "") {
          toggleIsListOpen(true);
        } else if (filteredOptions.length === 0) {
          toggleIsListOpen(false);
        }
        virtualFocus.moveFocusToTop();
        onChange(newValue);
      },
      [filteredOptions.length, virtualFocus, onChange, toggleIsListOpen],
    );

    return (
      <input
        {...rest}
        {...omit(inputProps, ["aria-invalid"])}
        ref={mergedRefs}
        value={value}
        onBlur={() => virtualFocus.moveFocusToTop()}
        onClick={() => value !== searchTerm && onChange(value)}
        onInput={onChangeHandler}
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

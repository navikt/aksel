import React, {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
} from "react";
import { omit } from "../../../utils-external";
import { cl, composeEventHandlers } from "../../../utils/helpers";
import { useMergeRefs } from "../../../utils/hooks";
import filteredOptionsUtil from "../FilteredOptions/filtered-options-util";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { ComboboxOption } from "../types";
import { useInputContext } from "./Input.context";

interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "value"
  | "disabled"
  | "onClick"
  | "onInput"
  | "type"
  | "role"
  | "onKeyUp"
  | "onKeyDown"
  | "autoComplete"
> {
  ref: React.Ref<HTMLInputElement>;
  inputClassName?: string;
  shouldShowSelectedOptions?: boolean;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { inputClassName, shouldShowSelectedOptions, placeholder, onBlur, ...rest },
    ref,
  ) => {
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
      hideCaret,
      setHideCaret,
      readOnly,
    } = useInputContext();
    const {
      selectedOptions,
      removeSelectedOption,
      toggleOption,
      isMultiSelect,
      maxSelected,
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
        const isSelected = (text: string) =>
          selectedOptions.some(
            (option) =>
              option.label.toLocaleLowerCase() === text.toLocaleLowerCase(),
          );

        if (currentOption) {
          event.preventDefault();
          // Selecting a value from the dropdown / FilteredOptions
          toggleOption(currentOption, event);
          if (!isMultiSelect && !isSelected(currentOption.label)) {
            toggleIsListOpen(false);
          }
        } else if (isSelected(value)) {
          event.preventDefault();
          // Trying to set the same value that is already set, so just clearing the input
          clearInput(event);
        } else if ((allowNewValues || shouldAutocomplete) && value !== "") {
          event.preventDefault();

          const autoCompletedOption =
            filteredOptionsUtil.getFirstValueStartingWith(
              value,
              filteredOptions,
            );

          /*
           * User can have matching results, while not using the autocomplete result
           * E.g. User types "Oslo", list has is "Oslo kommune", but user hits backspace, canceling autocomplete.
           */
          const autoCompleteMatchesValue =
            filteredOptionsUtil.normalizeText(value) ===
            filteredOptionsUtil.normalizeText(autoCompletedOption?.label ?? "");

          let optionToToggle: ComboboxOption | undefined;

          if (
            shouldAutocomplete &&
            autoCompletedOption &&
            autoCompleteMatchesValue
          ) {
            optionToToggle = autoCompletedOption;
          } else if (allowNewValues && isValueNew) {
            optionToToggle = { label: value, value };
          }

          if (!optionToToggle) {
            return;
          }
          toggleOption(optionToToggle, event);
          if (!isMultiSelect && !isSelected(optionToToggle.label)) {
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
        default:
          break;
      }
    };

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        setIsMouseLastUsedInputDevice(false);
        if (readOnly) {
          return;
        }
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
          if (!isListOpen) {
            toggleIsListOpen(true);
            setTimeout(virtualFocus.moveFocusDown, 0); // Wait until list is visible so that scrollIntoView works
          } else {
            virtualFocus.moveFocusDown();
          }
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
        } else if (e.key === "Home") {
          e.preventDefault();
          virtualFocus.moveFocusToTop();
        } else if (e.key === "End") {
          e.preventDefault();
          if (!isListOpen) {
            toggleIsListOpen(true);
            setTimeout(virtualFocus.moveFocusToBottom, 0); // Wait until list is visible so that scrollIntoView works
          } else {
            virtualFocus.moveFocusToBottom();
          }
        } else if (e.key === "PageUp") {
          e.preventDefault();
          virtualFocus.moveFocusUpBy(6);
        } else if (e.key === "PageDown") {
          e.preventDefault();
          if (!isListOpen) {
            toggleIsListOpen(true);
            setTimeout(() => virtualFocus.moveFocusDownBy(6), 0); // Wait until list is visible so that scrollIntoView works
          } else {
            virtualFocus.moveFocusDownBy(6);
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
        readOnly,
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
        onChange(newValue);
      },
      [filteredOptions.length, onChange, toggleIsListOpen],
    );

    return (
      <input
        {...rest}
        {...omit(inputProps, ["aria-invalid"])}
        ref={mergedRefs}
        type="text"
        role="combobox"
        value={value}
        onBlur={composeEventHandlers(onBlur, virtualFocus.resetFocus)}
        onClick={() => {
          setHideCaret(maxSelected.isLimitReached);
          value !== searchTerm && onChange(value);
        }}
        onInput={onChangeHandler}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        placeholder={selectedOptions.length ? undefined : placeholder}
        className={cl(
          inputClassName,
          "aksel-combobox__input",
          "aksel-body-short",
          `aksel-body-short--${size}`,
          { "aksel-combobox__input--hide-caret": hideCaret },
        )}
        aria-controls={filteredOptionsUtil.getFilteredOptionsId(inputProps.id)}
        aria-expanded={!!isListOpen}
        aria-autocomplete={shouldAutocomplete ? "both" : "list"}
        aria-activedescendant={activeDecendantId}
        aria-describedby={ariaDescribedBy}
        aria-invalid={inputProps["aria-invalid"]}
        readOnly={readOnly}
      />
    );
  },
);

export default Input;

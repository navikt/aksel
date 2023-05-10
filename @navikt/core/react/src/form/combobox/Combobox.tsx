import cl from "clsx";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { BodyShort, Label, mergeRefs, omit } from "../..";
import { useFormField } from "../useFormField";
import ClearButton from "./ClearButton";
import FilteredOptions from "./FilteredOptions/FilteredOptions";
import { useFilteredOptionsContext } from "./FilteredOptions/filteredOptionsContext";
import SelectedOptions from "./SelectedOptions/SelectedOptions";
import ToggleListButton from "./ToggleListButton";
import { ComboboxClearEvent, ComboboxProps } from "./types";
import { useCustomOptionsContext } from "./customOptionsContext";
import { useSelectedOptionsContext } from "./SelectedOptions/selectedOptionsContext";
import ComboboxWrapper from "./ComboboxWrapper";
import { useInputContext } from "./inputContext";

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      inputProps,
      size = "medium",
      inputDescriptionId,
      hasError,
    } = useFormField(props, "comboboxfield");

    const {
      value: externalValue,
      onChange: externalOnChange,
      onClear,
      className,
      hideLabel = false,
      description,
      label,
      loading,
      children,
      clearButton = true,
      clearButtonLabel,
      toggleListButton = true,
      toggleListButtonLabel,
      isListOpen: isExternalListOpen,
      id = "",
      shouldShowSelectedOptions = true,
      ...rest
    } = props;

    // we have the code for error handling, and dont do anythign with it
    // TODO: if text is long, new line
    // TODO: mobile, should fewer options be shown at a time?

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const {
      currentOption,
      toggleIsListOpen,
      isListOpen,
      filteredOptions,
      filteredOptionsIndex,
      moveFocusUp,
      moveFocusDown,
    } = useFilteredOptionsContext();
    const { customOptions, removeCustomOption, addCustomOption } =
      useCustomOptionsContext();
    const {
      selectedOptions,
      prevSelectedOptions,
      removeSelectedOption,
      addSelectedOption,
    } = useSelectedOptionsContext();
    const { value, onChange } = useInputContext();

    const focusInput = useCallback(() => {
      inputRef.current?.focus?.();
    }, []);

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        onChange("");
      },
      [onChange, onClear]
    );

    const handleDeleteSelectedOption = useCallback(
      (clickedOption) => {
        removeSelectedOption(clickedOption);
        if (customOptions.includes(clickedOption))
          removeCustomOption({ value: clickedOption });
      },
      [customOptions, removeCustomOption, removeSelectedOption]
    );

    const handleAddCustomOption = useCallback(
      (event) => {
        if (selectedOptions.includes(value.trim())) return;
        addCustomOption({ value });
        handleClear(event);
        focusInput();
      },
      [selectedOptions, value, addCustomOption, handleClear, focusInput]
    );

    const toggleOption = useCallback(
      (event) => {
        const clickedOption = event?.target?.textContent;
        const focusedOption = currentOption;
        // toggle selected option on click
        if (clickedOption) {
          if (selectedOptions.includes(clickedOption)) {
            handleDeleteSelectedOption(clickedOption);
          } else if (filteredOptions.includes(clickedOption))
            addSelectedOption(clickedOption);
        }
        // remove selected filteredOption on Enter
        else if (focusedOption && selectedOptions.includes(focusedOption)) {
          removeSelectedOption(focusedOption);
          if (customOptions.includes(focusedOption))
            removeCustomOption({ value: focusedOption });
        } else if (
          // add new option on Enter input value if in filteredOptions OR if input value is empty
          focusedOption &&
          (filteredOptions?.includes?.(String(value)) || !value)
        ) {
          addSelectedOption(focusedOption);
        } else if (value && !filteredOptions.includes(value)) {
          handleAddCustomOption(event);
        }
      },
      [
        currentOption,
        filteredOptions,
        handleAddCustomOption,
        selectedOptions,
        value,
        addSelectedOption,
        handleDeleteSelectedOption,
        removeSelectedOption,
        customOptions,
        removeCustomOption,
      ]
    );

    const handleKeyUp = (e) => {
      e.preventDefault();
      switch (e.key) {
        case "Escape":
          if (filteredOptionsIndex !== null) {
            handleClear({ trigger: e.key, event: e });
          } else {
            e.preventDefault();
            toggleIsListOpen(false);
          }
          break;
        case "Enter":
          e.preventDefault();
          toggleOption(e);
          break;
        default:
          break;
      }
    };

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Backspace" && value === "") {
          const lastSelectedOption =
            selectedOptions[selectedOptions.length - 1];
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
        filteredOptionsIndex,
        isListOpen,
        removeCustomOption,
        removeSelectedOption,
        moveFocusDown,
        moveFocusUp,
      ]
    );

    //focus on input whenever selectedOptions changes
    //Seems like a band-aid. Why does focus disappear?
    useEffect(() => {
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

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
      <ComboboxWrapper
        className={className}
        hasError={hasError}
        inputProps={inputProps}
        inputSize={size}
        toggleIsListOpen={toggleIsListOpen}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            as="div"
            className={cl("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-combobox__wrapper">
          <div className="navds-combobox__wrapper-inner navds-text-field__input">
            <SelectedOptions
              selectedOptions={
                shouldShowSelectedOptions ? selectedOptions : undefined
              }
              handleDeleteSelectedOption={handleDeleteSelectedOption}
            >
              <input
                key="combobox-input"
                ref={mergedInputRef}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="search"
                role="combobox"
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                aria-controls={`${id}-filteredOptions`}
                aria-expanded={!!isListOpen}
                autoComplete="off"
                aria-autocomplete="list"
                aria-owns={`${id}-options`}
                aria-activedescendant={getActiveDescendantId()}
                className={cl(
                  className,
                  "navds-combobox__input",
                  "navds-body-short",
                  `navds-body-${size}`
                )}
              />
            </SelectedOptions>
            {value && clearButton && (
              <ClearButton
                handleClear={(event) =>
                  handleClear({ trigger: "Click", event })
                }
                clearButtonLabel={clearButtonLabel}
              />
            )}
            {toggleListButton && (
              <ToggleListButton toggleListButtonLabel={toggleListButtonLabel} />
            )}
          </div>
          <FilteredOptions
            id={id}
            toggleOption={toggleOption}
            focusInput={focusInput}
            value={value}
            addCustomOption={handleAddCustomOption}
            loading={loading}
          />
        </div>
      </ComboboxWrapper>
    );
  }
);

export default Combobox;

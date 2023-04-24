import cl from "clsx";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
      onChange,
      onClear,
      className,
      hideLabel = false,
      description,
      label,
      children,
      clearButton = true,
      clearButtonLabel,
      toggleListButton = true,
      toggleListButtonLabel,
      isListOpen: isExternalListOpen,
      id = "",
      setOptions,
      ...rest
    } = props;

    // TODO: in the dropdown, show a temporary list for "custom" options that shows up on top. On blur, add to filteredOptions
    // TODO: bug fix, when click toggleListButton, the list opens and then closes immediately because of race conditions with focusInHandler
    // TODO: mousein and arrow up/down shares virtual focus, mouseout does NOT remove focus
    // TODO: if no results and no "add" option, s how "no results" message
    // TODO: if text is long, new line
    // TODO: mobile, should fewer options be shown at a time?
    // TODO: mobile, should press area for input be taller?

    /* Splitte opp logikken i kontekster/subkomponenter
      - Options / FilteredOptions
      - SelectedOptions
      - Input

      Context
      - Root
      - Options / MatchingOptions
      - SelectedOptions
      - Input / Label / Clearbutton / Togglebutton

      onCreateOption / onCreateCustomOption
      —> sende med prop for dette


      Async */

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const filteredOptionsRef = useRef<HTMLUListElement | null>(null);
    const [internalValue, setInternalValue] = useState<string>("");
    const {
      toggleIsListOpen,
      isListOpen,
      filteredOptions,
      filteredOptionsIndex,
      setFilteredOptionsIndex,
    } = useFilteredOptionsContext();
    const { customOptions, removeCustomOption, addCustomOption } =
      useCustomOptionsContext();
    const {
      selectedOptions,
      prevSelectedOptions,
      removeSelectedOption,
      addSelectedOption,
    } = useSelectedOptionsContext();

    const value = useMemo(
      () => String(externalValue ?? internalValue),
      [externalValue, internalValue]
    );

    const handleChange = useCallback(
      (val: string) => {
        externalValue ?? setInternalValue(val);
        onChange?.(val);
        setFilteredOptionsIndex(0);
        if (!isListOpen && !!val) toggleIsListOpen(true);
      },
      [
        externalValue,
        onChange,
        setFilteredOptionsIndex,
        isListOpen,
        toggleIsListOpen,
      ]
    );

    const focusInput = useCallback(() => {
      inputRef.current?.focus?.();
    }, []);

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        handleChange("");
      },
      [handleChange, onClear]
    );

    const handleDeleteSelectedOption = useCallback(
      (clickedOption) => {
        removeSelectedOption(clickedOption);
        if (customOptions.includes(clickedOption))
          removeCustomOption({ value: clickedOption });
      },
      [customOptions, removeCustomOption, removeSelectedOption]
    );

    const toggleOption = useCallback(
      (event) => {
        const clickedOption = event?.target?.textContent;
        const focusedOption = filteredOptions[filteredOptionsIndex];
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
          isListOpen &&
          focusedOption &&
          (filteredOptions?.includes?.(String(value)) || !value)
        )
          addSelectedOption(focusedOption);
      },
      [
        filteredOptions,
        filteredOptionsIndex,
        selectedOptions,
        isListOpen,
        value,
        addSelectedOption,
        handleDeleteSelectedOption,
        removeSelectedOption,
        customOptions,
        removeCustomOption,
      ]
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

    const handleKeyUp = (e) => {
      const scrollToOption = (newIndex: number) => {
        if (filteredOptionsRef.current) {
          const child = filteredOptionsRef.current.children[newIndex];
          const { top, bottom } = child.getBoundingClientRect();
          const parentRect = filteredOptionsRef.current.getBoundingClientRect();
          if (top < parentRect.top || bottom > parentRect.bottom)
            child.scrollIntoView({ block: "nearest" });
        }
      };
      switch (e.key) {
        case "Escape":
          handleClear({ trigger: e.key, event: e });
          toggleIsListOpen(false);
          break;
        case "ArrowDown": {
          e.preventDefault();
          const newIndex = Math.min(
            filteredOptionsIndex + 1,
            filteredOptions.length - 1
          );
          setFilteredOptionsIndex(newIndex);
          scrollToOption(newIndex);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const newIndex = Math.max(0, filteredOptionsIndex - 1);
          setFilteredOptionsIndex(newIndex);
          scrollToOption(newIndex);
          break;
        }
        case "Enter":
          e.preventDefault();
          toggleOption(e);
          if (value && !filteredOptions.includes(value))
            handleAddCustomOption(e);
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
        }
      },
      [
        value,
        selectedOptions,
        customOptions,
        removeCustomOption,
        removeSelectedOption,
      ]
    );

    //focus on input whenever selectedOptions changes
    //Seems like a band-aid. Why does focus disappear?
    useEffect(() => {
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

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
              selectedOptions={selectedOptions}
              handleDeleteSelectedOption={handleDeleteSelectedOption}
            >
              <input
                key="combobox-input"
                ref={mergedInputRef}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                type="search"
                role="combobox"
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                aria-controls={isListOpen ? id : ""}
                aria-expanded={!!isListOpen}
                autoComplete="off"
                aria-autocomplete="list"
                aria-owns={`${id}-options`}
                aria-activedescendant={`${id}-option-${filteredOptions[filteredOptionsIndex]}`}
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
            ref={filteredOptionsRef}
            toggleOption={toggleOption}
            focusInput={focusInput}
            value={value}
            addCustomOption={handleAddCustomOption}
          />
        </div>
      </ComboboxWrapper>
    );
  }
);

export default Combobox;

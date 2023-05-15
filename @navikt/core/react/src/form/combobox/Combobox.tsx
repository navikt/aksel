import cl from "clsx";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { BodyShort, Label, mergeRefs } from "../..";
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
import { useInputContext } from "./Input/inputContext";
import Input from "./Input/Input";

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
      inputClassName,
      id = "",
      shouldShowSelectedOptions = true,
      singleSelect = false,
      ...rest
    } = props;

    // we have the code for error handling, and dont do anythign with it
    // TODO: if text is long, new line
    // TODO: mobile, should fewer options be shown at a time?

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);

    const { currentOption, toggleIsListOpen, filteredOptions } =
      useFilteredOptionsContext();
    const { customOptions, removeCustomOption, addCustomOption } =
      useCustomOptionsContext();
    const {
      selectedOptions,
      prevSelectedOptions,
      removeSelectedOption,
      addSelectedOption,
      setSingleSelectValue,
    } = useSelectedOptionsContext();

    const { value, onChange } = useInputContext();

    const singleSelectValue = useMemo(
      () => (singleSelect ? selectedOptions[0] : null),
      [selectedOptions, singleSelect]
    );

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
        console.log("DEBUG - toggleoption:");
        // onClick: toggle selected option
        if (clickedOption) {
          if (selectedOptions.includes(clickedOption)) {
            handleDeleteSelectedOption(clickedOption);
          } else if (filteredOptions.includes(clickedOption))
            if (singleSelect) setSingleSelectValue(clickedOption);
            else addSelectedOption(clickedOption);
        }
        // onEnter: remove selected filteredOption
        else if (focusedOption && selectedOptions.includes(focusedOption)) {
          removeSelectedOption(focusedOption);
          if (customOptions.includes(focusedOption))
            removeCustomOption({ value: focusedOption });
        }
        // onEnter: add focused option
        else if (
          focusedOption &&
          (filteredOptions?.includes?.(String(value)) || !value)
        ) {
          addSelectedOption(focusedOption);
        }
        //onEnter: add custom option
        else if (value && !filteredOptions.includes(value)) {
          handleAddCustomOption(event);
        }
      },
      [
        currentOption,
        selectedOptions,
        filteredOptions,
        value,
        singleSelect,
        setSingleSelectValue,
        addSelectedOption,
        handleDeleteSelectedOption,
        removeSelectedOption,
        customOptions,
        removeCustomOption,
        handleAddCustomOption,
      ]
    );

    //focus on input whenever selectedOptions changes
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
            {singleSelect ? (
              <>
                <span className="navds-combobox__single-select">
                  {singleSelectValue}
                </span>
                <Input
                  key="combobox-input"
                  ref={mergedInputRef}
                  {...rest}
                  value={value}
                  onChange={(e) => onChange(e?.target?.value)}
                  inputClassName={inputClassName}
                  handleClear={handleClear}
                  toggleOption={toggleOption}
                />
              </>
            ) : (
              <SelectedOptions
                selectedOptions={
                  shouldShowSelectedOptions ? selectedOptions : undefined
                }
                handleDeleteSelectedOption={handleDeleteSelectedOption}
              >
                <Input
                  key="combobox-input"
                  ref={mergedInputRef}
                  value={value}
                  onChange={(e) => onChange(e?.target?.value)}
                  inputClassName={inputClassName}
                  handleClear={handleClear}
                  toggleOption={toggleOption}
                  {...rest}
                />
              </SelectedOptions>
            )}
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
            loading={loading}
          />
        </div>
      </ComboboxWrapper>
    );
  }
);

export default Combobox;

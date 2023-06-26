import cl from "clsx";
import React, { forwardRef, useCallback, useMemo } from "react";
import { BodyShort, Label, mergeRefs } from "../..";
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

export const Combobox = forwardRef<
  HTMLInputElement,
  Omit<ComboboxProps, "onChange" | "options" | "size">
>((props, ref) => {
  const {
    value: externalValue,
    onClear,
    className,
    hideLabel = false,
    description,
    label,
    clearButton = true,
    clearButtonLabel,
    toggleListButton = true,
    toggleListButtonLabel,
    inputClassName,
    shouldShowSelectedOptions = true,
    ...rest
  } = props;

  // we have the code for error handling, and dont do anythign with it
  // TODO: if text is long, new line
  // TODO: mobile, should fewer options be shown at a time?

  const { currentOption, toggleIsListOpen, filteredOptions } =
    useFilteredOptionsContext();
  const { customOptions, removeCustomOption, addCustomOption } =
    useCustomOptionsContext();
  const {
    selectedOptions,
    removeSelectedOption,
    addSelectedOption,
    singleSelect,
  } = useSelectedOptionsContext();

  const {
    focusInput,
    hasError,
    inputDescriptionId,
    inputProps,
    inputRef,
    value,
    size = "medium",
    setValue,
  } = useInputContext();

  const mergedInputRef = useMemo(
    () => mergeRefs([inputRef, ref]),
    [inputRef, ref]
  );

  const handleClear = useCallback(
    (event: ComboboxClearEvent) => {
      onClear?.(event);
      setValue("");
    },
    [setValue, onClear]
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
    },
    [selectedOptions, value, addCustomOption, handleClear]
  );

  const toggleOption = useCallback(
    (event) => {
      const clickedOption = event?.target?.textContent;
      const focusedOption = currentOption;
      // onClick: toggle selected option
      if (clickedOption) {
        if (selectedOptions.includes(clickedOption)) {
          handleDeleteSelectedOption(clickedOption);
        } else if (filteredOptions.includes(clickedOption))
          addSelectedOption(clickedOption);
      }
      // onEnter: remove selected filteredOption
      else if (focusedOption && selectedOptions.includes(focusedOption)) {
        removeSelectedOption(focusedOption);
        if (customOptions.includes(focusedOption))
          removeCustomOption({ value: focusedOption });
      }
      // onEnter: add focused option
      else if (focusedOption && filteredOptions?.includes?.(focusedOption)) {
        addSelectedOption(focusedOption);
      }
      //onEnter: add custom option
      else if (focusedOption && !filteredOptions.includes(focusedOption)) {
        handleAddCustomOption(event);
      }
    },
    [
      currentOption,
      selectedOptions,
      filteredOptions,
      addSelectedOption,
      handleDeleteSelectedOption,
      removeSelectedOption,
      customOptions,
      removeCustomOption,
      handleAddCustomOption,
    ]
  );

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
        <div
          className={cl(
            "navds-combobox__wrapper-inner navds-text-field__input",
            {
              "navds-combobox__wrapper-inner--virtually-unfocused":
                currentOption,
            }
          )}
          onClick={focusInput}
        >
          {singleSelect ? (
            <>
              <Input
                id={inputProps.id}
                key="combobox-input"
                ref={mergedInputRef}
                inputClassName={inputClassName}
                handleClear={handleClear}
                toggleOption={toggleOption}
                singleSelect
                {...rest}
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
                id={inputProps.id}
                key="combobox-input"
                ref={mergedInputRef}
                inputClassName={inputClassName}
                handleClear={handleClear}
                toggleOption={toggleOption}
                {...rest}
              />
            </SelectedOptions>
          )}
          {value && clearButton && (
            <ClearButton
              handleClear={(event) => handleClear({ trigger: "Click", event })}
              clearButtonLabel={clearButtonLabel}
            />
          )}
          {toggleListButton && (
            <ToggleListButton toggleListButtonLabel={toggleListButtonLabel} />
          )}
        </div>
        <FilteredOptions
          singleSelect={singleSelect}
          id={inputProps.id}
          toggleOption={toggleOption}
        />
      </div>
    </ComboboxWrapper>
  );
});

export default Combobox;

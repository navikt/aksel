import cl from "clsx";
import React, { forwardRef, useMemo, useRef } from "react";
import { BodyShort, Label, mergeRefs } from "../..";
import ClearButton from "./ClearButton";
import FilteredOptions from "./FilteredOptions/FilteredOptions";
import { useFilteredOptionsContext } from "./FilteredOptions/filteredOptionsContext";
import SelectedOptions from "./SelectedOptions/SelectedOptions";
import ToggleListButton from "./ToggleListButton";
import { ComboboxProps } from "./types";
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

  const toggleListButtonRef = useRef<HTMLButtonElement>(null);

  const { currentOption, toggleIsListOpen } = useFilteredOptionsContext();
  const { selectedOptions } = useSelectedOptionsContext();

  const {
    clearInput,
    focusInput,
    hasError,
    inputDescriptionId,
    inputProps,
    inputRef,
    value,
    size = "medium",
  } = useInputContext();

  const mergedInputRef = useMemo(
    () => mergeRefs([inputRef, ref]),
    [inputRef, ref]
  );

  return (
    <ComboboxWrapper
      className={className}
      hasError={hasError}
      inputProps={inputProps}
      inputSize={size}
      toggleIsListOpen={toggleIsListOpen}
      toggleListButtonRef={toggleListButtonRef}
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
                currentOption !== null,
            }
          )}
          onClick={focusInput}
        >
          {!shouldShowSelectedOptions ? (
            <Input
              id={inputProps.id}
              ref={mergedInputRef}
              inputClassName={inputClassName}
              {...rest}
            />
          ) : (
            <SelectedOptions selectedOptions={selectedOptions} size={size}>
              <Input
                id={inputProps.id}
                ref={mergedInputRef}
                inputClassName={inputClassName}
                {...rest}
              />
            </SelectedOptions>
          )}
          {value && clearButton && (
            <ClearButton
              handleClear={clearInput}
              clearButtonLabel={clearButtonLabel}
              tabIndex={-1}
            />
          )}
          {toggleListButton && (
            <ToggleListButton
              toggleListButtonLabel={toggleListButtonLabel}
              ref={toggleListButtonRef}
            />
          )}
        </div>
        <FilteredOptions />
      </div>
    </ComboboxWrapper>
  );
});

export default Combobox;

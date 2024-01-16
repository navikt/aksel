import cl from "clsx";
import React, { forwardRef, useRef } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import ClearButton from "./ClearButton";
import ComboboxWrapper from "./ComboboxWrapper";
import FilteredOptions from "./FilteredOptions/FilteredOptions";
import { useFilteredOptionsContext } from "./FilteredOptions/filteredOptionsContext";
import Input from "./Input/Input";
import { useInputContext } from "./Input/inputContext";
import SelectedOptions from "./SelectedOptions/SelectedOptions";
import { useSelectedOptionsContext } from "./SelectedOptions/selectedOptionsContext";
import ToggleListButton from "./ToggleListButton";
import { ComboboxProps } from "./types";

export const Combobox = forwardRef<
  HTMLInputElement,
  Omit<ComboboxProps, "onChange" | "options" | "size" | "onClear" | "value">
>((props, ref) => {
  const {
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

  const { activeDecendantId, toggleIsListOpen } = useFilteredOptionsContext();
  const { selectedOptions } = useSelectedOptionsContext();

  const {
    clearInput,
    error,
    errorId,
    focusInput,
    hasError,
    inputDescriptionId,
    inputProps,
    inputRef,
    value,
    showErrorMsg,
    size = "medium",
  } = useInputContext();

  const mergedInputRef = useMergeRefs(inputRef, ref);

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
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={cl(
            "navds-combobox__wrapper-inner navds-text-field__input",
            {
              "navds-combobox__wrapper-inner--virtually-unfocused":
                activeDecendantId !== undefined,
            },
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
          <div>
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
        </div>
        <FilteredOptions />
      </div>
      <div
        className="navds-form-field__error"
        id={errorId}
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {showErrorMsg && <ErrorMessage size={size}>{error}</ErrorMessage>}
      </div>
    </ComboboxWrapper>
  );
});

export default Combobox;

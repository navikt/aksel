import cl from "clsx";
import React, { forwardRef } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import ComboboxWrapper from "./ComboboxWrapper";
import FilteredOptions from "./FilteredOptions/FilteredOptions";
import { useFilteredOptionsContext } from "./FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./Input/Input.context";
import { InputController } from "./Input/InputController";
import { ComboboxProps } from "./types";

export const Combobox = forwardRef<
  HTMLInputElement,
  Omit<ComboboxProps, "onChange" | "options" | "size" | "onClear" | "value">
>((props, ref) => {
  const { className, hideLabel = false, description, label, ...rest } = props;

  const { toggleIsListOpen } = useFilteredOptionsContext();

  const {
    error,
    errorId,
    hasError,
    inputDescriptionId,
    inputProps,
    showErrorMsg,
    size = "medium",
  } = useInputContext();

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
        <InputController ref={ref} {...rest} />
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

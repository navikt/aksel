import React, { forwardRef } from "react";
import { Floating } from "../../overlays/floating/Floating";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { cl } from "../../utils/helpers";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import ComboboxWrapper from "./ComboboxWrapper";
import FilteredOptions from "./FilteredOptions/FilteredOptions";
import { useInputContext } from "./Input/Input.context";
import { InputController } from "./Input/InputController";
import { ComboboxProps } from "./types";

export const Combobox = forwardRef<
  HTMLInputElement,
  Omit<
    ComboboxProps,
    "onChange" | "options" | "size" | "onClear" | "value" | "disabled"
  >
>((props, ref) => {
  const { className, hideLabel = false, description, label, ...rest } = props;

  const {
    error,
    errorId,
    hasError,
    inputDescriptionId,
    inputProps,
    showErrorMsg,
    size = "medium",
    readOnly,
  } = useInputContext();

  return (
    <Floating>
      <ComboboxWrapper
        className={className}
        hasError={hasError}
        inputProps={inputProps}
        inputSize={size}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("aksel-form-field__label", {
            "aksel-sr-only": hideLabel,
          })}
        >
          {readOnly && <ReadOnlyIconWithTitle />}
          {label}
        </Label>
        {!!description && (
          <BodyShort
            as="div"
            className={cl("aksel-form-field__description", {
              "aksel-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="aksel-combobox__wrapper">
          <InputController ref={ref} {...rest} />
          <FilteredOptions />
        </div>
        <div
          className="aksel-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && (
            <ErrorMessage size={size} showIcon>
              {error}
            </ErrorMessage>
          )}
        </div>
      </ComboboxWrapper>
    </Floating>
  );
});

export default Combobox;

import cl from "clsx";
import React, { forwardRef, useMemo, useRef } from "react";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { ComboboxPropsContextProvider } from "./Combobox.context";
import { ComboboxProps } from "./Combobox.types";
import ComboboxWrapper from "./ComboboxWrapper";
import Field from "./parts/field/Field";
import FilteredOptions from "./parts/filtered-options/FilteredOptions";
import { useFilteredOptionsContext } from "./parts/filtered-options/FilteredOptions.context";
import Input from "./parts/input/Input";
import { useInputContext } from "./parts/input/Input.context";

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      className,
      description,
      label,
      hideLabel = false,
      clearButton = true,
      toggleListButton = true,
      shouldShowSelectedOptions = true,
      inputClassName,
      ...rest
    }: ComboboxProps = props;

    const toggleListButtonRef = useRef<HTMLButtonElement>(null);

    const { toggleIsListOpen } = useFilteredOptionsContext();

    const {
      error,
      errorId,
      hasError,
      inputDescriptionId,
      inputProps,
      inputRef,
      showErrorMsg,
      size = "medium",
    } = useInputContext();

    const mergedInputRef = useMergeRefs(inputRef, ref);

    const memoProps = useMemo(
      () => ({
        ...props,
        hideLabel,
        clearButton,
        toggleListButton,
        shouldShowSelectedOptions,
      }),
      [
        clearButton,
        hideLabel,
        shouldShowSelectedOptions,
        toggleListButton,
        props,
      ],
    );

    return (
      <ComboboxPropsContextProvider {...memoProps}>
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
            <Field toggleRef={toggleListButtonRef}>
              <Input
                id={inputProps.id}
                ref={mergedInputRef}
                inputClassName={inputClassName}
                {...omit(rest, ["clearButtonLabel", "toggleListButtonLabel"])}
              />
            </Field>
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
      </ComboboxPropsContextProvider>
    );
  },
);

export default Combobox;

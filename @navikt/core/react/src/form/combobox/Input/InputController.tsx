/* eslint-disable jsx-a11y/no-static-element-interactions */
import cl from "clsx";
import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { useMergeRefs } from "../../../util/hooks";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import SelectedOptions from "../SelectedOptions/SelectedOptions";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { ComboboxProps } from "../types";
import Input from "./Input";
import { useInputContext } from "./Input.context";
import ToggleListButton from "./ToggleListButton";

/* eslint-disable jsx-a11y/click-events-have-key-events */
export const InputController = forwardRef<
  HTMLInputElement,
  Omit<
    ComboboxProps,
    | "label"
    | "description"
    | "hideLabel"
    | "onChange"
    | "options"
    | "size"
    | "onClear"
    | "value"
  >
>((props, ref) => {
  const {
    clearButton = true,
    clearButtonLabel,
    toggleListButton = true,
    toggleListButtonLabel,
    inputClassName,
    shouldShowSelectedOptions = true,
    ...rest
  } = props;

  const {
    clearInput,
    focusInput,
    inputProps,
    value,
    size = "medium",
    inputRef,
    toggleOpenButtonRef,
  } = useInputContext();

  const { activeDecendantId } = useFilteredOptionsContext();
  const { selectedOptions } = useSelectedOptionsContext();

  const mergedInputRef = useMergeRefs(inputRef, ref);

  return (
    <div
      className={cl("navds-combobox__wrapper-inner navds-text-field__input", {
        "navds-combobox__wrapper-inner--virtually-unfocused":
          activeDecendantId !== undefined,
      })}
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
          <button
            type="button"
            onClick={clearInput}
            className="navds-combobox__button-clear"
            tabIndex={-1}
          >
            <span className="navds-sr-only">
              {clearButtonLabel ? clearButtonLabel : "Tøm"}
            </span>
            <XMarkIcon aria-hidden />
          </button>
        )}
        {toggleListButton && (
          <ToggleListButton
            toggleListButtonLabel={toggleListButtonLabel}
            ref={toggleOpenButtonRef}
          />
        )}
      </div>
    </div>
  );
});

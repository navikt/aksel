/* eslint-disable jsx-a11y/no-static-element-interactions */
import cl from "clsx";
import React, { forwardRef } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";
import { useMergeRefs } from "../../../util/hooks";
import { useI18n } from "../../../util/i18n/i18n.context";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import SelectedOptions from "../SelectedOptions/SelectedOptions";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { ComboboxProps } from "../types";
import Input from "./Input";
import { useInputContext } from "./Input.context";
import ToggleListButton from "./ToggleListButton";

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
    | "disabled"
  >
>((props, ref) => {
  const {
    clearButton = true,
    clearButtonLabel,
    toggleListButton = true,
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
    readOnly,
  } = useInputContext();

  const { activeDecendantId } = useFilteredOptionsContext();
  const { selectedOptions } = useSelectedOptionsContext();

  const mergedInputRef = useMergeRefs(inputRef, ref);

  const translate = useI18n(
    "Combobox",
    clearButtonLabel ? { clear: clearButtonLabel } : undefined,
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
          readOnly={readOnly}
          {...rest}
        />
      ) : (
        <SelectedOptions selectedOptions={selectedOptions} size={size}>
          <Input
            id={inputProps.id}
            ref={mergedInputRef}
            inputClassName={inputClassName}
            shouldShowSelectedOptions={shouldShowSelectedOptions}
            readOnly={readOnly}
            {...rest}
          />
        </SelectedOptions>
      )}
      <div>
        {value && clearButton && (
          <div
            onClick={clearInput}
            className="navds-combobox__button-clear"
            aria-hidden
            title={translate("clear")}
          >
            <XMarkIcon />
          </div>
        )}
        {toggleListButton && <ToggleListButton ref={toggleOpenButtonRef} />}
      </div>
    </div>
  );
});

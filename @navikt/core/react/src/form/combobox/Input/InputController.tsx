/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { forwardRef } from "react";
import { Floating } from "../../../overlays/floating/Floating";
import { useRenameCSS } from "../../../theme/Theme";
import { useMergeRefs } from "../../../util/hooks";
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Remove when prop has been removed from ComboboxProps.
    clearButton,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Remove when prop has been removed from ComboboxProps.
    clearButtonLabel,
    toggleListButton = true,
    inputClassName,
    shouldShowSelectedOptions = true,

    ...rest
  } = props;

  const { cn } = useRenameCSS();

  const {
    focusInput,
    inputProps,
    size = "medium",
    inputRef,
    toggleOpenButtonRef,
    readOnly,
  } = useInputContext();

  const { activeDecendantId, toggleIsListOpen } = useFilteredOptionsContext();
  const { selectedOptions } = useSelectedOptionsContext();

  const mergedInputRef = useMergeRefs(inputRef, ref);

  return (
    <Floating.Anchor asChild>
      <div
        className={cn("navds-combobox__wrapper-inner navds-text-field__input", {
          "navds-combobox__wrapper-inner--virtually-unfocused":
            activeDecendantId !== undefined,
        })}
        onClick={() => {
          if (inputProps.disabled || readOnly) {
            return;
          }

          toggleIsListOpen(true);
          focusInput();
        }}
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
        {toggleListButton && <ToggleListButton ref={toggleOpenButtonRef} />}
      </div>
    </Floating.Anchor>
  );
});

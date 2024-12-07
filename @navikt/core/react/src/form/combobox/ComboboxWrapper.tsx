/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import cl from "clsx";
import React, { useRef, useState } from "react";
import { useInputContext } from "./Input/Input.context";

type ComboboxWrapperProps = {
  children: any;
  className?: string;
  hasError: boolean;
  inputProps: {
    disabled?: boolean;
  };
  readOnly?: boolean;
  inputSize: string;
  toggleIsListOpen: (isListOpen: boolean) => void;
};

const ComboboxWrapper = ({
  children,
  className,
  hasError,
  inputProps,
  inputSize,
  toggleIsListOpen,
}: ComboboxWrapperProps) => {
  const { toggleOpenButtonRef, clearInput, readOnly } = useInputContext();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);

  function onFocusInsideWrapper(event: React.FocusEvent<HTMLDivElement>) {
    if (
      !wrapperRef.current?.contains(event.relatedTarget) &&
      toggleOpenButtonRef?.current !== event.target
    ) {
      setHasFocusWithin(true);
    }
  }

  function onBlurWrapper(event: React.FocusEvent<HTMLDivElement>) {
    if (!wrapperRef.current?.contains(event.relatedTarget)) {
      toggleIsListOpen(false);
      setHasFocusWithin(false);
      clearInput(event);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={cl(
        className,
        "navds-form-field",
        `navds-form-field--${inputSize}`,
        {
          "navds-combobox--error": hasError,
          "navds-combobox--disabled": !!inputProps.disabled,
          "navds-combobox--focused": hasFocusWithin,
          "navds-combobox--readonly": readOnly,
          "navds-form-field--readonly": readOnly,
        },
      )}
      onFocus={onFocusInsideWrapper}
      onBlur={onBlurWrapper}
      onClick={() => {
        if (inputProps.disabled || readOnly) {
          return;
        }

        /* Allows for opening input on click, but not on focus */
        toggleIsListOpen(true);
      }}
    >
      {children}
    </div>
  );
};

export default ComboboxWrapper;

import React, { useRef, useState } from "react";
import { cl } from "../../util/className";
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
};

const ComboboxWrapper = ({
  children,
  className,
  hasError,
  inputProps,
  inputSize,
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
      setHasFocusWithin(false);
      clearInput(event);
    }
  }

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Wrapper for combobox input and chips.
    <div
      ref={wrapperRef}
      className={cl(
        className,
        "aksel-form-field",
        `aksel-form-field--${inputSize}`,
        {
          "aksel-combobox--error": hasError,
          "aksel-combobox--disabled": !!inputProps.disabled,
          "aksel-combobox--focused": hasFocusWithin,
          "aksel-combobox--readonly": readOnly,
          "aksel-form-field--readonly": readOnly,
        },
      )}
      onFocus={onFocusInsideWrapper}
      onBlur={onBlurWrapper}
    >
      {children}
    </div>
  );
};

export default ComboboxWrapper;

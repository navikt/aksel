import React, { useRef, useState } from "react";
import { useRenameCSS } from "../../theme/Theme";
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
  const { cn } = useRenameCSS();
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
      className={cn(
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
    >
      {children}
    </div>
  );
};

export default ComboboxWrapper;

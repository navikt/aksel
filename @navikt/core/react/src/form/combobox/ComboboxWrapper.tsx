import cl from "clsx";
import React, { useRef, useState } from "react";

type ComboboxWrapperProps = {
  children: any;
  className?: string;
  hasError: boolean;
  inputProps: {
    disabled?: boolean;
  };
  inputSize: string;
  toggleIsListOpen: (isListOpen: boolean) => void;
  toggleListButtonRef: React.RefObject<HTMLButtonElement>;
};

const ComboboxWrapper = ({
  children,
  className,
  hasError,
  inputProps,
  inputSize,
  toggleIsListOpen,
  toggleListButtonRef,
}: ComboboxWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [hasFocusWithin, setHasFocusWithin] = useState(false);

  function onFocusInsideWrapper(e) {
    if (
      !wrapperRef.current?.contains(e.relatedTarget) &&
      toggleListButtonRef?.current !== e.target
    ) {
      toggleIsListOpen(true);
      setHasFocusWithin(true);
    }
  }

  function onBlurWrapper(e) {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      toggleIsListOpen(false);
      setHasFocusWithin(false);
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={cl(
        className,
        "navds-form-field",
        `navds-form-field--${inputSize}`,
        "navds-search",
        {
          "navds-search--error": hasError,
          "navds-search--disabled": !!inputProps.disabled,
          "navds-combobox--focused": hasFocusWithin,
        }
      )}
      onFocus={onFocusInsideWrapper}
      onBlur={onBlurWrapper}
      tabIndex={-1}
    >
      {children}
    </div>
  );
};

export default ComboboxWrapper;

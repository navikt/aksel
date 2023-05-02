import cl from "clsx";
import React, { useRef } from "react";

type ComboboxWrapperProps = {
  children: any;
  className?: string;
  hasError: boolean;
  inputProps: {
    disabled?: boolean;
  };
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function onBlurWrapper(e) {
    if (!wrapperRef.current?.contains(e.relatedTarget)) {
      toggleIsListOpen(false);
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
        }
      )}
      onBlur={onBlurWrapper}
    >
      {children}
    </div>
  );
};

export default ComboboxWrapper;

import React, { forwardRef, InputHTMLAttributes, useContext } from "react";
import cl from "classnames";
import { FieldsetContext } from "../../index";
import { RadioGroupContext } from "./RadioGroup";
import useId from "../useId";
import ErrorMessage from "../ErrorMessage";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  children: React.ReactNode;
  /**
   * @ignore
   */
  className?: string;
  size?: "m" | "s";
  disabled?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Custom id for error message
   */
  errorId?: string;
  value: string;
}

const useRadio = (props: RadioProps) => {
  const radioGroup = useContext(RadioGroupContext);
  const { error: fieldsetError, errorId: fieldsetErrorId, size } = useContext(
    FieldsetContext
  );

  if (!radioGroup) {
    console.warn("<Radio> must be used inside <RadioGroup>.");
  }

  const id = useId({ id: props.id, prefix: "Radio" });
  const errorId = useId({ id: props.errorId, prefix: "RadioError" });
  const disabled = radioGroup?.disabled || props.disabled;
  return {
    inputProps: {
      ...props,
      name: radioGroup?.name,
      checked:
        (radioGroup?.value ?? radioGroup?.defaultValue) === props.value
          ? true
          : undefined,
      onChange: (e) => {
        props.onChange && props.onChange(e);
        radioGroup?.onChange && radioGroup.onChange(props.value);
      },
      required: radioGroup?.required || props.required,
      id: id,
      "aria-invalid": !props.disabled && !!(props.error || fieldsetError),
      "aria-describedby":
        !props.disabled && (props.error || fieldsetError)
          ? props.error
            ? props.errorId
              ? props.errorId
              : errorId
            : fieldsetErrorId
          : undefined,
      type: "radio",
      disabled: radioGroup?.disabled || props.disabled,
    },
    _errorId: errorId,
    showErrorStyle: disabled && (props.error || fieldsetError),
    showErrorMsg: disabled && props.error && !fieldsetError,
    _size: props.size ? props.size : size ?? "m",
  };
};

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { className, children, required } = props;
  if (required !== undefined) {
    console.warn("required is only supported on <RadioGroup>.");
  }
  const {
    inputProps,
    _errorId,
    showErrorStyle,
    showErrorMsg,
    _size,
  } = useRadio(props);

  return (
    <div
      className={cl(
        "navds-form__element",
        "navds-body-short",
        `navds-body--${_size}`,
        {
          "navds-radio--error": showErrorStyle,
        }
      )}
    >
      <input
        {...inputProps}
        {...rest}
        ref={ref}
        className={cl("navds-radio", className, `navds-radio--${_size}`)}
      />
      <label
        htmlFor={inputProps.id}
        className={cl("navds-radio__label", "navds-body-short", {
          "navds-body--s": _size,
        })}
      >
        {children}
      </label>
      <div id={_errorId} aria-relevant="additions removals" aria-live="polite">
        {showErrorMsg && <ErrorMessage>{props.error}</ErrorMessage>}
      </div>
    </div>
  );
});

export default Radio;

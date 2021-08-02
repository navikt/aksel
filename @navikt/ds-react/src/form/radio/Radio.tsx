import React, {
  forwardRef,
  InputHTMLAttributes,
  useContext,
  useRef,
} from "react";
import cl from "classnames";
import { v4 as uuidv4 } from "uuid";
import { FieldsetContext } from "../../index";
import { RadioGroupContext } from "./RadioGroup";

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

  if (!radioGroup) {
    console.warn("<Radio> must be used inside <RadioGroup>.");
  }

  return {
    inputProps: {
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
    },
  };
};

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const {
    className,
    size,
    children,
    error,
    errorId,
    id,
    required,
    ...rest
  } = props;
  if (required !== undefined) {
    console.warn("required is only supported on <RadioGroup>.");
  }
  const { inputProps } = useRadio(props);
  const internalId = useRef(uuidv4());
  const internalErrorId = useRef(uuidv4());

  const context = useContext(FieldsetContext);

  const errorMsg = context.error ?? error;
  const errorUuid = context.errorId ?? errorId ?? internalErrorId.current;
  const selectedSize = size ? size : context.size ?? "m";

  return (
    <div
      className={cl("navds-form__element", {
        "navds-radio--error": !!errorMsg,
      })}
    >
      <input
        {...inputProps}
        {...rest}
        id={id ?? internalId.current}
        ref={ref}
        type="radio"
        className={cl("navds-radio", className, `navds-radio--${selectedSize}`)}
        aria-invalid={rest.disabled ? undefined : !!errorMsg}
        aria-describedby={rest.disabled ? undefined : !!errorMsg && errorUuid}
      />
      <label
        htmlFor={id ?? internalId.current}
        className={cl("navds-radio__label", "navds-body-short", {
          "navds-body--s": selectedSize === "s",
        })}
      >
        {children}
      </label>
      <div id={errorUuid} aria-relevant="additions removals" aria-live="polite">
        {!context.error && errorMsg && !rest.disabled && (
          <div
            className={cl("navds-label", "navds-form--error", {
              "navds-label--s": selectedSize === "s",
            })}
          >
            {errorMsg}
          </div>
        )}
      </div>
    </div>
  );
});

export default Radio;

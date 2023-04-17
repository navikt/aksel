import cl from "clsx";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import { BodyShort, Detail, Loader, omit } from "..";
import { FormFieldProps, useFormField } from "./useFormField";

const SelectedIcon = () => (
  <svg
    width="12px"
    height="12px"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable={false}
    role="img"
    aria-hidden
    aria-label="Deaktiver valg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.01386 8L10.25 2L11 2.75L4.01386 9.5L1 6.5L1.75 5.75L4.01386 8Z"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

export interface SwitchProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Switch-label
   */
  children: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  /**
   * Toggles loading state with loader-component on switch
   */
  loading?: boolean;
  /**
   * Positions switch on left/right side of label
   * @default "left"
   */
  position?: "left" | "right";
  /**
   * Adds a description to extend labling of Switch
   */
  description?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { inputProps, size } = useFormField(props, "switch");

    const {
      children,
      className,
      description,
      hideLabel = false,
      loading,
      checked: checkedProp,
      defaultChecked,
      position = "left",
      ...rest
    } = props;

    const Description = size === "medium" ? BodyShort : Detail;

    const [checked, setChecked] = useState(
      defaultChecked ?? checkedProp ?? false
    );

    useEffect(() => {
      checkedProp !== undefined && setChecked(checkedProp);
    }, [checkedProp]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      props.onChange && props.onChange(e);
    };

    return (
      <div
        className={cl(
          "navds-switch",
          props.className,
          `navds-switch--${size}`,
          `navds-switch--${position}`,
          {
            "navds-switch--loading": loading,
            "navds-switch--disabled": inputProps.disabled ?? loading,
          }
        )}
      >
        <input
          {...omit(rest, ["size"])}
          {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
          disabled={inputProps.disabled ?? loading}
          checked={checkedProp}
          defaultChecked={defaultChecked}
          ref={ref}
          type="checkbox"
          onChange={(e) => handleChange(e)}
          className={cl(className, "navds-switch__input")}
        />
        <span className="navds-switch__track">
          <span className="navds-switch__thumb">
            {loading ? (
              <Loader size="xsmall" aria-live="polite" />
            ) : checked ? (
              <SelectedIcon />
            ) : null}
          </span>
        </span>
        <label htmlFor={inputProps.id} className="navds-switch__label-wrapper">
          <div
            className={cl("navds-switch__content", {
              "navds-sr-only": hideLabel,
              "navds-switch--with-description": !!description && !hideLabel,
            })}
          >
            <BodyShort as="div" size={size} className="navds-switch__label">
              {children}
            </BodyShort>
            {description && (
              <Description
                as="div"
                size="small"
                className="navds-switch__description"
              >
                {description}
              </Description>
            )}
          </div>
        </label>
      </div>
    );
  }
);

export default Switch;

import React, {
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Loader } from "../../loader";
import { useRenameCSS } from "../../theme/Theme";
import { BodyShort } from "../../typography";
import { omit } from "../../util";
import { ReadOnlyIconWithTitle } from "../ReadOnlyIcon";
import { FormFieldProps, useFormField } from "../useFormField";

export interface SwitchProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * Switch-label.
   */
  children: React.ReactNode;
  /**
   * If enabled shows the label and description for screenreaders only.
   */
  hideLabel?: boolean;
  /**
   * Toggles loading state with loader-component on switch.
   */
  loading?: boolean;
  /**
   * Positions switch on left/right side of label.
   * @default "left"
   */
  position?: "left" | "right";
  /**
   * Adds a description to extend labeling of Switch.
   */
  description?: string;
}

/**
 * A component that displays a switch input field.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/switch)
 * @see 🏷️ {@link SwitchProps}
 *
 * @example
 * ```jsx
 * <Switch>Varsle med SMS</Switch>
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (props, ref) => {
    const { inputProps, size, readOnly } = useFormField(props, "switch");

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

    const { cn } = useRenameCSS();

    const [_checked, setChecked] = useState(
      defaultChecked ?? checkedProp ?? false,
    );

    useEffect(() => {
      checkedProp !== undefined && setChecked(checkedProp);
    }, [checkedProp]);

    const checked = checkedProp ?? _checked;

    return (
      <div
        className={cn(
          "navds-switch",
          props.className,
          `navds-switch--${size}`,
          `navds-switch--${position}`,
          {
            "navds-switch--loading": loading,
            "navds-switch--disabled": inputProps.disabled ?? loading,
            "navds-switch--readonly": readOnly,
            "navds-switch--standalone": hideLabel,
          },
        )}
      >
        <input
          {...omit(rest, ["size", "readOnly"])}
          {...omit(inputProps, ["aria-invalid", "aria-describedby"])}
          disabled={inputProps.disabled ?? loading}
          checked={checkedProp}
          defaultChecked={defaultChecked}
          ref={ref}
          type="checkbox"
          onChange={(event) => {
            if (readOnly) {
              return;
            }
            setChecked(event.target.checked);
            props.onChange?.(event);
          }}
          onClick={(event) => {
            if (readOnly) {
              event.preventDefault();
              return;
            }
            props.onClick?.(event);
          }}
          className={cn(className, "navds-switch__input")}
        />
        <span className={cn("navds-switch__track")}>
          <span className={cn("navds-switch__thumb")}>
            <SwitchIcon size={size} checked={checked} loading={loading} />
          </span>
        </span>
        <label
          htmlFor={inputProps.id}
          className={cn("navds-switch__label-wrapper")}
        >
          <div
            className={cn("navds-switch__content", {
              "navds-sr-only": hideLabel,
              "navds-switch--with-description": description && !hideLabel,
            })}
          >
            <BodyShort
              as="div"
              size={size}
              className={cn("navds-switch__label")}
            >
              {readOnly && <ReadOnlyIconWithTitle />}
              {children}
            </BodyShort>
            {description && (
              <BodyShort
                size={size}
                as="div"
                className={cn(
                  "navds-form-field__subdescription navds-switch__description",
                )}
              >
                {description}
              </BodyShort>
            )}
          </div>
        </label>
      </div>
    );
  },
);

const SwitchIcon = ({
  size,
  checked,
  loading,
}: {
  size: SwitchProps["size"];
  checked: SwitchProps["checked"];
  loading: SwitchProps["loading"];
}) => {
  if (loading) {
    let baseSize = 16;

    if (size === "small") {
      baseSize = 12;
    }

    if (checked) {
      baseSize += 2;
    }

    return (
      <Loader
        size="small"
        aria-live="polite"
        variant={checked ? "interaction" : "inverted"}
        width={`${baseSize / 16}rem`}
        height={`${baseSize / 16}rem`}
      />
    );
  }

  if (!checked) {
    return null;
  }

  if (size === "small") {
    return (
      <svg
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable={false}
        role="img"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.62013 0.530226C10.1194 0.952686 10.1817 1.6999 9.7592 2.19917L5.4171 7.33075C5.20318 7.58356 4.89318 7.73525 4.5623 7.74901C4.23142 7.76277 3.90989 7.63735 3.67572 7.40318L1.3073 5.03476C0.844833 4.5723 0.844833 3.8225 1.3073 3.36003C1.76976 2.89757 2.51956 2.89757 2.98202 3.36003L4.4404 4.81841L7.95118 0.669304C8.37364 0.170033 9.12085 0.107765 9.62013 0.530226Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      role="img"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2674 0.647802C11.8762 1.20971 11.9141 2.1587 11.3522 2.76743L5.35221 9.26743C5.07531 9.56739 4.68813 9.74155 4.27998 9.74971C3.87184 9.75787 3.478 9.59933 3.18934 9.31067L0.68934 6.81067C0.103553 6.22488 0.103553 5.27513 0.68934 4.68935C1.27513 4.10356 2.22487 4.10356 2.81066 4.68935L4.20673 6.08541L9.14779 0.732587C9.7097 0.123856 10.6587 0.0858967 11.2674 0.647802Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Switch;

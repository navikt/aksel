import cl from "clsx";
import React, { forwardRef, useRef, useState } from "react";
import { Loader } from "../loader";
import { Label } from "../typography";
import { omit } from "../util";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { useClientLayoutEffect } from "../util/hooks";
import { useMergeRefs } from "../util/hooks/useMergeRefs";
import { OverridableComponent } from "../util/types";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button content.
   */
  children?: React.ReactNode;
  /**
   * Changes design and interaction-visuals.
   * @default "primary"
   */
  variant?:
    | "primary"
    | "primary-neutral"
    | "secondary"
    | "secondary-neutral"
    | "tertiary"
    | "tertiary-neutral"
    | "danger";
  /**
   * Changes padding, height, and font-size.
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
  /**
   * **Avoid using if possible for accessibility purposes**.
   *
   * Prevent the user from interacting with the button: it cannot be pressed or focused.
   */
  disabled?: boolean;
  /**
   * Replaces button content with a Loader component, keeps width.
   * @default false
   */
  loading?: boolean;
  /**
   * Button Icon.
   */
  icon?: React.ReactNode;
  /**
   * Icon position in Button.
   * @default "left"
   */
  iconPosition?: "left" | "right";
}

/**
 * A button component
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/button)
 * @see 🏷️ {@link ButtonProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 * @example
 * ```jsx
 * <Button>Klikk meg</Button>
 * ```
 */
export const Button: OverridableComponent<ButtonProps, HTMLButtonElement> =
  forwardRef(
    (
      {
        as: Component = "button",
        variant = "primary",
        className,
        children,
        size = "medium",
        loading = false,
        disabled,
        style,
        icon,
        iconPosition = "left",
        ...rest
      },
      ref,
    ) => {
      const buttonRef = useRef<HTMLButtonElement | null>(null);
      const [widthOverride, setWidthOverride] = useState<number>();

      const mergedRef = useMergeRefs(buttonRef, ref);

      useClientLayoutEffect(() => {
        if (loading) {
          const requestID = window.requestAnimationFrame(() => {
            setWidthOverride(
              buttonRef?.current?.getBoundingClientRect()?.width,
            );
          });
          return () => {
            setWidthOverride(undefined);
            cancelAnimationFrame(requestID);
          };
        }
      }, [loading, children]);

      const filterProps: React.ButtonHTMLAttributes<HTMLButtonElement> =
        disabled ?? widthOverride ? omit(rest, ["href"]) : rest;

      const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " && !disabled && !widthOverride) {
          e.currentTarget.click();
        }
      };

      return (
        <Component
          {...(Component !== "button" ? { role: "button" } : {})}
          {...filterProps}
          ref={mergedRef}
          onKeyUp={composeEventHandlers(filterProps.onKeyUp, handleKeyUp)}
          className={cl(
            className,
            "navds-button",
            `navds-button--${variant}`,
            `navds-button--${size}`,
            {
              "navds-button--loading": widthOverride,
              "navds-button--icon-only": !!icon && !children,
              "navds-button--disabled": disabled ?? widthOverride,
            },
          )}
          style={{
            ...style,
            width: widthOverride,
          }}
          disabled={disabled ?? widthOverride ? true : undefined}
        >
          {widthOverride ? (
            <Loader size={size} />
          ) : (
            <>
              {icon && iconPosition === "left" && (
                <span className="navds-button__icon">{icon}</span>
              )}
              {children && (
                <Label as="span" size={size === "medium" ? "medium" : "small"}>
                  {children}
                </Label>
              )}
              {icon && iconPosition === "right" && (
                <span className="navds-button__icon">{icon}</span>
              )}
            </>
          )}
        </Component>
      );
    },
  );

export default Button;

import React, { forwardRef } from "react";
import { Loader } from "../loader";
import { useRenameCSS } from "../theme/Theme";
import { AkselColor } from "../types";
import { Label } from "../typography";
import { omit } from "../util";
import { composeEventHandlers } from "../util/composeEventHandlers";
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

interface ButtonComponent
  extends OverridableComponent<ButtonProps, HTMLButtonElement> {
  /**
   * @see 🏷️ {@link ButtonProps}
   */
  Root: OverridableComponent<ButtonProps, HTMLButtonElement>;
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
export const Button = forwardRef(
    (
      {
        as: Component = "button",
        variant = "primary",
        className,
        children,
        size = "medium",
        loading = false,
        disabled,
        icon,
        iconPosition = "left",
        onKeyUp,
        "data-color": color,
        ...rest
      },
      ref,
    ) => {
      const { cn } = useRenameCSS();

      const filterProps = disabled || loading ? omit(rest, ["href"] as any) : rest;

      const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === " " && !disabled && !loading) {
          e.currentTarget.click();
        }
      };

      return (
        <Component
          {...(Component !== "button" ? { role: "button" } : {})}
          data-color={color ?? variantToColor(variant)}
          data-variant={variantToSimplifiedVariant(variant)}
          {...filterProps}
          ref={ref}
          onKeyUp={composeEventHandlers(onKeyUp, handleKeyUp)}
          className={cn(
            className,
            "navds-button",
            `navds-button--${variant}`,
            `navds-button--${size}`,
            {
              "navds-button--loading": loading,
              "navds-button--icon-only": !!icon && !children,
              "navds-button--disabled": disabled ?? loading,
            },
          )}
          disabled={disabled ?? loading ? true : undefined}
        >
          {icon && iconPosition === "left" && (
            <span className={cn("navds-button__icon")}>{icon}</span>
          )}
          {loading && <Loader size={size} />}
          {children && (
            <Label as="span" size={size === "medium" ? "medium" : "small"}>
              {children}
            </Label>
          )}
          {icon && iconPosition === "right" && (
            <span className={cn("navds-button__icon")}>{icon}</span>
          )}
        </Component>
      );
    },
  ) as OverridableComponent<ButtonProps, HTMLButtonElement> as ButtonComponent;

// Add Root property for namespace usage
(Button as ButtonComponent).Root = Button;

function variantToColor(
  variant: ButtonProps["variant"],
): AkselColor | undefined {
  switch (variant) {
    case "primary-neutral":
    case "secondary-neutral":
    case "tertiary-neutral":
      return "neutral";
    case "danger":
      return "danger";
    default:
      return undefined;
  }
}

function variantToSimplifiedVariant(
  variant: ButtonProps["variant"],
): "primary" | "secondary" | "tertiary" {
  switch (variant) {
    case "primary":
    case "primary-neutral":
    case "danger":
      return "primary";
    case "secondary":
    case "secondary-neutral":
      return "secondary";
    case "tertiary":
    case "tertiary-neutral":
      return "tertiary";
    default:
      return "primary";
  }
}

export default Button;

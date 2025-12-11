import React, { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import { Button, ButtonProps } from "../button";
import { useRenameCSS } from "../theme/Theme";
import type { AkselColor } from "../types/theme";
import { composeEventHandlers } from "../util/composeEventHandlers";
import copy from "../util/copy";
import { useTimeout } from "../util/hooks/useTimeout";
import { useI18n } from "../util/i18n/i18n.hooks";

export interface CopyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    Pick<ButtonProps, "iconPosition" | "size"> {
  /**
   * @deprecated Use `data-color` attribute instead.
   */
  variant?: "action" | "neutral";
  /**
   * Overrides color.
   * @default "neutral"
   *
   *
   * We recommend only using `accent` and `neutral`. We have disallowed status-colors.
   * @see 🏷️ {@link AkselColor}
   * @see [📝 Documentation](https://aksel.nav.no/grunnleggende/darkside/farger-darkside)
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
  /**
   * Text to copy to clipboard.
   */
  copyText: string;
  /**
   *  Optional text in button.
   */
  text?: string;
  /**
   * Text shown when button is clicked.
   * Will be used as accessible label (title) if `text`-prop is not set.
   * @default "Kopiert!"
   */
  activeText?: string;
  /**
   * Callback that is called when internal copy-state changes.
   *
   * @param state `true` when copy-state is activated, `false` when copy-state is deactivated.
   */
  onActiveChange?: (state: boolean) => void;
  /**
   *  Icon shown when button is not clicked.
   * @default <FilesIcon />
   */
  icon?: React.ReactNode;
  /**
   * Icon shown when active.
   * @default <CheckmarkIcon />
   */
  activeIcon?: React.ReactNode;
  /**
   * Timeout duration in milliseconds.
   * @default 2000
   */
  activeDuration?: number;
  /**
   * Accessible label for icon (ignored if text is set).
   * @default "Kopier"
   */
  title?: string;
}

/**
 * A button component that copies text to the clipboard when clicked.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/copybutton)
 * @see 🏷️ {@link CopyButtonProps}
 *
 * @example
 * ```jsx
      <CopyButton copyText="3.14" />
 * ```
 */
export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      copyText,
      text,
      activeText,
      variant,
      "data-color": dataColor = "neutral",
      onActiveChange,
      icon,
      activeIcon,
      activeDuration = 2000,
      title,
      iconPosition = "left",
      onClick,
      size = "medium",
      ...rest
    },
    ref,
  ) => {
    const [active, setActive] = useState(false);
    const translate = useI18n("CopyButton");
    const timeout = useTimeout();

    const { cn } = useRenameCSS();

    const handleClick = () => {
      copy(copyText);
      setActive(true);
      onActiveChange?.(true);

      timeout.start(activeDuration, () => {
        setActive(false);
        onActiveChange?.(false);
      });
    };

    const activeString = activeText || translate("activeText");

    return (
      <Button
        ref={ref}
        type="button"
        className={cn("navds-copybutton", className)}
        {...rest}
        variant="tertiary"
        data-color={variantToDataColor(variant) ?? dataColor}
        onClick={composeEventHandlers(onClick, handleClick)}
        iconPosition={iconPosition}
        icon={
          <React.Fragment>
            {active
              ? (activeIcon ?? (
                  <CheckmarkIcon
                    aria-hidden={!!text}
                    title={text ? undefined : activeString}
                    className={cn("navds-copybutton__icon")}
                  />
                ))
              : (icon ?? (
                  <FilesIcon
                    aria-hidden={!!text}
                    title={text ? undefined : title || translate("title")}
                    className={cn("navds-copybutton__icon")}
                  />
                ))}
          </React.Fragment>
        }
        data-active={active}
        size={size}
      >
        {text ? (active ? activeString : text) : null}
      </Button>
    );
  },
);

function variantToDataColor(
  variant: CopyButtonProps["variant"],
): Exclude<AkselColor, AkselStatusColorRole> | undefined {
  if (variant === "action") {
    return "accent";
  }
  if (variant === "neutral") {
    return "neutral";
  }
  return undefined;
}

export default CopyButton;

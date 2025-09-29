import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import { Button, ButtonProps } from "../button";
import { useRenameCSS, useThemeInternal } from "../theme/Theme";
import { Label } from "../typography";
import { composeEventHandlers } from "../util/composeEventHandlers";
import copy from "../util/copy";
import { useI18n } from "../util/i18n/i18n.hooks";

export interface CopyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    Pick<ButtonProps, "iconPosition" | "size"> {
  /**
   * @default "neutral"
   */
  variant?: "action" | "neutral";
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
      variant = "neutral",
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
    const timeoutRef = useRef<number>(undefined);
    const translate = useI18n("CopyButton");

    const { cn } = useRenameCSS();

    const themeContext = useThemeInternal(false);

    useEffect(() => {
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleClick = () => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      copy(copyText);
      setActive(true);
      onActiveChange?.(true);

      timeoutRef.current = window.setTimeout(() => {
        setActive(false);
        onActiveChange?.(false);
      }, activeDuration);
    };

    const activeString = activeText || translate("activeText");

    const copyIcon = (
      <LegacyIconWrapper useLegacy={!themeContext?.isDarkside}>
        {active
          ? activeIcon ?? (
              <CheckmarkIcon
                aria-hidden={!!text}
                title={text ? undefined : activeString}
                className={
                  themeContext?.isDarkside
                    ? cn("navds-copybutton__icon")
                    : undefined
                }
              />
            )
          : icon ?? (
              <FilesIcon
                aria-hidden={!!text}
                title={text ? undefined : title || translate("title")}
                className={
                  themeContext?.isDarkside
                    ? cn("navds-copybutton__icon")
                    : undefined
                }
              />
            )}
      </LegacyIconWrapper>
    );

    if (themeContext?.isDarkside) {
      return (
        <Button
          ref={ref}
          type="button"
          className={cn("navds-copybutton", className)}
          {...rest}
          variant={variant === "action" ? "tertiary" : "tertiary-neutral"}
          onClick={composeEventHandlers(onClick, handleClick)}
          iconPosition={iconPosition}
          icon={copyIcon}
          data-active={active}
          size={size}
        >
          {text ? (active ? activeString : text) : null}
        </Button>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        {...rest}
        className={cn(
          "navds-copybutton",
          className,
          `navds-copybutton--${size}`,
          `navds-copybutton--${variant}`,
          {
            "navds-copybutton--icon-only": !text,
            "navds-copybutton--icon-right": iconPosition === "right",
            "navds-copybutton--active": active,
          },
        )}
        onClick={composeEventHandlers(onClick, handleClick)}
      >
        <span className={cn("navds-copybutton__content")}>
          {iconPosition === "left" && copyIcon}
          {text && (
            <Label as="span" size={size === "medium" ? "medium" : "small"}>
              {active ? activeString : text}
            </Label>
          )}
          {iconPosition === "right" && copyIcon}
        </span>
      </button>
    );
  },
);

function LegacyIconWrapper({
  children,
  useLegacy,
}: {
  children: React.ReactNode;
  useLegacy: boolean;
}) {
  const { cn } = useRenameCSS();

  if (!useLegacy) {
    return children;
  }
  return <span className={cn("navds-copybutton__icon")}>{children}</span>;
}

export default CopyButton;

import cl from "clsx";
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import { Label } from "../typography";
import { composeEventHandlers } from "../util/composeEventHandlers";
import copy from "../util/copy";

export interface CopyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * `"xsmall"` should _only_ be used in tables.
   * @default "medium"
   */
  size?: "medium" | "small" | "xsmall";
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
   * Only set if used with `text`-prop.
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
  /**
   * Accessible label for icon in active-state (ignored if text is set).
   * @default "Kopiert"
   */
  activeTitle?: string;
  /**
   * Icon position in button.
   * @default "left"
   */
  iconPosition?: "left" | "right";
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
      activeText = "Kopiert!",
      variant = "neutral",
      size = "medium",
      onActiveChange,
      icon,
      activeIcon,
      activeDuration = 2000,
      title = "Kopier",
      activeTitle = "Kopiert",
      iconPosition = "left",
      onClick,
      ...rest
    },
    ref,
  ) => {
    const [active, setActive] = useState(false);
    const timeoutRef = useRef<number>();

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

    const copyIcon = (
      <span className="navds-copybutton__icon">
        {active
          ? activeIcon ?? (
              <CheckmarkIcon
                aria-hidden={!!text}
                title={text ? undefined : activeTitle}
              />
            )
          : icon ?? (
              <FilesIcon
                aria-hidden={!!text}
                title={text ? undefined : title}
              />
            )}
      </span>
    );

    return (
      <button
        ref={ref}
        type="button"
        {...rest}
        aria-live="polite"
        className={cl(
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
        <span className="navds-copybutton__content">
          {iconPosition === "left" && copyIcon}
          {text &&
            (active ? (
              <Label
                as="span"
                size={size === "medium" ? "medium" : "small"}
                aria-live="polite"
              >
                {activeText}
              </Label>
            ) : (
              <Label
                as="span"
                size={size === "medium" ? "medium" : "small"}
                aria-live="polite"
              >
                {text}
              </Label>
            ))}
          {iconPosition === "right" && copyIcon}
        </span>
      </button>
    );
  },
);

export default CopyButton;

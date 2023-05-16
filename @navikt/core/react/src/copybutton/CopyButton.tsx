import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import cl from "clsx";
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import copy from "../util/copy";
import Label from "../typography/Label";

export interface CopyButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /**
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * @default "neutral"
   */
  variant?: "action" | "neutral";
  /**
   * Text to copy to clipboard
   */
  copyText: string;
  /**
   *  Optional text in button
   */
  text?: string;
  /**
   * Text shown when button is clicked
   * Only set if used with 'text'-prop
   */
  activeText?: string;
  /**
   *  Callback when 'copied'-state is active
   */
  onActiveChange?: (state: boolean) => void;
  /**
   *  Icon shown when button is not clicked
   * @default <FilesIcon />
   */
  icon?: React.ReactNode;
  /**
   * Icon shown when active
   * @default <CheckmarkIcon />
   */
  activeIcon?: React.ReactNode;
  /**
   * Timeout duration in milliseconds
   * @default 2000
   */
  activeDuration?: number;
  /**
   * * accessible label for icon (ignored if text is set)
   * @default 'Kopier'
   */
  title?: string;
  /**
   * accessible label for icon in active-state (ignored if text is set)
   * @default 'Kopiert'
   */
  activeTitle?: string;
}

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
      ...rest
    },
    ref
  ) => {
    const [active, setActive] = useState(false);
    const timeoutRef = useRef<number>();

    useEffect(() => {
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      timeoutRef.current && clearTimeout(timeoutRef.current);
      copy(copyText);
      setActive(true);
      onActiveChange?.(true);
      rest.onClick?.(event);

      timeoutRef.current = window.setTimeout(() => {
        setActive(false);
        onActiveChange?.(false);
      }, activeDuration);
    };

    return (
      <button
        {...rest}
        ref={ref}
        aria-live="polite"
        className={cl(
          "navds-copybutton",
          className,
          `navds-copybutton--${size}`,
          `navds-copybutton--${variant}`,
          {
            "navds-copybutton--icon-only": !text,
            "navds-copybutton--active": active,
          }
        )}
        onClick={handleClick}
      >
        <span className="navds-copybutton__content">
          {active ? (
            <span className="navds-copybutton__icon">
              {activeIcon ?? (
                <CheckmarkIcon
                  aria-hidden={!!text}
                  title={text ? undefined : activeTitle}
                />
              )}
            </span>
          ) : (
            <span className="navds-copybutton__icon">
              {icon ?? (
                <FilesIcon
                  aria-hidden={!!text}
                  title={text ? undefined : title}
                />
              )}
            </span>
          )}

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
        </span>
      </button>
    );
  }
);

export default CopyButton;

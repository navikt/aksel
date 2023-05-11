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
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @default "medium"
   */
  size?: "medium" | "small";
  /**
   * @default "tertiary-neutral"
   */
  variant?: "tertiary" | "tertiary-neutral";
  /**
   *  Text to copy to clipboard
   */
  clipboardText: string;
  /**
   *  Optional text in button
   */
  text?: string;
  /**
   * Text shown when button is clicked
   * @default "Kopiert!"
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
   * Icon shown when button is clicked
   * @default <CheckmarkIcon />
   */
  activeIcon?: React.ReactNode;
  /**
   * Timeout duration in milliseconds
   * @default 2000
   */
  activeDuration?: number;
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      className,
      clipboardText,
      text,
      activeText = "Kopiert!",
      variant = "tertiary-neutral",
      size = "medium",
      onActiveChange,
      icon,
      activeIcon,
      activeDuration = 2000,
      ...rest
    },
    ref
  ) => {
    const [active, setActive] = useState(false);
    const [activated, setActivated] = useState(false);
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
      copy(clipboardText);
      setActive(true);
      rest.onClick?.(event);
      onActiveChange?.(true);
      setActivated(false);

      timeoutRef.current = window.setTimeout(() => {
        setActivated(true);
        setActive(false);
        onActiveChange?.(false);
      }, activeDuration);
    };

    return (
      <button
        {...rest}
        ref={ref}
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
        aria-label={activated ? activeText : undefined}
        onBlur={() => setActivated(false)}
      >
        <span className="navds-copybutton__content">
          {active ? (
            <span className="navds-copybutton__icon">
              {activeIcon ?? (
                <CheckmarkIcon
                  aria-hidden={!!text}
                  title={text ? undefined : "Kopiert"}
                />
              )}
            </span>
          ) : (
            <span className="navds-copybutton__icon">
              {icon ?? (
                <FilesIcon
                  aria-hidden={!!text}
                  title={text ? undefined : "Kopier"}
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

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
   *
   */
  variant?: "tertiary" | "tertiary-neutral";
  /**
   *
   */
  clipboardText: string;
  /**
   *
   */
  text?: string;
  /**
   * @default "Kopiert!"
   */
  activeText?: string;
  /**
   *
   */
  onActiveChange?: (state: boolean) => void;
  /**
   *
   */
  icon?: React.ReactNode;
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
      activeDuration = 2000,
      ...rest
    },
    ref
  ) => {
    const [active, setActive] = useState(false);
    const timeoutRef = useRef<number | null>();

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

      timeoutRef.current = window.setTimeout(() => {
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
      >
        <span className="navds-copybutton__content">
          {active ? (
            <span className="navds-copybutton__icon">
              <CheckmarkIcon aria-hidden />
            </span>
          ) : (
            <span className="navds-copybutton__icon">
              {icon ?? <FilesIcon aria-hidden />}
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

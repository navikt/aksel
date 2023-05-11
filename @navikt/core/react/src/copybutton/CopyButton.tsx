import React, {
  ButtonHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import cl from "clsx";
import copy from "../util/copy";
import { Button } from "../button";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";

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
}

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ className, variant = "tertiary", size = "medium", ...rest }, ref) => {
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
      copy("test");
      setActive(true);
      rest.onClick?.(event);

      timeoutRef.current = window.setTimeout(() => setActive(false), 2000);
    };

    return (
      <Button
        {...rest}
        ref={ref}
        className={cl(
          "navds-copybutton",
          className,
          `navds-copybutton--${size}`
        )}
        onClick={handleClick}
        variant={variant}
        icon={
          active ? <CheckmarkIcon aria-hidden /> : <FilesIcon aria-hidden />
        }
      >
        {active ? <span>Kopiert!</span> : <span>Kopier!</span>}
      </Button>
    );
  }
);

export default CopyButton;

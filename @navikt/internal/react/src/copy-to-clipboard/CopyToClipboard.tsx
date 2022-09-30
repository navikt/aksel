import { Copy } from "@navikt/ds-icons";
import cl from "clsx";
import copy from "copy-to-clipboard";
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import {
  BodyShort,
  Button,
  ButtonProps,
  Popover,
  mergeRefs,
} from "@navikt/ds-react";

export interface CopyToClipboardProps
  extends Omit<ButtonProps, "children" | "variant" | "loading"> {
  /**
   * Button text
   */
  children?: React.ReactNode;
  /**
   * Text to be copied to clipboard
   */
  copyText: string;
  /**
   * Description of text. Example: "Kopierte personnummer til clipboard"
   */
  popoverText: string;
  /**
   * Allows extending popover properties like "placement"
   * @default "bottom"
   */
  popoverPlacement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "right-start"
    | "right-end"
    | "left-start"
    | "left-end";
  /**
   * Copy button title attribute
   * @default children ? undefined : `Kopier ${copyText}`
   */
  title?: string;
  /**
   * Components i tertiary by default. Will be removed in v2.0.0
   * @breaking v2
   */
  variant?: "tertiary";
}

export const CopyToClipboard = forwardRef<
  HTMLButtonElement,
  CopyToClipboardProps
>(
  (
    {
      children,
      copyText,
      popoverText,
      className,
      size = "medium",
      popoverPlacement = "bottom",
      iconPosition = "left",
      title,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = useMemo(() => mergeRefs([buttonRef, ref]), [ref]);
    const timeoutRef = useRef<number | null>();
    const [openPopover, setOpenPopover] = useState(false);

    useEffect(() => {
      timeoutRef.current = openPopover
        ? window.setTimeout(() => setOpenPopover(false), 2000)
        : null;
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
      };
    }, [openPopover]);

    const handleClick = () => {
      copy(copyText);
      setOpenPopover(true);
    };

    const copyTitle = title ?? (children ? undefined : `Kopier ${copyText}`);

    return (
      <div>
        <Button
          ref={mergedRef}
          variant="tertiary"
          className={cl("navdsi-copy-to-clipboard", className)}
          onClick={handleClick}
          size={size}
          icon={<Copy title={copyTitle} aria-hidden={!copyTitle} />}
          iconPosition={iconPosition}
          {...rest}
        >
          {children}
        </Button>
        <Popover
          role="alert"
          anchorEl={buttonRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement={popoverPlacement}
          className="navdsi-copy-to-clipboard__popover"
        >
          <BodyShort size={size === "medium" ? size : "small"} as="span">
            {popoverText}
          </BodyShort>
        </Popover>
      </div>
    );
  }
);

export default CopyToClipboard;

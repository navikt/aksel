import { Copy } from "@navikt/ds-icons";
import cl from "classnames";
import copy from "copy-to-clipboard";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import mergeRefs from "react-merge-refs";
import { BodyShort, Button, ButtonProps, Popover } from "@navikt/ds-react";
import { Placement } from "@popperjs/core";

export interface CopyToClipboardProps extends Omit<ButtonProps, "children"> {
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
  popoverPlacement?: Placement;
  /**
   * Copy button title attribute
   * @default children ? undefined : `Kopier ${copyText}`
   */
  title?: string;
  /**
   * Placement of icon
   * @default "left"
   */
  iconPlacement?: "left" | "right";
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
      iconPlacement = "left",
      title,
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
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
          {...rest}
        >
          {iconPlacement === "left" && (
            <Copy title={copyTitle} aria-hidden={!copyTitle} />
          )}
          {children}
          {iconPlacement === "right" && (
            <Copy title={copyTitle} aria-hidden={!copyTitle} />
          )}
        </Button>
        <Popover
          role="alert"
          anchorEl={buttonRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement={popoverPlacement}
          className="navdsi-copy-to-clipboard__popover"
          strategy="fixed"
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

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
   * @default "right"
   */
  popoverPlacement?: Placement;
  /**
   * Copy button title attribute
   * @default `Kopier ${copyText}`
   */
  title?: string;
}

const CopyToClipboard = forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  (
    {
      children,
      copyText,
      popoverText,
      className,
      size = "medium",
      popoverPlacement = "right",
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

    return (
      <div>
        <Button
          ref={mergedRef}
          variant="secondary"
          className={cl("navdsi-copy-to-clipboard", className)}
          onClick={handleClick}
          size={size}
          {...rest}
        >
          <Copy title={title ?? `Kopier ${copyText}`} />
        </Button>
        <Popover
          role="alert"
          anchorEl={buttonRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement={popoverPlacement}
          arrow={false}
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

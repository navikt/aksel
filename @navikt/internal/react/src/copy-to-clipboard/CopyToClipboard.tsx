import { Copy } from "@navikt/ds-icons";
import cl from "classnames";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import mergeRefs from "react-merge-refs";
import { BodyShort, Button, ButtonProps, Popover } from "@navikt/ds-react";
import { Placement } from "@popperjs/core";
import { useCopyToClipboard } from "react-use";

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
   * Description of text, examples: "personnummer", "navn", "epost" etc.
   */
  popoverText: string;
  /**
   * Allows extending popover properties like "placement"
   * @default "right"
   */
  popoverPlacement?: Placement;
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
      ...rest
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
    const timeoutRef = useRef<number | null>();
    const [openPopover, setOpenPopover] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, copyToClipboard] = useCopyToClipboard();

    useEffect(() => {
      timeoutRef.current = openPopover
        ? window.setTimeout(() => setOpenPopover(false), 2000)
        : null;
      return () => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
      };
    }, [openPopover]);

    const title = `Kopier ${copyText}`;

    const handleClick = () => {
      copyToClipboard(copyText);
      setOpenPopover(true);
    };

    return (
      <div>
        <Button
          ref={mergedRef}
          variant="secondary"
          title={title}
          className={cl("navdsi-copy-to-clipboard", className)}
          onClick={handleClick}
          size={size}
          {...rest}
        >
          <Copy title="Fil ikon for kopiering" />
          {children ? children : <span className="navds-sr-only">{title}</span>}
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
          <BodyShort size={size} as="span">
            {popoverText}
          </BodyShort>
        </Popover>
      </div>
    );
  }
);

export default CopyToClipboard;

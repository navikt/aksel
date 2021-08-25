import { Copy } from "@navikt/ds-icons";
import copy from "copy-to-clipboard";
import cl from "classnames";
import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import mergeRefs from "react-merge-refs";
import { Popover, PopoverProps, Button, BodyShort } from "..";

export interface CopyToClipboardProps
  extends HTMLAttributes<HTMLButtonElement> {
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
   */
  popoverProps?: Partial<PopoverProps>;
  /**
   * Handles resizing icon and text
   */
  size?: "medium" | "small";
}

const CopyToClipboard = forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  (
    {
      children,
      copyText,
      popoverText,
      className,
      size = "medium",
      popoverProps,
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

    const title = `Kopier ${copyText}`;

    const handleClick = () => {
      copy(copyText);
      setOpenPopover(true);
    };

    return (
      <div>
        <Button
          ref={mergedRef}
          variant="secondary"
          title={title}
          className={cl("navds-copy-to-clipboard", className)}
          onClick={handleClick}
          size={size}
          {...rest}
        >
          <Copy
            focusable="false"
            role="img"
            aria-label="Fil ikon for kopiering"
          />
          {children ? children : <span className="sr-only">{title}</span>}
        </Button>
        <Popover
          role="alert"
          anchorEl={buttonRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement="right"
          arrow={false}
          className="navds-copy-to-clipboard__popover"
          {...popoverProps}
        >
          <BodyShort size={size} component="span">
            {popoverText}
          </BodyShort>
        </Popover>
      </div>
    );
  }
);

export default CopyToClipboard;

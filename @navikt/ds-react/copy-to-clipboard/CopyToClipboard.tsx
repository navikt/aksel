import "@navikt/ds-css/baseline/utility.css";
import "@navikt/ds-css/copy-to-clipboard/index.css";
import { Files } from "@navikt/ds-icons";
import copy from "copy-to-clipboard";
import React, {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import mergeRefs from "react-merge-refs";
import { Popover } from "../index";

export interface CopyToClipboardProps
  extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Text to be copied to clipboard
   */
  text: string;
  /**
   * Description of text, examples: "personnummer", "navn", "epost" etc.
   */
  label: string;
}

const CopyToClipboard = forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  ({ children, text, label, className, ...rest }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [openPopover, setOpenPopover] = useState(false);

    useEffect(() => {
      if (openPopover) {
        timeoutRef.current = setTimeout(() => setOpenPopover(false), 1500);
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
      }
    }, [openPopover]);

    const title = `Kopier ${label} (${text})`;

    const handleClick = () => {
      copy(text);
      setOpenPopover(true);
    };

    return (
      <>
        <button
          ref={mergedRef}
          title={title}
          {...rest}
          className="navds-copy-to-clipboard"
          onClick={handleClick}
        >
          {children ? children : <span className="sr-only">{title}</span>}
          <Files />
        </button>
        <Popover
          role="alert"
          anchorEl={buttonRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          size="small"
          placement="bottom-start"
          arrow={false}
        >
          {label} er kopiert
        </Popover>
      </>
    );
  }
);

export default CopyToClipboard;

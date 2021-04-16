import { Files } from "@navikt/ds-icons";
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
import { Popover, Button } from "../index";

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
  /**
   * Use a differnet icon to display
   * @default "Files" from @navikt/ds-icons
   */
  icon?: React.ReactElement;
}

const CopyToClipboard = forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  ({ children, text, label, icon, className, ...rest }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mergedRef = mergeRefs([buttonRef, ref]);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [openPopover, setOpenPopover] = useState(false);

    useEffect(() => {
      if (openPopover) {
        timeoutRef.current = setTimeout(() => setOpenPopover(false), 2000);
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
        <Button
          ref={mergedRef}
          variant="secondary"
          title={title}
          className={cl("navds-copy-to-clipboard", className)}
          onClick={handleClick}
          {...rest}
        >
          {icon ? <>{icon}</> : <Files aria-label="Fil ikon for kopiering" />}
          {children ? children : <span className="sr-only">{title}</span>}
        </Button>
        <Popover
          role="alert"
          anchorEl={buttonRef.current}
          open={openPopover}
          onClose={() => setOpenPopover(false)}
          placement="auto"
          arrow={false}
          className="navds-copy-to-clipboard__popover"
        >
          {label} er kopiert
        </Popover>
      </>
    );
  }
);

export default CopyToClipboard;

import * as React from "react";
import { forwardRef, HTMLAttributes, useEffect, useRef, useState } from "react";
import { Files } from "@navikt/ds-icons";
import "@navikt/ds-css/baseline/utility.css";
import "./style.css";

export interface CopyToClipboardProps
  extends HTMLAttributes<HTMLButtonElement> {
  /** Verdi som skal kopieres */
  value: string;
  /** Beskrivelse av verdien, feks "personnummer", "navn", "epost" etc. */
  label: string;
}

const CopyToClipboard = forwardRef<HTMLButtonElement, CopyToClipboardProps>(
  (props, ref) => {
    const { value, label, className, ...rest } = props;
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timeout);
    }, [showSuccess]);

    const copyToClipboard = (event: React.MouseEvent) => {
      event.stopPropagation();
      textAreaRef.current?.select();
      document.execCommand("copy");
      setShowSuccess(true);
    };

    const title = `Kopier ${label} (${value})`;

    return (
      <span className={`${className} navds-copyToClipboard-wrapper`}>
        <button
          ref={ref}
          title={title}
          {...rest}
          className="navds-copyToClipboard-button"
          onClick={copyToClipboard}
        >
          <Files />
          <span className="sr-only">{title}</span>
        </button>
        {showSuccess && (
          <span role="alert" className="navds-copyToClipboard-success">
            {label} er kopiert
          </span>
        )}
        <textarea
          className="sr-only"
          tabIndex={-1}
          aria-hidden={true}
          ref={textAreaRef}
          value={value}
          readOnly
        />
      </span>
    );
  }
);

export default CopyToClipboard;

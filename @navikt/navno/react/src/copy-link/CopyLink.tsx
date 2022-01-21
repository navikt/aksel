import React, { useState } from "react";
import cl from "classnames";

import { Link } from "@navikt/ds-icons";

const linkCopiedDisplayTimeMs = 2500;

interface CopyLinkProps {
  label: string;
  confirmationLabel: string;
  anchor: string;
}

const CopyLink = ({ label, confirmationLabel, anchor }: CopyLinkProps) => {
  const [showCopyTooltip, setShowCopyTooltip] = useState(false);

  const copyLinkToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();

    if (navigator?.clipboard?.writeText) {
      const baseUrl = (e.target as HTMLAnchorElement)?.baseURI?.split("#")[0];
      if (baseUrl) {
        navigator?.clipboard?.writeText(`${baseUrl}#${anchor}`);
        setShowCopyTooltip(true);
        setTimeout(() => setShowCopyTooltip(false), linkCopiedDisplayTimeMs);
      }
    }
  };

  return (
    <span className={"copy-link"}>
      <a
        href={anchor}
        onClick={copyLinkToClipboard}
        className={"copy-link__anchor"}
      >
        <Link className="copy-link__icon" />
        {label}
      </a>
      <span
        className={cl(
          "copy-link__tooltip",
          showCopyTooltip ? "copy-link__tooltip--visible" : ""
        )}
        aria-live="assertive"
      >
        {confirmationLabel}
      </span>
    </span>
  );
};

export default CopyLink;

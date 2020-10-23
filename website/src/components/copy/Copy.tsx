import { Flatknapp } from "nav-frontend-knapper";
import Popover, { PopoverOrientering } from "nav-frontend-popover";
import { Normaltekst } from "nav-frontend-typografi";
import React, { useState } from "react";
import { CopyIcon } from "../assets/images/svg";

import "./styles.less";
interface CopyProps {
  copyText: string;
}

const Copy = ({ copyText }: CopyProps) => {
  const [anchor, setAnchor] = useState(undefined);

  const copyContent = (e, content: string) => {
    setAnchor(anchor ? undefined : e.currentTarget);
    const textArea = document.createElement("textarea");
    textArea.value = content;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  };

  return (
    <>
      <Flatknapp
        className="copy__copyknapp"
        aria-label="Kopier tekst til utklippstavle"
        onClick={(e) => copyContent(e, copyText)}
        kompakt
      >
        <CopyIcon />
      </Flatknapp>
      <Popover
        orientering={PopoverOrientering.Over}
        ankerEl={anchor}
        onRequestClose={() => setAnchor(undefined)}
      >
        <Normaltekst className="copy__popover"> Kopiert! </Normaltekst>
      </Popover>
    </>
  );
};

export default Copy;

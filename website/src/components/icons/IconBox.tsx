import React from "react";
import * as Icons from "@navikt/ds-icons";
import "./styles.less";
import "@navikt/ds-css/button/index.css";
import { Undertekst } from "nav-frontend-typografi";

const IconBox = ({ name, onClick, ...props }) => {
  const Icon = Icons[name];
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`open ${name}-icon modal`}
      className="iconbox"
      onClick={() => onClick(name)}
    >
      <Icon className="iconbox__icon" />
      <Undertekst className="iconbox__name">{name}</Undertekst>
    </div>
  );
};

export default IconBox;

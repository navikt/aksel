import React from "react";
import * as Icons from "@navikt/ds-icons";
import "./styles.less";
import "@navikt/ds-css/button/index.css";
import { Undertekst } from "nav-frontend-typografi";

const IconBox = ({ iconObj, onClick, ...props }) => {
  const Icon = Icons[iconObj.name];
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`open ${iconObj.name}-icon modal`}
      className="iconbox"
      onClick={() => onClick(iconObj)}
    >
      <Icon focusable={false} className="iconbox__icon" />
      <Undertekst className="iconbox__name">{iconObj.name}</Undertekst>
    </div>
  );
};

export default IconBox;

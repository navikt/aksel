import React from "react";
import * as Icons from "@navikt/ds-icons";
import "./styles.less";
import "@navikt/ds-css/button/index.css";
import { Undertekst } from "nav-frontend-typografi";

const IconBox = ({ iconObj, onClick, ...props }) => {
  const Icon = Icons[iconObj.name];

  const handleKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (["Enter", " "].includes(e.key)) {
      onClick(iconObj);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`åpne ${iconObj.name}-ikon modal`}
      className="iconbox"
      onClick={() => onClick(iconObj)}
      onKeyDown={(e) => handleKeys(e)}
    >
      <Icon focusable={false} className="iconbox__icon" />
      <Undertekst className="iconbox__name">{iconObj.name}</Undertekst>
    </div>
  );
};

export default IconBox;

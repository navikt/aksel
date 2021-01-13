import React from "react";
import * as Icons from "@navikt/ds-icons";
import { Undertekst } from "nav-frontend-typografi";
import "./styles.less";

const IconBox = ({ iconObj, onClick, ...props }) => {
  const handleKeys = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (["Enter", " "].includes(e.key)) {
      onClick(iconObj);
    }
  };

  const Icon = Icons[iconObj.name];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`åpne ${iconObj.name}-ikon modal`}
      className="iconBox"
      onClick={() => onClick(iconObj)}
      onKeyDown={(e) => handleKeys(e)}
    >
      <Icon focusable={false} />
      <Undertekst className="iconBox__iconName">{iconObj.name}</Undertekst>
    </div>
  );
};

export default IconBox;

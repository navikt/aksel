import React from "react";
import * as Icons from "@navikt/ds-icons";
import "./styles.less";
import { Undertekst } from "nav-frontend-typografi";

const IconBox = ({ name, ...props }) => {
  const Icon = Icons[name];
  return (
    <div className="iconbox">
      <Icon />
      <Undertekst>{name}</Undertekst>
    </div>
  );
};

export default IconBox;

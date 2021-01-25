import React from "react";
import Color from "color";
import classnames from "classnames";

import { Undertekst } from "nav-frontend-typografi";

import { CheckIcon, CrossIcon } from "../assets/images/svg";

import "./styles.less";

const contrastCls = (contrast) =>
  classnames("contrast__ratio", {
    pass: contrast > 4.5,
  });

interface ContrastProps {
  label: string;
  foreground: string;
  background: string;
}
const ContrastSample = ({ label, foreground, background }: ContrastProps) => {
  const backgroundColor = Color(background);
  const foregroundColor = Color(foreground);
  const contrast =
    Math.round(foregroundColor.contrast(backgroundColor) * 100) / 100;

  return (
    <>
      <Undertekst>
        {label}
        <span className={contrastCls(contrast)}>
          <span className="contrast__ratio--label">Kontrast: </span>
          <strong>
            {contrast}
            :1
          </strong>
          &nbsp; , WCAG AA:
          {contrast > 4.5 && <CheckIcon title="Godkjent" />}
          {contrast < 4.5 && <CrossIcon title="Ikke godkjent" />}
        </span>
      </Undertekst>
      <div
        className="contrast__sample"
        style={{
          background: `repeating-linear-gradient(90deg,
                        ${backgroundColor},
                        ${backgroundColor} 2%,
                        ${foregroundColor} 2%,
                        ${foregroundColor} 4%)`,
        }}
      />
    </>
  );
};

export default ContrastSample;

import React from "react";
import Color from "color";
import classnames from "classnames";

import { EtikettLiten as Etikett } from "nav-frontend-typografi";

import { CheckIcon, CrossIcon } from "../assets/images/svg";

import "./styles.less";

const sampleCls = (props) =>
  classnames("contrast-sample", {
    border: props.border,
  });

const contrastCls = (contrast) =>
  classnames("contrast-ratio", {
    pass: contrast > 4.5,
  });

const ContrastSample = (props) => {
  const background = Color(props.background);
  const foreground = Color(props.foreground);
  const contrast = Math.round(foreground.contrast(background) * 100) / 100;

  /* {background: background.hex(), color: foreground.hex()} */

  return (
    <React.Fragment>
      <Etikett>
        {props.label}
        <span className={contrastCls(contrast)}>
          <span className="contrast-ratio__label">Kontrast: </span>
          <strong>
            {contrast}
            :1
          </strong>
          &nbsp; , WCAG AA:
          {contrast > 4.5 && <CheckIcon title="Godkjent" />}
          {contrast < 4.5 && <CrossIcon title="Ikke godkjent" />}
        </span>
      </Etikett>
      <div
        className={sampleCls(props)}
        style={{
          background: `repeating-linear-gradient(90deg,
                        ${background},
                        ${background} 2%,
                        ${foreground} 2%,
                        ${foreground} 4%)`,
        }}
      />
    </React.Fragment>
  );
};

export default ContrastSample;

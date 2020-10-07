import React from "react";
import classnames from "classnames";
import { SuccessIcon, ErrorIcon } from "../../../assets/images/svg";

import "./styles.less";

const clsDodont = (props) => classnames("dodont", props.className);

export const DoDont = (props) => (
  <div className={clsDodont(props)}>{props.children}</div>
);

export const Do = (props) => (
  <div className="dodont__do">
    {props.children}
    <div className="dodont__label">
      <SuccessIcon />
      &nbsp; Gjør dette
    </div>
  </div>
);

export const Dont = (props) => (
  <div className="dodont__dont">
    {props.children}
    <div className="dodont__label">
      <ErrorIcon />
      &nbsp; Ikke gjør dette
    </div>
  </div>
);

import React from "react";
import classnames from "classnames";
import { SuccessIcon, ErrorIcon } from "../assets/images/svg";

import "./styles.less";

export interface DoDontProps {
  children: React.ReactNode;
  className?: string;
}

export const DoDont = ({ children, className = "" }: DoDontProps) => (
  <div className={classnames("dodont", className)}>{children}</div>
);

export const Do = ({ children }: DoDontProps) => (
  <div className="dodont__do">
    {children}
    <div className="dodont__label">
      <SuccessIcon />
      &nbsp; Gjør dette
    </div>
  </div>
);

export const Dont = ({ children }: DoDontProps) => (
  <div className="dodont__dont">
    {children}
    <div className="dodont__label">
      <ErrorIcon />
      &nbsp; Ikke gjør dette
    </div>
  </div>
);

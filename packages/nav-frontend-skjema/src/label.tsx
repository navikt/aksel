import * as React from "react";
import { HTMLAttributes } from "react";
import classnames from "classnames";
import "nav-frontend-skjema-style";

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  /*
   * Egendefinert innhold
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * Egendefinert klassenavn
   */
  className?: string;
  /**
   * Må få verdien av ID-attributtet til skjemafeltet som denne labelen skal peke på.
   */
  htmlFor: string;
}

class Label extends React.Component<LabelProps> {
  render() {
    const { children, className, ...other } = this.props;
    return (
      <label
        className={classnames("skjemaelement__label", className)}
        {...other}
      >
        {children}
      </label>
    );
  }
}

export default Label;

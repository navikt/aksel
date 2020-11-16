import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import "nav-frontend-skjema-style";
import { SkjemaGruppeFeilContext, SkjemaGruppeFeilContextProps } from ".";

const cls = (className) => classNames("skjemaelement", className);

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * ClassName
   */
  className?: string;
  /**
   * Label for radiobutton
   */
  label: React.ReactNode;
  /**
   * Id for radiobutton, hvis id ikke er satt brukes en tilfeldig guid
   */
  id?: string;
  /**
   * Name for radiobutton gruppe
   */
  name: string;
  /**
   * Referanse til selve radioknappen. Brukes for eksempel til å sette fokus
   */
  radioRef?: (element: HTMLInputElement | null) => any;
}

/**
 * Radio
 */
class Radio extends React.Component<RadioProps> {
  render() {
    const { className, name, label, id, radioRef, ...other } = this.props;
    const inputId = id || guid();
    /* eslint-disable jsx-a11y/role-supports-aria-props */
    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => (
          <div className={cls(className)}>
            <input
              type="radio"
              name={name}
              className="skjemaelement__input radioknapp"
              id={inputId}
              ref={radioRef}
              aria-invalid={!!context.feil}
              aria-errormessage={
                context.feil ? context.feilmeldingId : undefined
              }
              {...other}
            />
            <label className="skjemaelement__label" htmlFor={inputId}>
              {label}
            </label>
          </div>
        )}
      </SkjemaGruppeFeilContext.Consumer>
    );
  }
}

(Radio as React.ComponentClass).propTypes = {
  /**
   * ClassName
   */
  className: PT.string,
  /**
   * Label for radiobutton
   */
  label: PT.node.isRequired,
  /**
   * Id for radiobutton, hvis id ikke er satt brukes en tilfeldig guid
   */
  id: PT.string,
  /**
   * Name for radiobutton gruppe
   */
  name: PT.string.isRequired,
  /**
   * Referanse til selve radioknappen. Brukes for eksempel til å sette fokus
   */
  radioRef: PT.func,
};

(Radio as React.ComponentClass).defaultProps = {
  className: undefined,
  id: undefined,
  radioRef: undefined,
};

export default Radio;

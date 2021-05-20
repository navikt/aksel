import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";
import { SkjemaGruppeFeilContext, SkjemaGruppeFeilContextProps } from ".";
import "nav-frontend-skjema-style";

const cls = (className) => classNames("skjemaelement", className);
const inputCls = (harFeil) =>
  classNames("skjemaelement__input checkboks", {
    "skjemaelement__input--harFeil": harFeil,
  });

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Klassenavn
   */
  className?: string;
  /**
   * Label for checkbox
   */
  label: React.ReactNode;
  /**
   * Id for checkbox, hvis id ikke er satt brukes en tilfeldig guid
   */
  id?: string;
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil?: React.ReactNode | boolean;
  /**
   * Referanse til selve checkboxen. Brukes for eksempel til å sette fokus
   */
  checkboxRef?: (instance: HTMLInputElement | null) => void;
}

/**
 * Checkbox
 */
export class Checkbox extends React.Component<CheckboxProps, {}> {
  render() {
    const {
      className,
      label,
      id,
      feil,
      checkboxRef,
      disabled,
      ...other
    } = this.props;
    const inputId = id || guid();
    // tslint:disable:react-a11y-role-has-required-aria-props
    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => {
          const feilmelding = !!disabled ? undefined : context.feil || feil;
          // eslint-disable-next-line no-shadow
          const feilmeldingId = context.feilmeldingId || guid();

          return (
            <div className={cls(className)}>
              <input
                type="checkbox"
                className={inputCls(feilmelding)}
                id={inputId}
                ref={checkboxRef}
                aria-invalid={!!feilmelding}
                aria-errormessage={feilmelding ? feilmeldingId : undefined}
                disabled={disabled}
                {...other}
              />
              <label className="skjemaelement__label" htmlFor={inputId}>
                {label}
              </label>
              {!context.feil && !!feil && !disabled && (
                <SkjemaelementFeilmelding id={feilmeldingId}>
                  {typeof feilmelding !== "boolean" && feilmelding}
                </SkjemaelementFeilmelding>
              )}
            </div>
          );
        }}
      </SkjemaGruppeFeilContext.Consumer>
    );
  }
}

(Checkbox as React.ComponentClass).propTypes = {
  /**
   * ClassName
   */
  className: PT.string,
  /**
   * Label for checkbox
   */
  label: PT.node.isRequired,
  /**
   * Id for checkbox, hvis id ikke er satt brukes en tilfeldig guid
   */
  id: PT.string,
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil: PT.oneOfType([PT.node, PT.bool]),
  /**
   * Referanse til selve checkboxen. Brukes for eksempel til å sette fokus
   */
  checkboxRef: PT.func,
};

(Checkbox as React.ComponentClass).defaultProps = {
  className: undefined,
  id: undefined,
  feil: undefined,
  checkboxRef: undefined,
};

export default Checkbox;

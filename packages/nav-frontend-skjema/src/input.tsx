import * as React from "react";
import * as PT from "prop-types";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";
import {
  Label,
  SkjemaGruppeFeilContext,
  SkjemaGruppeFeilContextProps,
} from ".";
import "nav-frontend-skjema-style";

const cls = (className) => classNames("skjemaelement", className);
const inputClass = (width, className, harFeil, mini) =>
  classNames(
    "skjemaelement__input",
    className,
    `input--${width.toLowerCase()}`,
    {
      "skjemaelement__input--harFeil": harFeil,
      "skjemaelement__input--mini": mini,
    }
  );

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Bredden til inputfeltet
   */
  bredde?: "fullbredde" | "XXL" | "XL" | "L" | "M" | "S" | "XS" | "XXS";
  /**
   * Classname som blir satt på komponentwrapperen
   */
  className?: string;
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil?: React.ReactNode | boolean;
  /**
   * Id for inputfelt, hvis id ikke er satt brukes name eller en tilfeldig guid
   */
  id?: string;
  /**
   * Classname som blir satt på input-elementet
   */
  inputClassName?: string;
  /**
   * Referanse til selve inputfeltet. Brukes for eksempel til å sette fokus
   */
  inputRef?: (element: HTMLInputElement | null) => any;
  /**
   * Label for tekstfeltet
   */
  label?: React.ReactNode;
  /**
   * Ekstrainformasjon under overskrift
   */
  description?: React.ReactNode;
  /**
   * Name for inputfelt, hvis name ikke er satt brukes id eller en tilfeldig guid
   */
  name?: string;
  /**
   * Tettere, 32px høy variant
   */
  mini?: boolean;
}

/**
 * Standard inputfelt med mulighet for å sette bredde
 */
class Input extends React.Component<InputProps> {
  render() {
    const {
      label,
      description,
      bredde,
      feil,
      id,
      name,
      inputRef,
      className,
      inputClassName,
      mini,
      ...other
    } = this.props;
    const inputId = id || guid();

    return (
      <SkjemaGruppeFeilContext.Consumer>
        {(context: SkjemaGruppeFeilContextProps) => {
          const feilmelding = context.feil || feil;
          const feilmeldingId = context.feilmeldingId || guid();
          const descriptionId = description ? guid() : undefined;

          return (
            <div className={cls(className)}>
              {label && <Label htmlFor={inputId}>{label}</Label>}
              {description && (
                <div className="skjemaelement__description" id={descriptionId}>
                  {description}
                </div>
              )}
              <input
                type="text"
                className={inputClass(
                  bredde,
                  inputClassName,
                  feilmelding,
                  mini
                )}
                id={inputId}
                name={name}
                aria-invalid={!!feilmelding}
                aria-describedby={descriptionId}
                aria-errormessage={feilmelding ? feilmeldingId : undefined}
                {...other}
                ref={inputRef}
              />
              {!context.feil && !!feil && (
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

(Input as React.ComponentClass).propTypes = {
  /**
   * Label for tekstfeltet
   */
  label: PT.node,
  /**
   * Ekstrainformasjon under overskrift
   */
  description: PT.node,
  /**
   * Hvis skjemaet har feil sender man inn et objekt med en feilmelding
   */
  feil: PT.oneOfType([PT.node, PT.bool]),
  /**
   * Bredden til inputfeltet
   */
  bredde: PT.oneOf(["fullbredde", "XXL", "XL", "L", "M", "S", "XS", "XXS"]),
  /**
   * Id for inputfelt, hvis id ikke er satt brukes name eller en tilfeldig guid
   */
  id: PT.string,
  /**
   * Name for inputfelt, hvis name ikke er satt brukes id eller en tilfeldig guid
   */
  name: PT.string,
  /**
   * Referanse til selve inputfeltet. Brukes for eksempel til å sette fokus
   */
  inputRef: PT.func,
  /**
   * Classname som blir satt på komponentwrapperen
   */
  className: PT.string,
  /**
   * Classname som blir satt på input-elementet
   */
  inputClassName: PT.string,
};

(Input as React.ComponentClass).defaultProps = {
  bredde: "fullbredde",
  feil: undefined,
  id: undefined,
  name: undefined,
  inputRef: undefined,
  className: undefined,
  inputClassName: undefined,
};

export default Input;

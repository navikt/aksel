import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import { guid } from "nav-frontend-js-utils";
import SkjemaelementFeilmelding from "./skjemaelement-feilmelding";
import "nav-frontend-skjema-style";

const cls = (className) => classNames("skjemagruppe", className);

export type SkjemaGruppeFeilContextProps = {
  feil?: React.ReactNode | boolean;
  feilmeldingId?: string;
};

export const SkjemaGruppeFeilContext = React.createContext<
  Partial<SkjemaGruppeFeilContextProps>
>({});

export interface SkjemaGruppeProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * En eller flere children, oftest en eller flere .skjemaelement
   */
  children: React.ReactNode | React.ReactNode[];
  /**
   * ClassName
   */
  className?: string;
  /**
   * Bestemmer hvilken HTML-tag som skal brukes. Default er 'fieldset'.
   */
  tag?: string;
  /**
   * Legend/tittel for skjemagruppen
   */
  legend?: React.ReactNode;
  /**
   * Ekstrainformasjon under legend/tittel
   */
  description?: React.ReactNode;
  /**
   * Hvis skjemagruppen har feil sender man inn et objekt med en feilmelding
   */
  feil?: React.ReactNode | boolean;
  /**
   * Valgfri ID til intern SkjemaelementFeilmelding
   */
  feilmeldingId?: string;
  /**
   * Option om man skal propagere feil til children
   */
  utenFeilPropagering?: boolean;
}

/**
 * Fieldset
 */
class SkjemaGruppe extends React.Component<SkjemaGruppeProps> {
  render() {
    const {
      children,
      className,
      feil,
      legend,
      description,
      tag = "fieldset",
      feilmeldingId = guid(),
      utenFeilPropagering,
      ...other
    } = this.props;

    const descriptionId = description ? guid() : undefined;

    const childrenWithContext = (
      <SkjemaGruppeFeilContext.Provider value={{ feil, feilmeldingId }}>
        {children}
      </SkjemaGruppeFeilContext.Provider>
    );

    const content = (
      <React.Fragment>
        {legend && <legend className="skjemagruppe__legend">{legend}</legend>}
        {description && (
          <div className="skjemagruppe__description" id={descriptionId}>
            {description}
          </div>
        )}
        {utenFeilPropagering ? children : childrenWithContext}
        <SkjemaelementFeilmelding id={feilmeldingId}>
          {typeof feil !== "boolean" && feil}
        </SkjemaelementFeilmelding>
      </React.Fragment>
    );

    return React.createElement(
      tag,
      {
        className: cls(className),
        "aria-invalid": !!feil,
        "aria-errormessage": feil ? feilmeldingId : undefined,
        "aria-describedby": descriptionId,
        ...other,
      },
      content
    );
  }
}

(SkjemaGruppe as React.ComponentClass).propTypes = {
  /**
   * En eller flere children, oftest en eller flere .skjemaelement
   */
  children: PT.oneOfType([PT.arrayOf(PT.node), PT.node]).isRequired,
  /**
   * ClassName
   */
  className: PT.string,
  /**
   * Bestemmer hvilken HTML-tag som skal brukes
   */
  tag: PT.string,
  /**
   * legend for skjemagruppen
   */
  legend: PT.node,
  /**
   * Ekstrainformasjon under legend/tittel
   */
  description: PT.node,
  /**
   * Feilmelding
   */
  feil: PT.oneOfType([PT.node, PT.bool]),
  /**
   * Feilmeldings id
   */
  feilmeldingId: PT.string,
  /**
   * Option om man skal propagere feil til children
   */
  utenFeilPropagering: PT.bool,
};

(SkjemaGruppe as React.ComponentClass).defaultProps = {
  className: undefined,
  feil: undefined,
  tag: "fieldset",
  utenFeilPropagering: undefined,
};

export default SkjemaGruppe;

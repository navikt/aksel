import * as React from "react";
import classNames from "classnames";
import * as PT from "prop-types";
import "nav-frontend-snakkeboble-style";
import Panel from "nav-frontend-paneler";
import { Undertekst } from "nav-frontend-typografi";

const snakkebobleCls = (hoyre, className) =>
  classNames("snakkeboble", ...className.split(" "), {
    "snakkeboble--hoyre": hoyre,
    "snakkeboble--venstre": !hoyre,
  });

export interface SnakkebobleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @Deprecated Dato for melding, bruk `topp`
   */
  dato?: string;
  /**
   * Toppteksten (tittel) for meldingen
   */
  topp?: string;
  /**
   * Tekst for melding
   */
  children: React.ReactChildren | React.ReactChild | React.ReactNode;
  /**
   * Settes denne peker pilen til snakkeboblen mot høyre, og snakkeboblen og teksten i snakkeboblen flyter mot høyre.
   */
  pilHoyre?: boolean;
  /**
   * Klasse som brukes på ikonet. Dette lar deg styre form, farge og illustrasjon.
   */
  ikonClass?: string;
  /**
   * Egendefinerte klassenavn
   */
  className?: string;
}

/**
 * En snakkeboble for dialog
 */
class Snakkeboble extends React.Component<SnakkebobleProps> {
  render() {
    const {
      dato,
      topp,
      children,
      pilHoyre,
      ikonClass,
      className,
      ...rest
    } = this.props;
    const toppTekst = topp || dato;

    return (
      <div className={snakkebobleCls(pilHoyre, className)} {...rest}>
        <i className={ikonClass} />
        <div className="snakkeboble__snakkeboble-pil-container">
          <i className="snakkeboble__snakkebole-pil" />
        </div>
        <Panel className="snakkeboble-panel">
          {toppTekst && (
            <Undertekst className="snakkeboble-panel__topp">
              {toppTekst}
            </Undertekst>
          )}
          <div className="snakkeboble-panel__tekst">{children}</div>
        </Panel>
      </div>
    );
  }
}

(Snakkeboble as React.ComponentClass).defaultProps = {
  /**
   * Default er at pilen peker mot venstre
   */
  pilHoyre: false,
  /**
   * Gir enkel default styling på ikoner
   */
  ikonClass: "snakkeboble__ikon",
  /**
   * @Deprecated Bruk `topp`-prop
   */
  dato: null,
  /**
   * Egendefinerte klassenavn
   */
  className: "",
};

(Snakkeboble as React.ComponentClass).propTypes = {
  /**
   * Toppteksten (tittel) for meldingen
   */
  topp: PT.string,
  /**
   * @Deprecated Dato for melding, bruk `topp`
   */
  dato: PT.string,
  /**
   * Tekst for melding
   */
  children: PT.node.isRequired,
  /**
   * Settes denne peker pilen til snakkeboblen mot høyre, og snakkeboblen og teksten i snakkeboblen flyter mot høyre.
   */
  pilHoyre: PT.bool,
  /**
   * Klasse som brukes på ikonet. Dette lar deg styre form, farge og illustrasjon.
   */
  ikonClass: PT.string,
  /**
   * Egendefinerte klassenavn
   */
  className: PT.string,
};

export default Snakkeboble;

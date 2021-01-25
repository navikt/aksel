import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import TypografiBase from "nav-frontend-typografi";
import "nav-frontend-etiketter-style";

const cls = (type, mini, className) =>
  classNames("etikett", className, {
    "etikett--advarsel": type === "advarsel",
    "etikett--fokus": type === "fokus",
    "etikett--suksess": type === "suksess",
    "etikett--info": type === "info",
    "etikett--mini": mini,
  });

export interface EtikettProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Må være en gyldig 'type' prop på Typografi-komponenten, se 'nav-frontend-typografi'
   */
  typo?: string;
  /**
   * Tettere 24px høy, 14px font-size versjon
   */
  mini?: boolean;
}
/**
 * Etiketter finnes i fire predefinerte farger,
 * om det er behov anbefales å lage en egen klasse hvor man kan legge til flere farger
 */
export interface EtikettBaseProps extends EtikettProps {
  /**
   * Predefinerte farger
   */
  type: "suksess" | "info" | "advarsel" | "fokus";
}

class EtikettBase extends React.Component<EtikettBaseProps> {
  render() {
    const { type, className, typo, children, mini, ...props } = this.props;
    let typografi = mini ? "undertekst" : "normaltekst";
    typografi = typo || typografi;
    return (
      <div className={cls(type, mini, className)} {...props}>
        <TypografiBase tag="span" type={typografi}>
          {children}
        </TypografiBase>
      </div>
    );
  }
}

(EtikettBase as React.ComponentClass).propTypes = {
  /**
   * Typografi som skal brukes i etiketten. Støtter samme typer som `TypografiBase`. Påvirker ikke tag...
   */
  typo: PT.string,
  children: PT.node.isRequired,
  /**
   * Predefinerte farger
   */
  type: PT.oneOf(["suksess", "info", "fokus", "advarsel"]).isRequired,
  className: PT.string,
  /**
   * Tettere 24px høy, 14px font-size versjon
   */
  mini: PT.bool,
};

(EtikettBase as React.ComponentClass).defaultProps = {
  className: undefined,
  mini: false,
};

export default EtikettBase;

export { default as EtikettAdvarsel } from "./etikettadvarsel";
export { default as EtikettFokus } from "./etikettfokus";
export { default as EtikettSuksess } from "./etikettsuksess";
export { default as EtikettInfo } from "./etikettinfo";

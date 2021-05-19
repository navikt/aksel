import * as React from "react";
import classnames from "classnames";
import { Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import "nav-frontend-skjema-style";

export interface FeiloppsummeringProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Egendefinert klassenavn.
   */
  className?: string;
  /**
   * Referanse til intern div
   */
  innerRef?: React.RefObject<HTMLDivElement>;
  /**
   * Tittel
   */
  tittel: React.ReactNode;
  /**
   * Liste over feil
   */
  feil: FeiloppsummeringFeil[];
  /**
   * Alternativ renderer for feil, f.eks. dersom en ikke kan lenke til inputelement vha #id
   */
  customFeilRender?: (feil: FeiloppsummeringFeil) => React.ReactNode;
}

export interface FeiloppsummeringFeil {
  /**
   * ID til skjemaelementet som feilmeldingen tilhører.
   */
  skjemaelementId: string;
  /**
   * Selve feilmeldingen.
   */
  feilmelding: string;
}

class Feiloppsummering extends React.Component<FeiloppsummeringProps> {
  render() {
    const {
      children,
      className,
      innerRef,
      tittel,
      feil,
      customFeilRender,
      ...rest
    } = this.props;
    return (
      <div
        ref={innerRef}
        tabIndex={0}
        role="region"
        className={classnames("feiloppsummering", className)}
        {...rest}
      >
        {typeof tittel === "string" ? (
          <Undertittel>{tittel}</Undertittel>
        ) : (
          tittel
        )}
        <ul className="feiloppsummering__liste">
          {feil.map((item) => (
            <li key={item.skjemaelementId}>
              {customFeilRender ? (
                customFeilRender(item)
              ) : (
                <Lenke href={`#${item.skjemaelementId}`}>
                  {item.feilmelding}
                </Lenke>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Feiloppsummering;

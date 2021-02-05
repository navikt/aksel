import * as PT from "prop-types";
import * as React from "react";
import * as classNames from "classnames";
import { Normaltekst } from "nav-frontend-typografi";
import Ikon from "nav-frontend-ikoner-assets";

import "nav-frontend-alertstriper-style";

export type AlertStripeType = "info" | "suksess" | "advarsel" | "feil";
export type AlertStripeForm = "inline" | "default";

const cls = (type, form, className) =>
  classNames("alertstripe", className, {
    "alertstripe--info": type === "info",
    "alertstripe--suksess": type === "suksess",
    "alertstripe--advarsel": type === "advarsel",
    "alertstripe--feil": type === "feil",
    "alertstripe--inline": form === "inline",
  });

const ikonKind = (type: AlertStripeType) => {
  switch (type) {
    case "suksess":
      return "ok-sirkel-fyll";
    case "advarsel":
      return "advarsel-sirkel-fyll";
    case "feil":
      return "feil-sirkel-fyll";
    default:
      return "info-sirkel-fyll";
  }
};

export interface AlertStripeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * -
   */
  children: React.ReactNode | React.ReactChild | React.ReactChildren;
  /**
   * -
   */
  size?: string | number;
  /**
   * -
   */
  className?: string;
}

export interface AlertStripeBaseProps extends AlertStripeProps {
  /**
   * Varianter å velge mellom
   */
  type: AlertStripeType;
  /**
   * Form - enten 'default' eller 'inline'
   */
  form?: AlertStripeForm;
}

class AlertStripe extends React.Component<AlertStripeBaseProps> {
  render() {
    const { type, form, size, className, children, ...props } = this.props;
    return (
      <div className={cls(type, form, className)} {...props}>
        <span className="alertstripe__ikon">
          <span className="sr-only">{type}</span>
          <Ikon
            role="img"
            aria-label={`${type}-ikon`}
            kind={ikonKind(type)}
            size={size}
          />
        </span>
        <Normaltekst className="alertstripe__tekst" tag="div">
          {children}
        </Normaltekst>
      </div>
    );
  }
}

(AlertStripe as React.ComponentClass).propTypes = {
  children: PT.node.isRequired,
  type: PT.oneOf(["info", "suksess", "advarsel", "feil"]).isRequired,
  size: PT.oneOfType([PT.string, PT.number]),
  className: PT.string,
};

(AlertStripe as React.ComponentClass).defaultProps = {
  className: undefined,
  size: "1.5em",
  form: "default",
};

export default AlertStripe;

export { default as AlertStripeInfo } from "./info-alertstripe";
export { default as AlertStripeSuksess } from "./suksess-alertstripe";
export { default as AlertStripeAdvarsel } from "./advarsel-alertstripe";
export { default as AlertStripeFeil } from "./feil-alertstripe";

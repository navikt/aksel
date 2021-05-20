import * as PT from "prop-types";
import * as React from "react";
import classNames from "classnames";
import { omit } from "nav-frontend-js-utils";
import "nav-frontend-knapper-style";

import { CustomHTMLButtonAttributes } from "./CustomHTMLButtonAttributes";

const cls = (props: KnappBaseProps) =>
  classNames("knapp", props.className, {
    "knapp--hoved": props.type === "hoved",
    "knapp--fare": props.type === "fare",
    "knapp--standard": props.type === "standard",
    "knapp--flat": props.type === "flat",
    "knapp--mini": props.mini,
    "knapp--disabled": props.disabled,
    "knapp--spinner": props.spinner,
    "knapp--kompakt": props.kompakt === true,
  });

function skalVareDisabled(props) {
  if (props.autoDisableVedSpinner) {
    return props.disabled || props.spinner;
  }
  return props.disabled;
}

export interface KnappBaseProps extends CustomHTMLButtonAttributes {
  /**
   * Verdi for <button/>-attributtet 'type', angir knappens default funksjon
   */
  htmlType?: "submit" | "button" | "reset";
  /**
   * Tettere, 32px høy variant
   */
  mini?: boolean;
  /**
   * Knapp med spinner
   */
  spinner?: boolean;
  /**
   * -
   */
  autoDisableVedSpinner?: boolean;
  /**
   * -
   */
  inaktivKlasseVedDisabled?: boolean;
  /**
   * Varianter å velge mellom
   */
  type?: "standard" | "hoved" | "fare" | "flat";
  /**
   * Innstillinger for å endre på knappens form.
   */
  kompakt?: boolean;
}

/**
 *  Knapp, Hovedknapp og Fareknapp arver alle fra KnappBase, og har da samme props.
 *  Unntaket er `type` som blir satt av de respektive underklassene.
 */
class KnappBase extends React.Component<KnappBaseProps> {
  static defaultProps: Partial<KnappBaseProps> = {
    type: "standard",
  };

  render() {
    const { children, className, ...props } = this.props;

    const spinner = props.spinner ? <span className="knapp__spinner" /> : null;
    const ariaLabel = props.spinner ? { "aria-label": "Laster" } : {};
    const disabled = skalVareDisabled(props);
    const type = props.htmlType;
    const domProps = omit(
      { ...props, disabled, type },
      "htmlType",
      "mini",
      "spinner",
      "autoDisableVedSpinner",
      "inaktivKlasseVedDisabled",
      "kompakt"
    );

    return (
      <button className={cls(this.props)} {...domProps} {...ariaLabel}>
        {children}
        {spinner}
      </button>
    );
  }
}

(KnappBase as any).defaultProps = {
  autoDisableVedSpinner: false,
  inaktivKlasseVedDisabled: false,
  className: null,
  htmlType: "submit",
  mini: false,
  disabled: false,
  spinner: false,
  type: "standard",
  kompakt: false,
};

(KnappBase as any).propTypes = {
  children: PT.node.isRequired,
  className: PT.string,
  type: PT.oneOf(["standard", "hoved", "fare", "flat"]),
  htmlType: PT.oneOf(["submit", "button", "reset"]),
  mini: PT.bool,
  disabled: PT.bool,
  spinner: PT.bool,
  autoDisableVedSpinner: PT.bool,
  inaktivKlasseVedDisabled: PT.bool,
  kompakt: PT.bool,
};

export default KnappBase;

export { default as Knapp } from "./knapp";
export { default as Hovedknapp } from "./hovedknapp";
export { default as Fareknapp } from "./fareknapp";
export { default as Flatknapp } from "./flatknapp";

import * as React from "react";
import * as PT from "prop-types";
import * as cn from "classnames";

import { omit } from "nav-frontend-js-utils";

import "nav-frontend-veileder-style";

const cls = (props) =>
  cn("nav-veileder", props.className, {
    "nav-veileder--advarsel": props.type === "advarsel",
    "nav-veileder--feilmelding": props.type === "feilmelding",
    "nav-veileder--suksess": props.type === "suksess",
    "nav-veileder--flytende": props.posisjon === "flytende",
    "nav-veileder--topp": props.posisjon === "topp",
    "nav-veileder--hoyre": props.posisjon === "høyre",
    "nav-veileder--bunn": props.posisjon === "bunn",
    "nav-veileder--venstre": props.posisjon === "venstre",
  });

const frameCls = (props) =>
  cn("nav-veileder__frame", {
    "nav-veileder__frame--center": props.center,
    "nav-veileder__frame--transparent": props.transparent,
    "nav-veileder__frame--nomask": props.nomask,
    "nav-veileder__frame--s": props.storrelse === "S",
    "nav-veileder__frame--m": props.storrelse === "M",
    "nav-veileder__frame--l": props.storrelse === "L",
    "nav-veileder__frame--xl": props.storrelse === "XL",
    "nav-veileder__frame--info": props.fargetema === "info",
    "nav-veileder__frame--suksess": props.fargetema === "suksess",
    "nav-veileder__frame--advarsel": props.fargetema === "advarsel",
    "nav-veileder__frame--feilmelding": props.fargetema === "feilmelding",
  });

const pilCls = (props) =>
  cn("nav-veileder__snakkeboblePil", {
    "nav-veileder__snakkeboblePil--flytende": props.posisjon === "flytende",
    "nav-veileder__snakkeboblePil--topp": props.posisjon === "topp",
    "nav-veileder__snakkeboblePil--hoyre": props.posisjon === "høyre",
    "nav-veileder__snakkeboblePil--bunn": props.posisjon === "bunn",
    "nav-veileder__snakkeboblePil--venstre": props.posisjon === "venstre",
  });

const snakkebobleCls = (props) =>
  cn("nav-veileder__snakkeboble", {
    "nav-veileder__snakkeboble--flytende": props.posisjon === "flytende",
    "nav-veileder__snakkeboble--topp": props.posisjon === "topp",
    "nav-veileder__snakkeboble--hoyre": props.posisjon === "høyre",
    "nav-veileder__snakkeboble--bunn": props.posisjon === "bunn",
    "nav-veileder__snakkeboble--venstre": props.posisjon === "venstre",
  });

export interface VeilederProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom SVG-element som illustrerer en figur, f.eks. en av disse:
   * https://app.zeplin.io/project/59831e455850985791bdeb4d/screen/5a7c1fcc36781f9423ab6a0e
   */
  children?: React.ReactNode;
  /**
   * Klassenavn
   */
  className?: string;
  /**
   * Tekst eller HTML som rendres i en snakkeboble
   */
  tekst?: React.ReactNode;
  /**
   * Skrur av bakgrunnsfargen
   */
  transparent?: boolean;
  /**
   * Skrur av sirkulær maskering/cropping av children
   */
  nomask?: boolean;
  /**
   * Skrur av 80% height på children, og rendrer i full høyde (hvis innholdet skal sentreres)
   */
  center?: boolean;
  /**
   * Predefinerte nøkler for styling av snakkeboblen, avhengig av type budskap.
   */
  type?: "normal" | "suksess" | "advarsel" | "feilmelding";
  /**
   * Predefinerte fargetemaer som bestemmer bakgrunnsfargen på veilederen.
   */
  fargetema?: "normal" | "info" | "suksess" | "advarsel" | "feilmelding";
  /**
   * Predefinerte størrelser
   */
  storrelse?: "S" | "M" | "L" | "XL";
  /**
   * Posisjon på snakkeboblen
   */
  posisjon?: "flytende" | "topp" | "høyre" | "bunn" | "venstre";
}

class Veileder extends React.Component<VeilederProps> {
  public static defaultProps: Partial<VeilederProps> = {
    type: "normal",
    fargetema: "normal",
    storrelse: "M",
    posisjon: "flytende",
  };

  render() {
    const { children, tekst, ...other } = this.props;

    const domProps = omit(
      { ...other },
      "center",
      "nomask",
      "says",
      "color",
      "transparent",
      "width",
      "type",
      "fargetema",
      "storrelse",
      "posisjon",
      "className"
    );

    return (
      <div className={cls(this.props)} {...domProps}>
        <div className={frameCls(this.props)}>{children}</div>
        {tekst && <i className={pilCls(this.props)} />}
        {tekst && (
          <div className={snakkebobleCls(this.props)}> {this.props.tekst}</div>
        )}
      </div>
    );
  }
}

export const VeilederPropsShape = {
  /**
   * Custom SVG-element som illustrerer en figur, f.eks. en av disse:
   * https://app.zeplin.io/project/59831e455850985791bdeb4d/screen/5a7c1fcc36781f9423ab6a0e
   */
  children: PT.node,
  /**
   * Klassenavn
   */
  className: PT.string,
  /**
   * Tekst eller HTML som rendres i en snakkeboble
   */
  tekst: PT.node,
  /**
   * Skrur av bakgrunnsfargen
   */
  transparent: PT.bool,
  /**
   * Skrur av sirkulær maskering/cropping av children
   */
  nomask: PT.bool,
  /**
   * Skrur av 80% height på children, og rendrer i full høyde (hvis innholdet skal sentreres)
   */
  center: PT.bool,
  /**
   * Predefinerte nøkler for styling av snakkeboblen, avhengig av type budskap.
   */
  type: PT.oneOf(["normal", "suksess", "advarsel", "feilmelding"]),
  /**
   * Predefinerte fargetemaer som bestemmer bakgrunnsfargen på veilederen.
   */
  fargetema: PT.oneOf(["normal", "info", "suksess", "advarsel", "feilmelding"]),
  /**
   * Predefinerte størrelser
   */
  storrelse: PT.oneOf(["S", "M", "L", "XL"]),
  /**
   * Posisjon på snakkeboblen
   */
  posisjon: PT.oneOf(["flytende", "topp", "høyre", "bunn", "venstre"]),
};

(Veileder as React.ComponentClass).propTypes = VeilederPropsShape;

(Veileder as React.ComponentClass).defaultProps = {
  type: "normal",
  fargetema: "normal",
  storrelse: "M",
  posisjon: "flytende",
};

export default Veileder;

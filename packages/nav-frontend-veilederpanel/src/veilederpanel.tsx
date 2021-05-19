import * as React from "react";
import * as PT from "prop-types";
import cn from "classnames";

import Veileder, {
  VeilederProps,
  VeilederPropsShape,
} from "nav-frontend-veileder";

import "nav-frontend-veilederpanel-style";

const veilederPanelCls = (props) =>
  cn("nav-veilederpanel", {
    "nav-veilederpanel--kompakt": props.kompakt,
    "nav-veilederpanel--plakat": props.type === "plakat",
    "nav-veilederpanel--info": props.fargetema === "info",
    "nav-veilederpanel--suksess": props.fargetema === "suksess",
    "nav-veilederpanel--advarsel": props.fargetema === "advarsel",
    "nav-veilederpanel--feilmelding": props.fargetema === "feilmelding",
  });

export interface VeilederpanelProps {
  /**
   * Egendefinert SVG som rendres i en Veileder-boble
   */
  svg: React.ReactNode;
  /**
   * Predefinerte fargetemaer som bestemmer bakgrunnsfargen på veilederen og
   * border på veilederpanelet.
   */
  fargetema?: "normal" | "info" | "suksess" | "advarsel" | "feilmelding";
  /**
   * Verdiene 'normal' og 'plakat' bestemmer henholdsvis om veilederen plasseres
   * til venstre eller over innholdet.
   */
  type?: "normal" | "plakat";
  /**
   * Kompakt versjon av veilederpanelet bruker litt mindre plass enn normalt, hvor
   * veilderen rendres overlappende med border på panelet.
   */
  kompakt?: boolean;
  /**
   * Props som blir videreformidlet til intern instans av Veileder.
   */
  veilederProps?: VeilederProps;
}

class Veilederpanel extends React.Component<VeilederpanelProps> {
  render() {
    const { svg, children } = this.props;
    const storrelse = this.props.type === "plakat" ? "M" : "S";
    return (
      <div className={veilederPanelCls(this.props)}>
        <Veileder
          {...this.props.veilederProps}
          fargetema={this.props.fargetema}
          storrelse={storrelse}
        >
          {svg}
        </Veileder>
        <div className="nav-veilederpanel__content">{children}</div>
      </div>
    );
  }
}

(Veilederpanel as any).propTypes = {
  /**
   * Egendefinert SVG som rendres i en Veileder-boble
   */
  svg: PT.node.isRequired,
  /**
   * Predefinerte fargetemaer som bestemmer bakgrunnsfargen på veilederen og
   * border på veilederpanelet.
   */
  fargetema: PT.oneOf(["normal", "info", "suksess", "advarsel", "feilmelding"]),
  /**
   * Verdiene 'normal' og 'plakat' bestemmer henholdsvis om veilederen plasseres
   * til venstre eller over innholdet.
   */
  type: PT.oneOf(["normal", "plakat"]),
  /**
   * Kompakt versjon av veilederpanelet bruker litt mindre plass enn normalt, hvor
   * veilderen rendres overlappende med border på panelet.
   */
  kompakt: PT.bool,
  /**
   * Props som blir videreformidlet til intern instans av Veileder.
   */
  veilederProps: PT.shape(VeilederPropsShape),
};

export default Veilederpanel;

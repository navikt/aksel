import * as React from "react";
import Ikon from "nav-frontend-ikoner-assets";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Søkeknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase kompakt {...this.props}>
        <Ikon kind="søk" />
        {this.props.children || <span>Søk</span>}
      </KnappBase>
    );
  }
}

export default Søkeknapp;

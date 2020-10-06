import * as React from "react";
import Chevron from "nav-frontend-chevron";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Tilbakeknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase type="flat" kompakt {...this.props}>
        <Chevron type="venstre" />
        {this.props.children || <span>Tilbake</span>}
      </KnappBase>
    );
  }
}

export default Tilbakeknapp;

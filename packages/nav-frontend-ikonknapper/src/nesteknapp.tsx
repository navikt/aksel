import * as React from "react";
import Chevron from "nav-frontend-chevron";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Nesteknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase type="flat" kompakt {...this.props}>
        {this.props.children || <span>Neste</span>}
        <Chevron type="høyre" />
      </KnappBase>
    );
  }
}

export default Nesteknapp;

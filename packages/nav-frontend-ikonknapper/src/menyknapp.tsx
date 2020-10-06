import * as React from "react";
import Chevron from "nav-frontend-chevron";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Menyknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase kompakt {...this.props}>
        {this.props.children || <span>Meny</span>}
        <Chevron type="ned" />
      </KnappBase>
    );
  }
}

export default Menyknapp;

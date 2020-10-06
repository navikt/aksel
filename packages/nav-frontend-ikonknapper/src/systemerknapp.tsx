import * as React from "react";
import Ikon from "nav-frontend-ikoner-assets";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Systemerknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase type="flat" kompakt {...this.props}>
        <Ikon kind="systemer" />
        {this.props.children || <span className="sr-only">Systemer</span>}
      </KnappBase>
    );
  }
}

export default Systemerknapp;

import * as React from "react";
import Ikon from "nav-frontend-ikoner-assets";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Hamburgerknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase type="flat" kompakt {...this.props}>
        <Ikon kind="hamburger" />
        {this.props.children || <span className="sr-only">Meny</span>}
      </KnappBase>
    );
  }
}

export default Hamburgerknapp;

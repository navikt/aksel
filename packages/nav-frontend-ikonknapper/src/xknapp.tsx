import * as React from "react";
import Ikon from "nav-frontend-ikoner-assets";
import KnappBase, { KnappBaseProps } from "nav-frontend-knapper";

class Xknapp extends React.Component<KnappBaseProps> {
  render() {
    return (
      <KnappBase type="flat" kompakt {...this.props}>
        <Ikon kind="x" />
        {this.props.children || <span className="sr-only">Lukk</span>}
      </KnappBase>
    );
  }
}

export default Xknapp;

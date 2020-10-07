import * as React from "react";
import TypografiBase, { TypografiProps } from "./index";

class Undertittel extends React.Component<TypografiProps> {
  render() {
    return <TypografiBase type="undertittel" {...this.props} />;
  }
}

export default Undertittel;
